<template>
  <div class="card text-center">
    <img :src="product.imageURL" alt="product thumb" class="thumb">
    <p class="front-bold text gray-500 m-4 truncate">{{ product.name }}</p>
    <NuxtLink :to="`/products/${product._id}`">
      <p class="btn my-4">View Details</p>
    </NuxtLink>
  </div>
</template>

<script setup>
  const {product} = defineProps(['product'])
</script>

<style  scoped>
  .thumb {
    max-height: 120px;
    max-width: 70%;
    margin: 0 auto;
  }
</style>