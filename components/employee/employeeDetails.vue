<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10 ">
      <div class="p-7 ">
        <img :src="employee.profileImage" alt="product" class="mx-auto my-7 max-h-80">
      </div>
      <div class="grid grid-cols-2 shadow-lg shadow-dark-400/100 p-4 ">
        <h3 class="font-bold border-b-2 mb-4 pb-2">Employee: 
        <span class="font-normal">{{ employee.name }} </span></h3>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Position:
          <span class="font-normal">{{ employee.position }} </span></h3>
            <h3 class="font-bold border-b-2 mb-4 pb-2">email:
              <span class="font-normal">{{ employee.email }} </span></h3>
              <h3 class="font-bold border-b-2 mb-4 pb-2">Other:
                <span class="font-normal">{{ employee.bio }} </span></h3>
            

        <h3 class="font-bold border-b-2 mb-4 pb-2 col-span-2 text-center">Product description:</h3>
        <p class="mb-7 col-span-2">{{ employee.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '../../interfaces/employees';

const props = defineProps<{
  employee: Employee,
 
    }>()


</script>

<style scoped>

</style>