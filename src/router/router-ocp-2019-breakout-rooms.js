import Vue from 'vue'
import VueRouter from 'vue-router'

import Screen from '../components/fntech/ocp/2019/global/breakout-rooms/screen.vue'

Vue.use(VueRouter)

export const $router = new VueRouter({ routes: [
    { path: '*', name: 'home', component: Screen }
]})
