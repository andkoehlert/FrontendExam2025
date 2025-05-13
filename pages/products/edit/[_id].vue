<template>
  <div class="card"> 
    <h1>Edit Product</h1>

    <div class="text-center text-red-500">{{ error }}</div>

    <div v-if="loading">Loading...</div>
    <div v-if="product">
      <form @submit.prevent="updateProductHandler" class="grid grid-cols-2 gap-10">

        <input type="text" v-model="product.name" placeholder="Name" class="p-2 border rounded" />
        <input type="text" v-model="product.description" placeholder="Description" class="p-2 border rounded" />
        <input type="text" v-model="product.category" placeholder="Category" class="p-2 border rounded" />
        <input type="text" v-model="product.supplier" placeholder="Supplier" class="p-2 border rounded" />
        <input type="date" v-model="product.orderDate" placeholder="Order Date" class="p-2 border rounded" />
        <input type="date" v-model="product.arrivalDate" placeholder="Arrival Date" class="p-2 border rounded" />
        <div class="p-2 border rounded col-span-2">
  <input type="file" @change="handlePhotoUpload" />
</div>

<div class="col-span-2">
  <p>Current image preview:</p>
  <img 
    v-if="product.imageURL" 
    :src="product.imageURL" 
    alt="Product Image" 
    class="w-32 h-32 object-cover rounded border"
  />
</div>

        <div class="p-2 border rounded">
        <span class="uppercase font-bold">Product Stock: </span>
        <input type="number" v-model="product.stock"  placeholder="Stock" class=" pl-2 " />  <!-- Product stock -->
        </div>

        <div class="p-2 border rounded">
        <span class="uppercase font-bold">Product quantity: </span>
        <input type="number" v-model="product.quantity"  placeholder="quantity" class=" pl-2 " />  <!-- Product stock -->
        </div>

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
<!--Existing products-->
  <div class="pt-10">
    <div class="grid grid-cols-4 gap-5">
      <div v-if="loading">Loading...</div>
      <div v-else-if="product">
        <ProductEdit
        :product="product" 
        :onEdit="updateProductHandler"
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
import { showProduct } from '../../../composables/useProducts';
import type { Product } from '~/interfaces/products';
import { useImageUploadForCreate } from '../../../composables/useImageUploadForCreate';

const { products, updateProduct, fetchProducts} = showProduct();
const { uploadImage } = useImageUploadForCreate(ref(null));

// to get the id from the url
const route = useRoute();
const id = route.params._id as string;

const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref('');

const getSpecificProduct = async () => {
  try {
    await fetchProducts();
    product.value = products.value.find((specificProd: Product) => specificProd._id === id) || null;
    if (!product.value) error.value = 'Product not found';
  } catch (e) {
    error.value = 'Error fetching product';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getSpecificProduct();
});

const handlePhotoUpload = async (event: Event) => {
  const photoInput = event.target as HTMLInputElement;
  if (photoInput.files && photoInput.files[0]) {
    const file = photoInput.files[0];
    const imageUrl = await uploadImage(file);  
    if (imageUrl && product.value) { 
      product.value.imageURL = imageUrl;
    }
  }
};

const updateProductHandler = async () => {
  if (!product.value) return;


const updatedData = {
  name: product.value.name,
    description: product.value.description,
    category: product.value.category,
    supplier: product.value.supplier,
    orderDate: product.value.orderDate,
    arrivalDate: product.value.arrivalDate,
    imageURL: product.value.imageURL,
    stock: product.value.stock,
    quantity: product.value.quantity,
};

try {
  await updateProduct(product.value._id, updatedData);
  alert('Product updated succesfully');

} catch (e) {
  error.value = ' Failed to update product'
}
}


</script>

<style lang="scss" scoped>

</style>