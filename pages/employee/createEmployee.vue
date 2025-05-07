<template>
  <div class="card"> 
    <h1>Create Employee</h1>

    <div class="text-center text-red-500">{{ error }}</div>
    <div class="">
      <form @submit.prevent="addEmployeeHandler" class="grid grid-cols-2 gap-10">
        
        <input type="text" v-model="newEmployee.name" placeholder="Name" class="p-2 border rounded" />
        <input type="text" v-model="newEmployee.description"  placeholder="Description" class="p-2 border rounded" /> 
        <input type="text" v-model="newEmployee.position"  placeholder="position" class="p-2 border rounded" /> 
        <input type="text" v-model="newEmployee.email"  placeholder="email" class="p-2 border rounded" /> 
        <input type="text" v-model="newEmployee.bio"  placeholder="bio" class="p-2 border rounded" /> 
        
   
        <div class="p-2 border rounded col-span-2">
  <input type="file" @change="handlePhotoUpload" />
</div>
        <button type="submit" class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 col-span-2">
        Create
        </button>

      </form>
</div> 
  </div>
<!--Existing employee-->
  <div class="pt-10">
    <div class="grid grid-cols-4 gap-5">
      <div v-if="loading">Loading...</div>
      <div v-for="employee in employees" :key="employee._id">
        <EmployeeCard 
        :employee="employee"
        :onDelete="deleteEmployee" 

        />

      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { onMounted } from 'vue';
import { showEmployee } from '../../composables/useEmployees';
import type { Employee } from '../../interfaces/employees';
const {
  employees, 
  error, 
  loading,  
  fetchEmployees, 
  addEmployee,
  deleteEmployee, 
  getTokenAndUserId}
  = showEmployee();

onMounted(() => {
  fetchEmployees();
});

const addEmployeeHandler = async () => {
  const {userId} = getTokenAndUserId();
  newEmployee.value._createdBy = userId;
 
  const employeeToAdd = {
  ...newEmployee.value
};

  try {
    await addEmployee(employeeToAdd);

    newEmployee.value = {
     name: '',
     position: '',
      description: '',
      email: '',
      profileImage: '',
      bio: '',
      _createdBy: ''
    };
  } catch (err) {
    console.log('Error', err)
  }
}

const handlePhotoUpload = async (event: Event) => {

  // Tell TS it's a input element
  const photoInput = event.target as HTMLInputElement;
  if (!photoInput.files || photoInput.files.length === 0) return;


  const file = photoInput.files[0];
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await fetch('http://localhost:4000/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('Uploaded image:', data);

    newEmployee.value.profileImage = data.url; 
  } catch (err) {
    console.error('Image upload failed:', err);
  }
};

const newEmployee = ref({
  name: '',
  description: '',
  position: '',
  email: '',
  bio: '',
  profileImage: '',
  _createdBy: ''
})

/* const updateProductHandler = async (product: Product) => {
const updatedProduct = {
      name: product.name,
      description: product.description,
      imageURL: product.imageURL,
      category: product.category,
      quantity: product.quantity,
      stock: product.stock,
      supplier: product.supplier,
      orderDate: product.orderDate,
      arrivalDate: product.arrivalDate,
}
await updateProduct(product._id, updatedProduct)
} */


</script>

<style  scoped>
h1 {
  font-size: 3rem;
}
</style>