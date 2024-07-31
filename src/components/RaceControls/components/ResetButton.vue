<template>
  <button @click="handleClick" class="btn-primary bg-red-500 hover:bg-red-700">
    Reset
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResetButton",
  emits: ["click"],
  setup(_, { emit }) {
    const handleClick = () => {
      emit("click");
    };

    return { handleClick };
  },
});
</script>

<style scoped>
.btn-primary {
  @apply px-4 py-2 text-white border-none cursor-pointer rounded-md;
}
.btn-primary:hover {
  @apply bg-red-700;
}
</style>
