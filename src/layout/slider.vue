<style scoped>
.el-aside {
    color: #333;
    background:#001529;
    height: 100%;
    overflow-x: hidden;
}
.el-aside .sider-menu {
    border: 0;
}
/* .el-submenu {
    width:200px;
} */
.el-submenu .isActive
.el-menu .el-menu-item,
.el-submenu .title {

    font-size: 12px;
}
.el-menu{
    border: none;
}
.side-close{
    width: 78px !important;
    transition: all .3s linear;
}
.side-open{
    width: 200px !important;
    transition: all .3s linear;
}
.slider-logo{
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #001529;
    padding: 0 20px;
    overflow: hidden;
}
.slider-logo .logo{
    width: 32px;
    height: 32px;
    vertical-align: middle;
    margin-right: 12px;
}
.system_nam{
    display: inline-block;
    margin: 0;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 14px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    vertical-align: middle;
}
.el-menu-item.is-active{
    background:#1890ff!important
}
</style>

<template>
    <el-aside :class="collapse?'side-close':'side-open'">
        <div class="slider-logo">
            <img src="../assets/img/logo.png" class="logo" alt="">
            <span class="system_nam">人事系统</span>
        </div>
        <el-menu
            :collapse="collapse"
            :default-active="$route.path"
            background-color='#001529'
            text-color='#cdcdcd'
            active-text-color='#fff'
            router>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>员工管理</span>
                </template>
                <el-menu-item v-if='isRender("/roster")' index="/roster">员工花名册</el-menu-item>
                <el-menu-item v-if='isRender("/employeerela")' index="/entrymanage">员工关系</el-menu-item>
            </el-submenu>
                <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-share"></i>
                    <span>组织架构</span>
                </template>
                <el-menu-item v-if='isRender("/organization")' index="/organization">组织架构图</el-menu-item>
                <el-menu-item v-if='isRender("/organizemanage")' index="/organizemanage">组织管理</el-menu-item>
                <el-menu-item v-if='isRender("/postmanage")' index="/postmanage">岗位管理</el-menu-item>
                <el-menu-item v-if='isRender("/jobcategory")' index="/jobcategory">职位类别管理</el-menu-item>
                <el-menu-item v-if='isRender("/developmanage")' index="/developmanage">发展通道管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>基础设置</span>
                </template>
                <el-menu-item v-if='isRender("/basicsetting")' index="/basicsetting">基础设置</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span>数据同步</span>
                </template>
                <el-menu-item v-if='isRender("/api")' index="/api">同步接口</el-menu-item>
                <el-menu-item v-if='isRender("/log")' index="/log">同步日志</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'slider',
    props: ['collapse'],
    computed: {
        ...mapState({userMenus: state => state.user.userMenus})
    },
    methods: {
        isRender(key) {
            return this.userMenus.includes(key);
        }
    }
};
</script>
