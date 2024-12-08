<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { Table } from '@tanstack/vue-table'
import { Separator } from '@/components/ui/separator'

import { toast } from '@/components/ui/toast'

import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { CalendarClockIcon } from 'lucide-vue-next'
import { Check, ChevronsUpDown,Plus } from 'lucide-vue-next'
import { toDate } from 'radix-vue/date'
import { h, ref } from 'vue'
import * as z from 'zod'
import { Dialog, DialogTrigger,DialogHeader, DialogFooter,DialogTitle, DialogDescription, DialogContent } from '@/components/ui/dialog'
import { useTableStore } from '@/store/TableStore'
import { FieldArray, useForm } from 'vee-validate'

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

const props = defineProps<{
	title: string,
	type: string
}>()

const types = ref(getTypes())
const open = ref(false)
const openBilles = ref(false)
const openPayer = ref(false)
const openResponsible = ref(false)
const openAgent = ref(false)
const dateValue = ref()
const placeholder = ref()

const responsible = [
  { label: 'Иванов Иван Иванович', value: 'Иванов Иван Иванович' },
  { label: 'Антонов Антон Антонович', value: 'Антонов Антон Антонович' },
  { label: 'Сергеев Сергей Сергеевич', value: 'Сергеев Сергей Сергеевич' }
]
const billes = [
	{ label: '48138974101872', value: '48138974101872' },
	{ label: '74018746151308', value: '74018746151308' },
	{ label: '56190238741650', value: '56190238741650' }
]
const teams =[
	{
		label: 'ООО Такое-то',
		value: 'ООО Такое-то',
	},
	{
		label: 'ИП Такое-то',
		value: 'ИП Такое-то',
	},
	{
		label: 'ООО Сякое-то',
		value: 'ООО Сякое-то',
	},
]
const monthCount = ref(null)
const year = ref(null)
const df = new DateFormatter('ru-RU', {
  dateStyle: 'long',
})

const accountFormSchema = toTypedSchema(z.object({
	name: z.string({required_error: 'Обязательное поле.' }),

  summ: z
    .number({
      required_error: 'Обязательное поле.',
    }),
  date: z.string().datetime().optional().refine(date => date !== undefined, 'Выберите дату.'),
  type: z.string({
      required_error: 'Обязательное поле.',
    }).min(1, 'Выберите тип.'),
  responsible: z.string({
      required_error: 'Обязательное поле.',
    }).min(1, 'Выберите ответсвенного.'),
  billes: z.string({
      required_error: 'Обязательное поле.',
    }).min(1, 'Выберите счет.'),
  payer: z.string({
      required_error: 'Обязательное поле.',
    }).min(1, 'Выберите счет.'),
	contragent: z.string({
      required_error: 'Обязательное поле.',
    }).min(1, 'Выберите счет.'),
}))



const { handleSubmit, setFieldValue, resetForm } = useForm({
  validationSchema: accountFormSchema,
})

const onSubmit = handleSubmit((values) => {
	values.categoryType = values.type
	values.monthCount = monthCount.value
	values.year = year.value
	values.paymentType = props.type === 'Доход' ? 'Поступление' : 'Выбытие'
	tableStore.updateDocument(values)
})

function reset() {
	resetForm()
}
// async function onSubmit(values: any) {
// 	console.log(values);

//   toast({
//     title: 'You submitted the following values:',
//     description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
//   })
// }
</script>

