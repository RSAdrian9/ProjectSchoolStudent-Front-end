export interface SidebarItem {
  name: string
  path: string
  icon: keyof typeof import('./useIcons').icons
}

export const sidebarItems: SidebarItem[] = [
  { name: 'Home', path: '/home', icon: 'home' },
  { name: 'Profile', path: '/profile', icon: 'profile' },
  { name: 'Settings', path: '/settings', icon: 'settings' },
  { name: 'Schools', path: '/schools', icon: 'schools' },
  { name: 'Tutors', path: '/tutors', icon: 'tutors' },
  { name: 'Students', path: '/students', icon: 'students' },
  { name: 'Companies', path: '/companies', icon: 'companies' },
]
