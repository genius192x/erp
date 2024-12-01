<script setup lang="ts">
import ChartLines from '@/components/charts/ChartLines.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
interface Data{
  data: [],
  title: string,
  value: string,
  colors: string[],
  index: string,
  class: string,

  categories: string[]
}

const props = defineProps<Data>()

console.log(props.data);


</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-sm font-medium">
        {{ props.title }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">
        <span class="anim-num">{{  props.value }}</span> ₽
      </div>
      <ChartLines
        :index="props.index"
        :class="props.class"
        :colors="props.colors"
        :showTooltip="false"
        :data="props.data"
        :categories="props.categories"/>
    </CardContent>
  </Card>
</template>