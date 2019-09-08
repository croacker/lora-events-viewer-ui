const state = {
    rxInfoDialogOpened: false,
    rxInfoCurrent: ''
};

const mutations = {
    setRxInfoDialogVisible(state, opened){
        state.opened = opened
    },
    setRxInfoCurrent(state, rxInfoCurrent){
        state.rxInfoCurrent = rxInfoCurrent
    }
};

const actions = {
    showRxInfoDialog({commit}){
        commit('setRxInfoDialogVisible', true)
    },
    hideRxInfoDialog({commit}){
        commit('setRxInfoDialogVisible', false)
    }
};

const getters = {
    rxInfoDialogOpened(state){
        return state.rxInfoDialogOpened
    },
    rxInfoCurrent(state){
        return state.rxInfoCurrent
    },
}

export default {
    state, mutations, actions, getters
}