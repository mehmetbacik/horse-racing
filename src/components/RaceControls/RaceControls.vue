<template>
  <div
    class="race-controls flex flex-row justify-between items-center w-full"
  >
    <div>
      <h1 class="font-bold">Horse Racing</h1>
    </div>
    <div class="relative">
      <button
        @click="toggleDropdown"
        class="md:hidden p-2 bg-gray-800 text-white rounded-lg"
      >
        Buttons
      </button>
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10"
      >
        <GenerateButton
          :isDisabled="isRunning || isGenerated"
          @click="generateProgram"
          class="block px-4 py-2 w-full my-2 text-gray-800 hover:bg-gray-200"
        />
        <ToggleRaceButton
          :isRunning="isRunning"
          :isGenerated="isGenerated"
          @click="toggleRace"
          class="block px-4 py-2 w-full my-2 text-gray-800 hover:bg-gray-200"
        />
        <ResetButton
          @click="resetRace"
          class="block px-4 py-2 w-full my-2 text-gray-800 hover:bg-gray-200"
        />
      </div>
      <div class="hidden md:flex gap-2 items-center">
        <GenerateButton
          :isDisabled="isRunning || isGenerated"
          @click="generateProgram"
        />
        <ToggleRaceButton
          :isRunning="isRunning"
          :isGenerated="isGenerated"
          @click="toggleRace"
        />
        <ResetButton @click="resetRace" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import GenerateButton from "./components/GenerateButton.vue";
import ToggleRaceButton from "./components/ToggleRaceButton.vue";
import ResetButton from "./components/ResetButton.vue";

export default defineComponent({
  name: "RaceControls",
  components: {
    GenerateButton,
    ToggleRaceButton,
    ResetButton,
  },
  setup() {
    const store = useStore();
    const isRunning = computed(() => store.getters.isRaceRunning);
    const isGenerated = computed(() => store.getters.isGenerated);
    const dropdownOpen = ref(false);

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const generateProgram = () => {
      store.dispatch("generateHorses");
      store.dispatch("generateSchedule");
      dropdownOpen.value = false;
    };

    const toggleRace = () => {
      if (isRunning.value) {
        store.dispatch("stopRace");
      } else {
        store.dispatch("startRace");
      }
      dropdownOpen.value = false;
    };

    const resetRace = () => {
      store.dispatch("resetRace");
      dropdownOpen.value = false;
    };

    return {
      generateProgram,
      toggleRace,
      resetRace,
      isRunning,
      isGenerated,
      dropdownOpen,
      toggleDropdown,
    };
  },
});
</script>