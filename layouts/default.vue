<template>
  <div>
  <header class="shadow-sm bg-white">
    <nav class="container mx-auto p-4 flex justify-between">
      <NuxtLink to="/" class="font-bold">Industri</NuxtLink>
      <ul class="flex gap-10">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/products/createProduct">Create product</NuxtLink></li>

        <li><NuxtLink to="/products" class="">Products</NuxtLink></li>
        <li><NuxtLink to="/auth/login">Login</NuxtLink></li>

      </ul>
    </nav>
  </header>


  <!--page content-->

  <div class="container mx-auto p-4">
    <slot />
  </div>
</div>


</template>

<script setup>

</script>

<style  scoped>
.router-link-exact-active {

}
</style>