const state = {
    uplinks: [],
    uplink: null
};

const mutations = {
    FETCH_UPLINKS(state, uplinks){
        state.uplinks = uplinks
    },
    FETCH_UPLINK(state, uplink){
        state.uplink = uplink
    }
};

const actions = {
    async fetchUplinks({commit}, filter){

    },
    async fetchUplink({commit}, filter){
        
    }
};

const getters = {
    uplinks(state){
        return state.uplinks
    },
    uplink(state){
        return state.uplinks
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}