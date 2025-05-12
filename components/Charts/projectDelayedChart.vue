<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  projects: Array<{ startDate: string; totalPrice: number }>
}>()

// Sort and prepare data
const priceChartData = computed(() => {
  const sorted = [...props.projects].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  return sorted.map((project) => ({
    date: new Date(project.startDate).toLocaleDateString(),
    totalPrice: project.totalPrice
  }))
})

const categories = {
  totalPrice: { name: 'Total Price (DKK)' }
}

const xFormatter = (i: number): string => {
  return priceChartData.value[i]?.date || ''
}
</script>

<template>
  <LineChart
    :data="priceChartData"
    :height="300"
    :categories="categories"
    :y-axis="['totalPrice']"
    :x-formatter="xFormatter"
    :options="{ colors: ['#3B82F6'] }"
    :legend-position="LegendPosition.Top"
  />
</template>
