<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  projects: Array<{ startDate: string }>
}>()

const chartData = computed(() => {
  const counts: Record<string, number> = {}

  for (const project of props.projects) {
    const date = new Date(project.startDate)
    const label = date.toLocaleString('default', {
      year: 'numeric',
      month: 'long',
    }) // e.g., "May 2025"

    counts[label] = (counts[label] || 0) + 1
  }

  return Object.entries(counts)
    .map(([month, projectCount]) => ({ month, projectCount }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
})

const categories = {
  projectCount: { name: 'Completed Projects' }
}

const chartOptions = {
  colors: ['#00DC82'], 
}

const xFormatter = (i: number): string => {
  return chartData.value[i]?.month || ''
}
</script>

<template>
  <BarChart
    :data="chartData"
    :height="300"
    :categories="categories"
    :y-axis="['projectCount']"
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
