import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import AuthenticationVue from '../components/Authentication.vue'
import ProductsView from '../views/ProductsView.vue'
import store from '../store'

const routes = [
  {
    path: '/authentication',
    redirect: '/login',
    name: 'authentication',
    component: AuthenticationVue,
    meta: {isGuest: true},
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: RegisterView
      }
    ]
  },

  {
    path: '/',
    meta: { requiresAuth: true }, 
    name: 'dashboard',
    component: DashboardView
  },

  { 
  path: '/products',
  meta: { requiresAuth: true },  
  name: 'products', 
  component: ProductsView
 },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'login'});
  } else if(to.meta.isGuest && store.state.user.token) {
    next({name: 'dashboard'});
  } else {
    next()
  }
});

export default router
