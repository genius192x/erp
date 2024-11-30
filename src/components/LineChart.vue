<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'

interface Data{
	data: [],
	colors: [],
	categorie: String,
	showTooltip: boolean,
}

const props = defineProps<Data>()

console.log(props.data);


</script>

<template>
  <LineChart
    index="month"
    class="h-[100px] w-full mt-2"
    :data="props.data"
    :categories="[categorie]"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
        : ''
    }"
		:colors="props.colors"
    :show-tooltip="props.showTooltip"
    :show-grid-line="false"
    :show-legend="false"
    :show-x-axis="false"
    :show-y-axis="false"
  />
</template>