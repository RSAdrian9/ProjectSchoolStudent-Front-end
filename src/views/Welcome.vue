<template>
    <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div class="text-center">
            <!-- Welcome -->
            <h1 class="mb-4 fw-bold">Welcome to the Institute Management Platform!</h1>
            <p class="lead mb-5">
                Easily manage student requests. Choose an option to get started.
            </p>

            <!-- Action Buttons -->
            <div class="d-flex justify-content-center gap-4">
                <router-link to="/login" class="btn btn-primary btn-lg">Log In</router-link>
                <router-link to="/register" class="btn btn-outline-primary btn-lg">Register</router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// No logic needed here, just navigation.
</script>

<style scoped>
/* Style to center the content */
.min-vh-100 {
    min-height: 100vh;
}
</style>