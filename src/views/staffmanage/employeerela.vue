<template>
  <el-main class="relaCon">
    <!--员工关系-->
    <div v-if="!isAbandonentryShow && !isHadLeaveShow && !isTransRecord && !isRegistration">
      <!-- <div class="top-tit">
        <span>员工管理</span>
        <span>/</span>
        <span>员工关系</span>
      </div> -->
      <ul class="header-top">
        <router-link
          active-class="active"
          class="itemLi"
          tag="li"
          to="/entrymanage"
          v-if="isRender('entrymanage')"
        >入职管理</router-link>
        <router-link
          active-class="active"
          class="itemLi"
          tag="li"
          to="/fullmanage"
          v-if="isRender('fullmanage')"
        >转正管理</router-link>
        <router-link
          active-class="active"
          class="itemLi"
          tag="li"
          to="/exitmanage"
          v-if="isRender('exitmanage')"
        >离职管理</router-link>
        <router-link
          active-class="active"
          class="itemLi"
          tag="li"
          v-if="isRender('translatemanage')"
          to="/translatemanage"
        >异动管理</router-link>
      </ul>
      <router-view></router-view>
    </div>
    <!-- 放弃入职 -->
    <abandon-entry v-if="isAbandonentryShow"></abandon-entry>
    <had-leave v-if="isHadLeaveShow"></had-leave>
    <trans-record v-if="isTransRecord"></trans-record>
    <Registration v-if="isRegistration"></Registration>
  </el-main>
</template>

<script>
import AbandonEntry from './relation/abandonentry.vue';
import HadLeave from './relation/hadleave.vue'; // 已离职员工
import TransRecord from './relation/transrecord.vue';
import Registration from './relation/registration.vue';// 登记表
import { mapState } from 'vuex';
export default {
    name: 'employeerela',
    components: {
        AbandonEntry,
        HadLeave,
        TransRecord,
        Registration
    },
    data() {
        return {
            // isAbandonentry:false,
        };
    },
    computed: {
        isAbandonentryShow() {
            return this.$store.state.relation.isAbandonentry;
        },
        isHadLeaveShow() {
            return this.$store.state.relation.isHadLeave;
        },
        isTransRecord() {
            return this.$store.state.relation.isTransRecord;
        },
        isRegistration() {
            return this.$store.state.relation.isRegistration;
        },
        ...mapState({userMenus: state => state.user.userMenus})
    },
    methods: {
        isRender(key) {
            return this.userMenus.includes(key);
        }
    }
};
</script>

<style scoped>
.relaCon {
    width: 100%;
    /*padding: 0 20px; */
    padding-bottom: 30px;
    background: #fff;
}
.top-tit {
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eeeeee;
}
.top-tit > span {
    font-size: 14px;
    color: #212121;
}
.header-top {
    height: 50px;
    display: flex;
    padding: 10px 0;
    align-items: center;
    border-bottom: 1px solid #dddddd;
}
.itemLi {
    padding: 0 20px;
    margin-right: 20px;
    font-size: 14px;
    color: #212121;
    cursor: pointer;
}
.active {
    color: #409eff;
}
</style>
