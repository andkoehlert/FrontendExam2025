import { useAuthState } from "~/composables/auth/useAuthState";
import { nextTick } from "vue";

export default defineNuxtRouteMiddleware(async () => {
  // Check only on the client-side
  if (typeof window === 'undefined') return; 

  // Wait for reactivity to settle after page hydration
  await nextTick(); 
  
  const isLoggedIn = useAuthState(); // Use the auth state to check login status

  // After the reactivity settles, check if the user is logged in
  if (!isLoggedIn.value) {
    return navigateTo('/auth/login'); // Redirect if not logged in
  }
});
