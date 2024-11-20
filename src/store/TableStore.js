import {
	defineStore
} from 'pinia'
import {
	ref
} from "vue";

export const useTableStore = defineStore('tableStore', () => {
	const table = ref()
	return {
		table
	}
})