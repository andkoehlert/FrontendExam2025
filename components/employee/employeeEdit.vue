<template>
  <div class="card text-center">
    <img :src="employee.profileImage" alt="product thumb" class="thumb">
      <p class="front-bold text gray-500 m-4 truncate">{{ employee.name }}</p>
        <input type="text" v-model="employee.name"  placeholder="Name" class="p-2 border rounded" /> <!-- Product name -->
          
    
  <div class="flex gap-10 justify-center">
  
 
  <!--   <button @click="onEdit(product)" class="bg-green-600 text-white p-2 rounded hover:bg-red-700 mt-2">
  Edit
</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '../interfaces/employees';


const props = defineProps<{
  employee: Employee,
    // onEdit: (product: Product) => Promise<void> 
    }>()
</script>

<style  scoped>

</style>