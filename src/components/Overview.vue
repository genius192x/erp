<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useTableStore } from '@/store/TableStore';
import { computed, ref } from 'vue';

const tableStore = useTableStore()

const data = computed(() => {
	const result = ref([])
	tableStore.stats.forEach(month => {
		result.value.push({
			name: month.name,
			'Доход': month.totalIncomes,
			'Расход': month.totalExpenses
		})
	})

	return result.value
})

// const data =
// [
// 	{
// 		name: 'Январь',
// 		'Доход': Math.floor(Math.random() * 5000) + 1000,
// 		'Расход': Math.floor(Math.random() * 5000) + 1000
// 	},
// 	{
// 		name: 'Февраль',
// 		'Доход': Math.floor(Math.random() * 5000) + 1000,
// 		'Расход': Math.floor(Math.random() * 5000) + 1000
// 	},
// 	{
// 		name: 'Март',
// 		'Доход': Math.floor(Math.random() * 5000) + 1000,
// 		'Расход': Math.floor(Math.random() * 5000) + 1000
// 	}
// ]
</script>

<template>
	<CardHeader>
		<CardTitle>Отчет за год</CardTitle>
	</CardHeader>
	<CardContent class="pl-2">
		<BarChart :data="data" :categories="['Доход', 'Расход']" :index="'name'" :rounded-corners="4" />
	</CardContent>
</template>