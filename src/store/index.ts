import { createStore } from 'vuex';
import race from './modules/race';
import horses from './modules/horses';

export default createStore({
  modules: {
    race,
    horses
  }
});