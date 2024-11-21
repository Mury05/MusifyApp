import { createRouter, createWebHistory } from 'vue-router'
import Connexion from './components/Musify/Connexion.vue'
import Home from './components/Musify/Home.vue'
import ErrorView from './views/ErrorView.vue'
import { getUser } from './utils'

const routes = [
  {
    path: '/',
    component: Connexion,
    name: 'Login'
  },
  {
    path: '/login',
    component: Connexion,
    // name: 'Login'
  },
  {
    path: '/home/',
    component: Home,
    meta: { require: true }
  },
  {
    path: '/home/albums',
    component: Home,
    meta: { require: true }
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const user = () => (getUser() ? getUser() : { isAuthenticated: false })

// GOOD
router.beforeEach(async (to, from, next) => {
  if (to.meta.require && to.name !== 'Login' && !user().isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
