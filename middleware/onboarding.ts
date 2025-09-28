export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip check for auth and onboarding pages
  if (to.path.startsWith('/auth') || to.path.startsWith('/onboarding')) {
    return
  }
  
  const token = useCookie('auth-token')
  
  if (!token.value) {
    return navigateTo('/auth/login')
  }
  
  try {
    // Fetch user profile to check onboarding status
    const profile = await $fetch('http://localhost:3000/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    })
    
    // If user hasn't completed onboarding, redirect to onboarding
    if (!profile.onboardingCompleted) {
      return navigateTo('/onboarding')
    }
    
  } catch (error) {
    // If profile fetch fails, redirect to login
    if (error.status === 401 || error.status === 403) {
      token.value = null
      return navigateTo('/auth/login')
    }
  }
})