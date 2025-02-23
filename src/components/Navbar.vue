<template>
    <nav class="bg-white p-4 shadow-md">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <!-- Logo y Título -->
            <div class="flex items-center space-x-2">
                <img src="@/assets/solicitud.png" alt="Logo" class="w-10 h-10" />
                <h1 class="text-black text-2xl font-semibold">Gestión de Solicitudes</h1>
            </div>

            <!-- Enlaces de Navegación -->
            <div class="flex items-center space-x-6">
                <!-- Si está autenticado -->
                <template v-if="isLoggedIn">
                    <RouterLink to="/applications"
                        class="text-black hover:text-gray-300 flex items-center space-x-1 transition duration-300">
                        <i class="bi bi-card-checklist"></i>
                        <span>Solicitudes</span>
                    </RouterLink>

                    <RouterLink to="/empresas"
                        class="text-black hover:text-gray-300 flex items-center space-x-1 transition duration-300">
                        <i class="bi bi-building"></i>
                        <span>Empresas</span>
                    </RouterLink>

                    <!-- Perfil -->
                    <button class="flex items-center text-black hover:text-indigo-300 transition duration-300"
                        @click="router.push('/profile')">
                        <img src="@/assets/user.png" alt="Perfil"
                            class="w-10 h-10 rounded-full border-2 border-black" />
                    </button>

                    <!-- Botón de Logout -->
                    <button @click="handleLogout"
                        class="text-black flex items-center space-x-1 hover:text-red-600 transition duration-300">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Log Out</span>
                    </button>
                </template>

                <!-- Si NO está autenticado -->
                <template v-else>
                    <RouterLink to="/login"
                        class="text-black hover:text-gray-500 flex items-center space-x-1 transition duration-300">
                        <i class="bi bi-box-arrow-in-right"></i>
                        <span>Iniciar sesión</span>
                    </RouterLink>

                    <RouterLink to="/register"
                        class="text-black hover:text-gray-500 flex items-center space-x-1 transition duration-300">
                        <i class="bi bi-person-plus"></i>
                        <span>Registrarse</span>
                    </RouterLink>
                </template>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

// Router para la navegación
const router = useRouter();

// Estado para verificar si el usuario está autenticado
const isLoggedIn = ref<boolean>(false);

// Función para verificar autenticación por token
const checkAuth = () => {
    isLoggedIn.value = !!localStorage.getItem("token");
};

// Escuchar cambios en el localStorage
const handleStorageChange = () => checkAuth();

// Al montar el componente
onMounted(() => {
    checkAuth();
    window.addEventListener("storage", handleStorageChange);
});

// Limpiar el listener al desmontar
onUnmounted(() => {
    window.removeEventListener("storage", handleStorageChange);
});

// Cerrar sesión
const handleLogout = () => {
    localStorage.removeItem("token");
    isLoggedIn.value = false;
    router.push("/login");
};
</script>

<style scoped>
/* Puedes personalizar más estilos aquí si lo necesitas */
</style>