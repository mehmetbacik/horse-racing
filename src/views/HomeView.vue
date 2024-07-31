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
.home {
  display: flex;
  flex-direction: column;

  .header {
    z-index: 10;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .home-horse {
      padding: 16px;
    }

    .content-wrapper {
      flex: 1;
      display: flex;
      flex-direction: row;
      padding: 16px;
      gap: 16px;
      @media (max-width: 768px) {
        flex-direction: column;
      }

      .left-area,
      .right-area {
        flex: 1;
        min-width: 200px;
      }

      .center-area {
        flex: 1;
        min-width: 300px;
      }
    }
  }

  @media (max-width: 768px) {

    .center-area {
      order: 1;
    }

    .left-area {
      order: 2;
    }

    .right-area {
      order: 3;
    }
  }
}
</style>
