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
          <li><NuxtLink v-if="isLoggedIn" to="/dashboard/dashboard" class="py-2 px-4">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/about" class="py-2 px-4">About</NuxtLink></li>
        <li class="relative" v-if="isLoggedIn">
  <button
    @click="isDropdownOpen = !isDropdownOpen"
    class="py-2 px-4 flex items-center gap-1 hover:bg-gray-100 rounded"
  >
    Create
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <div
    v-if="isDropdownOpen"
    class="absolute top-full mt-1 w-48 bg-white shadow-lg border rounded z-50"
  >
    <NuxtLink
      to="/products/createProduct"
      class="block px-4 py-2 hover:bg-gray-100"
    >
      Create Product
    </NuxtLink>
      <NuxtLink
      to="/editor/editor"
      class="block px-4 py-2 hover:bg-gray-100"
    >
      Editor
    </NuxtLink>
    <NuxtLink
      to="/projects/createProject"
      class="block px-4 py-2 hover:bg-gray-100"
    >
      Create Project
    </NuxtLink>
    <NuxtLink
      to="/employee/createEmployee"
      class="block px-4 py-2 hover:bg-gray-100"
    >
      Create Employee
    </NuxtLink>
  </div>
</li>
          <li v-if="!isLoggedIn">
  <NuxtLink to="/auth/login" class="py-2 px-4">Login</NuxtLink>
</li>
<li v-else>
  <button @click="logout" class="py-2 px-4 hover:underline">Logout</button>
</li>
          
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
import {useAuthState} from '../composables/auth/useAuthState'
import {useUsers} from '../composables/auth/user'
const isDropdownOpen = ref(false);

const isLoggedIn = useAuthState()
const {logout} = useUsers()

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
