import Vue from 'vue'
import Vuex from 'vuex'
import app from "./store/app"
import uplink from "./store/uplink"
import rxInfoDialog from "./store/rx-info-dialog"

Vue.use(Vuex)

export default new Vuex.Store({
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
  }
})
