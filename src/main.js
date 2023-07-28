import "bootstrap/dist/css/bootstrap.css";
import {createApp} from "vue";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";

// createApp(App).use(router).mount('#app')
const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000/"; // the FastAPI backend

app.config.errorHandler = (err, instance, info) => {
  console.error("Global error: ", err);
  console.log("Vue instance: ", instance);
  console.log("Error info: ", info);
};

// this help to manage the errors and in case needed to redirect to 'login'
axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry == true;
      store.dispatch("logout");
      return router.replace("/login#");
    }
  }
});

app.use(router);
app.use(store);
store.dispatch("initializeUserStatus").then(() => {
  app.mount("#app");
});
// app.mount("#app");
