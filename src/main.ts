import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// @ts-ignore
import routes from 'virtual:generated-pages';

import './styles/global.css';
import App from './App.vue';

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);

app.use(router);
app.mount('#app');
