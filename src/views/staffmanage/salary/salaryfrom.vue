<template>
  <div class="baseCon">
    <div class="baseInfo">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="164px"
        class="demo-ruleForm"
      >
        <div class="titInfo">
          <span>银行信息</span>
        </div>
        <div class="listCon top20">
          <el-form-item label="银行名称">
            <el-select v-model="ruleForm.bankEid" placeholder disabled>
              <el-option
                v-for="item in enumeration.bank"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号持有人" prop="cardOwner">
            <el-autocomplete
              v-model="ruleForm.cardOwner"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
            ></el-autocomplete>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="银行账号" prop="cardNo">
            <el-input v-model="ruleForm.cardNo"></el-input>
          </el-form-item>
          <el-form-item label="开户行全称" prop="branchBank">
            <el-select
              placeholder="请选择"
              v-model="ruleForm.branchBank"
              filterable
              debounce
              remote
              :remote-method="getSubBank"
              @change="getSubBankId"
            >
              <el-option
                :key="subItem.CODE"
                :label="subItem.NAME"
                :value="subItem.NAME"
                v-for="subItem in subBankList"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="支薪政策">
            <el-select v-model="ruleForm.salaryTypeEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.salaryType"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="titInfo">
          <span>工资信息</span>
        </div>
        <div class="listCon top20">
          <el-form-item label="试用期工资" prop="salaryAmountProbation">
            <el-input v-model="ruleForm.salaryAmountProbation"></el-input>
          </el-form-item>
          <el-form-item label="正式工资" prop="salaryAmount">
            <el-input v-model="ruleForm.salaryAmount"></el-input>
          </el-form-item>
        </div>
        <div class="titInfo">
          <span>社保信息</span>
        </div>
        <div class="listCon top20">
          <el-form-item label="社保所在地" prop="socialInsurancePlace">
            <el-select v-model="ruleForm.cityEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.city"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="社保，公积金缴纳月份" prop="socialInsuranceStartMonth">
            <el-date-picker
              v-model="ruleForm.socialInsuranceStartMonth"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="btns">
          <el-form-item>
            <el-button @click="cancle">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { updateEmployeeSalary } from '@src/api/employeeSalary';
import { peopleByName, bankByBankName } from '@src/api/relation/index.js'; // 人名模糊搜索
import qs from 'qs';
import { mapGetters } from 'vuex';
export default {
    name: 'baseform',
    props: ['data'],
    data() {
        return {
            ruleForm: {},
            rules: {},
            subBankList: []
        };
    },
    created() {
        this.ruleForm = Object.assign({}, this.data);
        this.$store.dispatch('enumeration/getEnumDict', 'salary_type');
        this.$store.dispatch('enumeration/getEnumDict', 'bank');
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    methods: {
        // 获取id
        getSubBankId(name) {
            this.subBankList.forEach(item => {
                if (item.NAME === name) {
                    this.ruleForm.branckBanckId = item.CODE;
                }
            });
        },
        // 获取支行全称
        getSubBank(str) {
            const parms = qs.stringify({
                bankName: this.ruleForm.bankEname,
                keyWord: str
            });
            bankByBankName(parms).then(res => {
                if (res.success) {
                    if (res.data) {
                        this.subBankList = res.data;
                    }
                }
            });
        },
        querySearchAsync(queryString, cb) {
            const parms = qs.stringify({
                name: queryString
            });
            peopleByName(parms).then(res => {
                if (res.data === null || res.data.length === 0) {
                    return cb([{value: '查找不到员工'}]); // eslint-disable-line
                }
                for (let i of res.data) {
                    i.value = `${i.nickName}(${i.name})`; // 将想要展示的数据作为value
                }
                cb(res.data);
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ruleForm.employeeId = this.$route.params.workCode;
                    updateEmployeeSalary(this.ruleForm).then(res => {
                        if (res.success) {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.$emit('changeShow', {
                                type: false,
                                fn: 'getEmployeeSalary'
                            });
                        } else {
                            this.$message({
                                message: res.message,
                                type: 'error'
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancle() {
            this.$emit('changeShow', { type: false });
        }
    }
};
</script>

<style scoped>
@import '../../../assets/style/detail.css';
.listCon {
    height: 60px;
    padding-bottom: 0px;
}

.listCon >>> .el-input {
    width: 200px !important;
}

.listCon >>> .el-input__inner {
    width: 200px !important;
    height: 30px;
}
.btns {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
}
.btns >>> .el-button {
    padding: 4px 15px;
}
.listCon >>> .el-form-item {
    padding-top: 0px;
}
.listCon.top20 {
    margin-top: 20px;
}
.listCon.bottom40 {
    margin-bottom: 40px;
}
</style>
