<template>
  <div class="card">
    <h1>Create Employee</h1>

    <div class="text-center text-red-500">{{ error }}</div>
    <form @submit.prevent="addEmployeeHandler" class="grid grid-cols-2 gap-10">
      
      <input type="text" v-model="newEmployee.name" placeholder="Name" class="p-2 border rounded" />
      <input type="text" v-model="newEmployee.description" placeholder="Description" class="p-2 border rounded" />
      <input type="text" v-model="newEmployee.position" placeholder="Position" class="p-2 border rounded" />
      <input type="text" v-model="newEmployee.email" placeholder="Email" class="p-2 border rounded" />
      <input type="text" v-model="newEmployee.bio" placeholder="Bio" class="p-2 border rounded" />

      <!-- Image Preview -->
      <div class="p-2 border rounded col-span-2">
        <input type="file" @change="handlePhotoUpload" />
        <div v-if="previewUrl" class="mt-2">
          <img :src="previewUrl" alt="Image Preview" class="w-32 h-32 object-cover rounded" />
        </div>
      </div>

      <button type="submit" class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 col-span-2">
        Create
      </button>

    </form>

  </div>

  <!-- Existing Employees Section -->
  <div class="pt-10">
    <div class="grid grid-cols-4 gap-5">
      <div v-if="loading">Loading...</div>
      <div v-for="employee in employees" :key="employee._id">
        <EmployeeCard
          :employee="employee"
          :onDelete="deleteEmployee"
          :onEdit="updateEmployeeHandler"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { showEmployee } from '../../composables/useEmployees';
import { useImageUploadForCreate } from '../../composables/useImageUploadForCreate'; 
import type { Employee } from '../../interfaces/employees';

const {
  employees,
  error,
  loading,
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getTokenAndUserId,
} = showEmployee();

const { uploadImage, previewUrl } = useImageUploadForCreate();  // Destructure the image uploader composable

const newEmployee = ref({
  name: '',
  description: '',
  position: '',
  email: '',
  bio: '',
  profileImage: '',
  _createdBy: ''
});

onMounted(() => {
  fetchEmployees();
});

const addEmployeeHandler = async () => {
  const { userId } = getTokenAndUserId();
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
    console.log('Error', err);
  }
};

const handlePhotoUpload = async (event: Event) => {
  const photoInput = event.target as HTMLInputElement;
  if (!photoInput.files || photoInput.files.length === 0) return;

  const file = photoInput.files[0];
  const imageUrl = await uploadImage(file);

  if (imageUrl) {
    newEmployee.value.profileImage = imageUrl;  // Store the URL of the uploaded image
  }
};

const updateEmployeeHandler = async (employee: Employee) => {
  const updatedEmployee = {
    name: employee.name,
    description: employee.description,
    imageURL: employee.profileImage,
    position: employee.position,
    bio: employee.bio,
    email: employee.email,
  };
  await updateEmployee(employee._id, updatedEmployee);
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>
