<template>
  <div class="card text-center">
    <img :src="product.imageURL" alt="product thumb" class="thumb">
    <p class="front-bold text gray-500 m-4 truncate">{{ product.name }}</p>
    <input type="text" v-model="product.name"  placeholder="Name" class="p-2 border rounded" /> <!-- Product name -->

    <NuxtLink :to="`/products/${product._id}`">
      <p class="btn my-4">View Details</p>
    </NuxtLink>
    <div class="flex gap-10 justify-center">
     <button @click="onDelete(product._id)" class="bg-red-600 text-white p-2 rounded hover:bg-red-700 mt-2">
      Delete
    </button>
    <NuxtLink :to="`/products/edit/${product._id}`">
  <button class="bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-2">
    Edit
  </button>
</NuxtLink>
  <!--   <button @click="onEdit(product)" class="bg-green-600 text-white p-2 rounded hover:bg-red-700 mt-2">
  Edit
</button> -->
  </div>
  </div>
  
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/products';


const props = defineProps<{
  product: Product,
  onDelete: (id: string) => Promise<void>,
    onEdit: (product: Product) => Promise<void> 
    }>()
</script>

<style  scoped>
  .thumb {
    max-height: 120px;
    max-width: 70%;
    margin: 0 auto;
  }
</style>