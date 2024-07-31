<template>
  <div class="race-animation mx-4 my-8">
    <h2 class="text-2xl font-bold mb-2 bg-gray-800 text-white p-2 rounded">
      Race
    </h2>
    <div v-if="currentRun" class="race-info">
      <h3 class="text-xl font-semibold mb-4 bg-gray-200 p-2 rounded">
        {{ currentRun.distance }}m
      </h3>
      <p class="text-xl font-semibold mb-4 bg-gray-800 text-white p-2 rounded">
        Round: {{ currentRunIndex + 1 }} / 6
      </p>
    </div>
    <div class="race-track">
      <div class="start-line">
        <div
          v-for="horse in currentRun?.horses || []"
          :key="horse.id"
          class="horse-id"
        >
          Horse {{ horse.id }}
        </div>
      </div>
      <div class="race-line">
        <div
          v-for="horse in currentRun?.horses || []"
          :key="horse.id"
          class="horse"
        >
          <font-awesome-icon icon="horse" :style="{ color: horse.color }" />
        </div>
      </div>
      <div class="finish-line">Finish</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface Horse {
  id: number;
  color: string;
  finishTime?: number;
}

interface Run {
  distance: number;
  horses: Horse[];
}

export default defineComponent({
  name: "RaceAnimation",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const store = useStore();
    const currentRunIndex = ref(0);
    const currentRun = computed<Run | undefined>(
      () => store.getters["raceSchedule"][currentRunIndex.value]
    );

    let timeline: gsap.core.Timeline | null = null;
    let isAnimating = ref(false);

    const startRace = () => {
      if (isAnimating.value) return;

      isAnimating.value = true;
      const run = currentRun.value;
      if (run) {
        animateRun(run.horses, run.distance).then((finishTimes) => {
          const resultHorses = run.horses.map((horse, index) => ({
            ...horse,
            finishTime: finishTimes[index],
          }));

          store.commit("addRunResultWithFinishTimes", {
            runIndex: currentRunIndex.value,
            resultHorses,
          });
          currentRunIndex.value += 1;
          if (currentRunIndex.value < 6) {
            nextTick(() => {
              resetHorsesPosition();
              startRace();
            });
          } else {
            store.commit("setRaceFinished", true);
          }
          isAnimating.value = false;
        });
      }
    };

    const resetHorsesPosition = () => {
      const horses = document.querySelectorAll(".horse");
      horses.forEach((horse) => {
        gsap.set(horse, { x: 0 });
      });
    };

    const getEndPosition = () => {
      const raceTrack = document.querySelector(".race-track");
      const finishLine = document.querySelector(".finish-line");
      const startLine = document.querySelector(".start-line");

      if (raceTrack && finishLine && startLine) {
        const raceTrackRect = raceTrack.getBoundingClientRect();
        const finishLineRect = finishLine.getBoundingClientRect();
        const startLineRect = startLine.getBoundingClientRect();
        const endPosition = finishLineRect.left - raceTrackRect.left;
        const startLineEnd = startLineRect.right - raceTrackRect.left;

        const raceTrackWidth = raceTrackRect.width;

        console.log("Race Track Width:", raceTrackWidth);
        console.log("End Position:", endPosition);
        console.log("Start Line End Position:", startLineEnd);
        console.log(
          "Calculated End Position for Animations:",
          endPosition - startLineEnd
        );

        return endPosition - startLineEnd;
      }
      return 0;
    };

    const animateRun = (horses: Horse[], distance: number) => {
      return new Promise<number[]>((resolve) => {
        const finishTimes: number[] = [];
        timeline = gsap.timeline({
          onComplete: () => resolve(finishTimes),
        });

        const endPosition = getEndPosition();

        horses.forEach((horse, index) => {
          const duration = distance / (50 + Math.random() * 50);
          finishTimes.push(duration);

          timeline?.to(
            `.horse:nth-child(${index + 1})`,
            {
              duration,
              x: `${endPosition}px`,
              ease: "linear",
            },
            0
          );
        });
      });
    };

    const stopRace = () => {
      if (timeline) {
        timeline.pause();
        resetHorsesPosition();
        isAnimating.value = false;
      }
    };

    watch(
      () => store.state.race.running,
      (newValue) => {
        if (newValue) {
          startRace();
        } else {
          stopRace();
        }
      }
    );

    return { currentRun, currentRunIndex };
  },
});
</script>

<style scoped>
@import "./styles/RaceAnimation.scss";
</style>
