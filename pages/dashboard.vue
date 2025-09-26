<template>
  <div class="min-h-screen bg-gray-900">
    <Navbar />
    <div class="py-4 px-3">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-white mb-8">Dashboard</h1>
        <p class="text-gray-400">Welcome to your pace dashboard!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
