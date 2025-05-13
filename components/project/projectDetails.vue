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
    <li v-for="employee in project.employees" :key="employee.employeeId?._id">
      <!-- Check if employeeId exists and is not null -->
      <div v-if="employee.employeeId && employee.employeeId.name">
        {{ employee.employeeId.name }} - {{ employee.employeeId.position }}
      </div>
      <div v-else class="text-red-500 italic">
       <p>Employee reference missing (may have been deleted).</p> 
      
      </div>
    </li>
  </ul>
</div>
      
         <div class="my-7">
          <!--Products-->
  <h3 class="font-bold text-xl mb-2">Products:</h3>
  <ul>
<li v-for="product in project.products" :key="product.productId?._id || Math.random()">
  <div v-if="product.productId">
    <p class="font-bold border-b-2 mb-4 pb-2">Name:
      <span class="font-normal">
        {{ product.productId.name }}
      </span>
    </p>
    <p class="font-bold border-b-2 mb-4 pb-2">Quantity:
      <span class="font-normal">
        {{ product.quantity }}
      </span>
    </p>
    <p class="font-bold border-b-2 mb-4 pb-2">Unit Price:
      <span class="font-normal">
        {{ product.productId.price }}
      </span>
    </p>
    <p class="font-bold border-b-2 mb-4 pb-2">Subtotal: 
      <span class="font-normal">
        {{ product.quantity * product.productId.price }}
      </span>
    </p>
  </div>
  <div v-else class="text-red-500 italic">
    Product reference missing (may have been deleted).
  </div>
</li>

  </ul>
    <div class="my-7">
        <h3 class="font-bold text-xl mb-2">Total:</h3>

          <p class="font-bold border-b-2 mb-4 pb-2">Price:
          <span class="font-normal">
          {{ project.price }}
          </span></p>

             <p class="font-bold border-b-2 mb-4 pb-2">Total Price:
          <span class="font-normal">
          {{ project.totalPrice }}
          </span></p>
          </div>
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
     

 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../../interfaces/projects';

const props = defineProps<{
  project: Project,
 
    }>()


</script>

<style scoped>

</style>