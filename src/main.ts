import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
const options = {
    // You can set your default options here
};
app.use(router);
app.use(ElementPlus)
app.mount("#app");
app.use(Toast, options);