<template>
  
  <div class="card"> 
    <h1>Create Product</h1>

    <div class="text-center text-red-500">{{ error }}</div>
    <div class="">
      <form @submit.prevent="addProductHandler" class="grid grid-cols-2 gap-10">
        
        <input type="text" v-model="newProduct.name" placeholder="Name" class="p-2 border rounded" required  />
        <input type="text" v-model="newProduct.description"  placeholder="Description" class="p-2 border rounded" /> <!-- Product description -->
        <input type="text" v-model="newProduct.category"  placeholder="Category" class="p-2 border rounded" /> <!-- Product description -->
        <input type="text" v-model="newProduct.supplier"  placeholder="supplier" class="p-2 border rounded" /> <!-- Product description -->
        <input type="date" v-model="newProduct.orderDate"  placeholder="orderDate" class="p-2 border rounded" /> <!-- Product description -->
        <input type="date" v-model="newProduct.arrivalDate"  placeholder="arrivalDate" class="p-2 border rounded" /> <!-- Product description -->
        <input type="text"  v-model="newProduct.imageURL" placeholder="Image URL" class="p-2 border rounded h-10" /> <!-- Image URL -->
   
        <div class="p-2 border rounded">
        <span class="uppercase font-bold">Product Stock: </span>
        <input type="number" v-model="newProduct.stock"  placeholder="Stock" class=" pl-2 " />  <!-- Product stock -->
        </div>

        <div class="p-2 border rounded">
        <span class="uppercase font-bold">Product quantity: </span>
        <input type="number" v-model="newProduct.quantity"  placeholder="quantity" class=" pl-2 " />  <!-- Product stock -->
        </div>
        <div class="p-2 border rounded col-span-2">
  <input type="file" @change="handlePhotoUpload" />
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
      <div v-for="product in products" :key="product._id">
        <ProductCard 
        :product="product" 
        :onDelete="deleteProduct" 
        :onEdit="updateProductHandler"
        />

      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">


import {ref} from 'vue';
import { onMounted } from 'vue';
import { showProduct } from '../../composables/useProducts';
import type { Product } from '~/interfaces/products';
const {products, error, loading, updateProduct, fetchProducts, addProduct, getTokenAndUserId, deleteProduct} = showProduct();

onMounted(() => {
  fetchProducts();
});

const addProductHandler = async () => {
  const {userId} = getTokenAndUserId();
  newProduct.value._createdBy = userId;
 
  const productToAdd = {
  ...newProduct.value
};

  try {
    await addProduct(productToAdd);

    newProduct.value = {
     name: '',
     description: '',
      imageURL: '',
      category: '',
      quantity: 0,
      stock: 0,
      supplier: '',
      orderDate: '',
      arrivalDate: '',
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

    newProduct.value.imageURL = data.url; 
  } catch (err) {
    console.error('Image upload failed:', err);
  }
};

const newProduct = ref({
      name: '',
      description: '',
      imageURL: '',
      category: '',
      quantity: 0,
      stock: 0,
      supplier: '',
      orderDate: '',
      arrivalDate: '',
      _createdBy: ''
})

const updateProductHandler = async (product: Product) => {
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
}


</script>

<style  scoped>
h1 {
  font-size: 3rem;
}
</style>