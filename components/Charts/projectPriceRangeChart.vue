<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps<{
  projects: Array<{ totalPrice: number }>
}>()

const priceRanges = [
  { label: '0–1k', min: 0, max: 1000 },
  { label: '1k–3k', min: 1001, max: 3000 },
  { label: '3k–6k', min: 3001, max: 6000 },
  { label: '6k–10k', min: 6001, max: 10000 },
  { label: '10k+', min: 10001, max: Infinity }
]

const histogramData = computed(() => {
  const rangeCounts = priceRanges.map(range => ({
    range: range.label,
    count: 0
  }))

  for (const project of props.projects) {
    const price = project.totalPrice
    const bucket = rangeCounts.find((r, i) => price >= priceRanges[i].min && price <= priceRanges[i].max)
    if (bucket) bucket.count += 1
  }

  return rangeCounts
})

const categories = {
  count: { name: 'Projects' }
}

const xFormatter = (i: number): string => {
  return histogramData.value[i]?.range || ''
}
</script>

<template>
  <BarChart
    :data="histogramData"
    :height="300"
    :categories="categories"
    :y-axis="['count']"
    :x-formatter="xFormatter"
    :options="{ colors: ['#f97316'] }"
    :legend-position="LegendPosition.Top"
  />
</template>
