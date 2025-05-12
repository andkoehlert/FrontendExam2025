<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  projects: Array<{ status: string }>
}>()

const BarChartData = computed(() => {
  const statusCounts: Record<string, number> = {}

  for (const project of props.projects) {
    statusCounts[project.status] = (statusCounts[project.status] || 0) + 1
  }

  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count
  }))
})

const categories = {
  count: { name: 'Projects' }
}
const chartOptions = {
  colors: ['#00DC82'], 
}
const xFormatter = (i: number): string => {
  return BarChartData.value[i]?.status || ''
}
</script>

<template>
  <LineChart
    :data="BarChartData"
    :height="300"
    :categories="categories"
    :y-axis="['count']"
    :x-formatter="xFormatter"
    :legend-position="LegendPosition.Top"
   :options="chartOptions"
  />
</template>

<style>
.css-6l77fg-bar {
  fill: #00DC82 !important;
}
</style>