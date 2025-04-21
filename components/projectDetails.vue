<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10 ">
      <div class="p-7 ">
        <h2 class="text-4x1 my-7">{{ project.name }}</h2>
      </div>
      <div class="grid grid-cols-2 shadow-lg shadow-dark-400/100 p-4 ">
        <p class="text-xl my-7">Supplier: {{ project.status }}</p>
        <p class="text-xl my-7">Location: {{ project.lokation }}</p>
        <p class="text-xl my-7">Order Date: {{ project.startDate }}</p>
        <p class="text-xl my-7">Order Date: {{ project.endDate }}</p>

        <h3 class="font-bold border-b-2 mb-4 pb-2">Product description:</h3>
        <p class="text-xl my-7"> {{ project.description }}</p>
     
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/interfaces/projects';

const props = defineProps<{
  project: Project,
 
    }>()


</script>

<style scoped>

</style>