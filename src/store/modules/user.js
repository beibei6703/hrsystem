import { getUserInfo, getAvatar } from '@src/api/user';
import { asyncRouter } from '@src/router/asyncRouters.js'
const state = {
    roles: [],
    userAvatar: [],
    userMenus:[]
};

const mutations = {
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_MENU(state,menu){
        state.userMenus = menu;
    },
    SET_USERAVATAR: (state, userAvatar) => {
        state.userAvatar = userAvatar;
    }
};

const actions = {
    setMenus({commit},menu){
        return new Promise((resolve,reject)=>{
            let arr = [];
            let muensValue = [];
            for(let i=0;i<menu.length;i++){
                // if(menu[i].menuValue){
                    muensValue.push(menu[i].menuValue)
                // };
            };
            // if(!muensValue.includes("/organization")){
            //     return;
            // };
            if(muensValue.includes('personinfo')){
                arr.push({
                    path: '/personinfo/:workCode',
                    name: 'personinfo',
                    component: () => import('@src/views/staffmanage/personinfo'),
                    meta: {
                        title: '个人详情'
                    }
                });
            };
            asyncRouter.forEach( (item, index) => {
                if(muensValue.includes(item.path)){
                    arr.push(item);
                }
            });
            commit('SET_MENU',muensValue);
            resolve(arr)
        })
    },
    getUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getUserInfo()
                .then(response => {
                    const { data } = response;
                    commit('SET_ROLES', data);
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    /**
     * @description: 获取头像
     */
    getAvatar({ commit }) {
        return new Promise((resolve, reject) => {
            getAvatar(state.roles.empId)
                .then(response => {
                    const { data } = response;
                    commit('SET_USERAVATAR', data[0]);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
