import Vue from 'vue'
import Router from 'vue-router'
import AckJournal from './views/AckJournal.vue'
import ErrorsJournal from './views/ErrorsJournal.vue'
import JoinJournal from './views/JoinJournal.vue'
import LocationJournal from './views/LocationJournal.vue'
import StatusJournal from './views/StatusJournal.vue'
import UplinkJournal from './views/UplinkJournal.vue'
import Lw360hrJournal from './views/Lw360hrJournal.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'uplink',
      component: UplinkJournal
    },
    {
      path: '/lw360hr',
      name: 'lw360hr',
      component: Lw360hrJournal
    },
    {
      path: '/ack',
      name: 'ack',
      component: AckJournal
    },
    {
      path: '/errors',
      name: 'errors',
      component: ErrorsJournal
    },
    {
      path: '/join',
      name: 'join',
      component: JoinJournal
    },
    {
      path: '/location',
      name: 'location',
      component: LocationJournal
    },
    {
      path: '/status',
      name: 'status',
      component: StatusJournal
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
