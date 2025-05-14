<template>
  <div class="card">
    <h1>Create Project</h1>

    <div class="text-center text-red-500">{{ error || productsError }}</div>
    <div class="">
      <form @submit.prevent="addProjectHandler" class="grid md:grid-cols-2 grid-cols-2 gap-10">
        <input type="text" v-model="newProject.name" placeholder="Name" class="p-2 border rounded" required />
        <input type="text" v-model="newProject.description" placeholder="Description" class="p-2 border rounded" required />
        <input type="text" v-model="newProject.lokation" placeholder="Location" class="p-2 border rounded" required />
        
        <select v-model="newProject.status" class="p-2 border rounded" required>
          <option value="" disabled>Select Status</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="delayed">Delayed</option>
        </select>
        
        <input type="text" v-model="newProject.contract" placeholder="Contract" class="p-2 border rounded h-10" />

        <!-- Date Inputs -->
        <div class="p-2 border rounded">
          <span class="uppercase font-bold">Start date: </span>
          <input type="date" v-model="newProject.startDate" class="p-2 border rounded" />
        </div>

        <div class="p-2 border rounded">
          <span class="uppercase font-bold">End date: </span>
          <input type="date" v-model="newProject.endDate" class="p-2 border rounded" />
        </div>
        <input type="number" v-model="newProject.price" placeholder="Price" class="p-2 border rounded" required />
        
<!-- Product Selection Section -->
<div class="col-span-2 border p-4 rounded-lg">
  <h3 class="text-lg font-semibold mb-4">Select Products</h3>

  <div v-if="productsLoading" class="text-center">Loading products...</div>
  <div v-else-if="productsError" class="text-red-500 text-center">{{ productsError }}</div>
  <div v-else class="space-y-4">
    
    <div class="flex items-center gap-4">
      <select v-model="newProductSelection.productId" class="p-2 border rounded w-full">
        <option value="">Select Product</option>
        <option v-for="product in availableProducts" :key="product._id" :value="product._id">
          {{ product.name }} (Stock: {{ product.stock }})
        </option>
      </select>

      <input
        type="number"
        v-model.number="newProductSelection.quantity"
        min="1"
        placeholder="Qty"
        class="w-20 p-2 border rounded"
      />

      <button type="button" @click="addProductToProject" class="bg-gray-200 p-2 rounded hover:bg-gray-300">
        Add Product
      </button>
    </div>

    <!-- Show added products -->
    <ul class="space-y-1 text-sm text-gray-700 mt-4">
      <li v-for="(prod, index) in newProject.products" :key="index" class="flex justify-between">
        <span>
          {{ getProductName(prod.productId) }} — Qty: {{ prod.quantity }}
        </span>
        <button type="button" class="text-red-500 hover:underline" @click="removeProduct(index)">
          Remove
        </button>
      </li>
    </ul>
  </div>
</div>

        <!-- Employee Selection Section -->
<div class="col-span-2 border p-4 rounded-lg">
  <h3 class="text-lg font-semibold mb-4">Select Employees</h3>

  <div v-if="employeesLoading" class="text-center">Loading employees...</div>
  <div v-else-if="employeesError" class="text-red-500 text-center">{{ employeesError }}</div>
  <div v-else class="space-y-3">
    <div v-for="employee in availableEmployees" :key="employee._id" class="flex items-center gap-4 p-2 hover:bg-gray-50 rounded">
      <input
        type="checkbox"
        :id="`employee-${employee._id}`"
        :value="employee._id"
        v-model="selectedEmployeeIds"
        class="h-5 w-5"
      >
      <label :for="`employee-${employee._id}`" class="flex-1">
        <span class="font-medium">{{ employee.name }}</span>
        <span class="text-sm text-gray-500 ml-2">({{ employee.position }})</span>
      </label>
    </div>
  </div>
</div>

        <button type="submit" class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 col-span-2">
          Create Project
        </button>
      </form>
    </div>

    <!-- Existing projects -->
    <div class="pt-10">
      <div class="grid md:grid-cols-4 grid-cols-1 gap-5">
        <div v-if="loading">Loading projects...</div>
        <div v-for="project in projects" :key="project._id">
          <ProjectCard
            :onDelete="deleteProject"  
            :project="project" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})


