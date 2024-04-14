import UsersView from "@/views/dashboard/UsersView.vue";
import UsersHome from "@/components/Users/Home.vue";
import AddEditUsers from "@/components/Users/AddEditUsers.vue";

export default {
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
        component: AddEditUsers,
        meta: { breadcrumb: 'Create User'},
      },
      {
        path: "/users/edit/:id",
        name: "edit-user",
        component: AddEditUsers,
        meta: { breadcrumb: 'Edit User'},
      }
    ],
  }