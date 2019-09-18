import {ErrorDao} from '../service/dao/error-dao'

const state = {
    errors: [],
    error: null
};

const mutations = {
    FETCH_ERRORS(state, errors){
        state.errors = errors
    },
    FETCH_ERROR(state, error){
        state.error = error
    }
};

const actions = {
    async fetchErrors({commit}, filter){
        const dao = new ErrorDao();
        const result = dao.getItems(filter)
        commit('FETCH_ERRORS', result)
    },
    async fetchError({commit}, filter){
        const dao = new ErrorDao();
        const result = dao.getItem(filter)
        commit('FETCH_ERROR', result)
    }
};

const getters = {
  errors(state){
        return state.errors
    },
    error(state){
        return state.error
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}