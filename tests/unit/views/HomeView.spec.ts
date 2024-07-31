import { mount, VueWrapper } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import { createStore, Store } from "vuex";

const RaceControls = {
  name: "RaceControls",
  template: '<div class="race-controls">Race Controls</div>',
};
const HorseList = {
  name: "HorseList",
  template: '<div class="horse-list">Horse List</div>',
};
const RaceSchedule = {
  name: "RaceSchedule",
  template: '<div class="race-schedule">Race Schedule</div>',
};
const RaceAnimation = {
  name: "RaceAnimation",
  template: '<div class="race-animation">Race Animation</div>',
};
const RaceResults = {
  name: "RaceResults",
  template: '<div class="race-results">Race Results</div>',
};

describe("HomeView.vue", () => {
  let store: Store<any>;
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    store = createStore({
      state: {},
      getters: {},
      mutations: {},
      actions: {},
    });

    wrapper = mount(HomeView, {
      global: {
        plugins: [store],
        components: {
          RaceControls,
          HorseList,
          RaceSchedule,
          RaceAnimation,
          RaceResults,
        },
      },
    });
  });

  it("renders the header with RaceControls", () => {
    const header = wrapper.find("header");
    expect(header.exists()).toBe(true);

    const raceControls = wrapper.findComponent(RaceControls);
    expect(raceControls.exists()).toBe(true);
  });

  it("renders the main content areas", () => {
    const homeHorse = wrapper.find(".home-horse");
    const leftArea = wrapper.find(".left-area");
    const centerArea = wrapper.find(".center-area");
    const rightArea = wrapper.find(".right-area");

    expect(homeHorse.exists()).toBe(true);
    expect(leftArea.exists()).toBe(true);
    expect(centerArea.exists()).toBe(true);
    expect(rightArea.exists()).toBe(true);
  });

  it("renders HorseList, RaceSchedule, RaceAnimation, and RaceResults correctly", () => {
    const horseList = wrapper.findComponent(HorseList);
    const raceSchedule = wrapper.findComponent(RaceSchedule);
    const raceAnimation = wrapper.findComponent(RaceAnimation);
    const raceResults = wrapper.findComponent(RaceResults);

    expect(horseList.exists()).toBe(true);
    expect(raceSchedule.exists()).toBe(true);
    expect(raceAnimation.exists()).toBe(true);
    expect(raceResults.exists()).toBe(true);
  });
});
