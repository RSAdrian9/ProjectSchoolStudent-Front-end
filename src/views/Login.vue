<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- Login Card -->
        <div class="card shadow-lg rounded-4">
          <div class="card-body p-5">
            <h2 class="text-center mb-4">Login</h2>

            <!-- Show error if exists -->
            <div v-if="error" class="alert alert-danger" role="alert">
              {{ error }}
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin">
              <!-- Email -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" v-model="email" class="form-control" placeholder="example@mail.com"
                  required />
              </div>

              <!-- Password -->
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" v-model="password" class="form-control" placeholder="••••••••"
                  required />
              </div>

              <!-- Login Button -->
              <button type="submit" class="btn btn-primary w-100 mb-3">
                Login
              </button>

              <!-- Link to Register -->
              <p class="text-center mt-3">
                Don't have an account?
                <router-link to="/register" class="text-decoration-none">
                  Register
                </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../api/api"; // Import your Axios instance
import { showToast } from "../composables/useToast"; // Import your Toast function

// Reactive variables
const email = ref<string>("");
const password = ref<string>("");
const error = ref<string>("");
const router = useRouter();

// Handle login
const handleLogin = async () => {
  error.value = "";
  try {
    // Call the login endpoint
    const response = await api.post("/login", {
      email: email.value,
      password: password.value,
    });

    // Verify if the token exists before saving it
    console.log("Token received:", response.data.token);

    // Save the token in localStorage
    localStorage.setItem("token", response.data.token);

    showToast("Welcome!", "success");

    // Redirect to the main dashboard
    router.push("/dashboard");

    // Trigger event for other components (Navbar, for example)
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    showToast("Incorrect credentials", "error");
    console.error("Login error:", err);
  }
};
</script>

<style scoped>
.card {
  border: none;
}
</style>
