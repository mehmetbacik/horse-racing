<template>
  <div class="race-controls">
    <button @click="generateProgram" :disabled="isRunning || isGenerated">Generate Program</button>
    <button @click="toggleRace" :disabled="!isGenerated">
      {{ isRunning ? "Stop" : "Start" }}
    </button>
    <button @click="resetRace">Reset</button>
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
    const isGenerated = computed(() => store.getters.isGenerated);

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

    const resetRace = () => {
      store.dispatch("resetRace");
    };

    return { generateProgram, toggleRace, resetRace, isRunning, isGenerated };
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
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
