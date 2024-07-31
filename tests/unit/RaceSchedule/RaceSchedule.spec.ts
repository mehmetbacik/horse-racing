import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import RaceSchedule from "@/components/RaceSchedule/RaceSchedule.vue";
import RaceRunTable from "@/components/RaceSchedule/components/RaceRunTable.vue";

const schedule = [
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
];

const store = createStore({
  getters: {
    raceSchedule: () => schedule,
  },
});

describe("RaceSchedule.vue", () => {
  it("renders schedule with correct data", () => {
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store],
      },
    });

    const runHeaders = wrapper.findAll("h3");
    expect(runHeaders).toHaveLength(schedule.length);

    runHeaders.forEach((header, index) => {
      expect(header.text()).toBe(`${schedule[index].distance}m`);
    });

    const raceRunTables = wrapper.findAllComponents(RaceRunTable);
    expect(raceRunTables).toHaveLength(schedule.length);

    raceRunTables.forEach((table, index) => {
      expect(table.props("horses")).toEqual(schedule[index].horses);
    });
  });

  it("renders the Program header", () => {
    const wrapper = mount(RaceSchedule, {
      global: {
        plugins: [store],
      },
    });

    const header = wrapper.find("h2");
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe("Program");
  });
});
