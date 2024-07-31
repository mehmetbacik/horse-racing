<template>
  <div class="mx-4 my-8">
    <h2 class="text-2xl font-bold mb-2 bg-gray-800 text-white p-2 rounded">
      Results
    </h2>
    <div class="overflow-y-auto h-96">
      <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div v-for="(result, index) in sortedResults" :key="index" class="mb-2">
          <h3 class="text-xl font-semibold mb-4 bg-gray-200 p-2 rounded">
            {{ distances[index] }}m
          </h3>
          <ResultTable :horses="result" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import ResultTable from "./components/ResultTable.vue";

export default defineComponent({
  name: "RaceResults",
  components: {
    ResultTable,
  },
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
