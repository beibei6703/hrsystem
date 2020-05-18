<template>
  <div>
    <div class="baseCon" v-if="!edit">
      <div class="titInfo">
        <span>银行信息</span>
      </div>
      <div class="infonCon">
        <div class="editCon">
          <span @click="changeShow({type: true})">编辑</span>
        </div>
        <div class="baseInfo">
          <div class="listCon">
            <div class="list">
              <span class="nameTit">银行名称</span>
              <span class="massage">{{data.bankEname}}</span>
            </div>
            <div class="list">
              <span class="nameTit">账号持有人</span>
              <span class="massage">{{data.cardOwner}}</span>
            </div>
          </div>
          <div class="listCon">
            <div class="list">
              <span class="nameTit">银行账号</span>
              <span class="massage">{{data.cardNo}}</span>
            </div>
            <div class="list">
              <span class="nameTit">开户行全称</span>
              <span class="massage">{{data.branchBank}}</span>
            </div>
          </div>
          <div class="listCon">
            <div class="list">
              <span class="nameTit">支薪政策</span>
              <span class="massage">{{data.salaryTypeEname}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="titInfo">
        <span>工资信息</span>
      </div>
      <div class="infonCon ">
        <div class="baseInfo">
          <div class="listCon top20">
            <div class="list">
              <span class="nameTit">试用期工资</span>
              <span class="massage">{{data.salaryAmountProbation}}</span>
            </div>
            <div class="list">
              <span class="nameTit">正式工资</span>
              <span class="massage">{{data.salaryAmount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="titInfo">
        <span>社保信息</span>
      </div>
      <div class="infonCon">
        <div class="baseInfo">
          <div class="listCon top20">
            <div class="list">
              <span class="nameTit">社保所在地</span>
              <span class="massage">{{data.cityEname}}</span>
            </div>
            <div class="list">
              <span class="nameTit">社保，公积金缴纳月份</span>
              <span class="massage">{{data.socialInsuranceStartMonth}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Salaryfrom v-if="edit" :data="data" @changeShow="changeShow"></Salaryfrom>
  </div>
</template>

<script>
import Salaryfrom from './salaryfrom';
import { getEmployeeSalary } from '@src/api/employeeSalary';
export default {
    name: 'salaryinfo',
    components: {
        Salaryfrom
    },
    data() {
        return {
            workCode: this.$route.params.workCode,
            data: {},
            edit: false
        };
    },
    created() {
        this.getEmployeeSalary();
    },
    methods: {
        getEmployeeSalary() {
            getEmployeeSalary(this.workCode).then(res => {
                this.data = res.data || {};
            });
        },
        changeShow(data) {
            const { type, fn } = data;
            this.edit = type;
            fn && this[fn]();
        }
    }
};
</script>

<style>
@import '../../../assets/style/detail.css';
.listCon.top20 {
    margin-top: 20px;
}
</style>
