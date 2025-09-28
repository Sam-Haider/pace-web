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
