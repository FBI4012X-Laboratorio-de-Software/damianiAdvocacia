import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Auth from '@/components/auth/Auth'
import Agenda from '@/components/pages/Agenda'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'agenda',
    path: '/agenda',
    component: Agenda
}]

export default new VueRouter({
    mode: 'history',
    routes
})

