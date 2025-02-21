import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Competitions from "@/views/Competitions.vue";
import Competition from "@/views/Competition.vue";
import Home from "@/views/Home.vue";
import Register from "../views/Register.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/competitions",
    component: Competitions,
  },
  {
    path: "/competitions/:competitionId",
    component: Competition,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
