

<template>
  <h1 class="text-4xl font-semibold">Dashboard</h1>
  <p class="pt-4">Welcome to the Dashboard. This will show data on different projects.</p>
  <div class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-20  p-4">
    <UCard class="col-span-1">
      <h2 class="text-xl  mb-4">Projects by Status</h2>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
      <div v-else>
        <projectStatusChart :projects="projects" />
      </div>
    </UCard>

    <UCard class="col-span-1">
      <h2 class="text-xl mb-4">Projects by month</h2>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
      <div v-else>
        <projectLocationChart :projects="projects" />
      </div>
</UCard>
          <UCard class="col-span-2">
      <h2 class="text-xl mb-4">Total Price over time</h2>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
      <div v-else>
        <projectDelayedChart :projects="projects" />
      </div>
    </UCard>

    <UCard class="col-span-1">
  <h2 class="text-xl mb-4">Projects by Price Range</h2>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
  <div v-else>
    <projectPriceRangeChart :projects="projects" />
  </div>
</UCard>

    <UCard class="col-span-1">
  <h2 class="text-xl mb-4">Price vs Number of Employees</h2>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
  <div v-else>
    <projectEmployeePriceChart :projects="projects" />
  </div>
</UCard>

  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

import projectStatusChart from '../../components/Charts/projectStatusChart.vue'
import projectLocationChart from '../../components/Charts/projectLocationChart.vue'
import projectDelayedChart from '../../components/Charts/projectDelayedChart.vue'
import projectPriceRangeChart from '../../components/Charts/projectPriceRangeChart.vue'
import projectEmployeePriceChart from '../../components/Charts/projectEmployeePriceChart.vue'

import { showDashboard } from '../../composables/useDashboard';

const {
  dashboards: projects, 
  error,
  loading: isLoading,
  fetchDashboards
} = showDashboard();

onMounted(() => {
  fetchDashboards();
});
</script>