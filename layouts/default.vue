<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between items-center">
        <NuxtLink to="/" class="font-bold">
          <img src="../assets/images/logobrick.png" class="h-12" alt="Logo">
        </NuxtLink>

        <!-- Hamburger Button (vises kun på mobil) -->
        <button @click="toggleMenu" class="lg:hidden text-2xl">
          <span class="material-icons">menu</span>
        </button>

        <!-- Navbar Links -->
        <ul :class="{'flex-col': isMenuOpen, 'hidden': !isMenuOpen, 'lg:flex': true, 'lg:flex-row': !isMenuOpen}" class="flex gap-10 items-center transition-all">
          <li><NuxtLink to="/" class="py-2 px-4">Home</NuxtLink></li>
          <li><NuxtLink to="/about" class="py-2 px-4">About</NuxtLink></li>
          <li><NuxtLink to="/products/createProduct" class="py-2 px-4">Create product</NuxtLink></li>
          <li><NuxtLink to="/projects/createProject" class="py-2 px-4">Create project</NuxtLink></li>
          <li><NuxtLink to="/employee/createEmployee" class="py-2 px-4">Create Employee</NuxtLink></li>

          <li><NuxtLink to="/products" class="py-2 px-4">Products</NuxtLink></li>
          <li><NuxtLink to="/auth/login" class="py-2 px-4">Login</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <!-- Page content -->
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Reaktiv tilstand til at styre åbning/lukning af menu
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style scoped>
.router-link-exact-active {
  font-weight: bold;
}
</style>
