import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404NotFound',
      component:() => import('../views/404NotFound.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component:() => import('../views/About.vue'),      
    }
  ]
})

export default router
