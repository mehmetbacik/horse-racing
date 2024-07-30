import { Module } from "vuex";

interface Horse {
  id: number;
  condition: number;
  color: string;
}

interface RaceState {
  horses: Horse[];
  schedule: any[];
  results: any[];
  running: boolean;
  finished: boolean;
  paused: boolean;
}

const state: RaceState = {
  horses: [],
  schedule: [],
  results: [],
  running: false,
  finished: false,
  paused: false,
};

const getters = {
  horseList: (state: RaceState) => state.horses,
  raceSchedule: (state: RaceState) => state.schedule,
  raceResults: (state: RaceState) => state.results,
  isRaceRunning: (state: RaceState) => state.running,
  isRaceFinished: (state: RaceState) => state.finished,
  isRacePaused: (state: RaceState) => state.paused,
};

const actions = {
  generateHorses({ commit }: { commit: any }) {
    const horses: Horse[] = [];
    for (let i = 1; i <= 20; i++) {
      horses.push({
        id: i,
        condition: Math.floor(Math.random() * 100) + 1,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      });
    }
    commit("setHorses", horses);
  },
  generateSchedule({ commit, state }: { commit: any; state: RaceState }) {
    const schedule: any[] = [];
    const distances = [1200, 1400, 1600, 1800, 2000, 2200];
    for (let i = 0; i < 6; i++) {
      const selectedHorses = state.horses
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);
      schedule.push({
        distance: distances[i],
        horses: selectedHorses,
      });
    }
    commit("setSchedule", schedule);
  },
  startRace({ commit, state }: { commit: any; state: RaceState }) {
    if (!state.running) {
      commit("setRunning", true);
      commit("setPaused", false);
    } else if (!state.paused) {
      commit("setPaused", true);
    } else {
      commit("setPaused", false);
    }
  },
};

const mutations = {
  setHorses(state: RaceState, horses: Horse[]) {
    state.horses = horses;
  },
  setSchedule(state: RaceState, schedule: any[]) {
    state.schedule = schedule;
  },
  addRunResult(
    state: RaceState,
    { runIndex, horses }: { runIndex: number; horses: Horse[] }
  ) {
    state.results[runIndex] = horses;
  },
  setRunning(state: RaceState, running: boolean) {
    state.running = running;
  },
  setRaceFinished(state: RaceState, finished: boolean) {
    state.finished = finished;
  },
  setPaused(state: RaceState, paused: boolean) {
    state.paused = paused;
  },
};

const race: Module<RaceState, any> = {
  state,
  getters,
  actions,
  mutations,
};

export default race;
