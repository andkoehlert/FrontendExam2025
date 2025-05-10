<template>
  <div v-if="post">
    <Head>
      <Title>Post {{ post.title }}</Title>
      <Meta name="description" :contents="post.content" />
    </Head>

    <!-- Send as a prob to productDetails-->
    <EditorNews
    v-if="post"
    :post="post"
    />
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})


import { ref, onMounted } from 'vue';
import { showPost } from '~/composables/editor';  // Import your composable
import type { Post } from '~/interfaces/post';

const { posts, error, loading, fetchPosts } = showPost();

// to get the id from the url
const route = useRoute();
const id = route.params._id as string;

// ref to hold the current product
const post = ref<Post | null>(null);

// fetching products and find the specific product by matching id
const getSpecificProduct = async () => {
await fetchPosts();
// .value because we use ref
post.value = posts.value.find((specificPost: Post) => specificPost._id === id) || null;
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
.ProseMirror {
border: none;
}
</style>