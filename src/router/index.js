import { createRouter, createWebHashHistory } from 'vue-router'
import { useGlobalStore } from '@/store/GlobalStore'
import { storeToRefs } from 'pinia'
import DashBoardView from '@/pages/DashBoard.vue'
import TasksView from '@/pages/Tasks.vue'
import SettingAccount from "@/pages/settings/SettingAccount.vue"
import SettingAppearance from "@/pages/settings/SettingAppearance.vue"
import SettingDisplay from "@/pages/settings/SettingDisplay.vue"
import SettingNotifications from "@/pages/settings/SettingNotifications.vue"
import Authorization from '@/pages/Authorization.vue'
import Registration from '@/pages/Registration.vue'

const routes = [
	{
		path: "/",
		component: DashBoardView,
	},
	{
		path: "/auth",
		name:"auth",
		component: Authorization,
	},
	{
		path: "/registration",
		name: "registration",
		component: Registration,
	},
	{
		path: '/tasks',
		component: TasksView,
	},
	{
		path: '/settings',
		component: SettingAccount,
	},{
		path: '/settings/appearance',
		component: SettingAppearance,
	},{
		path: '/settings/display',
		component: SettingDisplay,
	},{
		path: '/settings/notifications',
		component: SettingNotifications,
	},

];
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
// router.beforeEach(async (to, from) => {
// 	const globalStore = useGlobalStore()
// 	if (
// 		// make sure the user is authenticated
// 		!globalStore.isAuth &&
// 		// ❗️ Avoid an infinite redirect
// 		to.name !== 'auth' &&
// 		to.name !== 'registration'
// 	) {
// 		// redirect the user to the login page
// 		return {
// 			name: 'auth'
// 		}
// 	} else {
// 	}
// })

export default router;