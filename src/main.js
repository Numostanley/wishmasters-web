import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from "./router";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);
app.mount("#app");
