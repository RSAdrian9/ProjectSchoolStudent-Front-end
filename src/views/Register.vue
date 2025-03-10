<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <!-- Registration Card -->
                <div class="card shadow-lg rounded-4">
                    <div class="card-body p-5">
                        <h2 class="text-center mb-4">Create an Account</h2>

                        <!-- Show error message if exists -->
                        <div v-if="errorMessage" class="alert alert-danger" role="alert">
                            {{ errorMessage }}
                        </div>

                        <!-- Registration Form -->
                        <form @submit.prevent="handleRegister">
                            <!-- Name -->
                            <div class="mb-3">
                                <label for="name" class="form-label">Full Name</label>
                                <input type="text" id="name" v-model="name" class="form-control" placeholder="Your name"
                                    required />
                            </div>

                            <!-- Email -->
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" id="email" v-model="email" class="form-control"
                                    placeholder="example@domain.com" required />
                            </div>

                            <!-- Password -->
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" id="password" v-model="password" class="form-control"
                                    placeholder="••••••••" required />
                            </div>

                            <!-- Confirm Password -->
                            <div class="mb-4">
                                <label for="confirmPassword" class="form-label">Confirm Password</label>
                                <input type="password" id="confirmPassword" v-model="confirmPassword"
                                    class="form-control" placeholder="Repeat your password" required />
                            </div>

                            <!-- Register Button -->
                            <button type="submit" class="btn btn-primary w-100 mb-3">Register</button>

                            <!-- Link to Login -->
                            <p class="text-center mt-3">
                                Already have an account?
                                <router-link to="/login" class="text-decoration-none">Login</router-link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { showToast } from '../composables/useToast';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const router = useRouter();

// Handle Registration
const handleRegister = async () => {
    errorMessage.value = '';

    if (password.value !== confirmPassword.value) {
        showToast('Passwords do not match.', 'error');
        return;
    }

    try {
        // If using Sanctum, request the CSRF cookie
        await axios.get('http://docadrian.duckdns.org:8080/sanctum/csrf-cookie');

        const response = await axios.post('http://docadrian.duckdns.org:8080/api/register', {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: confirmPassword.value, // Important to add this field
        });

        // Save the token in localStorage (if your API returns it)
        localStorage.setItem('token', response.data.token);

        // Redirect to the dashboard or main page
        router.push('/login');
    } catch (error) {
        showToast('Registration error. Check your data.', 'error');
        console.error('Registration error:', error);
    }
};
</script>

<style scoped>
.card {
    border: none;
}
</style>
