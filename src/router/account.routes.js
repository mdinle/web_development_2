import AccountView from "@/components/Authentication.vue";
import LoginView from "@/views/account/LoginView.vue";
import RegisterView from "@/views/account/RegisterView.vue";

export default {
    path: "/account",
    redirect: "/login",
    name: "account",
    component: AccountView,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "login",
        component: LoginView,
      },
      {
        path: "/register",
        name: "register",
        component: RegisterView,
      },
    ],
  }