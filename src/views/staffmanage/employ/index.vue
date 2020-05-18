<template>
  <div class="baseCon">
    <div class="titInfo" v-if="editEmploy || employeeHireInfo.rehireDate">
      <span>重新雇佣信息</span>
    </div>
    <Employinfo v-if="!editEmploy && employeeHireInfo.rehireDate" :data="employeeHireInfo" @changeShow="changeShow"></Employinfo>
    <Employfrom v-if="editEmploy" :data="employeeHireInfo" @changeShow="changeShow"></Employfrom>
    <div class="titInfo">
      <span>在职信息</span>
    </div>
    <Onjobinfo v-if="!editOnjob" :data="employeeHireInfo" @changeShow="changeShow"></Onjobinfo>
    <Onjobform v-if="editOnjob" :data="employeeHireInfo" @changeShow="changeShow"></Onjobform>
    <div class="titInfo">
      <span>更多信息</span>
    </div>
    <Moreinfo v-if="!editMore" :data="employeeHireInfo" @changeShow="changeShow"></Moreinfo>
    <Moreform v-if="editMore" :data="employeeHireInfo" @changeShow="changeShow"></Moreform>
  </div>
</template>

<script>
import { getEmployeeHireInfo } from '@src/api/employeeHireInfo';
import Employinfo from './employ/employinfo'; // 重新雇佣信息
import Employfrom from './employ/employfrom';
import Onjobinfo from './onjob/onjobinfo'; // 在职信息
import Onjobform from './onjob/onjobform';
import Moreinfo from './more/moreinfo'; // 更多信息
import Moreform from './more/moreform';
export default {
    name: 'employinfo',
    components: {
        Employinfo,
        Employfrom,
        Onjobinfo,
        Onjobform,
        Moreinfo,
        Moreform
    },
    data() {
        return {
            workCode: this.$route.params.workCode,
            editEmploy: false,
            editOnjob: false,
            editMore: false,
            employeeHireInfo: {}
        };
    },
    created() {
        this.getEmployeeHireInfo();
        this.getEnumeration();
    },
    methods: {
        // 获取枚举类型
        getEnumeration() {
            let enumeration = [
                'employee_grade'
            ];
            enumeration.forEach(item => {
                this.$store.dispatch('enumeration/getEnumDict', item);
            });
        },
        getEmployeeHireInfo() {
            getEmployeeHireInfo(this.workCode).then(res => {
                this.employeeHireInfo = res.data;
            });
        },
        changeShow({ type, value, fn }) {
            this[type] = value;
            fn && this[fn]();
        }
    }
};
</script>

<style scoped>
@import "../../../assets/style/detail.css";
.employTit {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}
.employTit > span {
  margin-right: 30px;
  font-size: 14px;
  color: #212121;
}
</style>
