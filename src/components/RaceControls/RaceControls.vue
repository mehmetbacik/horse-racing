<template>
  <div class="race-controls">
    <button @click="generateProgram">Generate Program</button>
    <button @click="toggleRace">
      {{ isRunning ? "Stop" : "Start" }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "RaceControls",
  setup() {
    const store = useStore();
    const isRunning = computed(() => store.getters.isRaceRunning);

    const generateProgram = () => {
      store.dispatch("generateHorses");
      store.dispatch("generateSchedule");
    };

    const toggleRace = () => {
      if (isRunning.value) {
        store.dispatch("stopRace");
      } else {
        store.dispatch("startRace");
      }
    };

    return { generateProgram, toggleRace, isRunning };
  },
});
</script>

<style scoped>
.race-controls {
  display: flex;
  gap: 10px;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
