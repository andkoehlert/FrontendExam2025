<template>
  <div class="card text-center">
    <img :src="product.imageURL" alt="product thumb" class="thumb">
      <p class="front-bold text gray-500 m-4 truncate">{{ product.name }}</p>
        <input type="text" v-model="product.name"  placeholder="Name" class="p-2 border rounded" /> <!-- Product name -->
          
    
  <div class="flex gap-10 justify-center">
  
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
    // onEdit: (product: Product) => Promise<void> 
    }>()
</script>

<style  scoped>

</style>