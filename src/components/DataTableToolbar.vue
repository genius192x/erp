<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'
import type { Task } from '@/lib/schema'

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
				v-if="table.getColumn('type')"
				:column="table.getColumn('type')"
				title="Тип"
				:options="getTypes()"
			/>

			<Button
				v-if="isFiltered"
				variant="ghost"
				class="h-8 px-2 lg:px-3"
				@click="table.resetColumnFilters()"
			>
				Сбросить
				<Cross2Icon class="ml-2 h-4 w-4" />
			</Button>
		</div>
		<DataTableViewOptions :table="table" />
	</div>
</template>
