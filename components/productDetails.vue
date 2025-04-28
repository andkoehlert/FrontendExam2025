<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10 ">
      <div class="p-7 ">
        <img :src="product.imageURL" alt="product" class="mx-auto my-7 max-h-80">
      </div>
      <div class="grid grid-cols-2 shadow-lg shadow-dark-400/100 p-4 ">
        <h3 class="font-bold border-b-2 mb-4 pb-2">Project name: 
        <span class="font-normal">{{ product.name }} </span></h3>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Stock: 
          <span class="font-normal">{{ product.stock }} </span></h3>
          <h3 class="font-bold border-b-2 mb-4 pb-2">Quantity needed: 
            <span class="font-normal">{{ product.quantity }} </span></h3>
            <h3 class="font-bold border-b-2 mb-4 pb-2">Supplier: 
              <span class="font-normal">{{ product.supplier }} </span></h3>
              <h3 class="font-bold border-b-2 mb-4 pb-2">Order date:
                <span class="font-normal">{{ product.orderDate }} </span></h3>
                <h3 class="font-bold border-b-2 mb-4 pb-2">Arrival Date: 
                  <span class="font-normal">{{ product.arrivalDate }} </span></h3>

        <h3 class="font-bold border-b-2 mb-4 pb-2 col-span-2 text-center">Product description:</h3>
        <p class="mb-7 col-span-2">{{ product.description }}</p>
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