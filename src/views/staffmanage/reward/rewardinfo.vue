<template>
  <div>
    <div class="baseCon" v-if="!edit">
      <div class="infonCon">
        <div class="titInfo">
          <span>奖惩记录</span>
        </div>
        <div class="editCon">
          <span @click="changeShow({type: true})">编辑</span>
        </div>
        <div class="baseInfo topline" v-for="item in data" :key="item.id">
          <div class="listCon">
            <div class="list">
              <span class="nameTit">奖惩类型</span>
              <span class="massage">{{item.rpTypeEname}}</span>
            </div>
            <div class="list">
              <span class="nameTit">奖惩日期</span>
              <span class="massage">{{item.rpDate}}</span>
            </div>
          </div>
          <div class="listCon" v-if="item.rpTypeEname !== '奖励'">
            <div class="list">
              <span class="nameTit">处罚等级</span>
              <span class="massage">{{item.penaltyGradeEname}}</span>
            </div>
            <div class="list">
              <span class="nameTit">处罚金额</span>
              <span class="massage">{{item.penaltyAmount}}</span>
            </div>
          </div>
          <div class="listCon">
            <div class="list">
              <span class="nameTit">所在部门</span>
              <span class="massage">{{item.departmentName}}</span>
            </div>
          </div>
          <div class="listCon">
            <div class="list">
              <span class="nameTit">事由</span>
              <span class="massage">{{item.reason}}</span>
            </div>
          </div>
        </div>
        <div v-if="data.length === 0" class="no-data">
            暂无数据
        </div>
      </div>
    </div>
    <Rewardfrom v-if="edit" :data="data" @changeShow="changeShow"></Rewardfrom>
  </div>
</template>

<script>
import { getEmployeeRewardAndPunish } from '@src/api/employeeRewardAndPunish';
import Rewardfrom from './rewardfrom';
export default {
    name: 'rewardinfo',
    components: {
        Rewardfrom
    },
    data() {
        return {
            workCode: this.$route.params.workCode,
            data: [],
            edit: false
        };
    },
    created() {
        this.getEmployeeRewardAndPunish();
    },
    methods: {
        getEmployeeRewardAndPunish() {
            getEmployeeRewardAndPunish(this.workCode).then(res => {
                this.data = res.data;
            });
        },
        changeShow(data) {
            const { type, fn } = data;
            this.edit = type;
            this[fn] && this[fn]();
        }
    }
};
</script>

<style scoped>
@import '../../../assets/style/detail.css';
.topline:nth-of-type(3) {
    border-top: none;
    padding-top: 0px;
    margin-top: 0px;
}
</style>
