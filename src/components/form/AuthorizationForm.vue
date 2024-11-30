<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-icons/vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import {useUserStore} from '@/store/UserStore';
import { useGlobalStore } from '@/store/GlobalStore';

const userStore = useUserStore()


const accountFormSchema = toTypedSchema(z.object({
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
	userStore.authAccount(data.email, data.password)
}
</script>

<template>
	<Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" class="space-y-6 mt-3 flex flex-col"
		@submit="onSubmit">
		<Card class="w-full max-w-l">
			<CardHeader>
				<CardTitle class="text-2xl">
					Авторизация
				</CardTitle>
				<CardDescription>
					Введите указаные при регистрации данные ниже
				</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<div class="grid gap-4">
					<FormField v-slot="{ componentField }" name="email">
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" v-bind="componentField" />
							</FormControl>
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="password">
						<FormItem>
							<FormLabel class="flex justify-between">Пароль
								<a href="#" class="ml-auto inline-block text-sm underline text-card-foreground">
									Забыли свой пароль?
								</a>
							</FormLabel>

							<FormControl>
								<Input type="password" placeholder="" v-bind="componentField" />
							</FormControl>
						</FormItem>
					</FormField>
				</div>
				<Button class="w-full" type="submit" :disabled="userStore.isLoading">
					<ReloadIcon class="w-4 h-4 mr-2 animate-spin" v-if="userStore.isLoading" />
					{{ userStore.isLoading ? 'Авторизация' : 'Войти' }}
				</Button>
				<div class="mt-4 text-center text-sm">
					Еще нет аккаунта?
					<router-link to="/registration" class="underline">Регистрация</router-link>
				</div>
			</CardContent>
		</Card>
	</Form>
</template>