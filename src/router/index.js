import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AuthenticationVue from "../components/Authentication.vue";
import Dashboard from "../views/dashboard/DashboardView.vue";
import StockHistory from "../views/dashboard/StockHistoryView.vue";

import store from "../store";

import UsersView from "../views/dashboard/UsersView.vue";
import UsersHome from "../components/Users/Home.vue";
import UsersCreate from "../components/Users/CreateUser.vue";

import CategoriesView from "../views/dashboard/CategoriesView.vue";
import CategoriesHome from "../components/Categories/Home.vue";

import BrandsView from "../views/dashboard/BrandsView.vue";
import BrandsHome from "../components/Brands/Home.vue";

import SizesView from "../views/dashboard/SizesView.vue";
import SizesHome from "../components/Sizes/Home.vue";

import ProductsView from "@/views/dashboard/ProductsView.vue";
import ProductsHome from "@/components/Products/Home.vue";

import StockView from "@/views/dashboard/StockView.vue";
import StockHome from "@/components/Stock/Home.vue";

const routes = [
  {
    path: "/authentication",
    redirect: "/login",
    name: "authentication",
    component: AuthenticationVue,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      {
        path: "/register",
        name: "register",
        component: RegisterView,
      },
    ],
  },

  {
    path: "/",
    name: "dashboard",
    meta: { requiresAuth: true, breadcrumb: 'Home' },
    component: Dashboard,
  },

  {
    path: "/user",
    redirect: "/users",
    name: "user",
    component: UsersView,
    meta: { requiresAuth: true, breadcrumb: 'Users'},
    children: [
      {
        path: "/users",
        name: "users",
        component: UsersHome,
      },
      {
        path: "/users/create",
        name: "create-user",
        component: UsersCreate,
        meta: { breadcrumb: 'Create User'},
      }
    ],
  },

  {
    path: "/category",
    redirect: "/categories",
    name: "category",
    component: CategoriesView,
    meta: { requiresAuth: true, breadcrumb: 'Categories'},
    children: [
      {
        path: "/categories",
        name: "categories",
        component: CategoriesHome,
      },
    ],
  },

  {
    path: "/brand",
    redirect: "/brands",
    name: "brand",
    component: BrandsView,
    meta: { requiresAuth: true, breadcrumb: 'Brands'},
    children: [
      {
        path: "/brands",
        name: "brands",
        component: BrandsHome,
      },
    ],
  },

  {
    path: "/size",
    redirect: "/sizes",
    name: "size",
    component: SizesView,
    meta: { requiresAuth: true, breadcrumb: 'Sizes'},
    children: [
      {
        path: "/sizes",
        name: "sizes",
        component: SizesHome,
      },
    ],
  },

  {
    path: "/product",
    redirect: "/products",
    name: "product",
    component: ProductsView,
    meta: { requiresAuth: true, breadcrumb: 'Products'},
    children: [
      {
        path: "/products",
        name: "products",
        component: ProductsHome,
      },
    ],
  },

  {
    path: "/stock",
    redirect: "/stocks",
    name: "stock",
    component: StockView,
    meta: { requiresAuth: true, breadcrumb: 'Stocks'},
    children: [
      {
        path: "/stocks",
        name: "stocks",
        component: StockHome,
      },
    ],
  },

  {
    path: "/stock-history",
    name: "stock-history",
    meta: { requiresAuth: true, breadcrumb: 'Stock History'},
    component: StockHistory,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "login" });
  } else if (to.meta.isGuest && store.state.user.token) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
