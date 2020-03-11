import Vue from 'nativescript-vue';
// import App from './components/App';

import Login from './components/Login';

import store from './store';

new Vue({
    store,
    render: function(h) {
        return h('Frame', [h(Login)]);
    }
}).$start();
