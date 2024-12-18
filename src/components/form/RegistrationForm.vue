<script setup lang="ts">
import { h, ref } from 'vue'
import * as z from 'zod'
import { ReloadIcon } from '@radix-icons/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	FormLabel,
} from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserStore } from '@/store/UserStore'
import { useGlobalStore } from '@/store/GlobalStore'


const userStore = useUserStore()
const globalStore = useGlobalStore()
const accountFormSchema = toTypedSchema(z.object({
	name: z
		.string(),
	email: z
		.string()
		.min(1, { message: "Обязательное поле." })
		.email("Неверный формат."),
	password: z
		.string({
			required_error: 'Обязательное поле.',
		})
		.trim()
		.min(8, { message: 'Необходимо минимум 8 символов' })
}))
function onSubmit(data) {
	console.log(data);
	userStore.createAccount(data.email, data.password, data.name);
}
</script>

<template>
	<Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" class="space-y-6 mt-3 flex flex-col"
		@submit="onSubmit">
		<Card class="">
			<CardHeader>
				<CardTitle class="text-xl">
					Регистрация
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="grid gap-4">
					<FormField v-slot="{ componentField }" name="name">
						<FormItem>
							<FormLabel>Имя</FormLabel>
							<FormControl>
								<Input type="text" placeholder="Иван" v-bind="componentField" />
							</FormControl>
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="email">
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="Email" v-bind="componentField" />
							</FormControl>
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="password">
						<FormItem>
							<FormLabel>Пароль</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Пароль" v-bind="componentField" />
							</FormControl>
						</FormItem>
						<FormMessage />
					</FormField>
					<Button class="w-full" type="submit" :disabled="userStore.isLoading">
						<ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="userStore.isLoading" />
						{{ userStore.isLoading ? 'Создаем аккаунт' : 'Создать аккаунт' }}
					</Button>
				</div>
				<div class="mt-4 text-center text-sm">
					Уже есть аккаунт?
					<router-link to="/auth" class="underline">Войти</router-link>
				</div>
			</CardContent>
		</Card>
	</Form>
</template>