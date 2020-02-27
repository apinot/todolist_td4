import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import groceryData from '../grocery-data.json';

const store = new Vuex.Store({
    state: {
        todoItems: groceryData.groceryItems.sort((a, b) => b.id - a.id),
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