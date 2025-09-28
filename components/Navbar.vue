<template>
  <nav class="bg-slate-800 border-b border-slate-700">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <img src="/logo.png" alt="Pace" class="h-full w-auto" />
        </div>

        <div class="flex items-center space-x-4">
          <div class="relative">
            <button
              @click="toggleSideMenu"
              class="flex items-center space-x-2 text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:cursor-pointer"
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
      'fixed top-0 right-0 h-full w-80 bg-slate-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50',
      sideMenuOpen ? 'translate-x-0' : 'translate-x-full',
    ]"
  >
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold text-white">Account</h2>
        <button
          @click="closeSideMenu"
          class="text-slate-400 hover:text-white transition-colors hover:cursor-pointer"
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
            class="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white font-semibold">
              {{ user?.firstName?.[0] }}{{ user?.lastName?.[0] }}
            </span>
          </div>
          <div>
            <p class="text-white font-medium">
              {{ user?.firstName }} {{ user?.lastName }}
            </p>
            <p class="text-slate-400 text-sm">{{ user?.email }}</p>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <button
          @click="openChangePasswordModal"
          class="w-full flex items-center space-x-3 px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors hover:cursor-pointer"
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
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
          <span>Change Password</span>
        </button>

        <button
          @click="handleLogout"
          class="w-full flex items-center space-x-3 px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors hover:cursor-pointer"
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

  <!-- Change Password Modal -->
  <div
    v-if="changePasswordModalOpen"
    @click="closeChangePasswordModal"
    class="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4"
  >
    <div
      @click.stop
      class="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 space-y-6"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold text-white">Change Password</h3>
        <button
          @click="closeChangePasswordModal"
          class="text-slate-400 hover:text-white transition-colors"
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

      <form @submit.prevent="handleChangePassword" class="space-y-4">
        <div>
          <label
            for="currentPassword"
            class="block text-sm font-medium text-slate-300 mb-2"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            v-model="passwordForm.currentPassword"
            type="password"
            required
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label
            for="newPassword"
            class="block text-sm font-medium text-slate-300 mb-2"
          >
            New Password
          </label>
          <input
            id="newPassword"
            v-model="passwordForm.newPassword"
            type="password"
            required
            minlength="6"
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            placeholder="Enter new password (min 6 characters)"
          />
        </div>

        <div>
          <label
            for="confirmNewPassword"
            class="block text-sm font-medium text-slate-300 mb-2"
          >
            Confirm New Password
          </label>
          <input
            id="confirmNewPassword"
            v-model="passwordForm.confirmNewPassword"
            type="password"
            required
            class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            placeholder="Confirm new password"
          />
        </div>

        <!-- Error Message -->
        <div
          v-if="passwordError"
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
          <p class="text-red-300 text-sm">{{ passwordError }}</p>
        </div>

        <!-- Success Message -->
        <div
          v-if="passwordSuccess"
          class="flex items-center space-x-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
        >
          <svg
            class="w-5 h-5 text-green-400 flex-shrink-0"
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
          <p class="text-green-300 text-sm">{{ passwordSuccess }}</p>
        </div>

        <div class="flex space-x-3">
          <button
            type="button"
            @click="closeChangePasswordModal"
            class="flex-1 px-4 py-2 border border-slate-600 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="passwordLoading"
            class="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="passwordLoading">Changing...</span>
            <span v-else>Change Password</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const sideMenuOpen = ref(false);
const changePasswordModalOpen = ref(false);

// Change password form
const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const passwordLoading = ref(false);
const passwordError = ref("");
const passwordSuccess = ref("");

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

// Change password modal functions
const openChangePasswordModal = () => {
  changePasswordModalOpen.value = true;
  closeSideMenu();
  // Reset form
  passwordForm.value = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  passwordError.value = "";
  passwordSuccess.value = "";
};

const closeChangePasswordModal = () => {
  changePasswordModalOpen.value = false;
};

const handleChangePassword = async () => {
  passwordLoading.value = true;
  passwordError.value = "";
  passwordSuccess.value = "";

  // Validate passwords match
  if (
    passwordForm.value.newPassword !== passwordForm.value.confirmNewPassword
  ) {
    passwordError.value = "New passwords do not match";
    passwordLoading.value = false;
    return;
  }

  // Validate new password length
  if (passwordForm.value.newPassword.length < 6) {
    passwordError.value = "New password must be at least 6 characters long";
    passwordLoading.value = false;
    return;
  }

  try {
    const token = useCookie("auth-token");

    await $fetch("http://localhost:3000/auth/change-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: {
        currentPassword: passwordForm.value.currentPassword,
        newPassword: passwordForm.value.newPassword,
      },
    });

    passwordSuccess.value = "Password changed successfully!";

    // Close modal after 2 seconds
    setTimeout(() => {
      closeChangePasswordModal();
    }, 2000);
  } catch (err) {
    if (err.status === 401) {
      passwordError.value = "Current password is incorrect";
    } else if (err.status === 400) {
      passwordError.value = "Please fill in all required fields";
    } else {
      passwordError.value = "An error occurred. Please try again.";
    }
  } finally {
    passwordLoading.value = false;
  }
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
