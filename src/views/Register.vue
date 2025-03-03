<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <!-- Tarjeta de Registro -->
                <div class="card shadow-lg rounded-4">
                    <div class="card-body p-5">
                        <h2 class="text-center mb-4">Crear una cuenta</h2>

                        <!-- Mostrar mensaje de error si existe -->
                        <div v-if="errorMessage" class="alert alert-danger" role="alert">
                            {{ errorMessage }}
                        </div>

                        <!-- Formulario de Registro -->
                        <form @submit.prevent="handleRegister">
                            <!-- Nombre -->
                            <div class="mb-3">
                                <label for="name" class="form-label">Nombre completo</label>
                                <input type="text" id="name" v-model="name" class="form-control" placeholder="Tu nombre"
                                    required />
                            </div>

                            <!-- Correo Electrónico -->
                            <div class="mb-3">
                                <label for="email" class="form-label">Correo Electrónico</label>
                                <input type="email" id="email" v-model="email" class="form-control"
                                    placeholder="ejemplo@correo.com" required />
                            </div>

                            <!-- Contraseña -->
                            <div class="mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" id="password" v-model="password" class="form-control"
                                    placeholder="••••••••" required />
                            </div>

                            <!-- Confirmar Contraseña -->
                            <div class="mb-4">
                                <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
                                <input type="password" id="confirmPassword" v-model="confirmPassword"
                                    class="form-control" placeholder="Repite tu contraseña" required />
                            </div>

                            <!-- Botón de Registro -->
                            <button type="submit" class="btn btn-primary w-100 mb-3">Registrarse</button>

                            <!-- Enlace a Iniciar Sesión -->
                            <p class="text-center mt-3">
                                ¿Ya tienes una cuenta?
                                <router-link to="/login" class="text-decoration-none">Iniciar sesión</router-link>
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

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const router = useRouter();

// Manejar el Registro
const handleRegister = async () => {
    errorMessage.value = '';

    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Las contraseñas no coinciden.';
        return;
    }

    try {
        // Si usas Sanctum, solicita la cookie CSRF
        await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');

        const response = await axios.post('http://127.0.0.1:8000/api/register', {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: confirmPassword.value, // Importante agregar este campo
        });

        // Guardar el token en el localStorage (si tu API lo devuelve)
        localStorage.setItem('token', response.data.token);

        // Redirigir al dashboard o página principal
        router.push('/login');
    } catch (error) {
        errorMessage.value = 'Error al registrar. Verifica los datos.';
        console.error('Error en el registro:', error);
    }
};
</script>

<style scoped>
.card {
    border: none;
}
</style>