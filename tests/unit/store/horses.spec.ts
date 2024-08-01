import { createStore, Store } from "vuex";
import raceModule, { Horse } from "@/store/modules/horses";

describe("race Vuex module", () => {
  let store: Store<any>;

  beforeEach(() => {
    store = createStore({
      modules: {
        race: {
          state: raceModule.state,
          getters: raceModule.getters,
          actions: raceModule.actions,
          mutations: raceModule.mutations,
          namespaced: true,
        },
      },
    });
  });

  test("initial state", () => {
    expect(store.state.race.horses).toEqual([]);
    expect(store.state.race.colors).toEqual([
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F0F033",
      "#FF33A1",
      "#33FFF0",
      "#FF8333",
      "#33FF83",
      "#8333FF",
      "#F0F0F0",
      "#FF3366",
      "#66FF33",
      "#33FF99",
      "#9966FF",
      "#FF9933",
      "#33CCFF",
      "#FFCC33",
      "#33FFCC",
      "#CC33FF",
      "#FF6633",
    ]);
  });

  test("generateHorses action", async () => {
    await store.dispatch("race/generateHorses");
    expect(store.state.race.horses.length).toBe(20);
    store.state.race.horses.forEach((horse: Horse, index: number) => {
      expect(horse).toHaveProperty("id", index + 1);
      expect(horse).toHaveProperty(
        "color",
        store.state.race.colors[index % store.state.race.colors.length]
      );
      expect(horse.condition).toBeGreaterThanOrEqual(1);
      expect(horse.condition).toBeLessThanOrEqual(100);
    });
  });

  test("allHorses getter", () => {
    store.commit("race/SET_HORSES", [
      { id: 1, color: "#FF5733", condition: 75 },
      { id: 2, color: "#33FF57", condition: 50 },
    ]);
    expect(store.getters["race/allHorses"]).toEqual([
      { id: 1, color: "#FF5733", condition: 75 },
      { id: 2, color: "#33FF57", condition: 50 },
    ]);
  });

  test("colors getter", () => {
    expect(store.getters["race/colors"]).toEqual(store.state.race.colors);
  });
});
