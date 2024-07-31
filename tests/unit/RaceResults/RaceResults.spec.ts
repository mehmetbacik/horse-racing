import { mount } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import RaceResults from "@/components/RaceResult/RaceResults.vue";
import ResultTable from "@/components/RaceResult/components/ResultTable.vue";

interface Horse {
  id: number;
  color: string;
  finishTime: number;
}

interface Run {
  horses: Horse[];
}

interface State {
  raceResults: Run[];
}

describe("RaceResults.vue", () => {
  let store: Store<State>;

  beforeEach(() => {
    store = createStore<State>({
      getters: {
        raceResults: () => [
          [
            { id: 1, color: "rgb(102, 255, 51);", finishTime: 60.12 },
            { id: 2, color: "rgb(102, 255, 52);", finishTime: 62.34 },
          ],
          [
            { id: 3, color: "rgb(102, 255, 53);", finishTime: 64.56 },
            { id: 4, color: "rgb(102, 255, 54);", finishTime: 66.78 },
          ],
        ],
      },
    });
  });

  it("renders the results correctly", () => {
    const wrapper = mount(RaceResults, {
      global: {
        plugins: [store],
      },
    });

    const headers = wrapper.findAll("h3");
    const distances = [1200, 1400, 1600, 1800, 2000, 2200];
    headers.forEach((header, index) => {
      expect(header.text()).toBe(`${distances[index]}m`);
    });

    const resultTables = wrapper.findAllComponents(ResultTable);
    expect(resultTables).toHaveLength(2);
  });

  it("sorts the results correctly", () => {
    const wrapper = mount(RaceResults, {
      global: {
        plugins: [store],
      },
    });

    const resultTables = wrapper.findAllComponents(ResultTable);
    const firstRun = resultTables[0];
    const horses = firstRun.props("horses") as Horse[];
    expect(horses[0].finishTime).toBeLessThan(horses[1].finishTime);
  });
});
