import AddEditSizes from "@/components/Sizes/AddEditSizes.vue";
import SizesHome from "@/components/Sizes/Home.vue";
import SizesView from "@/views/dashboard/SizesView.vue";

export default {
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
      {
        path: "/sizes/create",
        name: "create-size",
        component: AddEditSizes,
      },
      {
        path: "/sizes/edit/:id",
        name: "edit-size",
        component: AddEditSizes,
      }
    ],
  }