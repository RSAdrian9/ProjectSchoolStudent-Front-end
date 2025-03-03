import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import StudentsView from "../views/StudentsView.vue";
import SchoolsView from "../views/SchoolsView.vue";
import StudentDetail from "../components/component-detail/StudentDetail.vue";
import SchoolDetail from "../components/component-detail/SchoolDetail.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard},
  { path: "/students", component: StudentsView },
  { path: '/students/:id', component: StudentDetail, name: 'StudentDetail' },
  //{ path: '/students/:id', component: StudentDetail, props: true },
  { path: "/schools", component: SchoolsView },
  { path: '/schools/:id', component: SchoolDetail, name: 'SchoolDetail' },
  //{ path: '/schools/:id', component: SchoolDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
