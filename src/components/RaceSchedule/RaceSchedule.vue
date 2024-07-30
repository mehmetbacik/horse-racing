<template>
    <div class="race-schedule">
      <h2>Program</h2>
      <div v-for="(run, index) in schedule" :key="index" class="run">
        <h3>{{ run.distance }}m</h3>
        <ul>
          <li v-for="horse in run.horses" :key="horse.id" :style="{ color: horse.color }">
            Horse {{ horse.id }} - Condition: {{ horse.condition }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    name: 'RaceSchedule',
    setup() {
      const store = useStore();
      const schedule = computed(() => store.getters['raceSchedule']);
      return { schedule };
    }
  });
  </script>
  
  <style scoped>
  .race-schedule {
    margin-top: 20px;
  }
  .run {
    margin-bottom: 10px;
  }
  </style>
  