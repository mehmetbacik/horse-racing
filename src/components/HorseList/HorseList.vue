<template>
  <div class="horse-list">
    <HorseItem v-for="horse in sortedHorses" :key="horse.id" :horse="horse" />
    <div v-if="sortedHorses.length === 0">No horses available.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import HorseItem from "./components/HorseItem.vue";

interface Horse {
  id: number;
  condition: number;
  color: string;
}

export default defineComponent({
  name: "HorseList",
  components: {
    HorseItem,
  },
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

<style scoped lang="scss">
@import './styles/HorseList.scss';
</style>
