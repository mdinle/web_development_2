import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/AuthStore";

import Dashboard from "../views/dashboard/DashboardView.vue";
import StockHistory from "../views/dashboard/StockHistoryView.vue";

import StockView from "@/views/dashboard/StockView.vue";
import StockHome from "@/components/Stock/Home.vue";

import accountRoutes from "./account.routes";
import usersRoutes from "./users.routes";
import categoriesRoutes from "./categories.routes";
import brandsRouter from "./brands.router";
import sizesRouter from "./sizes.router";
import productsRoutes from "./products.routes";

const routes = [
  {...accountRoutes},

  {
    path: "/",
    name: "dashboard",
    meta: { requiresAuth: true, breadcrumb: 'Home' },
    component: Dashboard,
  },

  {...usersRoutes},

  {...categoriesRoutes},

  {...brandsRouter},

  {...sizesRouter},

  {...productsRoutes},

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
  if (to.meta.requiresAuth && !useAuthStore().token) {
    next({ name: "login" });
  } else if (to.meta.isGuest && useAuthStore().token) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
