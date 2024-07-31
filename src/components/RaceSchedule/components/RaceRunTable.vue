<template>
  <div>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-800 text-white border-b">
          <th class="py-2 px-4 text-center">Position</th>
          <th class="py-2 px-4 text-center">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(horse, index) in horses" :key="horse.id">
          <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
          <td class="py-2 px-4 border-b" :style="{ color: horse.color }">
            Horse {{ horse.id }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Horse {
  id: number;
  color: string;
}

export default defineComponent({
  name: "RaceRunTable",
  props: {
    horses: {
      type: Array as PropType<Horse[]>,
      required: true,
    },
  },
});
</script>
