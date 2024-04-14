import ProductsView from "@/views/dashboard/ProductsView.vue";
import ProductsHome from "@/components/Products/Home.vue";
import AddEditProducts from "@/components/Products/AddEditProducts.vue";
import ProductDetails from "@/components/Products/ProductDetails.vue";

export default {
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
      {
        path: "/products/create",
        name: "create-product",
        component: AddEditProducts,
      },
      {
        path: "/products/edit/:id",
        name: "edit-product",
        component: AddEditProducts,
      },
      {
        path: "/products/:id",
        name: "product-details",
        component: ProductDetails,
      }
    ],
  }