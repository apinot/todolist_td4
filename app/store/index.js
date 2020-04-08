import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import axios from 'axios';

import * as ApplicationSettings from "application-settings";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todoItems: [],
        auth: JSON.parse(ApplicationSettings.getString('auth', null)),
    },
    getters: {
        todoItems(state) {
            return state.todoItems;
        },
        isAuth(state) {
            return !!state.auth;
        },
        authToken(state) {
            if(!state.auth) return null;
            return state.auth.token;
        },
        authId(state) {
            if(!state.auth) return null;
            return state.auth.user.uuid;
        }
    },
    mutations: {
        init(state, data) {
            state.todoItems = data
        },
        insert(state, data) {
            state.todoItems.push(data);
        },
        update(state, data) {
            const index = state.todoItems.findIndex((item) => item.id === data.id);
            state.todoItems.splice(index, 1, data);
        },
        delete(state, data) {
            const index = state.todoItems.findIndex((item) => item.id === data.id);
            state.todoItems.splice(index, 1);
        },
        auth(state, data) {
            state.auth = data;
        }
    },
    actions: {
        init(context) {
            if(!context.getters.isAuth) return;

            axios.get(`https://api.todolist.sherpa.one/users/${context.getters.authId}/todos`, {
                headers: {
                    Authorization: `Bearer ${context.getters.authToken}`,
                }
            })
                .then((response) => {
                    context.commit('init', response.data.todos.map((td) => ({
                        id: td.uuid,
                        name: td.content,
                        done: td.done,
                    }) ))
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        insert(context, item) {
            if(!context.getters.isAuth) return;

            axios.post(`https://api.todolist.sherpa.one/users/${context.getters.authId}/todos`, {content: item.name}, {
                headers: {
                    Authorization: `Bearer ${context.getters.authToken}`,
                }
            })
                .then((response) => {
                    const newItem = {
                        id: response.data.todo.uuid,
                        name: response.data.todo.content,
                        done: response.data.todo.done,
                    }
                    context.commit('insert', newItem)
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        update(context, item) {
            if(!context.getters.isAuth) return;

            axios.patch(`https://api.todolist.sherpa.one/users/${context.getters.authId}/todos/${item.id}`, {content: item.name, done: item.done}, {
                headers: {
                    Authorization: `Bearer ${context.getters.authToken}`,
                }
            })
                .then((response) => {
                    const newItem = {
                        id: response.data.todo.uuid,
                        name: response.data.todo.content,
                        done: response.data.todo.done,
                    }
                    context.commit('update', newItem);
                })
                .catch((error) => {
                    console.log(error.response);
                })
        },
        delete(context, item) {
            if(!context.getters.isAuth) return;

            axios.delete(`https://api.todolist.sherpa.one/users/${context.getters.authId}/todos/${item.id}`, {
                headers: {
                    Authorization: `Bearer ${context.getters.authToken}`,
                }
            })
                .then(() => {
                    context.commit('delete', item);
                })
                .catch((error) => {
                    console.log(error.response);
                })
        },
        auth(context, auth) {
            context.commit('auth', auth);
            ApplicationSettings.setString('auth', JSON.stringify(auth));
            this.dispatch('init');
        }
    },
});


// init db
store.dispatch('init');

export default store;