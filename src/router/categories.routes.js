import CategoriesView from "@/views/dashboard/CategoriesView.vue";
import CategoriesHome from "@/components/Categories/Home.vue";
import AddEditCategory from "@/components/Categories/AddEditCategory.vue";

export default {
  path: "/category",
  redirect: "/categories",
  name: "category",
  component: CategoriesView,
  meta: { requiresAuth: true, breadcrumb: "Categories" },
  children: [
    {
      path: "/categories",
      name: "categories",
      component: CategoriesHome,
    },
    {
      path: "/categories/create",
      name: "create-category",
      component: AddEditCategory,
    },
    {
      path: "/categories/edit/:id",
      name: "edit-category",
      component: AddEditCategory,
    },
  ],
};
