<template>
  <div class="home flex flex-col h-screen">
    <header
      class="header bg-gray-800 text-white p-4 flex justify-between items-center"
    >
      <RaceControls />
    </header>
    <main class="main-content flex flex-grow p-4">
      <div class="left-area flex-1">
        <HorseList />
      </div>
      <div class="center-area flex-2 mx-4">
        <RaceAnimation />
      </div>
      <div class="right-area flex-1">
        <RaceSchedule />
        <RaceResults />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HorseList from "@/components/HorseList/HorseList.vue";
import RaceControls from "@/components/RaceControls/RaceControls.vue";
import RaceSchedule from "@/components/RaceSchedule/RaceSchedule.vue";
import RaceAnimation from "@/components/RaceAnimation/RaceAnimation.vue";
import RaceResults from "@/components/RaceResult/RaceResults.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    HorseList,
    RaceControls,
    RaceSchedule,
    RaceAnimation,
    RaceResults,
  },
});
</script>

<style scoped lang="scss">
.home {
  .header {
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-content {
    display: flex;
    flex-grow: 1;
    padding: 1rem;
    overflow: auto;
    .left-area {
      @media (min-width: 640px) {
        max-width: 20%;
      }
    }
    .center-area {
      @media (min-width: 640px) {
        max-width: 60%;
      }
    }
    .right-area {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      @media (min-width: 640px) {
        max-width: 20%;
      }
    }
  }
}
</style>
