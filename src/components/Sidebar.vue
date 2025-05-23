<template>
  <el-aside
    :width="isOpen ? '220px' : '50px'"
    class="sidebar"
    @mouseenter="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="!isOpen"
    >
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <span v-if="isOpen">Inicio</span>
      </el-menu-item>
      <el-menu-item index="/perfil">
        <el-icon><User /></el-icon>
        <span v-if="isOpen">Perfil</span>
      </el-menu-item>
      <el-menu-item index="/configuracion">
        <el-icon><Setting /></el-icon>
        <span v-if="isOpen">Configuración</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref } from 'vue'
import { HomeFilled, User, Setting } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = ref(route.path)
const isOpen = ref(false)
</script>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: #2d3a4b;
    box-shadow: 2px 0 8px rgba(0,0,0,0.1);
    transition: width 0.2s;
}
.el-menu-vertical-demo {
  border-right: none;
}
</style>