import {
	defineStore
} from 'pinia'
import {
	ref
} from "vue";
import router from '@/router';
import {
	Client,
	Account,
	ID
} from "appwrite";
import {
	toast
} from 'vue-sonner'
import { useGlobalStore } from './GlobalStore';
import { useTableStore } from './TableStore';

export const useUserStore = defineStore('UserStore', () => {
	const userData = ref({
		name: '',
		email: '',
	})
	const isLoading = ref(false)

	const client = new Client()
		.setEndpoint('https://cloud.appwrite.io/v1')
		.setProject('67346ca300224abdf68b'); // Your project ID

	const account = new Account(client);


	async function getAccount() {
		console.log(useGlobalStore.isGlobalLoading);

		await account.get()
			.then(function (response) {
				userData.value = response
				useGlobalStore().isAuth = true
			})
			.finally(function () {
				// router.push('/')
				isLoading.value = false
				useTableStore().getDocument()
				hideLoader()
			})
			.catch(function (error) {
				console.log(error)
				router.push('/auth')
			})
	}


	async function createAccount(email, password, name) {
		isLoading.value = true
		await account.create(ID.unique(), email, password, name)
			.then(function (response) {
				authAccount(email, password)
			})
			.catch(function (error) {
				console.log(error)
			})
	};

	async function authAccount(email, password) {
		isLoading.value = true
		await account.createEmailPasswordSession(email, password)
			.then(function (response) {
				getAccount()
				useGlobalStore().isAuth = true
				router.push('/')
				hideLoader()
			})
			.catch(function (error) {
				console.log(error)
			})
	};

	async function logout() {
		await account.deleteSession('current')
			.then(function (response) {
				userData.value = {}
				useGlobalStore().isAuth = false
				router.push('/auth')
				useTableStore().table = []
				useTableStore().hasDocument = false
				useTableStore().stats = []
			})
			.catch(function (error) {
				console.log(error)
			})
	};
	function hideLoader() {
		setTimeout(() => {
			useGlobalStore().isGlobalLoading = false
		}, 300);
	}
	return {
		createAccount,
		authAccount,
		getAccount,
		isLoading,
		userData,
		logout
	}
})