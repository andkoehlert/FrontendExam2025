<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10 ">
      <div class="p-7  ">
        <h3 class="font-bold border-b-2 mb-4 pb-2">Project name: 
          
          <span class="font-normal">
            {{ project.name }}
          </span></h3>

        <h3 class="font-bold border-b-2 mb-4 pb-2">Status: 
          <span class="font-normal">
          {{ project.status }}
          </span></h3>
       
           <!-- Displaying Employees -->
           <div class="my-7">
          <h3 class="font-bold text-xl">Employees:</h3>
          <ul>
            <li v-for="employee in project.employees" :key="employee.employeeId._id">
              {{ employee.employeeId.name }} - {{ employee.employeeId.position }}
            </li>
          </ul>
        </div>
      </div>
      
      <div class="grid grid-cols-1 shadow-lg shadow-dark-400/100 p-4 ">
        <h3 class=" font-bold text-xl my-7">Supplier: 
        <span class="font-normal"> {{ project.status }}</span></h3>

        <h3 class=" font-bold text-xl my-7">Location: 
        <span class="font-normal">{{ project.lokation }}</span></h3>
        <h3 class=" font-bold text-xl my-7">Order Date: 
        <span class="font-normal"> {{ project.startDate }}</span></h3>
        <h3 class="font-bold text-xl my-7">End Date: 
          <span class="font-normal"> {{ project.endDate }}</span></h3>

        <h3 class=" font-bold text-xl my-7"> Project description: <span class="font-normal">{{ project.description }}</span></h3>
     

        <!-- Displaying Products -->
        <div class="my-7">
          <h3 class="font-bold text-xl">Products:</h3>
          <ul>
            <li v-for="product in project.products" :key="product.productId">
              {{ }} - Quantity: {{ product.quantity }}
            </li>
          </ul>
        </div>
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