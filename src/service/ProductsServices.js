import axiosClient from "@/axios";

export const ProductServices = {
    getProducts(){
        return axiosClient.get('/products')
        .then(response => {
            return response.data;
        }).catch(error => {
            return Promise.reject(error);
        });
    }
};