<template>
    <div>
        <h1>Bienvenido al Dashboard</h1>
        <button @click="handleLogout">Cerrar sesión</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = async () => {
    router.push('/'); // Redirige al login
};
</script>