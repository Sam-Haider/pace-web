<template>
  <div class="min-h-screen bg-slate-900 flex items-center justify-center p-4">
    <div class="w-full max-w-lg">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-slate-300">{{ currentStep }}/4</span>
          <span class="text-sm text-slate-400">{{ getStepTitle() }}</span>
        </div>
        <div class="w-full bg-slate-700 rounded-full h-2">
          <div
            class="bg-slate-400 h-2 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${(currentStep / 4) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Step Content -->
      <div class="relative overflow-hidden">
        <Transition :name="transitionName" mode="out-in">
          <!-- Step 1: App Introduction -->
          <div
            v-if="currentStep === 1"
            key="step1"
            class="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 text-center space-y-8"
          >
            <div class="space-y-6">
              <!-- Animated Logo/Icon -->
              <div
                class="mx-auto w-16 h-16 bg-slate-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="var(--primary-color)"
                  stroke="var(--primary-color)"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <div class="space-y-4">
                <h1 class="text-4xl font-bold text-white animate-fade-in">
                  Welcome to Pace!
                </h1>
                <p class="text-xl text-slate-300 animate-fade-in-delayed">
                  Vote daily for the person you're becoming
                </p>
                <div class="text-slate-400 animate-fade-in-delayed-2 space-y-2 text-left pl-8">
                  <p>• Choose identities that matter to you</p>
                  <p>• Track your progress with daily votes</p>
                  <p>• Build momentum toward who you want to be</p>
                </div>
              </div>
            </div>

            <BaseButton
              @click="nextStep"
              variant="secondary"
              size="lg"
              full-width
              class="shadow-lg animate-fade-in-delayed-3"
            >
              Get Started
            </BaseButton>
          </div>

          <!-- Step 2: Welcome -->
          <div
            v-else-if="currentStep === 2"
            key="step2"
            class="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 text-center space-y-8"
          >
            <div class="space-y-6">
              <!-- Animated Logo/Icon -->
              <div
                class="mx-auto w-16 h-16 bg-slate-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="var(--primary-color)"
                  stroke="var(--primary-color)"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <div class="space-y-4">
                <h1 class="text-4xl font-bold text-white animate-fade-in">
                  Let's personalize your experience
                </h1>
                <p class="text-xl text-slate-300 animate-fade-in-delayed">
                  We'll help you set up your identities and preferences
                </p>
                <p class="text-slate-400 animate-fade-in-delayed-2">
                  This will only take a minute ⚡
                </p>
              </div>
            </div>

            <div class="flex space-x-3">
              <BaseButton
                type="button"
                @click="previousStep"
                variant="outline"
                class="flex-1"
              >
                Back
              </BaseButton>
              <BaseButton
                @click="nextStep"
                variant="secondary"
                size="lg"
                class="flex-1"
              >
                Continue
              </BaseButton>
            </div>
          </div>

          <!-- Step 3: Name Collection -->
          <div
            v-else-if="currentStep === 3"
            key="step3"
            class="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 space-y-8"
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
                    class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
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
                    class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div class="flex space-x-3">
                <BaseButton
                  type="button"
                  @click="previousStep"
                  variant="outline"
                  class="flex-1"
                >
                  Back
                </BaseButton>
                <BaseButton
                  type="submit"
                  :disabled="
                    !onboardingData.firstName || !onboardingData.lastName
                  "
                  variant="secondary"
                  class="flex-1"
                >
                  Continue
                </BaseButton>
              </div>
            </form>
          </div>

          <!-- Step 3: Identity Selection -->
          <div
            v-else-if="currentStep === 4"
            key="step4"
            class="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 space-y-8"
          >
            <div class="text-center space-y-4">
              <h2 class="text-3xl font-bold text-white">
                Choose Your Identities
              </h2>
              <p class="text-slate-300">
                Select all identities that resonate with you
              </p>
            </div>

            <div v-if="identitiesLoading" class="text-center py-8">
              <div class="text-slate-400">Loading identities...</div>
            </div>
            
            <div v-else class="space-y-4">
              <button
                v-for="identity in identities"
                :key="identity.id"
                @click="selectIdentity(identity.id)"
                class="identity-button w-full p-6 rounded-xl border-2 transition-all duration-200 text-left group relative"
                :class="[
                  onboardingData.identityIds.includes(identity.id)
                    ? 'border-slate-500 bg-slate-700 ring-2 ring-slate-500/30'
                    : 'border-slate-600 bg-slate-700/50 hover:bg-slate-700 hover:border-slate-500',
                ]"
              >
                <!-- Selected Checkmark - Absolute positioned at top right -->
                <div
                  v-if="onboardingData.identityIds.includes(identity.id)"
                  class="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 z-10"
                  style="
                    background-color: var(--primary-color);
                    border-color: var(--primary-color);
                  "
                >
                  <svg
                    class="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                
                <div class="flex items-center space-x-4">
                  <div
                    :class="[
                      'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200',
                      onboardingData.identityIds.includes(identity.id)
                        ? 'bg-slate-600'
                        : 'bg-slate-500 group-hover:bg-slate-400',
                    ]"
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
                  <div class="flex-1">
                    <h3
                      class="text-lg font-semibold text-white group-hover:text-slate-100 transition-colors"
                    >
                      {{ identity.name }}
                    </h3>
                    <p
                      class="text-slate-400 text-sm group-hover:text-slate-300 transition-colors"
                    >
                      {{ identity.description }}
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
                class="text-slate-400 hover:text-slate-300 text-sm underline transition-colors hover:cursor-pointer"
              >
                View some of the research that inspired the app →
              </button>
            </div>

            <div class="flex space-x-3">
              <BaseButton
                type="button"
                @click="previousStep"
                variant="outline"
                class="flex-1"
              >
                Back
              </BaseButton>
              <BaseButton
                @click="completeOnboarding"
                :disabled="onboardingData.identityIds.length === 0 || loading"
                variant="primary"
                class="flex-1"
              >
                <span v-if="loading">Finishing up...</span>
                <span v-else>Complete Setup</span>
              </BaseButton>
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
        class="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700"
      >
        <div class="p-8 space-y-8">
          <!-- Header -->
          <div class="flex justify-between items-start">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold text-white">Research</h2>
              <p class="text-slate-300">
                Read some of the research that inspired this app
              </p>
            </div>
            <button
              @click="showResearch = false"
              class="text-slate-400 hover:text-white transition-colors p-2"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Research Sources -->
          <div class="grid gap-6 md:grid-cols-2">
            <!-- Source 1: James Clear -->
            <a
              href="https://jamesclear.com/identity-based-habits"
              target="_blank"
              rel="noopener noreferrer"
              class="block bg-slate-700/50 border border-slate-600 rounded-xl p-6 space-y-4 hover:bg-slate-700 transition-all duration-200 cursor-pointer"
            >
              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0"
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-white">James Clear</h3>
                  <p class="text-sm text-slate-400">
                    New York Times bestselling author of Atomic Habits
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <p class="text-slate-300 text-sm leading-relaxed">
                  "The key to building lasting habits is focusing on creating a
                  new identity first. Your current behaviors are simply a
                  reflection of your current identity."
                </p>

                <div
                  class="inline-flex items-center space-x-2 text-slate-400 hover:text-slate-300 text-sm transition-colors"
                >
                  <span>Read more</span>
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            </a>

            <!-- Source 2: Carol Dweck -->
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6594552/"
              target="_blank"
              rel="noopener noreferrer"
              class="block bg-slate-700/50 border border-slate-600 rounded-xl p-6 space-y-4 hover:bg-slate-700 transition-all duration-200 cursor-pointer"
            >
              <div class="flex items-start space-x-4">
                <div
                  class="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0"
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
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-white">Carol Dweck</h3>
                  <p class="text-sm text-slate-400">
                    Stanford Professor & National Academy of Sciences member
                  </p>
                </div>
              </div>

              <div class="space-y-3">
                <p class="text-slate-300 text-sm leading-relaxed">
                  "The hallmark of human nature is how much of a person's
                  identity is not built in; rather, it is humans' great capacity
                  to adapt, change, and grow."
                </p>

                <div
                  class="inline-flex items-center space-x-2 text-slate-400 hover:text-slate-300 text-sm transition-colors"
                >
                  <span>Read more</span>
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          <!-- Back Button -->
          <div class="flex justify-center pt-4">
            <BaseButton @click="showResearch = false" variant="secondary">
              Back to Identity Selection
            </BaseButton>
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
const identities = ref([]);
const identitiesLoading = ref(false);

