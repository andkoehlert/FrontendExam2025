<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ProjectStatusChart from '~/components/ProjectStatusChart.vue'
import projectLocationChart from '~/components/projectLocationChart.vue'
interface Project {
  status: string
  [key: string]: any
}

const projects = ref<Project[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:4000/api/projects')
    if (!res.ok) throw new Error('Failed to fetch projects')
    projects.value = await res.json()
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <h1 class="text-4xl font-semibold">Dashboard</h1>
  <p class="pt-4">Welcome to the Dashboard. This will show data on different projects.</p>
  <div class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-20  p-4">
    <UCard class="col-span-1">
      <h2 class="text-xl  mb-4">Projects by Status</h2>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
      <div v-else>
        <ProjectStatusChart :projects="projects" />
      </div>
    </UCard>

    <UCard class="col-span-1">
      <h2 class="text-xl mb-4">Completed projects by month</h2>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
      <div v-else>
        <projectLocationChart :projects="projects" />
      </div>
    </UCard>
  </div>
</template>

