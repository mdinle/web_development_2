import {createStore} from 'vuex';
import axiosClient from '../axios';

const store = createStore({ 
    state: {
        user: {
            data: {
                username: sessionStorage.getItem('USERNAME'),
            },
            token: sessionStorage.getItem('TOKEN'),
        }
    },
    actions: {
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({    data }) => {
                    console.log('return data', data);
                    commit('setUser', data);
                    return data;
                })
          },

          login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({    data }) => {
                    commit('setUser', data);
                    return data;
                })
          },

          logout({ commit }) {
            commit('resetUser');
            sessionStorage.removeItem('TOKEN');
            sessionStorage.removeItem('USERNAME');
        },
    },
    mutations: {
        setUser(state, userData) {
            state.user.data = userData.user;
            state.user.token = userData.token;
            sessionStorage.setItem('TOKEN', userData.token);
            sessionStorage.setItem('USERNAME', userData.user.username);
        },

        resetUser(state) {
            state.user.data = {};
            state.user.token = null;
        }
    },
});

export default store;