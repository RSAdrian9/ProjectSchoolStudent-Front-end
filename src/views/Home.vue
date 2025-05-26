<template>
  <div class="h-screen flex flex-col">
    <!-- Navbar (ancho completo) -->
    <Navbar />

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Contenido principal -->
      <main class="flex-1 overflow-auto bg-gray-100 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
</script>
