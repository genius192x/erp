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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import LineChart from '@/components/LineChart.vue'
import DifferentLine from '@/components/DifferentLine.vue'
import Donut from '@/components/Donut.vue'
import readXlsxFile from 'read-excel-file'
import {useTableStore} from '@/store/TableStore.js'
import { table } from 'console'

const tableStore = useTableStore()
const isLoading = ref(false)

function showFile(e) {
	console.log(e.target);
  isLoading.value = true;
	readXlsxFile(e.target.files[0], { sheet: 1 }).then((rows) => {
		tableStore.stats = rows
		tableStore.rowsItems = rows
		tableStore.replaceDocument(tableStore.rowsItems)
    // let data = JSON.stringify(rows)
    // localStorage.setItem("data", data)
    // tableStore.table = tableStore.normolizeData(JSON.parse(data))
    // tableStore.stats = tableStore.processTable(JSON.parse(data))
    // tableStore.hasDocument = true

	}).finally(() => {
    const nums = document.querySelectorAll(".anim-num");
    isLoading.value = false
	})
}

const summIncomes = computed(() => {
	let result = ref(0)
	tableStore.stats.forEach(month => {

		result.value += +month.totalIncomes
	})

	return result.value
})

const summExpenses = computed(() => {
	let result = ref(0)
	tableStore.stats.forEach(month => {

		result.value += +month.totalExpenses
	})

	return result.value
})

</script>

<template>
	<div v-if="!tableStore.hasDocument && !tableStore.loading" class="flex flex-col flex-1 space-y-4 pt-2 items-center justify-center">
		<h1 class="text-3xl text-center">Кажется у вас еще нет загруженных листов</h1>
		<UploadForm/>
	</div>
	<div v-else-if="!tableStore.loading" class="flex-1 space-y-4 pt-2">
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
      <div class="flex w-full">
        <TabsList class="overflow-auto">
          <TabsTrigger value="overview">
            Общее
          </TabsTrigger>
          <TabsTrigger value="analytics">
            Финансы
          </TabsTrigger>
        </TabsList>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" class="ml-auto">
              Импорт файлов
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-96">
            <div class="grid gap-4">
              <div class="space-y-2">
                <!-- <h4 class="font-medium leading-none">
                  Dimensions
                </h4> -->
                <p class="text-sm text-muted-foreground">
                  Импорт Банковской выгрузки (.txt)
                </p>
              </div>
              <div class="grid gap-2">
                <div class="">
                  <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 disabled:opacity-35 disabled:cursor-not-allowed" aria-describedby="file_input_help" id="file_input" type="file" disabled>
                  <p class="mt-1 text-sm text-right text-gray-500 dark:text-gray-300" id="file_input_help" target="_blank">.txt</p>
                </div>
              </div>
              <span class="text-sm text-muted-foreground">
                Импорт файла XLS. <a href="#" class="text-green-700 underline" download="Шаблон ДДС">Шаблон файла</a>
              </span>
              <div class="grid gap-2">
                <div class="">
                  <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  accept=".xls,.xlsx,.xlsm"
                  @change="showFile">
                  <p class="mt-1 text-sm text-right text-gray-500 dark:text-gray-300" id="file_input_help">.xls, .xlsm, .xslx</p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
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
  <div v-if="tableStore.loading" class="relative h-full">
    <svg class="w-[200px] h-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" rsion="1.1" id="L9"
			xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
			<rect x="35" y="40" width="4" height="10" fill="green">
				<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 10; 0 0"
					begin="0" dur="0.8s" repeatCount="indefinite" />
			</rect>
			<rect x="45" y="40" width="4" height="10" fill="green">
				<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 10; 0 0"
					begin="0.2s" dur="0.8s" repeatCount="indefinite" />
			</rect>
			<rect x="55" y="40" width="4" height="10" fill="green">
				<animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 10; 0 0"
					begin="0.4s" dur="0.8s" repeatCount="indefinite" />
			</rect>
		</svg>
  </div>
</template>

<style scoped>
input[type=file]::file-selector-button {
  -webkit-margin-start: -1rem;
  -webkit-margin-end: 1rem;
  background: #1f2937;
  border: 0;
  color: #fff;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 500;
  margin-inline-end: 1rem;
  margin-inline-start: -1rem;
  padding: .625rem 1rem .625rem 2rem;
}
</style>