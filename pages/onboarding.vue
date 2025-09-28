<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-lg">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-slate-300">{{ currentStep }}/3</span>
          <span class="text-sm text-slate-400">{{ getStepTitle() }}</span>
        </div>
        <div class="w-full bg-slate-700 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${(currentStep / 3) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="relative overflow-hidden">
        <Transition :name="transitionName" mode="out-in">
          <!-- Step 1: Welcome -->
          <div
            v-if="currentStep === 1"
            key="step1"
            class="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-center space-y-8"
          >
            <div class="space-y-6">
              <!-- Animated Logo/Icon -->
              <div
                class="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse"
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

              <div class="space-y-4">
                <h1 class="text-4xl font-bold text-white animate-fade-in">
                  Welcome to Pace!
                </h1>
                <p class="text-xl text-slate-300 animate-fade-in-delayed">
                  Let's set up your profile to personalize your fitness journey
                </p>
                <p class="text-slate-400 animate-fade-in-delayed-2">
                  This will only take a minute ⚡
                </p>
              </div>
            </div>

            <button
              @click="nextStep"
              class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg animate-fade-in-delayed-3"
            >
              Let's Get Started
            </button>
          </div>

          <!-- Step 2: Name Collection -->
          <div
            v-else-if="currentStep === 2"
            key="step2"
            class="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-8"
          >
            <div class="text-center space-y-4">
              <h2 class="text-3xl font-bold text-white">What's your name?</h2>
              <p class="text-slate-300">Help us personalize your experience</p>
            </div>

            <form @submit.prevent="nextStep" class="space-y-6">
              <div class="space-y-4">
                <div>
                  <label
                    for="firstName"
                    class="block text-sm font-medium text-slate-200 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    v-model="onboardingData.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label
                    for="lastName"
                    class="block text-sm font-medium text-slate-200 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    v-model="onboardingData.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div class="flex space-x-3">
                <button
                  type="button"
                  @click="previousStep"
                  class="flex-1 px-4 py-3 border border-white/20 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  :disabled="
                    !onboardingData.firstName || !onboardingData.lastName
                  "
                  class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>

          <!-- Step 3: Identity Selection -->
          <div
            v-else-if="currentStep === 3"
            key="step3"
            class="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-8"
          >
            <div class="text-center space-y-4">
              <h2 class="text-3xl font-bold text-white">
                Choose Your Identity
              </h2>
              <p class="text-slate-300">
                How do you see yourself in your fitness journey?
              </p>
            </div>

            <div class="space-y-4">
              <button
                @click="selectIdentity(1)"
                :class="[
                  'w-full p-6 rounded-xl border-2 transition-all duration-200 text-left',
                  onboardingData.identityId === 1
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-white/20 bg-white/5 hover:bg-white/10',
                ]"
              >
                <div class="flex items-center space-x-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-white"
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
                  <div>
                    <h3 class="text-lg font-semibold text-white">
                      Consistent Mover
                    </h3>
                    <p class="text-slate-300 text-sm">
                      I prioritize regular movement and building sustainable
                      habits
                    </p>
                  </div>
                </div>
              </button>
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

            <!-- Learn More About Research -->
            <div class="text-center">
              <button
                @click="showResearch = true"
                class="text-slate-400 hover:text-slate-300 text-sm underline transition-colors"
              >
                Why does identity matter? See the research →
              </button>
            </div>
            
            <div class="flex space-x-3">
              <button
                type="button"
                @click="previousStep"
                class="flex-1 px-4 py-3 border border-white/20 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                Back
              </button>
              <button
                @click="completeOnboarding"
                :disabled="!onboardingData.identityId || loading"
                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span v-if="loading">Finishing up...</span>
                <span v-else>Complete Setup</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    
    <!-- Research Citations Overlay -->
    <div
      v-if="showResearch"
      @click="showResearch = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div
        @click.stop
        class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20"
      >
        <div class="p-8 space-y-8">
          <!-- Header -->
          <div class="flex justify-between items-start">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold text-white">Research Behind the App</h2>
              <p class="text-slate-300">Read some of the research that inspired this app</p>
            </div>
            <button
              @click="showResearch = false"
              class="text-slate-400 hover:text-white transition-colors p-2"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Research Sources -->
          <div class="grid gap-6 md:grid-cols-2">
            <!-- Source 1: James Clear -->
            <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 hover:bg-white/10 transition-all duration-200">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-white">James Clear</h3>
                  <p class="text-sm text-blue-300">New York Times bestselling author of Atomic Habits</p>
                </div>
              </div>
              
              <div class="space-y-3">
                <p class="text-slate-300 text-sm leading-relaxed">
                  "The key to building lasting habits is focusing on creating a new identity first. Your current behaviors are simply a reflection of your current identity."
                </p>
                
                <a
                  href="https://jamesclear.com/identity-based-habits"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  <span>Read more</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            
            <!-- Source 2: Carol Dweck -->
            <div class="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 hover:bg-white/10 transition-all duration-200">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-white">Carol Dweck</h3>
                  <p class="text-sm text-purple-300">Stanford Professor & National Academy of Sciences member</p>
                </div>
              </div>
              
              <div class="space-y-3">
                <p class="text-slate-300 text-sm leading-relaxed">
                  "The hallmark of human nature is how much of a person's identity is not built in; rather, it is humans' great capacity to adapt, change, and grow."
                </p>
                
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6594552/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
                >
                  <span>Read more</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Back Button -->
          <div class="flex justify-center pt-4">
            <button
              @click="showResearch = false"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Back to Identity Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Prevent access without auth
definePageMeta({
  middleware: "auth",
});

const currentStep = ref(1);
const loading = ref(false);
const error = ref("");
const transitionName = ref("slide-right");
const showResearch = ref(false);

// Onboarding form data
const onboardingData = ref({
  firstName: "",
  lastName: "",
  identityId: null,
});

const getStepTitle = () => {
  switch (currentStep.value) {
    case 1:
      return "Welcome";
    case 2:
      return "Basic Info";
    case 3:
      return "Identity";
    default:
      return "";
  }
};

const nextStep = () => {
  if (currentStep.value < 3) {
    transitionName.value = "slide-left";
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    transitionName.value = "slide-right";
    currentStep.value--;
  }
};

const selectIdentity = (identityId) => {
  onboardingData.value.identityId = identityId;
};

const completeOnboarding = async () => {
  loading.value = true;
  error.value = "";

  try {
    const token = useCookie("auth-token");

    await $fetch("http://localhost:3000/auth/complete-onboarding", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        firstName: onboardingData.value.firstName,
        lastName: onboardingData.value.lastName,
        identityId: onboardingData.value.identityId,
      },
    });

    // Redirect to dashboard
    await navigateTo("/dashboard");
  } catch (err) {
    console.error("Onboarding error:", err);
    error.value = "An error occurred. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Slide animations */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Fade in animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-in-delayed {
  animation: fadeIn 0.6s ease-out 0.2s both;
}

.animate-fade-in-delayed-2 {
  animation: fadeIn 0.6s ease-out 0.4s both;
}

.animate-fade-in-delayed-3 {
  animation: fadeIn 0.6s ease-out 0.6s both;
}
</style>
