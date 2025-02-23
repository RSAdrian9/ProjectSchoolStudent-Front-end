<template>
    <div class="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div class="text-center">
            <!-- Bienvenida -->
            <h1 class="mb-4 fw-bold">¡Bienvenido a la Plataforma de Gestión de Solicitudes!</h1>
            <p class="lead mb-5">
                Administra fácilmente las solicitudes de alumnado. Elige una opción para comenzar.
            </p>

            <!-- Botones de Acción -->
            <div class="d-flex justify-content-center gap-4">
                <router-link to="/login" class="btn btn-primary btn-lg">Iniciar Sesión</router-link>
                <router-link to="/register" class="btn btn-outline-primary btn-lg">Registrarse</router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// No es necesario manejar lógica aquí, solo navegación.
</script>

<style scoped>
/* Estilo para centrar el contenido */
.min-vh-100 {
    min-height: 100vh;
}
</style>