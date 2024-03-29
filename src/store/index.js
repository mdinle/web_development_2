import {createStore} from 'vuex';
import axiosClient from '../axios';

const store = createStore({ 
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        }
    },
    actions: {
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({    data }) => {
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
    },
    mutations: {
        setUser(state, userData) {
            state.user.data = userData.user;
            state.user.token = userData.token;
            sessionStorage.setItem('TOKEN', userData.token);
            console.log('User data set:', userData.user);
        }
    },
});

export default store;