<template>
	<Dialog>
		<DialogTrigger as-child>
			<Button
				variant="secondary"
				class="h-8 px-2 lg:px-3"
				@click="console.log('Добавить доход')"
			>
				{{ props.type }}
				<Plus class="ml-2 h-4 w-4"/>
		</Button>
		</DialogTrigger>
		<DialogContent class="sm:max-w-[625px]">
			<DialogHeader>
				<DialogTitle>{{ props.title }}</DialogTitle>
			</DialogHeader>
			<form class="space-y-6" @submit="onSubmit">
				<FormField v-slot="{ componentField }" name="name">
					<FormItem>
						<FormLabel>Название</FormLabel>
						<FormControl>
							<Input type="text" placeholder="Название платежа" v-bind="componentField" />
						</FormControl>
						<!-- <FormDescription>
							здесь нужно ввести сумму дохода/расхода
						</FormDescription> -->
						<FormMessage />
					</FormItem>
				</FormField>
				<FormField v-slot="{ componentField }" name="summ">
					<FormItem>
						<FormLabel>Сумма</FormLabel>
						<FormControl>
							<Input type="number" placeholder="Сумма платежа" v-bind="componentField" />
						</FormControl>
						<!-- <FormDescription>
							здесь нужно ввести сумму дохода/расхода
						</FormDescription> -->
						<FormMessage />
					</FormItem>
				</FormField>
				<div class="flex gap-5">
					<FormField v-slot="{ field, value }" name="date">
						<FormItem class="flex flex-col flex-1">
							<FormLabel>Дата платежа</FormLabel>
							<Popover>
								<PopoverTrigger as-child>
									<FormControl>
										<Button
											variant="outline" :class="cn(
												'w-full justify-start text-left font-normal',
												!value && 'text-muted-foreground',
											)"
										>
											<CalendarClockIcon class="mr-2 h-4 w-4 opacity-50" />
											<span>{{ value ? df.format(toDate(dateValue, getLocalTimeZone())) : "Выберите дату" }}</span>
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent class="p-0">
									<Calendar
										v-model:placeholder="placeholder"
										v-model="dateValue"
										calendar-label="Дата платежа"
										initial-focus
										:min-value="new CalendarDate(1900, 1, 1)"
										:max-value="today(getLocalTimeZone())"
										@update:model-value="(v) => {
											if (v) {
												dateValue = v
												monthCount = v.month
												year = v.year
												setFieldValue('date', toDate(v).toISOString())
											}
											else {
												dateValue = undefined
												setFieldValue('date', undefined)
											}
										}"
									/>
								</PopoverContent>
							</Popover>
							<!-- <FormDescription>
								Выберите дату проведения платежа
							</FormDescription> -->
							<FormMessage />
						</FormItem>
						<input type="hidden" v-bind="field">
					</FormField>
					<FormField v-slot="{ value }" name="contragent">
						<FormItem class="flex flex-col flex-1">
							<FormLabel>Контрагент</FormLabel>
							<Popover v-model:open="openAgent">
								<PopoverTrigger as-child>
									<FormControl>
										<Button
											variant="outline" role="combobox" :aria-expanded="openAgent" :class="cn(
												'w-full justify-between',
												!value && 'text-muted-foreground',
											)"
										>
											{{ value ? teams.find(
												(item) => item.value === value,
											)?.label : 'Выберите контрагента...' }}

											<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent class="w-fit p-0">
									<Command>
										<CommandInput placeholder="Поиск контрагента..." />
										<CommandEmpty>Ничего не найдено.</CommandEmpty>
										<CommandList>
											<CommandGroup>
												<CommandItem
													v-for="item in teams" :key="item.value" :value="item.label"
													@select="() => {
														setFieldValue('contragent', item.value)
														openAgent = false
													}"
												>
													<Check
														:class="cn(
															'mr-2 h-4 w-4',
															value === item.value ? 'opacity-100' : 'opacity-0',
														)"
													/>
													{{ item.label }}
												</CommandItem>
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>

							<!-- <FormDescription>
								This is the resopsible that will be used in the dashboard.
							</FormDescription> -->
							<FormMessage />
						</FormItem>
					</FormField>
				</div>
				<div class="flex gap-5">
					<FormField v-slot="{ value }" name="type">
						<FormItem class="flex flex-col flex-1">
							<FormLabel>Тип</FormLabel>

							<Popover v-model:open="open">
								<PopoverTrigger as-child>
									<FormControl>
										<Button
											variant="outline" role="combobox" :aria-expanded="open" :class="cn(
												'w-full justify-between',
												!value && 'text-muted-foreground',
											)"
										>
											{{ value ? getTypes().find(
												(type) => type.value === value,
											)?.label : 'Выберите тип...' }}

											<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent class="w-[200px] p-0">
									<Command>
										<CommandInput placeholder="Введите тип..." />
										<CommandEmpty>Ничего не найдено</CommandEmpty>
										<CommandList class="h-fit max-h-60 overflow-auto">
											<CommandGroup>
												<CommandItem
													v-for="type in getTypes()" :key="type.value" :value="type.label"
													@select="() => {
														setFieldValue('type', type.value)
														open = false
													}"
												>
													<Check
														:class="cn(
															'mr-2 h-4 w-4',
															value === type.value ? 'opacity-100' : 'opacity-0',
														)"
													/>
													{{ type.label }}
												</CommandItem>
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>

							<!-- <FormDescription>
								Укажите тип расхода/дохода, это поможет для фильтрации общего списка
							</FormDescription> -->
							<FormMessage />
						</FormItem>
					</FormField>
					<FormField v-slot="{ value }" name="responsible">
						<FormItem class="flex flex-col flex-1">
							<FormLabel>Ответсвенный</FormLabel>
							<Popover v-model:open="openResponsible">
								<PopoverTrigger as-child>
									<FormControl>
										<Button
											variant="outline" role="combobox" :aria-expanded="openResponsible" :class="cn(
												'w-full justify-between',
												!value && 'text-muted-foreground',
											)"
										>
											{{ value ? responsible.find(
												(item) => item.value === value,
											)?.label : 'Выберите ответственного...' }}

											<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent class="w-fit p-0">
									<Command>
										<CommandInput placeholder="Поиск ответственного..." />
										<CommandEmpty>Ничего не найдено.</CommandEmpty>
										<CommandList>
											<CommandGroup>
												<CommandItem
													v-for="item in responsible" :key="item.value" :value="item.label"
													@select="() => {
														setFieldValue('responsible', item.value)
														openResponsible = false
													}"
												>
													<Check
														:class="cn(
															'mr-2 h-4 w-4',
															value === item.value ? 'opacity-100' : 'opacity-0',
														)"
													/>
													{{ item.label }}
												</CommandItem>
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>

							<!-- <FormDescription>
								This is the resopsible that will be used in the dashboard.
							</FormDescription> -->
							<FormMessage />
						</FormItem>
					</FormField>
				</div>
				<div class="flex gap-5">
					<FormField v-slot="{ value }" name="billes">
						<FormItem class="flex flex-col flex-1">
							<FormLabel>Счет</FormLabel>

							<Popover v-model:open="openBilles">
								<PopoverTrigger as-child>
									<FormControl>
										<Button
											variant="outline" role="combobox" :aria-expanded="openBilles" :class="cn(
												'w-full justify-between',
												!value && 'text-muted-foreground',
											)"
										>
											{{ value ? billes.find(
												(bill) => bill.value === value,
											)?.label : 'Выберите счет...' }}

											<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent class="w-[200px] p-0">
									<Command>
										<CommandInput placeholder="Номер счета..." />
										<CommandEmpty>Ничего не найдено</CommandEmpty>
										<CommandList class="h-fit max-h-60 overflow-auto">
											<CommandGroup>
												<CommandItem
													v-for="bill in billes" :key="bill.value" :value="bill.label"
													@select="() => {
														setFieldValue('billes', bill.value)
														openBilles = false
													}"
												>
													<Check
														:class="cn(
															'mr-2 h-4 w-4',
															value === bill.value ? 'opacity-100' : 'opacity-0',
														)"
													/>
													{{ bill.label }}
												</CommandItem>
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					</FormField>
					<FormField v-slot="{ value }" name="payer">
						<FormItem class="flex flex-col flex-1">
							<FormLabel>Плательщик</FormLabel>
							<Popover v-model:open="openPayer">
								<PopoverTrigger as-child>
									<FormControl>
										<Button
											variant="outline" role="combobox" :aria-expanded="openPayer" :class="cn(
												'w-full justify-between',
												!value && 'text-muted-foreground',
											)"
										>
											{{ value ? responsible.find(
												(item) => item.value === value,
											)?.label : 'Выберите плательщика...' }}

											<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent class="w-fit p-0">
									<Command>
										<CommandInput placeholder="Поиск плательщика..." />
										<CommandEmpty>Ничего не найдено.</CommandEmpty>
										<CommandList>
											<CommandGroup>
												<CommandItem
													v-for="item in responsible" :key="item.value" :value="item.label"
													@select="() => {
														setFieldValue('payer', item.value)
														openPayer = false
													}"
												>
													<Check
														:class="cn(
															'mr-2 h-4 w-4',
															value === item.value ? 'opacity-100' : 'opacity-0',
														)"
													/>
													{{ item.label }}
												</CommandItem>
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>

							<!-- <FormDescription>
								This is the resopsible that will be used in the dashboard.
							</FormDescription> -->
							<FormMessage />
						</FormItem>
					</FormField>
				</div>
				<FormField v-slot="{ componentField }" name="description">
					<FormItem>
						<FormLabel>Комментарий</FormLabel>
						<FormControl>
							<Textarea placeholder="Комментарий к платежу" v-bind="componentField" />
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>


				<div class="flex gap-3 justify-end">
					<Button type="submit">
						Добавить платеж
					</Button>
					<Button type="submit" variant="outline" @click="reset">
						Сбросить
					</Button>
				</div>
			</Form>
		</DialogContent>
	</Dialog>
</template>
