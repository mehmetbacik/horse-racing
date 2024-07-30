const state = {
  horses: [],
};

const mutations = {
  SET_HORSES(state: any, horses: any) {
    state.horses = horses;
  },
};

const actions = {
  generateHorses({ commit }: any) {
    const horses = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      condition: Math.floor(Math.random() * 100) + 1,
    }));
    commit("SET_HORSES", horses);
  },
};

const getters = {
  allHorses: (state: any) => state.horses,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
