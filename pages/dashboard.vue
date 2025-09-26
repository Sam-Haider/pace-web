<template>
  <div class="min-h-screen bg-gray-900">
    <Navbar />
    <div class="py-4 px-6">
      <div class="mx-auto">
        <h1 class="text-3xl font-bold text-white mb-8">Dashboard</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
