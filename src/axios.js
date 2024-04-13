import axios from "axios";
import { useAuthStore } from "./store/AuthStore";

const axiosClient = axios.create({
    baseURL: 'http://localhost',

});

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${useAuthStore().token}`;
    return config;
});

export default axiosClient;