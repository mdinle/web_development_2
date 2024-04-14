import BrandsView from "@/views/dashboard/BrandsView.vue";
import BrandsHome from "@/components/Brands/Home.vue";
import AddEditBrands from "@/components/Brands/AddEditBrands.vue";

export default {
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
      {
        path: "/brands/create",
        name: "create-brand",
        component: AddEditBrands,
        meta: { breadcrumb: 'Create Brand'},
      },
      {
        path: "/brands/edit/:id",
        name: "edit-brand",
        component: AddEditBrands,
        meta: { breadcrumb: 'Edit Brand'},
      }
    ],
  }