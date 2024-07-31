<template>
  <div :style="{ backgroundColor: horse.color }" class="horse-item">
    Horse {{ horse.id }} - Condition: {{ horse.condition }}
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