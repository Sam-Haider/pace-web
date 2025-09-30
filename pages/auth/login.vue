<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center">
    <div
      class="max-w-md w-full bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700"
    >
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-white">Welcome to Pace</h2>
        <p class="text-slate-400 mt-2">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-slate-300"
            >Email</label
          >
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            placeholder="user@example.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-slate-300"
            >Password</label
          >
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            placeholder="Enter your password"
          />
        </div>

        <div v-if="error" class="text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <BaseButton
          type="submit"
          :disabled="loading"
          variant="primary"
          full-width
          class="flex justify-center"
        >
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign in</span>
        </BaseButton>
      </form>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-600" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-slate-800 text-slate-400"
              >Or continue with</span
            >
          </div>
        </div>

        <div class="mt-6">
          <a
            href="http://localhost:3000/auth/google"
            class="w-full inline-flex justify-center py-2 px-4 border border-slate-600 rounded-md shadow-sm bg-slate-700 text-sm font-medium text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </a>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="text-center mt-6">
        <p class="text-slate-400 text-sm">
          Don't have an account?
          <NuxtLink
            to="/auth/signup"
            class="text-slate-300 hover:text-white font-medium transition-colors"
          >
            Sign up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: {
        email: form.value.email,
        password: form.value.password,
      },
    });

    // Store the token and user data
    const token = useCookie("auth-token");
    token.value = response.token;

    // Redirect to dashboard or home page
    await navigateTo("/dashboard");
  } catch (err) {
    if (err.status === 401) {
      error.value = "Invalid email or password";
    } else if (err.status === 400) {
      error.value = "Please fill in all required fields";
    } else {
      error.value = "An error occurred. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
