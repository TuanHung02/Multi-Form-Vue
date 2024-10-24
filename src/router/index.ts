import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'profile',
      component: () => import('../components/ProfileForm.vue'),
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('../components/ExperienceForm.vue'),
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('../components/ConfirmForm.vue'),
    },
  ],
})

export default router