import { ref, onMounted } from 'vue';
import { showProject } from '../../composables/UseProjects';
import { showProduct } from '../../composables/useProducts';
import { showEmployee} from '../../composables/useEmployees'
import type { Project } from '../../interfaces/projects';

// Initialize project composable
const {
  projects,
  error,
  loading,
  fetchProjects,
  deleteProject,
  addProject,
  getTokenAndUserId
} = showProject();



// Initialize product composable
const {
  products: availableProducts,
  loading: productsLoading,
  error: productsError,
  fetchProducts
} = showProduct();

// Initialize employees composable
const {
  employees: availableEmployees,
  loading: employeesLoading,
  error: employeesError,
  fetchEmployees
} = showEmployee();


// Selected products state
const selectedProductIds = ref<string[]>([]);
const productQuantities = ref<Record<string, number>>({});
const selectedEmployeeIds = ref<string[]>([]);

const newProductSelection = ref({ productId: '', quantity: 1 });

const addProductToProject = () => {
  const { productId, quantity } = newProductSelection.value;

  if (!productId || quantity < 1) return;
  const product = availableProducts.value.find(p => p._id === productId);
  
  if (!product) {
    alert('Selected product not found.');
    return;
  }

  if (quantity > product.stock) {
    alert(`Not enough stock for ${product.name}. Only ${product.stock} left.`);
    return;
  }

  newProject.value.products.push({ productId, quantity });
  newProductSelection.value = { productId: '', quantity: 1 };
};

const removeProduct = (index: number) => {
  newProject.value.products.splice(index, 1);
};

const getProductName = (productId: string) => {
  const product = availableProducts.value.find(p => p._id === productId);
  return product ? product.name : 'Unknown';
};

// Project form data
const newProject = ref({
  name: '',
  description: '',
  lokation: '',
  startDate: '',
  endDate: '',
  price: '',
  totalPrice: '',
  status: '',
  contract: 'not-signed',
  _createdBy: '',
  products: [] as Array<{ productId: string; quantity: number }>,
  employees: [] as Array<{ employeeId: string}>
});

// Fetch data when component mounts
onMounted(async () => {
  await fetchProjects();
  await fetchProducts();
  await fetchEmployees();
  
  // Initialize quantities for all products
  availableProducts.value.forEach(product => {
    productQuantities.value[product._id] = 1;
  });
});

// Validate quantity doesn't exceed stock
const validateQuantity = (productId: string) => {
  const product = availableProducts.value.find(p => p._id === productId);

  if (product && productQuantities.value[productId] > product.stock) {
    productQuantities.value[productId] = product.stock;
  }
};

const addProjectHandler = async () => {
  const { userId } = getTokenAndUserId();
  
if (newProject.value.products.length === 0) {
  alert("Please add at least one product.");
  return;
}

  if (selectedEmployeeIds.value.length === 0 ) {
    alert("Please select at least one employee.")
    return;
  }

  if (newProject.value.products.length === 0) {
  alert("Please add at least one product.");
  return;
}
  // Prepare products array from selections
/*   newProject.value.products = selectedProductIds.value.map(productId => ({
    productId,
    quantity: productQuantities.value[productId] || 1
  }));
 */
  newProject.value.employees = selectedEmployeeIds.value.map(id => ({employeeId: id}));


  const normalizeDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setUTCHours(12, 0, 0, 0); // Set to noon UTC to avoid timezone shift
  return date;
};

  const projectToAdd = {
    ...newProject.value,
    _createdBy: userId,
    startDate: newProject.value.startDate ? normalizeDate(newProject.value.startDate) : undefined,
    endDate: newProject.value.endDate ? normalizeDate(newProject.value.endDate) : undefined,
 };

  try {
    await addProject(projectToAdd);
    
    // Reset form after successful submission
    newProject.value = {
      name: '',
      description: '',
      lokation: '',
      startDate: '',
      endDate: '',
      status: '',
      price: '',
      totalPrice: '',
      contract: '',
      _createdBy: '',
      products: [],
      employees: [],
    };
    selectedProductIds.value = [];
    
    // Refresh projects list
    await fetchProjects();
    await fetchProducts();
  } catch (err) {
  //  console.error('Error creating project:', err);
  }
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
.card {
  @apply p-6 bg-white rounded-lg shadow-md;
}
</style>