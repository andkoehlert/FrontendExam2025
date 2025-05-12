<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  projects: Array<{ totalPrice: number; employees: Array<any> }>
}>()

// Format data for scatter plot
const scatterData = computed(() => {
  return props.projects.map(project => ({
    employees: project.employees?.length || 0,
    totalPrice: project.totalPrice
  }))
})

const categories = {
  totalPrice: { name: 'Price (DKK)' }
}

const xFormatter = (i: number): string => {
  const point = scatterData.value[i]
  return `${point.employees} employees`
}
</script>

<template>
    <AreaChart
    :data="scatterData"
    :height="300"
    :categories="categories"
    :y-axis="['totalPrice']"
    :x-formatter="xFormatter"
    :options="{ colors: ['#3b82f6'] }"
    :legend-position="LegendPosition.Top"
  />
</template>
