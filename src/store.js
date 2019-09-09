import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import app from "./store/app"
import uplink from "./store/uplink"
import rxInfoDialog from "./store/rx-info-dialog"

Vue.use(Vuex)

const vuexSessionStorage = new VuexPersistence({
  storage: window.sessionStorage
})

export default new Vuex.Store({
  strict: true,
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules:{
    app,
    uplink,
    rxInfoDialog
  },
  plugins: [vuexSessionStorage.plugin]
})
