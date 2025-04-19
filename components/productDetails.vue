<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10 ">
      <div class="p-7 ">
        <img :src="product.imageURL" alt="product" class="mx-auto my-7">
      </div>
      <div class="grid grid-cols-2 shadow-lg shadow-dark-400/100 p-4 ">
        <h2 class="text-4x1 my-7">{{ product.name }}</h2>
        <p class="text-xl my-7">Stock: {{ product.stock }}</p>
        <p class="text-xl my-7">Needed for project: {{ product.quantity }}</p>
        <p class="text-xl my-7">Supplier: {{ product.supplier }}</p>
        <p class="text-xl my-7">Order Date: {{ product.orderDate }}</p>
        <p class="text-xl my-7">Order Date: {{ product.arrivalDate }}</p>

        <h3 class="font-bold border-b-2 mb-4 pb-2">Product description:</h3>
        <p class="mb-7">{{ product.description }}</p>
        <button class="btn">
          <i class="material-icons mr-2">add_shopping_cart</i>
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/products';

const props = defineProps<{
  product: Product,
 
    }>()


</script>

<style scoped>

</style>