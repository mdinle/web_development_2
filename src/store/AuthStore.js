import { defineStore } from "pinia";
import axiosClient from '../axios';
import router from '../router';

export const useAuthStore = defineStore('AuthStore', {
    state: () => ({
        token: sessionStorage.getItem('token'),
        user: JSON.parse(sessionStorage.getItem('user')),
    }),
    actions: {
        async register(user) {
            try {
                const response = await axiosClient.post('/register', user);
                this.token = response.data.token;
                this.user = response.data.user;

                sessionStorage.setItem('token', this.token);
                sessionStorage.setItem('user', JSON.stringify(this.user));

                router.push({name: 'dashboard'});
            } catch (error) {
                throw error;
            }
        },
        async login(validateUser) {
            console.log(validateUser);
            try {
                const response = await axiosClient.post('/login', validateUser);
                this.token = response.data.token;
                this.user = response.data.user;

                sessionStorage.setItem('token', this.token);
                sessionStorage.setItem('user', JSON.stringify(this.user));

                router.push({name: 'dashboard'});
            } catch (error) {
                throw error;
            }
        },
        async logout() {
            this.token = null;
            this.user = null;
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            router.push({name: 'login'});
        }
    }
});