<template>
  <div class="home">
    <header
      class="header sticky top-0 bg-gray-800 text-white p-4 flex justify-between items-center"
    >
      <RaceControls />
    </header>
    <main class="main-content">
      <div class="home-horse">
        <HorseList />
      </div>
      <div class="content-wrapper">
        <div class="left-area">
          <RaceSchedule />
        </div>
        <div class="center-area">
          <RaceAnimation />
        </div>
        <div class="right-area">
          <RaceResults />
        </div>
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

<style lang="scss">
@import "../assets/styles/styles.scss";
</style>
