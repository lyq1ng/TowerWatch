import { createApp } from 'vue'
import App from './App.vue'
import { List, Pagination, Button, Select, Table} from 'ant-design-vue'
import router from "./router.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import * as echarts from 'echarts'
import 'ant-design-vue/dist/reset.css'


console.log("Testing if main.js is loaded");

const app = createApp(App)
app.config.globalProperties.$echarts = echarts

app.use(List);
app.use(Pagination);
app.use(Button);
app.use(Select);
app.use(Table);
app.use(router);
app.use(ElementPlus);

Object.keys(ElementPlusIconsVue).forEach(key => {
    app.component(key, ElementPlusIconsVue[key]);
});

app.mount('#app')

