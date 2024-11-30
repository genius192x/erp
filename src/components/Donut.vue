<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import CustomChartTooltip from './CustomChartTooltip.vue'
import {useTableStore} from '@/store/TableStore.js'

const tableStore = useTableStore()

const data = [
	{ name: tableStore.table[34][3], total: tableStore.table[34][4], predicted: Math.floor(Math.random() * 2000) + 500 },
	{ name: tableStore.table[35][3], total: tableStore.table[35][4], predicted: Math.floor(Math.random() * 2000) + 500 },
	{ name: tableStore.table[38][3], total: tableStore.table[38][4], predicted: Math.floor(Math.random() * 2000) + 500 },
	{ name: tableStore.table[48][3], total: tableStore.table[48][4], predicted: Math.floor(Math.random() * 2000) + 500 },
	{ name: tableStore.table[55][3], total: tableStore.table[55][4], predicted: Math.floor(Math.random() * 2000) + 500 },
	{ name: tableStore.table[56][3], total: tableStore.table[56][4], predicted: Math.floor(Math.random() * 2000) + 500 },
]
</script>

<template>
	<DonutChart index="name" :category="'total'" :data="data" :custom-tooltip="CustomChartTooltip" />
</template>