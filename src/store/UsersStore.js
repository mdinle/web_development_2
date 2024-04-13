import { defineStore } from "pinia";
import axiosClient from '../axios';
import router from '../router';

export const useUsersStore = defineStore('UsersStore', {
    state: () => ({
        users: [],
        error: null,
    }),
    getters: {
        getActiveUsers() {
            return this.users.filter(user => user.status === 'active').length;
        }
    },
    actions: {
        async fetchUsers() {
            try {
                const response = await axiosClient.get('/users');
                this.users = response.data;
            } catch (error) {
                this.error = error.message;
            }
        },
        async getUser(id) {
            try {
                const response = await axiosClient.get(`/user?userId=${id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async createUser(user) {
            try {
                const response = await axiosClient.post('/create-user', user);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async deleteUser(id) {
            try {
                const response = await axiosClient.delete(`/delete-user?userId=${id}`);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
        async updateUser(user) {
            try {
                const response = await axiosClient.put('/update-user', user);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    }
});