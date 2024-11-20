<script setup lang="ts">
import Overview from '@/components/Overview.vue'
import DateRangePicker from '@/components/DateRangePicker.vue'
import RecentSales from '@/components/RecentSales.vue'
import {computed, onMounted} from "vue"
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'vue-sonner'
import { gsap } from 'gsap'

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
import {useTableStore} from '@/store/TableStore.js'
import readXlsxFile from 'read-excel-file'

const tableStore = useTableStore()

function showFile() {
	console.log('change');

	readXlsxFile(input.files[0], { sheet: 3 }).then((rows) => {
		// `rows` is an array of rows
		tableStore.table = rows
		// each row being an array of cells.
	}).finally(() => {
		const nums = document.querySelectorAll(".anim-num");
		gsap.from(nums, {
			textContent: 0,
			duration: 2,
			snap: { textContent: 1 },
			// stagger: 1,
			// onUpdate: textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
		});
	})
}


</script>

<template>
	<input type="file" id="input" @change="showFile" />
	<div class="flex-1 space-y-4 p-2 pt-2">
		<div class="flex justify-between space-y-3 flex-col md:flex-row md:items-center md:space-y-2">
			<h2 class="text-3xl font-bold tracking-tight">
				Статистика
			</h2>
			<div class="flex items-center gap-2 flex-wrap md:space-x-2">
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
			</div>
		</div>
		<Tabs default-value="overview" class="space-y-1 md:space-y-4 overflow-hidden">
			<TabsList class="overflow-auto">
				<TabsTrigger value="overview">
					Общее
				</TabsTrigger>
				<TabsTrigger value="analytics">
					Финансы
				</TabsTrigger>
				<TabsTrigger value="reports">
					Отчеты
				</TabsTrigger>
				<TabsTrigger value="notifications">
					Уведомления
				</TabsTrigger>
			</TabsList>
			<TabsContent value="overview" class="space-y-4">
				<h1 v-if="tableStore.table">{{ tableStore.table[0][2] }}</h1>
				<div class="grid gap-4 lg:grid-cols-2" v-if="tableStore.table">
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">
								Общие доходы
							</CardTitle>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
								stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4 text-muted-foreground">
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">
								<span class="anim-num">{{ tableStore.table[4][4] }}</span> ₽
							</div>
							<p class="text-xs text-green-600 font-medium">
								+20.1% относительно прошлого месяца
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle class="text-sm font-medium">
								Общие расходы
							</CardTitle>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
								stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4 text-muted-foreground">
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</CardHeader>
						<CardContent>
							<div class="text-2xl font-bold">
								<span class="anim-num">{{ tableStore.table[4][5] }}</span> ₽
							</div>
							<p class="text-xs text-red-600 font-medium">
								-18.1% относительно прошлого месяца
							</p>
						</CardContent>
					</Card>
				</div>
				<div class="grid gap-4 grid-cols-4 md:grid-cols-2 lg:grid-cols-7" v-if="tableStore.table">
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
			<TabsContent value="reports" class="space-y-4">
				<Card class="col-span-4 p-5">
					<span class="">Тут будут отчеты</span>
				</Card>
			</TabsContent>
			<TabsContent value="notifications" class="space-y-4">
				<Card class="col-span-4 p-5">
					<span class="">Тут будут уведомления</span>
				</Card>
			</TabsContent>
		</Tabs>
	</div>
</template>