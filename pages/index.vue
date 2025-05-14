<template>

  
<!-- <div class="absolute top-0 left-0 h-full w-8 bg-orange-500"></div>
<div class="absolute top-0 right-0 h-full w-8 bg-orange-500"></div>
   -->


<div class="h-full grid grid-cols-12 relative ">
  <div class="flex  col-span-8 flex-col justify-center items-start rounded-xl   ">
    <div class=" border-l-4 border-black pl-10">
      <h3 class="ewh3 text-orange-500">ThreeBlock...</h3>
    <h1 class="font-bold">Everything you need for building</h1>
    <p>ThreeBlock provides all building blocks for your dream project</p>
    <p>We do Everything from houses...</p>
  </div>
  </div>

  <div class="flex col-span-4 flex-col justify-center items-center">
   <div class="herosection w-[70vh] h-[70vh] rounded-xl ">
    <img src="../assets/images/herosection2.png" class="herosection" />

   </div>
  </div>
</div>

  <div class="pt-10">
  <h2>Latest news..</h2>

    <div class="grid md:grid-cols-4 grid-cols-1 gap-5">
      <div v-if="loading">Loading...</div>
      <div v-for="post in posts" :key="post._id">
        <EditorCardNews 
        :post="post" 
        />
      </div>
      </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { showPost } from '../composables/editor';
import type { Post } from '~/interfaces/post';
const {posts, error, loading, fetchPosts, } = showPost();

onMounted(() => {
  fetchPosts();
});
</script>

<style  scoped>


.grid {
  position: relative; /* gør grid-containeren til en reference for den absolutte positionering */
  background-image: linear-gradient(to right, rgba(236, 156, 7, 0.308) 1px, transparent 1px);
  background-size: 300px 100%; /* linjer hver 50px i bredden */
}

.herosection {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  

}



</style>