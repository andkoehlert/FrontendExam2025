<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img src="../../assets/images/login.jpeg" alt="product" class="mx-auto my-7">
      </div>
      <div class="p-7">
        <div class="">
          <h2 class="pt-4">Create Admin user</h2>
          
          <div v-if="showSuccess" class="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Admin user created successfully!
          </div>

     

          <form class="flex flex-wrap">
            <input type="text" class="m-2 p-2 border-l hover:border-b focus:border-b border-blue-600 bg-transparent text-dark-300 focus:outline-none" 
                   placeholder="Name" v-model="localName" />
            <input type="email" class="m-2 p-2 border-l hover:border-b focus:border-b border-blue-600 bg-transparent text-dark-300 focus:outline-none" 
                   placeholder="Email" v-model="localEmail" />
            <input type="password" class="m-2 p-2 border-l hover:border-b focus:border-b border-blue-600 bg-transparent text-dark-300 focus:outline-none" 
                   placeholder="Password" v-model="localPassword" />
            <button class="bg-[#10B981] text-white p-2 rounded hover:bg-[#059669] w-full mt-4" 
                    @click.prevent="handleRegister" 
                    :disabled="isLoading">
              {{ isLoading ? 'Registering...' : 'Register' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUsers } from '../../composables/auth/user';
import { ref } from 'vue'

const { registerUser, error } = useUsers()
const showSuccess = ref(false)
const isLoading = ref(false)

const localName = ref('')
const localEmail = ref('')
const localPassword = ref('')

const handleRegister = async () => {
  isLoading.value = true
  showSuccess.value = false
  error.value = null 
  
  try {
    await registerUser(localName.value, localEmail.value, localPassword.value)
    
    showSuccess.value = true
    
    localName.value = ''
    localEmail.value = ''
    localPassword.value = ''
    
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } catch (err) {
   // console.error('Registration error:', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
</style>