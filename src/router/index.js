import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AuthenticationVue from "../components/Authentication.vue";
import Dashboard from "../views/dashboard/DashboardView.vue";
import Categories from "../views/dashboard/ManageCategoriesView.vue";
import Brands from "../views/dashboard/ManageBrandsView.vue";
import Size from "../views/dashboard/ManageSizesView.vue";
import Product from "../views/dashboard/ManageProductsView.vue";
import Stock from "@/views/dashboard/ManageStockView.vue";
import StockHistory from "../views/dashboard/StockHistoryView.vue";
import store from "../store";
import ManageUsersView from "../views/dashboard/ManageUsersView.vue";

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
    path: "/users",
    name: "users",
    meta: { requiresAuth: true },
    component: ManageUsersView,
  },

  {
    path: "/",
    name: "dashboard",
    meta: { requiresAuth: true },
    component: Dashboard,
  },

  {
    path: "/categories",
    name: "categories",
    meta: { requiresAuth: true },
    component: Categories,
  },

  {
    path: "/brands",
    name: "brands",
    meta: { requiresAuth: true },
    component: Brands,
  },

  {
    path: "/size",
    name: "size",
    meta: { requiresAuth: true },
    component: Size,
  },

  {
    path: "/products",
    name: "products",
    meta: { requiresAuth: true },
    component: Product,
  },

  {
    path: "/stock-history",
    name: "stock-history",
    meta: { requiresAuth: true },
    component: StockHistory,
  },

  {
    path: "/stock",
    name: "stock",
    meta: { requiresAuth: true },
    component: Stock,
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
