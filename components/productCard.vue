<template>
  <div class="card text-center">
    <img :src="product.imageURL" alt="product thumb" class="thumb">
    <p class="front-bold text gray-500 m-4 truncate">{{ product.name }}</p>
    <NuxtLink :to="`/products/${product._id}`">
      <p class="btn my-4">View Details</p>
    </NuxtLink>
     <button @click="onDelete(product._id)" class="bg-red-600 text-white p-2 rounded hover:bg-red-700 mt-2">
      Delete
    </button>
  </div>
  
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/products';


const props = defineProps<{
  product: Product,
  onDelete: (id: string) => Promise<void>,
}>()
</script>

<style  scoped>
  .thumb {
    max-height: 120px;
    max-width: 70%;
    margin: 0 auto;
  }
</style>