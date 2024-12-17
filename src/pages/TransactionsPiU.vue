<script setup lang="ts">
import DataTable from '@/components/tables/transactions/DataTable.vue'
import UserNav from '@/components/UserNav.vue'
import { columns } from '@/components/tables/transactions/columns'

import { useTableStore } from '@/store/TableStore'
import { Vue3Lottie } from 'vue3-lottie'
import EmptyListJSON  from '../assets/3'
const tableStore = useTableStore()

</script>

<template>
	<div class=" h-full flex-1 flex-col space-y-8 p-2 md:flex md:p-8">
		<!-- <div class="flex items-center justify-between space-y-2 w-full">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">
					Отчет ПиУ
				</h2>
				<p class="text-muted-foreground line-clamp-1">
					Здесь вы можете увидеть все движения денежных средств
				</p>
			</div>
		</div> -->
		<div class="flex justify-center items-center flex-col">
			<h1 class="text-4xl mb-5">Отчет ПиУ сейчас находится в разработке</h1>
			<Vue3Lottie class="cursor-pointer" :animationData="EmptyListJSON" :height="200" :width="200" :loop="true"/>
		</div>
	</div>
</template>