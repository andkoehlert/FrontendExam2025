<template>
  <div v-if="product">
    <Head>
      <Title>Products page {{ product.name }}</Title>
      <Meta name="description" :content="product.description" />
    </Head>

    <!-- Send as a prob to productDetails-->
    <ProductDetails 
    v-if="product"
    :product="product"
    />
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
    layout: 'default' 

})


import { ref, onMounted } from 'vue';
import { showProduct } from '~/composables/useProducts';  // Import your composable
import type { Product } from '~/interfaces/products';

const { products, error, loading, fetchProducts } = showProduct();

// to get the id from the url
const route = useRoute();
const id = route.params._id as string;

// ref to hold the current product
const product = ref<Product | null>(null);

// fetching products and find the specific product by matching id
const getSpecificProduct = async () => {
await fetchProducts();
// .value because we use ref
product.value = products.value.find((specificProd: Product) => specificProd._id === id) || null;
}

onMounted(() => {
  getSpecificProduct()
})

/* 
// to get the id from the url
const route = useRoute();
console.log("Route params:", route.params); 
console.log("Fetched ID:", route.params._id); 
const id = route.params._id as string;
const uri = 'http://localhost:4000/api/products/' + id
 


/* // fetch products and save them as product
const { data: product } = await useFetch<Product>(uri, { key: id });

console.log("Route ID:", id);
console.log("Fetched product:", product.value);

if (!product.value) {
  throw createError({
    statusCode: 404,
    message: "The product you were searching for could not be found",
  });
}
*/

definePageMeta({
      layout: 'products'
  })

</script>

<style scoped>

</style>