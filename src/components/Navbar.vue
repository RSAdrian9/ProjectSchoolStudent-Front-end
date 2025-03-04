<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api/api';
import { showToast } from '../composables/useToast';

const router = useRouter();
const userName = ref<string>();

// Function to get the authenticated user
const fetchUser = async () => {
  try {
    const { data } = await api.get('/user'); // Get the user from the backend
    userName.value = data.name;
    console.log('Authenticated user:', data);
  } catch (err) {
    showToast('Error loading user. Redirecting to login.', 'error');
    console.error('Error getting user:', err);
    router.push('/login');
  }
};

// Logout
const handleLogout = async () => {
  try {
    await api.post('/logout');
    console.log('Session closed'); // Verify in the console that the session has been closed
    localStorage.removeItem('token');
    console.log('Token removed'); // Verify in the console that the token has been removed
    showToast('Session closed successfully.', 'success');
    router.push('/'); /* Change the redirection to the home page */
  } catch (err) {
    showToast('Error logging out. Try again.', 'error');
    console.error('Error logging out:', err);
  }
};

onMounted(() => {
  fetchUser(); // Get the user when the component is mounted
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- Title on the left -->
      <a class="navbar-brand" href="/dashboard">Dashboard</a>

      <!-- Navigation buttons -->
      <div class="d-flex align-items-center">
        <router-link to="/students" class="nav-link me-3">Students</router-link>
        <router-link to="/schools" class="nav-link me-3">Schools</router-link>

        <i class="bi bi-person-circle"></i>
        <!-- User dropdown -->
        <div class="dropdown">
          <button
            class="btn btn-light dropdown-toggle"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <!--{{ userName }}-->
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <p class="dropdown-item">User: {{ userName }}</p>
              <button class="dropdown-item" @click="handleLogout">Log out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Prevent scrolling when the dropdown is displayed */
.dropdown-menu {
  position: absolute !important;
}
</style>
