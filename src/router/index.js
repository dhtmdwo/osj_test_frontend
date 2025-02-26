import { createRouter, createWebHistory } from "vue-router";

import router1 from "../components/List.vue";
import router2 from "../components/Register.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: router1 },
    { path: "/register", component: router2 },
  ],
});

export default router;
