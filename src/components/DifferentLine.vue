<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'

interface Data{
  data: [],
  colors: []
  categories: []
}

const props = defineProps<Data>()

console.log(props.data);


</script>

<template>
  <LineChart
    :data="props.data"
    index="month"
    :colors="props.colors"
    class="h-[100px] w-full mt-2"
    :categories="props.categories"
    :y-formatter="(tick, i) => {
      return typeof tick === 'number'
        ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
        : ''
    }"
    :show-tooltip="false"
    :show-grid-line="false"
    :show-legend="false"
    :show-x-axis="false"
    :show-y-axis="false"
  />
</template>