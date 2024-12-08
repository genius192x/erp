<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed, reactive } from 'vue'
import type { Task } from '@/lib/schema'
import { Checkbox } from '@/components/ui/checkbox'
import { types, months, getTypes } from '@/lib/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import {Cross2Icon, PlusIcon, MixerHorizontalIcon} from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import CrudOperationForm from '@/components/form/CrudOperationForm.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import { useTableStore } from '@/store/TableStore'

const tableStore = useTableStore()

function getTypes() {
  let result = []
  if (tableStore.table) {
		tableStore.table.forEach(element => {
			if (element.categoryType) {
				if (!result.find(x => x.value.toLowerCase() === element.categoryType.toLowerCase())) {
					result.push({value: element.categoryType, label: element.categoryType || 'Не указано' })
				}
			}
    });
  }
	return result
}

interface DataTableToolbarProps {
	table: Table<Task>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)

const typeFilter = reactive({
	incomes: {
		label: 'Поступление',
		value: false
	},
	expanses: {
		label: 'Выбытие',
		value: false
	},
})

function handleChange() {
	let result = [];

	for (var key in typeFilter) {
		if (!typeFilter[key].value) {
			continue
		} else {
			result.push(typeFilter[key].label)
		}
	}
	if (result.length) {
		props.table.getColumn('paymentType')?.setFilterValue(result)
	} else {
		props.table.getColumn('paymentType')?.setFilterValue(undefined)
	}
}

function reset() {
	for (var key in typeFilter) {
		typeFilter[key].value = false
	}
	props.table.resetColumnFilters()
}

getTypes()
</script>

<template>
	<div class="flex flex-colgap-4 gap-2 md:justify-between md:items-center md:flex-row">
		<div class="flex gap-2 flex-1 flex-wrap md:items-center">
			<Input
				placeholder="Поиск по названию"
				:model-value="(table.getColumn('name')?.getFilterValue() as string) ?? ''"
				class="h-8 lg:w-[250px] w-full md:w-[150px]"
				@input="table.getColumn('name')?.setFilterValue($event.target.value)"
			/>
			<CrudOperationForm :type="'Доход'" :title="'Доход'"/>
			<CrudOperationForm :type="'Расход'" :title="'Расход'"/>
			<Button
				v-if="isFiltered"
				variant="ghost"
				class="h-8 px-2 lg:px-3 ml-auto"
				@click="reset()"
			>
				Сбросить
				<Cross2Icon class="ml-2 h-4 w-4" />
			</Button>
			<Popover>
				<PopoverTrigger as-child>
					<Button
						class="h-8 px-2 lg:px-3"
						:class="{'ml-auto': !isFiltered}"
						@click="console.log('Добавить расход')"
					>
							Фильтры
						<MixerHorizontalIcon class="ml-2 h-4 w-4"/>
					</Button>

				</PopoverTrigger>
				<PopoverContent class="w-[450px] space-y-2">
					<div class="w-fit mt-2 flex items-center gap-4">
						<span>Тип:</span>

						<div class="flex gap-4">
							<div class="flex items-center space-x-2">
								<Checkbox id="incomes"
									:checked="typeFilter.incomes.value"
									@update:checked="(value) => {
										typeFilter.incomes.value = value
										handleChange()
									}"
								/>
								<label
									for="incomes"
									class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Доходы
								</label>
							</div>
							<div class="flex items-center space-x-2">
								<Checkbox id="expanses"
									:checked="typeFilter.expanses.value"
									@update:checked="(value) => {
										typeFilter.expanses.value = value
										handleChange()
									}"
								/>
								<label
									for="expanses"
									class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Расходы
								</label>
							</div>
						</div>

					</div>
					<Separator/>
					<div class="flex w-full justify-between gap-2">
						<DataTableFacetedFilter
							v-if="table.getColumn('month')"
							:column="table.getColumn('month')"
							title="Месяц"
							:options="months"
						/>

						<Separator orientation="vertical" class="min-h-[344px]"/>
						<DataTableFacetedFilter
							v-if="table.getColumn('categoryType')"
							:column="table.getColumn('categoryType')"
							title="Статья расхода"
							:options="getTypes()"
						/>

					</div>
				</PopoverContent>
			</Popover>

		</div>
		<!-- <DataTableViewOptions :table="table" /> -->
	</div>
</template>
