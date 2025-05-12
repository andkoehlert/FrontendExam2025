<template>
  <div class="card text-center">
    <div class="">
    <h2 class="front-bold text gray-500 m-4 truncate">{{ project.name }}</h2>

    <NuxtLink :to="`/projects/${project._id}`">
      <p class="btn my-4">View Details</p>
    </NuxtLink>

    <div class="flex gap-10 justify-center">
 

  <NuxtLink :to="`/projects/edit/${project._id}`" class="bg-green-600 text-white flex-1 p-2 rounded hover:bg-green-700 mt-2 text-center">
    Edit
  </NuxtLink>

  <button @click="onDelete(project._id)" class="bg-red-600 flex-1 text-white p-2 rounded hover:bg-red-700 mt-2">
    Delete
  </button>



  <!--   <button @click="onEdit(product)" class="bg-green-600 text-white p-2 rounded hover:bg-red-700 mt-2">
  Edit
</button> -->
  </div>
</div>
  </div>
  
</template>

<script setup lang="ts">
import type { Project } from '../../interfaces/projects';


const props = defineProps<{
  project: Project,
  onDelete: (id: string) => Promise<void>,
    }>()
</script>

<style  scoped>

</style>