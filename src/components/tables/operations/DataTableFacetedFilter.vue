<script setup lang="ts">
import type { Column } from '@tanstack/vue-table'
import type { Component } from 'vue'
import { computed } from 'vue'
import type { Task } from './lib/schema'
import {PlusCircledIcon} from '@radix-icons/vue'
import {CheckIcon} from '@radix-icons/vue'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from './lib/utils'

interface DataTableFacetedFilter {
	column?: Column<Task, any>
	title?: string
	options: {
		label: string
		value: string
		icon?: Component
	}[]
}

const props = defineProps<DataTableFacetedFilter>()

const facets = computed(() => props.column?.getFacetedUniqueValues())
const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]))
</script>

<template>
	<Command
			:filter-function="(list: DataTableFacetedFilter['options'], term) => list.filter(i => i.label.toLowerCase()?.includes(term)) "
		>
			<!-- <CommandInput :placeholder="title" /> -->
			<span class="mb-2">{{ props.title }}:</span>
			<CommandList>
				<ScrollArea class="h-72 w-48">

					<CommandEmpty>Нет опций для фильтрации</CommandEmpty>
					<CommandGroup :class="'p-0 pr-2'">
						<CommandItem
							v-for="option in options"
							:key="option.value"
							:value="option"
							@select="(e) => {
								console.log(e.detail.value)
								const isSelected = selectedValues.has(option.value)
								if (isSelected) {
								selectedValues.delete(option.value)
								}
								else {
								selectedValues.add(option.value)
								}
								const filterValues = Array.from(selectedValues)
								column?.setFilterValue(
								filterValues.length ? filterValues : undefined,
								)
							}"
						>

								<div
									:class="cn(
									'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
									selectedValues.has(option.value)
										? 'bg-primary text-primary-foreground'
										: 'opacity-50 [&_svg]:invisible',
									)"
								>
									<CheckIcon :class="cn('h-4 w-4')" />
								</div>
								<component :is="option.icon" v-if="option.icon" class="mr-2 h-4 w-4 text-muted-foreground" />
								<span>{{ option.label }}</span>
								<span v-if="facets?.get(option.value)" class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
									{{ facets.get(option.value) }}
								</span>
						</CommandItem>
					</CommandGroup>

					<template v-if="selectedValues.size > 0">
						<CommandSeparator />
						<CommandGroup>
						<CommandItem
							:value="{ label: 'Clear filters' }"
							class="justify-center text-center"
							@select="column?.setFilterValue(undefined)"
						>
							Clear filters
						</CommandItem>
						</CommandGroup>
					</template>
				</ScrollArea>
			</CommandList>
		</Command>
</template>
