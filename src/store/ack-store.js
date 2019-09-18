import {AckDao} from '../service/dao/ack-dao'

const state = {
    acks: [],
    ack: null
};

const mutations = {
    FETCH_ACKS(state, acks){
        state.acks = acks
    },
    FETCH_ACK(state, ack){
        state.ack = ack
    }
};

const actions = {
    async fetchAcks({commit}, filter){
        const dao = new AckDao();
        const result = dao.getItems(filter)
        commit('FETCH_ACKS', result)
    },
    async fetchAck({commit}, filter){
        const dao = new AckDao();
        const result = dao.getItem(filter)
        commit('FETCH_ACK', result)
    }
};

const getters = {
    acks(state){
        return state.acks
    },
    ack(state){
        return state.ack
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}