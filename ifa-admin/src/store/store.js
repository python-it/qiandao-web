import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);

import Global_M from './modules/global.js'

const store = new Vuex.Store({
    state: {
       
    },
    mutations: {
      
    },
    getters: {
        
    },
    actions: {
        
    },
    modules: {
        _global: Global_M
    },
    plugins: [createPersistedState({key: "PERSIST"})]
})

export default store