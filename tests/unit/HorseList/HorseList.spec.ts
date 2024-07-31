import { mount, flushPromises } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import HorseList from "@/components/HorseList/HorseList.vue";
import HorseItem from "@/components/HorseList/components/HorseItem.vue";

interface Horse {
  id: number;
  condition: number;
  color: string;
}

interface State {
  horses: Horse[];
}

describe("HorseList.vue", () => {
  let store: Store<State>;

  beforeEach(() => {
    const state: State = {
      horses: [
        { id: 2, condition: 90, color: "#33FF57" },
        { id: 1, condition: 70, color: "#FF5733" },
      ],
    };

    store = createStore({
      state,
      getters: {
        horseList: (state: State) => state.horses,
      },
    });
  });

  it("renders a list of horses sorted by id", async () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    await flushPromises();

    const horseItems = wrapper.findAllComponents(HorseItem);
    expect(horseItems.length).toBe(2);
    expect(horseItems[0].text()).toContain("Horse 1 - Condition: 70");
    expect(horseItems[1].text()).toContain("Horse 2 - Condition: 90");
  });

  it("shows a message when there are no horses", async () => {
    store.state.horses = [];
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain("No horses available.");
  });
});
