<template>
  <div class="race-animation">
    <h2>Race</h2>
    <div v-if="currentRun" class="race-info">
      <h3>{{ currentRun.distance }}m</h3>
      <p>Round: {{ currentRunIndex + 1 }} / 6</p>
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
      <div class="finish-line">
        <font-awesome-icon icon="flag-checkered" />
      </div>
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

    const startRace = () => {
      const run = currentRun.value;
      if (run) {
        animateRun(run.horses, run.distance).then(() => {
          store.commit("addRunResult", {
            runIndex: currentRunIndex.value,
            horses: run.horses,
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
        });
      }
    };

    const resetHorsesPosition = () => {
      const horses = document.querySelectorAll(".horse");
      horses.forEach((horse) => {
        gsap.set(horse, { x: 0 });
      });
    };

    const animateRun = (horses: Horse[], distance: number) => {
      return new Promise<void>((resolve) => {
        const timeline = gsap.timeline({
          onComplete: resolve,
        });
        horses.forEach((horse, index) => {
          timeline.to(
            `.horse:nth-child(${index + 1})`,
            {
              duration: distance / (50 + Math.random() * 50),
              x: "500px",
              ease: "linear",
            },
            0
          );
        });
      });
    };

    watch(
      () => store.state.race.running,
      (newValue) => {
        if (newValue) {
          startRace();
        }
      }
    );

    return { currentRun, currentRunIndex };
  },
});
</script>

<style scoped>
.race-animation {
  margin-top: 20px;
}
.race-info {
  margin-bottom: 10px;
}
.race-track {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 10px;
  border: 1px solid #000;
  padding: 10px;
  width: 700px;
  position: relative;
}
.start-line,
.finish-line {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.finish-line {
  border-right: 2px solid black;
  height: 100%;
  margin-right: 25px;
}
.race-line {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.horse {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  position: relative;
}
</style>
