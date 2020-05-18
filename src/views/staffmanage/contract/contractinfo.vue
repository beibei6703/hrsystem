<template>
  <div>
    <div class="baseCon" v-if="!edit">
      <div class="infonCon">
        <div class="titInfo">
          <span>合同信息</span>
        </div>
        <div class="editCon">
          <span @click="changeShow({type: true})">编辑</span>
        </div>
        <div class="baseInfo topline" v-for="item in data" :key="item.id">
          <div class="listCon">
            <div class="list">
              <span class="nameTit">合同政策</span>
              <span class="massage">{{item.policyEname}}</span>
            </div>
            <div class="list">
              <span class="nameTit">合同状态</span>
              <span class="massage">{{item.contractStatusEname}}</span>
            </div>
          </div>
          <div class="listCon">
            <div class="list">
              <span class="nameTit">合同开始日</span>
              <span class="massage">{{item.startDate}}</span>
            </div>
            <div class="list">
              <span class="nameTit">合同结束日</span>
              <span class="massage">{{item.endDate}}</span>
            </div>
          </div>
          <div class="listCon">
            <div class="list">
              <span class="nameTit">合同年限</span>
              <span class="massage">{{item.contractYears}}</span>
            </div>
            <div class="list">
              <span class="nameTit">试用期月数</span>
              <span class="massage">{{item.probation}}</span>
            </div>
          </div>
          <div class="listCon">
            <div class="list">
              <span class="nameTit">合同签署公司</span>
              <span class="massage">{{item.contractCompany}}</span>
            </div>
          </div>
          <div class="listCon">
            <div class="list">
              <span class="nameTit">备注</span>
              <span class="massage">{{item.remark}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Contractfrom v-if="edit" :data="data" @changeShow="changeShow"></Contractfrom>
  </div>
</template>

<script>
import { getEmployeeContract } from '@src/api/employeeContract';
import Contractfrom from './contractfrom';

export default {
    name: 'contractinfo',
    components: {
        Contractfrom
    },
    data() {
        return {
            workCode: this.$route.params.workCode,
            data: {},
            edit: false
        };
    },
    created() {
        this.getEmployeeContract();
    },
    methods: {
        getEmployeeContract() {
            getEmployeeContract(this.workCode).then(res => {
                this.data = res.data;
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
<style scoped>
@import '../../../assets/style/detail.css';
.topline:nth-of-type(3) {
    border-top: none;
    padding-top: 0px;
    margin-top: 0px;
}
</style>
