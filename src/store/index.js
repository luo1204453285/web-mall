/**
 * Created by linxin on 2017/3/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins'
Vue.use(Vuex);

import client from './client';
// import clerk from './clerk';
// import broadband from './broadband';
import market from './market';
import category from './category';

export default new Vuex.Store({
    modules: {
        client,
        // clerk,
        // broadband,
        market,
        category
    },
    // strict: process.env.NODE_ENV !== 'production',
    plugins
});