import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { labels, priorities, statuses } from '@/lib/data'
import type { Task } from '@/lib/schema'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
import DataTableRowActions from './DataTableRowActions.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Task>[] = [
	{
		id: 'select',
		header: ({ table }) => h(Checkbox, {
		'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
		'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
		'ariaLabel': 'Select all',
		'class': 'translate-y-0.5',
		}),
		cell: ({ row }) => h(Checkbox, { 'checked': row.getIsSelected(), 'onUpdate:checked': value => row.toggleSelected(!!value), 'ariaLabel': 'Select row', 'class': 'translate-y-0.5' }),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Название' }),

		cell: ({ row }) => {
			const label = labels.find(label => label.value === row.original.label)

			return h('div', { class: 'flex space-x-2 min-w-20 items-start' }, [
				label ? h(Badge, { variant: 'outline' }, () => label.label) : null,
				h('p', { class: 'line-clamp-1  font-medium' }, row.getValue('name')),
			])
		},
	},
	{
		accessorKey: 'summ',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Значение' }),
    cell: ({ row }) => {
			let color = '';
      return h('div', { class: `w-auto text-sm`, style:`${+row.getValue('summ') >= 0 ? 'color:green;' : 'color:red;'}}` }, (Intl.NumberFormat('ru-RU').format(row.getValue('summ'))  + ' ₽'))
    },
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'month',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Месяц' }),

		cell: ({ row }) => {
		const date = row.getValue('month')


		if (!date)
			return null

		return h('div', { class: 'flex w-[60px] items-center' }, [
			h('span', date),
		])
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
  },
	{
		accessorKey: 'categoryType',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Статья' }),
		cell: ({ row }) => {
		const categoryType = row.getValue('categoryType') || 'Не указано'

		if (!categoryType)
			return null

		return h('div', { class: 'flex items-center' }, [
			h('span', {}, categoryType),
		])
		},
		filterFn: (row, id, value) => {
		return value.includes(row.getValue(id))
		},
  },
  {
		accessorKey: 'paymentType',
		header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Тип' }),

		cell: ({ row }) => {
		const paymentType = row.getValue('paymentType')


		if (!paymentType)
			return null

		return h('div', { class: 'flex w-[100px] items-center' }, [
			h('span', paymentType),
		])
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => h(DataTableRowActions, { row }),
	},
]
