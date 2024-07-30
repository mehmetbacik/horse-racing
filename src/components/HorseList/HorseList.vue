<template>
  <div class="horse-list">
    <div
      v-for="horse in horses"
      :key="horse.id"
      :style="{ backgroundColor: horse.color }"
    >
      Horse {{ horse.id }} - Condition: {{ horse.condition }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HorseList',
  setup() {
    const store = useStore();
    const horses = computed(() => store.getters['allHorses']);
    return { horses };
  }
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
