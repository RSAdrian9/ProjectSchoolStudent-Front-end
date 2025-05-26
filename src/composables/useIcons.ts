import {
  Home,
  User,
  Cog,
  School,
  UserTie,
  UserGraduate,
  Building
} from '@vicons/fa'
import type { Component } from 'vue'

export const icons: Record<string, Component> = {
  home: Home,
  profile: User,
  settings: Cog,
  schools: School,
  tutors: UserTie,
  students: UserGraduate,
  companies: Building,
}