// Onboarding form data
const onboardingData = ref({
  firstName: "",
  lastName: "",
  identityIds: [], // Changed to array for multiple selection
});

const getStepTitle = () => {
  switch (currentStep.value) {
    case 1:
      return "Introduction";
    case 2:
      return "Welcome";
    case 3:
      return "Basic Info";
    case 4:
      return "Identity";
    default:
      return "";
  }
};

const nextStep = () => {
  if (currentStep.value < 4) {
    transitionName.value = "slide-left";
    currentStep.value++;
    
    // Load identities when reaching step 4
    if (currentStep.value === 4) {
      fetchIdentities();
    }
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    transitionName.value = "slide-right";
    currentStep.value--;
  }
};

const fetchIdentities = async () => {
  identitiesLoading.value = true;
  try {
    const data = await $fetch('http://localhost:3000/identities');
    identities.value = data;
  } catch (err) {
    console.error('Failed to fetch identities:', err);
    error.value = 'Failed to load identity options. Please try again.';
  } finally {
    identitiesLoading.value = false;
  }
};

const selectIdentity = (identityId) => {
  // Toggle selection - if already selected, unselect it
  const currentIds = onboardingData.value.identityIds;
  const isSelected = currentIds.includes(identityId);
  
  if (isSelected) {
    // Remove from selection
    onboardingData.value.identityIds = currentIds.filter(id => id !== identityId);
  } else {
    // Add to selection
    onboardingData.value.identityIds = [...currentIds, identityId];
  }
};

const completeOnboarding = async () => {
  loading.value = true;
  error.value = "";

  try {
    const token = useCookie("auth-token");

    // Complete basic onboarding (name only)
    await $fetch("http://localhost:3000/auth/complete-onboarding", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        firstName: onboardingData.value.firstName,
        lastName: onboardingData.value.lastName,
      },
    });

    // Create user identities
    await $fetch("http://localhost:3000/identities/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        identityIds: onboardingData.value.identityIds,
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

/* Identity button cursor */
.identity-button {
  cursor: pointer !important;
}

.identity-button:hover {
  cursor: pointer !important;
}
</style>
