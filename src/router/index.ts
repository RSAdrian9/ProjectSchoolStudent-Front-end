import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Register from "../views/Register.vue";
import Student from "../views/Student.vue";
import School from "../views/School.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard},
  { path: "/students", component: Student },
  { path: "/schools", component: School },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
