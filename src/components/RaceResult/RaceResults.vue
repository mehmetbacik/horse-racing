<template>
  <div class="race-results">
    <h2>Results</h2>
    <div v-for="(result, index) in sortedResults" :key="index" class="result">
      <h3>{{ distances[index] }}m</h3>
      <ul>
        <li
          v-for="(horse, position) in result"
          :key="horse.id"
          :style="{ color: horse.color }"
        >
          Position: {{ position + 1 }} - Horse {{ horse.id }} - Condition:
          {{ horse.condition }} - Finish Time: {{ horse.finishTime.toFixed(2) }}s
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "RaceResults",
  setup() {
    const store = useStore();
    const results = computed(() => store.getters["raceResults"]);
    const distances = [1200, 1400, 1600, 1800, 2000, 2200];

    const sortedResults = computed(() =>
      results.value.map((run: any) =>
        [...run].sort((a, b) => a.finishTime - b.finishTime)
      )
    );

    return { sortedResults, distances };
  },
});
</script>

<style scoped>
.race-results {
  margin-top: 20px;
}
.result {
  margin-bottom: 10px;
}
</style>
