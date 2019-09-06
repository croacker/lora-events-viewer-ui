const state = {
  sidebar: {
    opened: false
  }
}

const mutations = {
  TOGGLE_SIDEBAR(state, opened){
    state.sidebar.opened = opened
  }
}

const actions = {
  toggleSidebar({commit}, opened){
    commit('TOGGLE_SIDEBAR', opened)
  }
}

export default {
  state, mutations, actions
}