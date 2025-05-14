<template>
  <div class="card">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="p-7">
        <img src="../../assets/images/login.jpeg" alt="product" class="mx-auto my-7">
      </div>
      <div class="p-7">
        <h3 class="font-bold border-b-2 mb-4 pb-2">Login for admin</h3>
        <p class="text-gray-800 mb-2">Please be patient. It can take some time for the server to login.</p>
        
        <div v-if="message.text" 
             :class="['mb-4 p-3 rounded', message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
          {{ message.text }}
        </div>
        
        <input type="email" 
               class="m-2 p-2 border-l hover:border-b focus:border-b border-blue-600 bg-transparent text-dark-300 focus:outline-none" 
               placeholder="Email" 
               v-model="email" />
      
        <input type="password" 
               class="m-2 p-2 border-l hover:border-b focus:border-b border-blue-600 bg-transparent text-dark-300 focus:outline-none" 
               placeholder="Password" 
               v-model="password" />

        <div class="flex gap-4 mt-4">
          <button @click="handleLogin" 
                  class="btn flex" 
                  :disabled="isLoading">
            <i class="material-icons mr-2"><span class="material-symbols-outlined">login</span></i>
            <span>{{ isLoading ? 'Logging in...' : 'Login' }}</span>
          </button>
          <button @click="handleLogout" class="btn flex gap-2">
            <i class="material-icons mr-2 order-2"><span class="material-symbols-outlined">logout</span></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUsers } from '../../composables/auth/user';
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { fetchToken, logout, email, password, error } = useUsers()

const isLoading = ref(false)
const message = ref({
  text: '',
  type: '' 
})

watch(error, (newError) => {
  if (newError) {
    message.value = {
      text: newError,
      type: 'error'
    }
  }
})

const clearMessage = () => {
  message.value = { text: '', type: '' }
  if (error.value) error.value = null
}

const handleLogin = async () => {
  clearMessage()
  isLoading.value = true
  
  try {
    await fetchToken(email.value, password.value)
    
    if (!error.value) {
      message.value = {
        text: 'Login successful! Redirecting...',
        type: 'success'
      }
      setTimeout(() => router.push('/dashboard/dashboard'), 1500)
    }
  } catch (err) {
    if (!error.value) {
      message.value = {
        text: 'Login failed. Please check your credentials.',
        type: 'error'
      }
    }
  } finally {
    isLoading.value = false
  }
}

const handleLogout = async () => {
  clearMessage()
  try {
    await logout()
    message.value = {
      text: 'Logged out successfully',
      type: 'success'
    }
  } catch (err) {
    message.value = {
      text: 'Logout failed',
      type: 'error'
    }
  }
}
</script>

<style scoped>
.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

[class*='bg-'] {
  transition: all 0.3s ease;
}
</style>