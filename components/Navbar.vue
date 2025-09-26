<template>
  <nav class="bg-gray-800 border-b border-gray-700">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <img src="/logo.png" alt="Pace" class="h-full w-auto" />
        </div>

        <div class="flex items-center space-x-4">
          <div class="relative">
            <button
              @click="toggleSideMenu"
              class="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <span>{{ user?.firstName }} {{ user?.lastName }}</span>
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Side Menu Overlay -->
  <div
    v-if="sideMenuOpen"
    @click="closeSideMenu"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
  />

  <!-- Side Menu -->
  <div
    :class="[
      'fixed top-0 right-0 h-full w-80 bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50',
      sideMenuOpen ? 'translate-x-0' : 'translate-x-full',
    ]"
  >
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold text-white">Account</h2>
        <button
          @click="closeSideMenu"
          class="text-gray-400 hover:text-white transition-colors"
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

      <div class="mb-6">
        <div class="flex items-center space-x-3 mb-4">
          <div
            class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white font-semibold">
              {{ user?.firstName?.[0] }}{{ user?.lastName?.[0] }}
            </span>
          </div>
          <div>
            <p class="text-white font-medium">
              {{ user?.firstName }} {{ user?.lastName }}
            </p>
            <p class="text-gray-400 text-sm">{{ user?.email }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <button
          @click="handleLogout"
          class="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const sideMenuOpen = ref(false);

// Get user data from API
const user = ref(null);

// Fetch user profile
const fetchUserProfile = async () => {
  try {
    const token = useCookie("auth-token");
    if (token.value) {
      const profile = await $fetch("http://localhost:3000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      user.value = profile;
    }
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    // If profile fetch fails (token expired/invalid), redirect to login
    if (error.status === 401 || error.status === 403) {
      const token = useCookie("auth-token");
      token.value = null;
      await navigateTo("/auth/login");
    }
  }
};

// Fetch profile on component mount
onMounted(() => {
  fetchUserProfile();
});

const toggleSideMenu = () => {
  sideMenuOpen.value = !sideMenuOpen.value;
};

const closeSideMenu = () => {
  sideMenuOpen.value = false;
};

const handleLogout = async () => {
  // Remove the auth token
  const token = useCookie("auth-token");
  token.value = null;

  // Redirect to login page
  await navigateTo("/auth/login");
};

// Close menu on escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeSideMenu();
    }
  };
  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>
