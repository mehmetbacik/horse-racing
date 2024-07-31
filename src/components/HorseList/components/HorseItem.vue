<template>
  <div
    :style="{ backgroundColor: horse.color }"
    class="flex items-center flex-col justify-center p-4"
  >
    <p class="text-white font-bold">Name: Horse {{ horse.id }}</p>
    <p class="text-white font-semibold">Condition: {{ horse.condition }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Horse {
  id: number;
  condition: number;
  color: string;
}

export default defineComponent({
  name: "HorseItem",
  props: {
    horse: {
      type: Object as PropType<Horse>,
      required: true,
    },
  },
});
</script>
