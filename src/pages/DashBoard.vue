<script setup lang="ts">
import Overview from '@/components/Overview.vue'
import {computed, onMounted, ref} from "vue"

import CardLineChart from '@/components/cards/CardLineChart.vue'
import UploadForm from '@/components/form/UploadForm.vue'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import LineChart from '@/components/LineChart.vue'
import DifferentLine from '@/components/DifferentLine.vue'
import Donut from '@/components/Donut.vue'
import {useTableStore} from '@/store/TableStore.js'

const tableStore = useTableStore()

const summIncomes = computed(() => {
	let result = ref(0)
	tableStore.stats.forEach(month => {

		result.value += +month.totalIncomes
	})
	console.log(typeof(result.value));

	return result.value
})

const summExpenses = computed(() => {
	let result = ref(0)
	tableStore.stats.forEach(month => {

		result.value += +month.totalExpenses
	})
	console.log(typeof(result.value));

	return result.value
})

</script>

<template>
	<div v-if="!tableStore.hasDocument" class="flex flex-col flex-1 space-y-4 pt-2 items-center justify-center">
		<h1 class="text-3xl text-center">Кажется у вас еще нет загруженных листов</h1>
		<UploadForm/>
	</div>
	<div v-else class="flex-1 space-y-4 pt-2">
		<div class="flex justify-between space-y-3 flex-col md:flex-row md:items-center md:space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">
				Статистика
			</h2>
			<!-- <div class="flex items-center gap-2 flex-wrap md:space-x-2">
				<DateRangePicker />
				<Button class="m-0" @click="() => {
          toast('Скачали статистику за указанный период', {
            description: '20 янв. 2023 г. - 9 февр. 2023 г.',
            action: {
              label: 'Ок',
              onClick: () => console.log('Ок'),
            },
          })
        }">Скачать</Button>
				<Toaster />
			</div> -->
		</div>
		<Tabs default-value="overview" class="space-y-1 md:space-y-4">
			<TabsList class="overflow-auto">
				<TabsTrigger value="overview">
					Общее
				</TabsTrigger>
				<TabsTrigger value="analytics">
					Финансы
				</TabsTrigger>
			</TabsList>
			<TabsContent value="overview" class="space-y-4">

				<h1 v-if="tableStore.stats.length">{{ tableStore.stats[0][2] }}</h1>
				<div class="flex flex-col gap-4 lg:grid lg:grid-cols-3" v-if="tableStore.stats">
					<CardLineChart
						:data="tableStore.stats"
						:title="'Разница'"
						:value="`${Intl.NumberFormat('ru-RU').format(summIncomes - summExpenses)}`"
						:colors="['red', 'green']"
						:index="'name'"
						:class="'h-[100px] w-full mt-2'"
						:categories="['totalExpenses', 'totalIncomes']"
					/>
          <CardLineChart
            :data="tableStore.stats"
            :title="'Общие доходы'"
            :value="Intl.NumberFormat('ru-RU').format(summIncomes)"
            :colors="['green']"
            :index="'name'"
            :class="'h-[100px] w-full mt-2'"
            :categories="['totalIncomes']"
          />
          <CardLineChart
            :data="tableStore.stats"
            :title="'Общие расходы'"
            :value="Intl.NumberFormat('ru-RU').format(summExpenses)"
            :colors="['red']"
            :index="'name'"
            :class="'h-[100px] w-full mt-2'"
            :categories="['totalExpenses']"
          />
				</div>
				<div class="grid gap-4 grid-cols-4 md:grid-cols-2 lg:grid-cols-7" v-if="tableStore.stats">
					<Card class="col-span-7">
						<Overview />
					</Card>
				</div>
			</TabsContent>
			<TabsContent value="analytics" class="space-y-4">
				<Card class="col-span-4">
					<Overview />
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</template>