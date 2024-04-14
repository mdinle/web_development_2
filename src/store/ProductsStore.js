import { defineStore } from "pinia";
import axiosClient from '../axios';
import router from '../router';

export const useProductsStore = defineStore('ProductsStore', {
    state: () => ({
        products: [],
        error: null,
    }),
    getters: {
        getLowestStock() {
            return this.products.reduce((acc, product) => {
                return acc.stock < product.stock ? acc : product;
            });
        },
        getLatestProducts() {
            return this.products.sort((a, b) => new Date(b.created_at.date) - new Date(a.created_at.date)).slice(0, 5);
        },
        getTotalStock() {
            return this.products.reduce((acc, product) => acc + product.stock, 0);
        },
    },
    actions: {
        async fetchProducts() {
            try {
                const response = await axiosClient.get('/products');
                this.products = response.data;
            } catch (error) {
                this.error = error.message;
            }
        },
        async getProduct(id) {
            try {
                const response = await axiosClient.get(`/product?productId=${id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async fetchDetailedProducts() {
            try {
                const response = await axiosClient.get('/detailed-products');
                this.products = response.data;
                return response.data;
            } catch (error) {
                this.error = error.message;
            }
        },
        async fetchDetailedProduct(id) {
            try {
                const response = await axiosClient.get(`/detailed-product?productId=${id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async createProduct(product) {
            try {
                const response = await axiosClient.post('/create-product', product);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async deleteProduct(id) {
            try {
                const response = await axiosClient.delete(`/delete-product?productId=${id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async updateProduct(product) {
            try {
                const response = await axiosClient.put('/update-product', product);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }
});