import { createRouter, createWebHistory } from "vue-router";

import router1 from "../components/List.vue";
import router2 from "../components/Register.vue";
import router3 from "../components/Board.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: router1 },
    { path: "/register", component: router2 },
    { path: "/board/:boardIdx", component: router3, props: true },
  ],
});

export default router;
