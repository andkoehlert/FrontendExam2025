<template>
  <div class="card text-center">
      <p class="front-bold text gray-500 m-4 truncate">{{ project.name }}</p>
        <input type="text" v-model="project.name"  placeholder="Name" class="p-2 border rounded" /> 
          
    
  <div class="flex gap-10 justify-center">
  
    <NuxtLink :to="`/projects/edit/${project._id}`">
        <button class="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-2">
          Edit
        </button>
      </NuxtLink>
  <!--   <button @click="onEdit(product)" class="bg-green-600 text-white p-2 rounded hover:bg-red-700 mt-2">
  Edit
</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/interfaces/projects';


const props = defineProps<{
  project: Project,
    // onEdit: (product: Product) => Promise<void> 
    }>()
</script>

<style  scoped>

</style>