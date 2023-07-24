import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import ProfileView from "@/views/ProfileView.vue";
import NoteView from "@/views/NoteView.vue";
import EditNoteView from "@/views/EditNoteView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: {requiresAuth: true},
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    metha: {requiresAuth: true},
  },
  {
    path: "/note/:id",
    name: "Note",
    component: NoteView,
    meta: {requiresAuth: true},
    props: true,
  },
  {
    path: "/editnote/:id",
    name: "EditNote",
    component: EditNoteView,
    meta: {requiresAuth: true},
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    } else {
      next("/");
    }
    // this allow all the routes that need not authentication
  } else {
    next();
  }
});

export default router;
