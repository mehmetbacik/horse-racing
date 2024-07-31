<template>
  <div class="mx-4 my-8">
    <h2 class="text-2xl font-bold mb-2 bg-gray-800 text-white p-2 rounded">
      Program
    </h2>
    <div class="overflow-y-auto h-96">
      <div class="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div v-for="(run, index) in schedule" :key="index" class="mb-2">
          <h3 class="text-xl font-semibold mb-4 bg-gray-200 p-2 rounded">
            {{ run.distance }}m
          </h3>
          <RaceRunTable :horses="run.horses" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import RaceRunTable from "./components/RaceRunTable.vue";

export default defineComponent({
  name: "RaceSchedule",
  components: {
    RaceRunTable,
  },
  setup() {
    const store = useStore();
    const schedule = computed(() => store.getters["raceSchedule"]);
    return { schedule };
  },
});
</script>
