import {createStore} from 'vuex';
import axiosClient from 'axios';

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        }
    },
    actions: {
        register({ commit }, user) {
            return axiosClient.post('http://localhost:8000/api/register', user)
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
            sessionStorage.setItem('TOKEN', user.token);
        }
    },
});

export default store;