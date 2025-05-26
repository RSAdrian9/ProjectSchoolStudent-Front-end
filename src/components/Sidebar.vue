<template>
  <el-aside
    :width="isOpen ? '170px' : '70px'"
    class="h-full sidebar"
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
      <el-menu-item
        v-for="item in sidebarItems"
        :key="item.path"
        :index="item.path"
      >
        <el-icon><component :is="icons[item.icon]" /></el-icon>
        <span v-if="isOpen">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { icons } from '../composables/useIcons'

interface SidebarItem {
  name: string
  path: string
  icon: keyof typeof icons
}

const sidebarItems: SidebarItem[] = [
  { name: 'Home', path: '/', icon: 'home' },
  { name: 'Schools', path: '/schools', icon: 'schools' },
  { name: 'Tutors', path: '/tutors', icon: 'tutors' },
  { name: 'Students', path: '/students', icon: 'students' },
  { name: 'Companies', path: '/companies', icon: 'companies' },
  { name: 'Profile', path: '/profile', icon: 'profile' },
  { name: 'Settings', path: '/settings', icon: 'settings' },
]

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
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: width 0.2s;
  overflow: hidden;
}
.el-menu-vertical-demo {
  border-right: none;
}
</style>
