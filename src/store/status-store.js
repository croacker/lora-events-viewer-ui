import {StatusDao} from '../service/dao/status-dao'

const state = {
  statuses: [],
  status: null
};

const mutations = {
    FETCH_STATUSES(state, statuses){
        state.statuses = statuses
    },
    FETCH_STATUS(state, status){
        state.status = status
    }
};

const actions = {
    async fetchStatuses({commit}, filter){
        const dao = new StatusDao();
        const result = dao.getItems(filter)
        commit('FETCH_STATUSES', result)
    },
    async fetchStatus({commit}, filter){
        const dao = new StatusDao();
        const result = dao.getItem(filter)
        commit('FETCH_STATUS', result)
    }
};

const getters = {
    statuses(state){
        return state.statuses
    },
    status(state){
        return state.status
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}