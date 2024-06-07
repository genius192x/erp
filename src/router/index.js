import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/pages/DashBoard.vue'

const routes = [
  {
    path: "/",
    component: HomeView,
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;