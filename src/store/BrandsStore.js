import { defineStore } from "pinia";
import axiosClient from '@/axios'
import { ref } from "vue";

export const useBrandsStore = defineStore("BrandsStore", {
    state: () => ({
        brands: [],
    }),
    actions: {
        async fetchBrands() {
            try {
                const response = await axiosClient.get('/brands');
                this.brands = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async fetchBrand(id) {
            try{
                const response = await axiosClient.get(`/brand?brandId=${id}`);
                return response.data;
            }catch(error){
                throw error;
            }
        },
        async createBrand(brand) {
            try{
                const response = await axiosClient.post('/create-brand', brand);
                return response.data;
            }catch(error){
                throw error;
            }
        },
        async updateBrand(brand) {
            try{
                const response = await axiosClient.put('/update-brand', brand);
                return response.data;
            }catch(error){
                throw error;
            }
        },
        async deleteBrand(id) {
            try{
                const response = await axiosClient.delete(`/delete-brand?brandId=${id}`);
                return response.data;
            }catch(error){
                throw error;
            }
        },
    },
});