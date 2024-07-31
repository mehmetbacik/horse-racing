<template>
  <div>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-800 text-white border-b">
          <th class="py-2 px-4 text-center">Position</th>
          <th class="py-2 px-4 text-center">Name</th>
          <th class="py-2 px-4 text-center">Finish Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(horse, position) in horses" :key="horse.id">
          <td class="py-2 px-4 border-b">{{ position + 1 }}</td>
          <td class="py-2 px-4 border-b" :style="{ color: horse.color }">
            Horse {{ horse.id }}
          </td>
          <td class="py-2 px-4 border-b">{{ horse.finishTime.toFixed(2) }}s</td>
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
  finishTime: number;
}

export default defineComponent({
  name: "ResultTable",
  props: {
    horses: {
      type: Array as PropType<Horse[]>,
      required: true,
    },
  },
});
</script>
