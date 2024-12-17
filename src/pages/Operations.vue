<script setup lang="ts">
import DataTable from '@/components/tables/operations/DataTable.vue'
import UserNav from '@/components/UserNav.vue'
import { columns } from '@/components/tables/operations/columns'

import { useTableStore } from '@/store/TableStore'

const tableStore = useTableStore()

</script>

<template>
	<div class=" h-full flex-1 flex-col space-y-8 p-2 md:flex md:p-8">
		<div class="flex items-center justify-between space-y-2 w-full">
			<div>
				<h2 class="text-2xl font-bold tracking-tight">
					Общий список
				</h2>
				<p class="text-muted-foreground line-clamp-1">
					Здесь вы можете увидеть все ваши операции, указанные в документе.
				</p>
			</div>
		</div>
		<DataTable v-if="tableStore.hasDocument" :data="tableStore.table" :columns="columns" />
	</div>
</template>