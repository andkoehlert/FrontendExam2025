export default defineNuxtRouteMiddleware(() => {
  const isLoggedIn = useState<boolean>('isLoggedIn', () => false)

  if (!isLoggedIn.value) {
    return navigateTo('/auth/login')
  }
})
