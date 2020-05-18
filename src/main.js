// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import '@src/assets/style/index.less';
import router from './router';
import store from './store';
import './permission';
import docCookies from '@src/utils/cookie.js';
import { successMsg, errorMsg } from '@src/utils/message.js';
import VueOrgTree from 'vue2-org-tree';
import { getTreeData } from '@src/utils/getTree.js';
Vue.use(VueOrgTree);

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.successMsg = successMsg;
Vue.prototype.errorMsg = errorMsg;
Vue.prototype.$docCookies = docCookies;
Vue.prototype.getTreeData = getTreeData;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
