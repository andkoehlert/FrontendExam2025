<template>
  <div class="card"> 
    <h1>Create Project</h1>

    <div class="text-center text-red-500">{{ error }}</div>
    <div class="">
      <form @submit.prevent="addProjectHandler" class="grid grid-cols-2 gap-10">
        <input type="text" v-model="newProject.name" placeholder="Name" class="p-2 border rounded" />
        <input type="text" v-model="newProject.description"  placeholder="Description" class="p-2 border rounded" /> <!-- Product description -->
        <input type="text" v-model="newProject.lokation"  placeholder="Lokation" class="p-2 border rounded" /> <!-- Product description -->
        <input type="text" v-model="newProject.status"  placeholder="status" class="p-2 border rounded" /> <!-- Product description -->
        <input type="text"  v-model="newProject.contract" placeholder="Contract" class="p-2 border rounded h-10" /> <!-- Image URL -->
   
        <div class="p-2 border rounded">
        <span class="uppercase font-bold">Start date : </span>
        <input type="date" v-model="newProject.startDate"  placeholder="StartDate" class="p-2 border rounded" /> <!-- Product description -->
        </div>

        <div class="p-2 border rounded">
        <span class="uppercase font-bold">End date: </span>
        <input type="date" v-model="newProject.endDate"  placeholder="endDate" class="p-2 border rounded" /> <!-- Product description -->
        </div>

        <button type="submit" class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 col-span-2">
        Create
        </button>

      </form>
</div> 
  </div>
<!--Existing products-->
  <div class="pt-10">
    <div class="grid grid-cols-4 gap-5">
      <div v-if="loading">Loading...</div>
      <div v-for="project in projects" :key="project._id">
        <ProjectCard
        :onDelete="deleteProject"  
        :project="project" 
        />

      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { onMounted } from 'vue';
import { showProject } from '../../composables/UseProjects';
import type {Project } from '../../interfaces/projects'
const {projects, error, loading, fetchProjects, deleteProject, addProject, getTokenAndUserId} = showProject();

onMounted(() => {
  fetchProjects();
});



const addProjectHandler = async () => {
  const {userId} = getTokenAndUserId();
  newProject.value._createdBy = userId;
 
  const projectToAdd = {
    ...newProject.value,
    startDate: newProject.value.startDate ? new Date(newProject.value.startDate) : undefined,
    endDate: newProject.value.endDate ? new Date(newProject.value.endDate) : undefined,
  };

  try {
    await addProject(projectToAdd);

    newProject.value = {
      name: '',
      description: '',
      lokation: '',
      startDate: '',
      endDate: '',
      status: '',
      contract: 'not-started',
      _createdBy: ''
    };
  } catch (err) {
    console.log('Error', err)
  }
}

const newProject = ref({
  name: '',
      description: '',
      lokation: '',
      startDate: '',
      endDate: '',
      status: '',
      contract: 'not-started',
      _createdBy: ''
})



</script>

<style  scoped>
h1 {
  font-size: 3rem;
}
</style>