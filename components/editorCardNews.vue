<template>
  <div class="card text-center">
    <h2 :src="post.title" alt="product thumb" class="thumb"></h2>
    <div class="">
      <h2 class="front-bold text gray-500 m-4 truncate">{{ post.title }}</h2>
   

    <NuxtLink :to="`/editor/news/${post._id}`">
      <p class="btn my-4">View post</p>
    </NuxtLink>
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