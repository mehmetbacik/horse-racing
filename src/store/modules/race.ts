import { Module } from "vuex";
import gsap from "gsap";

interface Horse {
  id: number;
  condition: number;
  color: string;
  finishTime?: number;
}

interface RaceState {
  horses: Horse[];
  schedule: any[];
  results: Horse[][];
  running: boolean;
  finished: boolean;
  paused: boolean;
  generated: boolean;
}

const colors = [
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
];

const state: RaceState = {
  horses: [],
  schedule: [],
  results: [],
  running: false,
  finished: false,
  paused: false,
  generated: false,
};

const getters = {
  horseList: (state: RaceState) => state.horses,
  raceSchedule: (state: RaceState) => state.schedule,
  raceResults: (state: RaceState) => state.results,
  isRaceRunning: (state: RaceState) => state.running,
  isRaceFinished: (state: RaceState) => state.finished,
  isRacePaused: (state: RaceState) => state.paused,
  isGenerated: (state: RaceState) => state.generated,
};

const actions = {
  generateHorses({ commit }: { commit: any }) {
    const horses: Horse[] = [];
    for (let i = 1; i <= 20; i++) {
      horses.push({
        id: i,
        condition: Math.floor(Math.random() * 100) + 1,
        color: colors[(i - 1) % colors.length],
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
    commit("setGenerated", true);
  },
  startRace({ commit, state }: { commit: any; state: RaceState }) {
    if (!state.generated) return;
    if (!state.running) {
      commit("setRunning", true);
      commit("setPaused", false);
    } else if (!state.paused) {
      commit("setPaused", true);
    } else {
      commit("setPaused", false);
    }
  },
  stopRace({ commit }: { commit: any }) {
    commit("setRunning", false);
    commit("setPaused", false);
  },
  resetRace({ commit }: { commit: any }) {
    commit("resetRaceState");
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
  setGenerated(state: RaceState, generated: boolean) {
    state.generated = generated;
  },
  addRunResultWithFinishTimes(
    state: RaceState,
    { runIndex, resultHorses }: { runIndex: number; resultHorses: Horse[] }
  ) {
    state.results[runIndex] = resultHorses.map((horse) => ({
      ...horse,
      finishTime: horse.finishTime,
    }));
  },
  resetRaceState(state: RaceState) {
    state.horses = [];
    state.schedule = [];
    state.results = [];
    state.running = false;
    state.finished = false;
    state.paused = false;
    state.generated = false;
  },
};

const race: Module<RaceState, any> = {
  state,
  getters,
  actions,
  mutations,
};

export default race;
