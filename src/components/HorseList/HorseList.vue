<template>
  <div class="horse-list">
    <div
      v-for="horse in sortedHorses"
      :key="horse.id"
      :style="{ backgroundColor: horse.color }"
    >
      Horse {{ horse.id }} - Condition: {{ horse.condition }}
    </div>
    <div v-if="sortedHorses.length === 0">No horses available.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

interface Horse {
  id: number;
  condition: number;
  color: string;
}

export default defineComponent({
  name: "HorseList",
  setup() {
    const store = useStore();
    const horses = computed(() => store.getters.horseList);

    const sortedHorses = computed(() => {
      return horses.value.slice().sort((a: Horse, b: Horse) => a.id - b.id);
    });

    return { sortedHorses };
  },
});
</script>

<style scoped>
.horse-list {
  display: flex;
  flex-wrap: wrap;
}
.horse-list div {
  margin: 5px;
  padding: 10px;
  border: 1px solid #000;
}
</style>
