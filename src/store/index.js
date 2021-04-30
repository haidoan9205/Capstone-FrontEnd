import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';
// import VuexPersist from 'vuex-persist';

// const vuexLocalStorage = new VuexPersist({
//     key: 'vuex',
//     storage: window.localStorage,
//   })
  


//   Vue.use(VuexPersist);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})