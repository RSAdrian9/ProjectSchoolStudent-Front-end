<template>
    <header class="w-full h-16 bg-white shadow px-6 flex items-center justify-between navbar">
        <!-- Logo y nombre de la app -->
        <div class="flex items-center gap-2 navbar-left">
            <span class="text-lg font-semibold text-gray-800">Mi Panel</span>
        </div>

        <!-- Sección derecha: avatar, botones -->
        <div class="flex items-center gap-4 navbar-right">
            <el-button circle plain size="small" class="hover:bg-gray-100">
                <el-icon><Bell /></el-icon>
            </el-button>
            <div class="flex items-center gap-2 navbar-user">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="avatar"
                    class="w-8 h-8 rounded-full border"
                />
                <span class="hidden sm:block text-sm font-medium text-gray-700">Juan Pérez</span>
            </div>
            <el-button type="danger" size="small">Salir</el-button>
        </div>
    </header>
</template>

<script setup lang="ts">
import { Bell } from '@element-plus/icons-vue'
</script>

<style scoped>
.navbar {
display: flex;
align-items: center;
justify-content: space-between;
padding-left: 1.5rem;
padding-right: 1.5rem;
background: #fff;
box-shadow: 0 2px 4px rgba(0,0,0,0.03);
height: 4rem;
overflow: hidden;
}
.navbar-left {
display: flex;
align-items: center;
gap: 0.5rem;
}
.navbar-right {
display: flex;
align-items: center;
gap: 1rem;
}
.navbar-user {
display: flex;
align-items: center;
gap: 0.5rem;
}
</style>
