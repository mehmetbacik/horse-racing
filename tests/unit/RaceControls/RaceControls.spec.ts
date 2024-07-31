import { mount } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import RaceControls from "@/components/RaceControls/RaceControls.vue";
import GenerateButton from "@/components/RaceControls/components/GenerateButton.vue";
import ToggleRaceButton from "@/components/RaceControls/components/ToggleRaceButton.vue";
import ResetButton from "@/components/RaceControls/components/ResetButton.vue";

describe("RaceControls.vue", () => {
  let store: Store<any>;

  beforeEach(() => {
    store = createStore({
      state: {
        isRunning: false,
        isGenerated: false,
      },
      getters: {
        isRaceRunning: (state) => state.isRunning,
        isGenerated: (state) => state.isGenerated,
      },
      actions: {
        generateHorses: jest.fn(),
        generateSchedule: jest.fn(),
        startRace: jest.fn(),
        stopRace: jest.fn(),
        resetRace: jest.fn(),
      },
    });
  });

  it("renders buttons and dropdown menu", async () => {
    const wrapper = mount(RaceControls, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.findComponent(GenerateButton).exists()).toBe(true);
    expect(wrapper.findComponent(ToggleRaceButton).exists()).toBe(true);
    expect(wrapper.findComponent(ResetButton).exists()).toBe(true);

    const dropdownButton = wrapper.find("button");
    expect(dropdownButton.text()).toBe("Buttons");
  });

  it("opens and closes the dropdown menu", async () => {
    const wrapper = mount(RaceControls, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find("div.absolute").exists()).toBe(false);

    await wrapper.find("button").trigger("click");
    expect(wrapper.find("div.absolute").exists()).toBe(true);

    await wrapper.find("button").trigger("click");
    expect(wrapper.find("div.absolute").exists()).toBe(false);
  });

  it("calls store actions when buttons are clicked", async () => {
    const wrapper = mount(RaceControls, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find("button").trigger("click");
    await wrapper.findComponent(GenerateButton).trigger("click");
    await wrapper.findComponent(ToggleRaceButton).trigger("click");
    await wrapper.findComponent(ResetButton).trigger("click");
  });

  it("disables GenerateButton when isRunning or isGenerated is true", async () => {
    store.state.isRunning = true;
    store.state.isGenerated = true;
    const wrapper = mount(RaceControls, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find("button").trigger("click");

    const generateButton = wrapper.findComponent(GenerateButton);
    expect(generateButton.props("isDisabled")).toBe(true);
  });

  it("enables GenerateButton when isRunning and isGenerated are false", async () => {
    store.state.isRunning = false;
    store.state.isGenerated = false;
    const wrapper = mount(RaceControls, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.find("button").trigger("click");

    const generateButton = wrapper.findComponent(GenerateButton);
    expect(generateButton.props("isDisabled")).toBe(false);
  });
});
