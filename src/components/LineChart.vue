<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'

interface Data{
	data: [],
	colors: [string],
	categories: [string],
  showTooltip: boolean,
  index: string,
  class: string,
}

const props = defineProps<Data>()

console.log(props.data);


</script>

<template>
  <LineChart
    :index="props.index"
    :class="props.class"
    :data="props.data"
    :categories="[categories]"
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