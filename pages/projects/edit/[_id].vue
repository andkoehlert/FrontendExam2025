<template>
  <div class="card"> 
    <h1>Edit Project</h1>

    <div class="text-center text-red-500">{{ error }}</div>

    <div v-if="loading">Loading...</div>
    <div v-if="project">
      <form @submit.prevent="updateProjectHandler" class="grid grid-cols-2 gap-10">

        <input type="text" v-model="project.name" placeholder="Name" class="p-2 border rounded" />
        <input type="text" v-model="project.description" placeholder="Description" class="p-2 border rounded" />
        <input type="text" v-model="project.lokation" placeholder="Lokation" class="p-2 border rounded" />
        <input type="text" v-model="project.startDate" placeholder="Start Date" class="p-2 border rounded" />
        <input type="date" v-model="project.endDate" placeholder="End Date" class="p-2 border rounded" />
        <input type="date" v-model="project.status" placeholder="Arrival Date" class="p-2 border rounded" />
        <input type="text" v-model="project.contract" placeholder="Image URL" class="p-2 border rounded h-10" />

   

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
<!--Existing project-->
  <div class="pt-10">
    <div class="grid grid-cols-4 gap-5">
      <div v-if="loading">Loading...</div>
      <div v-else-if="project">
        <ProjectEdit
        :project="project" 
        :onEdit="updateProjectHandler"
        />
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { onMounted } from 'vue';
import { showProject } from '../../../composables/UseProjects';
import type { Project } from '~/interfaces/projects';

const { projects, updateProject, fetchProjects} = showProject();

// to get the id from the url
const route = useRoute();
const id = route.params._id as string;

const project = ref<Project | null>(null);
const loading = ref(true);
const error = ref('');

const getSpecificProject = async () => {
  try {
    await fetchProjects();
    project.value = projects.value.find((specificProj: Project) => specificProj._id === id) || null;
    if (!project.value) error.value = 'Product not found';
  } catch (e) {
    error.value = 'Error fetching product';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getSpecificProject();
});


const updateProjectHandler = async () => {
  if (!project.value) return;


const updatedData = {
    name: project.value.name,
    description: project.value.description,
    lokation: project.value.lokation,
    startDate: project.value.startDate,
    endDate: project.value.endDate,
    status: project.value.status,
    contract: project.value.contract,
    
};

try {
  await updateProject(project.value._id, updatedData);
  alert('Product updated succesfully');

} catch (e) {
  error.value = ' Failed to update product'
}
}


</script>

<style lang="scss" scoped>

</style>