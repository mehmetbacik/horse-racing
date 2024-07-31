<template>
  <div
    class="grid gap-5 p-5 md:p-5 lg:p-7.5 h-[400px] overflow-x-auto lg:overflow-visible grid-cols-3 md:grid-cols-5 lg:grid-cols-10"
  >
    <HorseItem
      v-for="horse in sortedHorses"
      :key="horse.id"
      :horse="horse"
      class="rounded-md transition-transform duration-300"
    />
    <div v-if="sortedHorses.length === 0" class="col-span-full text-center">
      No horses available.
    </div>
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
@import "./styles/HorseList.scss";
</style>
