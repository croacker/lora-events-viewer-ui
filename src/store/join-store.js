import {JoinDao} from '../service/dao/join-dao'

const state = {
    joins: [],
    join: null
};

const mutations = {
    FETCH_JOINS(state, joins){
        state.joins = joins
    },
    FETCH_JOIN(state, join){
        state.join = join
    }
};

const actions = {
    async fetchJoins({commit}, filter){
        const dao = new JoinDao();
        const result = dao.getItems(filter)
        commit('FETCH_JOINS', result)
    },
    async fetchJoin({commit}, filter){
        const dao = new JoinDao();
        const result = dao.getItem(filter)
        commit('FETCH_JOIN', result)
    }
};

const getters = {
  joins(state){
        return state.joins
    },
    join(state){
        return state.join
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}