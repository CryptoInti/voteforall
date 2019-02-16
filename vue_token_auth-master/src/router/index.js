import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import auth from './auth'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Question from '../components/Question.js'

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Question, beforeEnter: requireAuth },
    { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
    { path: '/question', component: Question, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
}
  ]
})
