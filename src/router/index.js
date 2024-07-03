import Vue from "vue";
import VueRouter from "vue-router";
import Registro from "../components/registro.vue";
import Login from "../components/login.vue";
import RegisterBook from '../components/registrarlibro.vue';
import Home from '../components/home.vue'; 

Vue.use(VueRouter);

const routes = [
  { path: "/home", component: Home }, 
  { path: "/registro", component: Registro },
  { path: "/login", component: Login },
  { path: '/registrarlibro', component: RegisterBook }
];

const router = new VueRouter({
  routes
});

export default router;
