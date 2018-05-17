import '../css/index.scss';
import Vue from 'vue';


import Users from '../component/user.vue';

new Vue({
    el:"#container",
    render:h=>h(Users)
})