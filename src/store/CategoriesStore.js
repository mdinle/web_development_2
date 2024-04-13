import { defineStore } from "pinia";
import axiosClient from "@/axios";

export const useCategoriesStore = defineStore('CategoriesStore', {
    state: () => ({
        categories: [],
        error: null,
    }),
    actions: {
        async fetchCategories() {
            try {
                const response = await axiosClient.get('/categories');
                this.categories = response.data;
            } catch (error) {
                this.error = error.message;
            }
        },
        async getCategory(id) {
            try {
                const response = await axiosClient.get(`/category?categoryId=${id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async createCategory(category) {
            try {
                const response = await axiosClient.post('/create-category', category);
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async deleteCategory(id) {
            try {
                const response = await axiosClient.delete(`/delete-category?categoryId=${id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async updateCategory(category) {
            try {
                const response = await axiosClient.put('/update-category', category);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }
});