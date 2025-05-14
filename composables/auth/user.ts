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


  // Check for the token in localStorage when the page is loaded
  onMounted(() => {
    const storedToken = localStorage.getItem('lsToken');
    if (storedToken) {
      token.value = storedToken;
      isLoggedIn.value = true;
   //   fetchUserData(storedToken);
    }
  });
/* 
  // Function to fetch user data using the token
  const fetchUserData = async (storedToken: string) => {
    try {
      const response = await fetch('http://localhost:4000/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        user.value = userData.data;
      } else {
        console.error('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
 */

 // login logic
const fetchToken = async (email: string, password: string): Promise<void> => {
try {
  
  const response = await fetch('https://fullstackexam2025backend.onrender.com/api/user/login', {
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
 // console.log('user is logged in:', authResponse)
 // console.log('token:', token.value)

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
}


const registerUser = async (name: string, email: string, password: string): Promise<void> => {
  try {
    const { data, error: fetchError } = await useFetch<AuthResponse>('https://fullstackexam2025backend.onrender.com/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { name, email, password }, // Ingen stringify nødvendig
    })

   if (fetchError.value) {
      const backendError = (fetchError.value as any).data?.error || 'Registration failed';
      throw new Error(backendError);
    }

    // Hvis det lykkes, sæt værdier
    token.value = data.value?.data.token || null
    user.value = data.value?.data.user || null
    isLoggedIn.value = true

    localStorage.setItem('LsToken', token.value || '')
    localStorage.setItem('userIDToken', data.value?.data.userId || '')

   // console.log('User created:', data.value)

  } catch (err) {
    const msg = (err as Error).message || 'An error occurred';
    error.value = msg;
    alert(msg); 
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
