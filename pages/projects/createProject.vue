<template>
  <div class="card"> 
    <h1>Create Project</h1>

    <div class="text-center text-red-500">{{ error }}</div>
    <div class="">
  
</div> 
  </div>
<!--Existing products-->
  <div class="pt-10">
    <div class="grid grid-cols-4 gap-5">
      <div v-if="loading">Loading...</div>
      <div v-for="project in projects" :key="project._id">
        <ProjectCard 
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
import type { Project } from '~/interfaces/projects';
const {projects, error, loading, fetchProjects} = showProject();

onMounted(() => {
  fetchProjects();
});


</script>

<style  scoped>
h1 {
  font-size: 3rem;
}
</style>