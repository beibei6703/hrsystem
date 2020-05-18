<template>
    <div id="wrap">
    <!-- <yj-header></yj-header> -->
        <div class="wrapper">
            <el-container class="e-index">
                <yj-menu :collapse='isCollapse'></yj-menu>
                <el-container>
                    <el-header class="navbar">
                        <div class="fold">
                            <i class="el-icon-s-fold" v-if='!isCollapse' @click='isCollapse=true'></i>
                            <i class="el-icon-s-unfold" v-if='isCollapse' @click='isCollapse=false'></i>
                            <span class="bar-name" style="">{{$route.meta.title}}</span>
                        </div>
                    </el-header>
                    <router-view />
                </el-container>
            </el-container>
        </div>
    </div>
</template>
<script>
import yjHeader from './header.vue';
import yjMenu from './slider.vue';
export default {
    name: 'layout',
    data() {
        return {
            isCollapse: false
        };
    },
    components: {
        yjHeader,
        yjMenu
    }
};
</script>
<style scoped>
#wrap,
.e-index {
    height: 100%;
}
.wrapper {
    /* height: calc(100% - 80px); */
    height: 100%;
}
.navbar{
    width: 100%;
    height: 60px;
    background: #fff;
    line-height: 60px;
    padding: 0 10px;
}
.fold {
    line-height: 60px;
    font-size: 24px;
}
.bar-name{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    margin-left: 10px;
}
</style>
