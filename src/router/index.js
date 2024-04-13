import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/AuthStore";

import Dashboard from "../views/dashboard/DashboardView.vue";
import StockHistory from "../views/dashboard/StockHistoryView.vue";

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
import accountRoutes from "./account.routes";
import usersRoutes from "./users.routes";
import categoriesRoutes from "./categories.routes";

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
  if (to.meta.requiresAuth && !useAuthStore().token) {
    next({ name: "login" });
  } else if (to.meta.isGuest && useAuthStore().token) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
