import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Dome.vue'),
    meta: {
      title: '社区列表'
    }
  },
  {
    path: '/dome2',
    component: () => import('../views/Dome2.vue'),
    meta: {
      title: 'Dome2'
    }
  },
  {
    path: '/dome3',
    component: () => import('../views/Dome3.vue'),
    meta: {
      title: 'Dome3'
    }
  },
  {
    path: '/dome4',
    component: () => import('../views/Dome4.vue'),
    meta: {
      title: 'Dome4'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})


export default router
