import {LocationDao} from '../service/dao/location-dao'

const state = {
  locations: [],
  location: null
};

const mutations = {
    FETCH_LOCATIONS(state, locations){
        state.locations = locations
    },
    FETCH_LOCATION(state, location){
        state.location = location
    }
};

const actions = {
    async fetchLocations({commit}, filter){
        const dao = new LocationDao();
        const result = dao.getItems(filter)
        commit('FETCH_LOCATIONS', result)
    },
    async fetchLocation({commit}, filter){
        const dao = new LocationDao();
        const result = dao.getItem(filter)
        commit('FETCH_LOCATION', result)
    }
};

const getters = {
  locations(state){
        return state.locations
    },
    location(state){
        return state.location
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}