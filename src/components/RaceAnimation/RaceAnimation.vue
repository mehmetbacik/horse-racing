<template>
  <div class="race-animation">
    <h2>Race</h2>
    <div v-if="currentRun" class="race-info">
      <h3>{{ currentRun.distance }}m</h3>
      <p>Round: {{ currentRunIndex + 1 }} / 6</p>
    </div>
    <div class="race-track">
      <div
        v-for="horse in currentRun?.horses || []"
        :key="horse.id"
        class="horse"
        :style="{ backgroundColor: horse.color }"
      >
        Horse {{ horse.id }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import gsap from "gsap";

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
            startRace();
          } else {
            store.commit("setRaceFinished", true);
          }
        });
      }
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
              duration: distance / 100,
              x: "100%",
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #000;
  padding: 10px;
}
.horse {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>
