<template>
  <div class="card text-center">
    <h2 :src="post.title" alt="product thumb" class="thumb"></h2>
    <div class="">
      <h2 class="front-bold text gray-500 m-4 truncate">{{ post.title }}</h2>
    <h2 class="front-bold text gray-500 m-4 truncate">{{ post.authorId }}</h2>
   

    <NuxtLink :to="`/editor/${post._id}`">
      <p class="btn my-4">View post</p>
    </NuxtLink>

    <div class="flex gap-10 justify-center">




  <!--   <button @click="onEdit(product)" class="bg-green-600 text-white p-2 rounded hover:bg-red-700 mt-2">
  Edit
</button> test -->
  </div>
</div>
  </div>
  
</template>

<script setup lang="ts">
import type { Post } from '~/interfaces/post';


const props = defineProps<{
  post: Post,
 

    }>()
</script>

<style  scoped>

</style>