import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
export const baseUrl = process.env.VUE_APP_BASE_URL_API;
const baseUrlImg = process.env.VUE_APP_IMG_SRC_API;

axios.defaults.headers.common['Authorization'] = 'Token '+process.env.VUE_APP_API_TOKEN;
axios.defaults.baseURL = baseUrl;
Vue.use(VueAxios, axios, baseUrlImg)


