import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import app from "./store/app"
import uplink from "./store/uplink-store"
import ack from "./store/ack-store"
import error from "./store/error-store"
import join from "./store/join-store"
import location from "./store/location-store"
import status from "./store/status-store"
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
    ack,
    error,
    join,
    location,
    status,
    uplink,
    rxInfoDialog
  },
  plugins: [vuexSessionStorage.plugin]
})
