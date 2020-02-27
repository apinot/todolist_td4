import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todoItems: [],
    },
    getters: {
        todoItems(state) {
            return state.todoItems;
        }
    },
    mutations: {

    },
    actions: {

    },
});

export default store;