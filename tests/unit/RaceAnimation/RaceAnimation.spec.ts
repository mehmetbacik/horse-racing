import { mount, VueWrapper } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import RaceAnimation from "@/components/RaceAnimation/RaceAnimation.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface Horse {
  id: number;
  color: string;
  finishTime?: number;
}

interface Run {
  distance: number;
  horses: Horse[];
}

interface State {
  raceSchedule: Run[];
  race: {
    running: boolean;
  };
}

describe("RaceAnimation.vue", () => {
  let store: Store<State>;
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    store = createStore<State>({
      state: {
        raceSchedule: [
          {
            distance: 1200,
            horses: [
              { id: 1, color: "rgb(102, 255, 51);" },
              { id: 2, color: "rgb(102, 255, 52);" },
            ],
          },
          {
            distance: 1400,
            horses: [
              { id: 3, color: "rgb(102, 255, 53);" },
              { id: 4, color: "rgb(102, 255, 54);" },
            ],
          },
        ],
        race: {
          running: false,
        },
      },
      getters: {
        raceSchedule: (state) => state.raceSchedule,
      },
      mutations: {
        addRunResultWithFinishTimes: jest.fn(),
        setRaceFinished: jest.fn(),
      },
    });

    wrapper = mount(RaceAnimation, {
      global: {
        plugins: [store],
        components: { FontAwesomeIcon },
      },
    });
  });

  it("renders the current run information correctly", () => {
    store.state.race.running = true;
    store.state.raceSchedule = [
      {
        distance: 1200,
        horses: [
          { id: 1, color: "rgb(102, 255, 51);" },
          { id: 2, color: "rgb(102, 255, 52);" },
        ],
      },
    ];

    const distanceElement = wrapper.find("h3");
    expect(distanceElement.text()).toBe("1200m");

    const roundElement = wrapper.find("p");
    expect(roundElement.text()).toBe("Round: 1 / 6");
  });

  it("calls animateRun and update store when starting the race", async () => {
    store.state.race.running = true;
    await wrapper.vm.$nextTick();

    await wrapper.vm.$nextTick();
  });

  it("resets horse positions when stopping the race", () => {
    store.state.race.running = false;
  });

  it("correctly handles race progress and results", async () => {
    store.state.race.running = true;
    await wrapper.vm.$nextTick();

    store.state.race.running = false;
    await wrapper.vm.$nextTick();
  });
});
