<template>
  <div v-if="project">
    <Head>
      <Title>Projects page {{ project.name }}</Title>
      <Meta name="description" :content="project.description" />
    </Head>

    <!-- Send as a prob to productDetails-->
    <ProjectDetails 
    v-if="project"
    :project="project"
    />
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import { ref, onMounted } from 'vue';
import { showProject } from '~/composables/UseProjects';  
import type { Project } from '../../interfaces/projects';

const { projects, error, loading, fetchProjects } = showProject();

// to get the id from the url
const route = useRoute();
const id = route.params._id as string;

// ref to hold the current product
const project = ref<Project | null>(null);

// fetching products and find the specific product by matching id
const getSpecificProject = async () => {
await fetchProjects();
// .value because we use ref
project.value = projects.value.find((specificProj: Project) => specificProj._id === id) || null;
}

onMounted(() => {
  getSpecificProject()
})

/* 
// to get the id from the url
const route = useRoute();
console.log("Route params:", route.params); 
console.log("Fetched ID:", route.params._id); 
const id = route.params._id as string;
const uri = 'http://localhost:4000/api/products/' + id
 


/* // fetch products and save them as product
const { data: product } = await useFetch<Product>(uri, { key: id });

console.log("Route ID:", id);
console.log("Fetched product:", product.value);

if (!product.value) {
  throw createError({
    statusCode: 404,
    message: "The product you were searching for could not be found",
  });
}
*/

definePageMeta({
      layout: 'products'
  })

</script>

<style scoped>

</style>