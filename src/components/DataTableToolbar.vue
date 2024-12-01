<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed, reactive } from 'vue'
import type { Task } from '@/lib/schema'
import { Checkbox } from '@/components/ui/checkbox'
import { types, months, getTypes } from '@/lib/data'
import DataTableFacetedFilter from './DataTableFacetedFilter.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'
import {Cross2Icon} from '@radix-icons/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useTableStore } from '@/store/TableStore'

const tableStore = useTableStore()

function getTypes() {
  let result = []
  if (tableStore.table) {
    tableStore.table.forEach(element => {

      if (!result.find(x => x.value === element.type)) {
        result.push({value: element.type, label: element.type || 'Не указано' })
      }
    });
  }
	console.log(result);

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
		<div class="flex gap-2 flex-1 flex-wrap md:space-x-2 md:items-center">
			<Input
				placeholder="Поиск по названию"
				:model-value="(table.getColumn('name')?.getFilterValue() as string) ?? ''"
				class="h-8 lg:w-[250px] w-full md:w-[150px]"
				@input="table.getColumn('name')?.setFilterValue($event.target.value)"
			/>
			<DataTableFacetedFilter
				v-if="table.getColumn('month')"
				:column="table.getColumn('month')"
				title="Месяц"
				:options="months"
			/>
			<DataTableFacetedFilter
				v-if="table.getColumn('categoryType')"
				:column="table.getColumn('categoryType')"
				title="Тип"
				:options="getTypes()"
			/>
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

			<Button
				v-if="isFiltered"
				variant="ghost"
				class="h-8 px-2 lg:px-3"
				@click="reset()"
			>
				Сбросить
				<Cross2Icon class="ml-2 h-4 w-4" />
			</Button>
		</div>
		<DataTableViewOptions :table="table" />
	</div>
</template>
