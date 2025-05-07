<template>
  <div class="card text-center">
    <img :src="employee.profileImage" alt="product thumb" class="thumb">
    <div class="">
    <h2 class="front-bold text gray-500 m-4 truncate">{{ employee.name }}</h2>

    <NuxtLink :to="`/products/${employee._id}`">
      <p class="btn my-4">View Details</p>
    </NuxtLink>

    <div class="flex gap-10 justify-center">

      <button @click="onDelete(employee._id)" class="bg-red-600 flex-1 text-white p-2 rounded hover:bg-red-700 mt-2">
    Delete
  </button>

  <NuxtLink :to="`/products/edit/${employee._id}`" class="bg-green-600 text-white flex-1 p-2 rounded hover:bg-green-700 mt-2 text-center">
    Edit
  </NuxtLink>


  <!--   <button @click="onEdit(product)" class="bg-green-600 text-white p-2 rounded hover:bg-red-700 mt-2">
  Edit
</button> test -->
  </div>
</div>
  </div>
  
</template>

<script setup lang="ts">
import type { Employee } from '~/interfaces/employees';


const props = defineProps<{
  employee: Employee,
  onDelete: (id: string) => Promise<void>,

    }>()
</script>

<style  scoped>

</style>