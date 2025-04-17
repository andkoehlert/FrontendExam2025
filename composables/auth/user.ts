import { ref } from 'vue';
import type { User } from '../../interfaces/users';
import { useAuthState } from '../auth/useAuthState';
import type { LoginResponse } from '../../interfaces/auth';
import { useFetch } from '#app'
import type {AuthResponse} from '../../composables/auth/auth'


export const useUsers = () => {
  
  // state management
  const isLoggedIn = useAuthState(); 

  const token = ref<string | null>(null);
  const error = ref<string | null>(null);
  const user = ref<User | null>(null);

  const name = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const router = useRouter()

 // login logic
const fetchToken = async (email: string, password: string): Promise<void> => {
try {
  const response = await fetch('http://localhost:4000/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('lsToken') || ''  
    },
    body: JSON.stringify({email, password})
  })

  if (!response.ok) {
    const errorRespone = await response.json()
    console.log(errorRespone.error || 'An error occured')
    throw new Error('Invaliod email or password')
  }

  const authResponse = await response.json()
  const { token: authToken, userId } = authResponse.data
  
  token.value = authResponse.data.token
  user.value = authResponse.data.user

  localStorage.setItem('lsToken', authToken)
  localStorage.setItem('userIDToken', userId)
  console.log('user is logged in:', authResponse)
  console.log('token:', token.value)

  isLoggedIn.value = true;

} catch (err) {
  error.value = (err as Error).message || 'An error occured'
}
}

const logout = () => {
  token.value = null
  user.value = null 
  isLoggedIn.value = false
  localStorage.removeItem('lsToken')
  console.log("user is logged out")
}


const registerUser = async (name: string, email: string, password: string): Promise<void> => {
  try {
    const { data, error } = await useFetch<AuthResponse>('http://localhost:4000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { name, email, password }, // Ingen stringify nødvendig
    })

    if (error.value) {
      throw new Error(error.value.message || 'Invalid email or password')
    }

    // Hvis det lykkes, sæt værdier
    token.value = data.value?.data.token || null
    user.value = data.value?.data.user || null
    isLoggedIn.value = true

    localStorage.setItem('LsToken', token.value || '')
    localStorage.setItem('userIDToken', data.value?.data.userId || '')

    console.log('User created:', data.value)

  } catch (err) {
    error.value = (err as Error).message || 'An error occurred'
    isLoggedIn.value = false
  }
}

  return {
    token,
    user,
    error,
    email,
    password,
    fetchToken,
    logout,
    registerUser
  };
};
