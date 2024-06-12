import { createRouter, createWebHashHistory } from 'vue-router'
import DashBoardView from '@/pages/DashBoard.vue'
import TasksView from '@/pages/Tasks.vue'

const routes = [
	{
		path: "/",
		component: DashBoardView,
	},
	{
		path: '/tasks',
		component: TasksView,
	}
];
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;