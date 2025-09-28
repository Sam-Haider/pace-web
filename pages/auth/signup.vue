<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div class="relative w-full max-w-md">
      <!-- Glass morphism card -->
      <div
        class="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 space-y-8"
      >
        <!-- Header with logo -->
        <div class="text-center space-y-2">
          <div
            class="mx-auto w-16 h-16 bg-slate-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white">Create Account</h1>
          <p class="text-slate-400">Start tracking your pace</p>
        </div>

        <!-- Signup Form -->
        <form @submit.prevent="handleSignup" class="space-y-6">
          <div class="space-y-4">
            <div class="group">
              <label
                for="email"
                class="block text-sm font-medium text-slate-200 mb-2"
              >
                Email Address
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                  placeholder="Enter your email"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    class="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="group">
              <label
                for="password"
                class="block text-sm font-medium text-slate-200 mb-2"
              >
                Password
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  required
                  class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                  placeholder="Create a password"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    class="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="group">
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-slate-200 mb-2"
              >
                Confirm Password
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  type="password"
                  required
                  class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                  placeholder="Confirm your password"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    class="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            class="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
          >
            <svg
              class="w-5 h-5 text-red-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-red-300 text-sm">{{ error }}</p>
          </div>

          <!-- Sign Up Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-700 hover:cursor-pointer hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-transparent text-slate-400"
              >Or continue with</span
            >
          </div>
        </div>

        <!-- Google Sign Up -->
        <a
          href="http://localhost:3000/auth/google"
          class="w-full flex items-center justify-center px-4 py-3 border border-slate-600 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
          Continue with Google
        </a>

        <!-- Footer Links -->
        <div class="text-center">
          <p class="text-slate-400 text-sm">
            Already have an account?
            <NuxtLink
              to="/auth/login"
              class="text-slate-300 hover:text-white font-medium transition-colors"
            >
              Sign in
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

const loading = ref(false);
const error = ref("");

const handleSignup = async () => {
  loading.value = true;
  error.value = "";

  // Validate passwords match
  if (form.value.password !== form.value.confirmPassword) {
    error.value = "Passwords do not match";
    loading.value = false;
    return;
  }

  try {
    const response = await $fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      body: {
        email: form.value.email,
        password: form.value.password,
        // These will need to be collected later in onboarding
        firstName: "New",
        lastName: "User",
        weeklyGoalHours: 2,
      },
    });

    // Store the token and user data
    const token = useCookie("auth-token");
    token.value = response.token;

    // Redirect to dashboard or onboarding flow
    await navigateTo("/dashboard");
  } catch (err) {
    if (err.status === 409) {
      error.value = "An account with this email already exists";
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
