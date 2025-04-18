<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
      <div v-for="product in products" :key="product._id">
        <ProductCard v-if="product"
        :product="product" 
        :onDelete="deleteProduct"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { showProduct } from '../../composables/useProducts';

const {loading, error, products, fetchProducts, deleteProduct} = showProduct();

onMounted(() => {
  fetchProducts();
});

  definePageMeta({
    layout: 'products'
  })

  useHead({
    title: 'Products page',
    meta: [
      {name: 'description', content: 'This is the product page'}
    ]
  })


</script>

<style  scoped>

</style>