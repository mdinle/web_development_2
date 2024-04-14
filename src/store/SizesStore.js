import { defineStore } from "pinia";
import axiosClient from '@/axios'

export const useSizesStore = defineStore("SizesStore", {
    state: () => ({
        sizes: [],
    }),
    actions: {
        async fetchSizes() {
            try {
                const response = await axiosClient.get('/sizes');
                this.sizes = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async fetchSize(id) {
            try{
                const response = await axiosClient.get(`/size?sizeId=${id}`);
                return response.data;
            }catch(error){
                throw error;
            }
        },
        async createSize(size) {
            try{
                const response = await axiosClient.post('/create-size', size);
                return response.data;
            }catch(error){
                throw error;
            }
        },
        async updateSize(size) {
            try{
                const response = await axiosClient.put('/update-size', size);
                return response.data;
            }catch(error){
                throw error;
            }
        },
        async deleteSize(id) {
            try{
                const response = await axiosClient.delete(`/delete-size?sizeId=${id}`);
                return response.data;
            }catch(error){
                throw error;
            }
        },
        async fetchSizesByProductId(id) {
            try {
                const response = await axiosClient.get(`/sizes-by-product?id=${id}`);
                console.log(response.data);
                this.sizes = response.data;
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
    },
});