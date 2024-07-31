<template>
  <button @click="handleClick" :disabled="isDisabled" class="btn-primary">
    Generate Program
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GenerateButton",
  props: {
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("click");
    };

    return { handleClick };
  },
});
</script>

<style scoped>
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white border-none cursor-pointer rounded-md;
}
.btn-primary:hover {
  @apply bg-blue-700;
}
.btn-primary:disabled {
  @apply bg-gray-400 cursor-not-allowed;
}
</style>
