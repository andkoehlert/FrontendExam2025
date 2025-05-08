<template>
  <div class="card"> 
    <h1>Edit Employee</h1>

    <div class="text-center text-red-500">{{ error }}</div>

    <div v-if="loading">Loading...</div>
    <div v-if="employee">
      <form @submit.prevent="updateEmployeeHandler" class="grid grid-cols-2 gap-10">

        <input type="text" v-model="employee.name" placeholder="Name" class="p-2 border rounded" />
        <input type="text" v-model="employee.description" placeholder="Description" class="p-2 border rounded" />
        <input type="text" v-model="employee.position" placeholder="Position" class="p-2 border rounded" />
        <input type="text" v-model="employee.email" placeholder="Email" class="p-2 border rounded" />
        <input type="date" v-model="employee.bio" placeholder="bio" class="p-2 border rounded" />
        <input type="text" v-model="employee.profileImage" placeholder="Image URL" class="p-2 border rounded h-10" />

   

        <div class="col-span-2 flex">
  <button 
    type="submit" 
    class="mt-4 min-w-[100px] bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
  >
    save changes
  </button>
</div>

      </form>
</div> 
  </div>
  <div>
    <h2>Preview</h2>
  </div>
<!--Existing Employees-->
  <div class="pt-10">
    <div class="grid grid-cols-4 gap-5">
      <div v-if="loading">Loading...</div>
      <div v-else-if="employee">
        <EmployeeEdit
        :employee="employee" 
        :onEdit="updateEmployeeHandler"
        />
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import {ref} from 'vue';
import { onMounted } from 'vue';
import { showEmployee } from '../../../composables/useEmployees';
import type { Employee } from '../../../interfaces/employees';

const { employees, updateEmployee, fetchEmployees} = showEmployee();

// to get the id from the url
const route = useRoute();
const id = route.params._id as string;

const employee = ref<Employee | null>(null);
const loading = ref(true);
const error = ref('');

const getSpecificEmployee = async () => {
  try {
    await fetchEmployees();
    employee.value = employees.value.find((specificEmpl: Employee) => specificEmpl._id === id) || null;
    if (!employee.value) error.value = 'Employee not found';
  } catch (e) {
    error.value = 'Error fetching employee';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getSpecificEmployee();
});


const updateEmployeeHandler = async () => {
  if (!employee.value) return;


const updatedData = {
  name: employee.value.name,
    description: employee.value.description,
    position: employee.value.position,
    email: employee.value.email,
    profileImage: employee.value.profileImage,
    bio: employee.value.bio,
};

try {
  await updateEmployee(employee.value._id, updatedData);
  alert('Employee updated succesfully');

} catch (e) {
  error.value = ' Failed to update employee'
}
}


</script>

<style lang="scss" scoped>

</style>