import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import DreamInterpreter from "@/components/DreamInterpreter"
import Square from "@/components/Square"

const routes = [
    { path: '', redirect: 'ask' },
    { path: '/ask', component: DreamInterpreter },
    { path: '/square', component: Square }
]

const router = new VueRouter({ routes })
export default router