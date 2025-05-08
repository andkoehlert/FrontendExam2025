<template>
  <div v-if="employee">
    <Head>
      <Title>Employees page {{ employee.name }}</Title>
      <Meta name="description" :content="employee.description" />
    </Head>

    <!-- Send as a prob to EmployeeDetails-->
    <EmployeeDetails 
    v-if="employee"
    :employee="employee"
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
import { showEmployee } from '../../composables/useEmployees';  // Import your composable
import type { Employee } from '~/interfaces/employees';

const { employees, error, loading, fetchEmployees } = showEmployee();

// to get the id from the url
const route = useRoute();
const id = route.params._id as string;

// ref to hold the current product
const employee = ref<Employee | null>(null);

// fetching products and find the specific product by matching id
const getSpecificEmployee = async () => {
await fetchEmployees();
// .value because we use ref
employee.value = employees.value.find((specificEmpl: Employee) => specificEmpl._id === id) || null;
}

onMounted(() => {
  getSpecificEmployee()
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