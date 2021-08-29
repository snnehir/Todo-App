import {createRouter, createWebHashHistory} from "vue-router"
import store from "../store/store"
const routes = [
    {
        name: "HomePage",
        path: "/",
        component: () => import("@/views/HomePage.vue")

    },
    {
        name: "LoginPage",
        path: "/login",
        component: () => import("@/views/LoginPage.vue")

    },
    {
        name: "RegisterPage",
        path: "/register",
        component: () => import("@/views/RegisterPage.vue")

    }

]

const router = createRouter({
    routes,
    history: createWebHashHistory()
});

router.beforeEach((to, _, next) => {
    const authRequiredRoutes = ["HomePage"];
    const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];
    const isAuthenticated = store.getters.isAuthenticated;
  
    if (authNotRequiredRoutes.indexOf(to.name) > -1 && isAuthenticated) next(false);
  
    else if (authRequiredRoutes.indexOf(to.name) > -1) {
      if (isAuthenticated) next();
      else next({ name: "LoginPage" });
    } else {
      next();
    }
  });
  
export default router;