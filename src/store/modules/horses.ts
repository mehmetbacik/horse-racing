import { Module } from "vuex";

export interface Horse {
  id: number;
  condition: number;
  color: string;
}

const state = {
  horses: [] as Horse[],
  colors: [
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
  ],
};

const mutations = {
  SET_HORSES(state: any, horses: Horse[]) {
    state.horses = horses;
  },
};

const actions = {
  generateHorses({ commit, state }: any) {
    const horses = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      color: state.colors[i % state.colors.length],
      condition: Math.floor(Math.random() * 100) + 1,
    }));
    commit("SET_HORSES", horses);
  },
};

const getters = {
  allHorses: (state: any) => state.horses,
  colors: (state: any) => state.colors,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
