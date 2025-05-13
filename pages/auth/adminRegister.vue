<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img src="../../assets/images/login.jpeg" alt="product" class="mx-auto my-7">
      </div>
      <div class=""p-7>
       

      <div class="">
    <h2 class="pt-4">Create Admin user</h2>

<form class="flex flex-wrap">
      <input type="text" class="m-2 p-2 border-l hover:border-b focus:border-b border-blue-600 bg-transparent text-dark-300 focus:outline-none" placeholder="Name" v-model="name" />   <!-- v-model for name -->
      <input type="text" class="m-2 p-2 border-l hover:border-b focus:border-b border-blue-600 bg-transparent text-dark-300 focus:outline-none" placeholder="Email" v-model="email" /> <!-- v-model for email -->
      <input type="password" class="m-2 p-2 border-l hover:border-b focus:border-b border-blue-600 bg-transparent text-dark-300 focus:outline-none" placeholder="Password" v-model="password"  /> <!-- v-model for password -->
      <button class="bg-[#10B981] text-white p-2 rounded hover:bg-[#059669] w-full mt-4" @click.prevent="registerUser(name, email, password)" >Register</button> <!-- Register button -->
    </form>
  </div>
   
      </div>
      
    </div>
    
  </div>

</template>

<script setup>
import { useUsers } from '../../composables/auth/user';
import {ref} from 'vue'

const {fetchToken, registerUser, logout, name, email, password, user} = useUsers()

</script>

<style scoped>

</style>