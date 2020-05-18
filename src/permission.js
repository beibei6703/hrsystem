import router from './router';
import store from './store';
// import { currentRoutes } from './router/permissions';
import { Message } from 'element-ui';
import { routes } from './router/asyncRouters';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import docCookies from '@src/utils/cookie';
import rrweb from '@src/utils/rrweb';
import Axios from '@src/utils/requestFormData';
NProgress.configure({ showSpinner: false }); // NProgress Configuration
router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start();
    // set page title
    document.title = to.meta.title || '系统';
    let twoDomain = window.location.href.split('.')[1];
    // determine whether the user has logged in
    const hasToken = docCookies.getItem('JESSIONID');
    if (hasToken) {
        // determine whether the user has obtained his permission roles through getInfo
        // const hasPermissions = store.getters.permissions && store.getters.permissions.length > 0;
        const hasUserInfo = store.getters.userInfo && store.getters.userInfo.empId;
        if (hasUserInfo) {
            next();
        } else {
            try {
                // 获取用户信息 —> 查询用户头像 —> 获取权限 -> 生成路由
                store.dispatch('user/getUserInfo').then(res => {
                    // store.dispatch('user/getAvatar');
                    const { userName, empId } = res;
                    rrweb(userName, empId);
                    // permissionURL:'http://authority.apitest.com'
                    // permissionURL:'http://portal.api.com'
                    var formData = new FormData();
                    formData.append('mark', 'c86523df-da82-4639-8387-0d59138db04d');
                    Axios({
                        method: 'post',
                        url: '//portal.api.com/authority_system/permission/getMenuByworkCodeAndSystemId',
                        data: formData,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(res => {
                            if (res.success && res.code === 0) {
                                let data = res.data;
                                if (!!data) {
                                    store.dispatch('user/setMenus', data).then(res => {
                                        routes[0].children = res;
                                        router.addRoutes(routes);
                                    });
                                    // if(store.state.user.userMenus.includes('/roster')){
                                    //         next('/');
                                    //     }else{
                                    //         next("/employeerela")
                                    //     }
                                    next('/');
                                }
                            } else {
                                // 如果是线上或者测试环境才跳转
                                if (twoDomain === 'apitest' || twoDomain === 'api') {
                                    window.location.href = `//sso.${window.location.href.split('.')[1]}.com`;
                                }
                            }
                        });
                });

                next();
            } catch (error) {
                Message.error(error || 'Has Error');
                NProgress.done();
            }
        }
    } else {
        // 如果是线上或者测试环境才跳转
        if (twoDomain === 'apitest' || twoDomain === 'api') {
            window.location.href = `//sso.${window.location.href.split('.')[1]}.com`;
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
