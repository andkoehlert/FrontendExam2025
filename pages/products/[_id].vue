<template>
  <div>
    <head>
      <Title>Products page {{ product.title }}</Title>
      <Meta name="description" :content="product.description" />
    </head>

    <!-- Send as a prob to productDetails-->
    <ProductDetails :product="product"/>
  </div>
</template>

<script setup>

// to get the id from the url
const route = useRoute();
console.log("Route params:", route.params); 
console.log("Fetched ID:", route.params._id); 
const id = route.params._id;
const uri = 'http://localhost:4000/api/products/' + id

// fetch products and save them as product
const {data: product} = await useFetch(uri, {key: id})

console.log("Route ID:", id);
console.log("Fetched product:", product.value);

if (!product.value) {
  throw createError({
    statusCode: 404,
    message: "The product you were searching for could not be found",
  });
}


definePageMeta({
      layout: 'products'
  })

</script>

<style scoped>

</style>