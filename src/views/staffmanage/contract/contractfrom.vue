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
          <span>合同信息</span>
        </div>
        <div class="topline" v-for="(item, index) in ruleForm.data" :key="index">
          <div class="delBtn" @click="del(index, item)"><i class="el-icon-error"></i></div>
          <div class="listCon">
             <el-form-item label="合同签署公司" :prop="`data.${index}.contractCompanyId`" :rules="rules.require">
              <el-select v-model="item.contractCompanyId" placeholder="请选择">
                <el-option
                v-for="item in contractCompanyOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="合同状态"
              :prop="`data.${index}.contractStatusEid`"
              :rules="rules.require"
            >
              <el-select v-model="item.contractStatusEid" placeholder="请选择">
                <el-option v-for="item in enumeration.contractStatus" :key="item.eid" :label="item.ename" :value="item.eid"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="合同开始日" :prop="`data.${index}.startDate`" :rules="rules.require">
              <el-date-picker
                v-model="item.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="合同结束日" :prop="`data.${index}.endDate`" :rules="rules.require">
              <el-date-picker
                v-model="item.endDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="合同年限" prop="contractYears">
              <el-input v-model="item.contractYears"></el-input>
            </el-form-item>
            <el-form-item label="试用期月数">
              <el-select v-model="item.probation" placeholder="请选择">
                <el-option label="3" :value="3"></el-option>
              <el-option label="6" :value="6"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="item.remark"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="add" @click="add">+ 添加合同记录</div>

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
import { updateEmployeeContract, deleteEmployeeContract } from '@src/api/employeeContract';
import { getContractCompany } from '@src/api/baseSetting/contract'; // 获取合同签署公司
import { mapGetters } from 'vuex';
export default {
    name: 'baseform',
    props: ['data'],
    data() {
        return {
            contractCompanyOptions: [], // 合同签署公司列表
            ruleForm: {
                data: []
            },
            rules: {
                require: [
                    {
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    created() {
        this.ruleForm.data = [].concat(this.data);
        this.getContractCompany();
        this.$store.dispatch('enumeration/getEnumDict', 'contract_status');
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    methods: {
        // 获取合同签署公司
        getContractCompany() {
            getContractCompany().then(res => {
                this.contractCompanyOptions = res.data;
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    updateEmployeeContract(this.ruleForm.data).then(res => {
                        if (res.success) {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.$emit('changeShow', {
                                type: false,
                                fn: 'getEmployeeContract'
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
        add() {
            this.ruleForm.data.push({
                policyEid: '',
                policyEname: '',
                contractStatusEid: '',
                startDate: '',
                endDate: '',
                probation: '',
                companyEid: '',
                remark: '',
                employeeId: this.$route.params.workCode
            });
        },
        del(index, item) {
            this.$confirm('确认删除?', '提示', {
                type: 'warning'
            }).then(() => {
                this.ruleForm.data.splice(index, 1);
                if (item.id) {
                    deleteEmployeeContract(item.id).then(res => {
                        if (res.success) {
                            this.$message({
                                message: '删除成功！',
                                type: 'success'
                            });
                        } else {
                            this.$message({
                                message: res.message,
                                type: 'error'
                            });
                        }
                    });
                }
            });
        },
        cancle() {
            this.$emit('changeShow', { type: false, fn: 'getEmployeeContract' });
        }
    }
};
</script>

<style scoped>
@import '../../../assets/style/detail.css';
.baseformCon {
    padding-top: 20px;
    padding-bottom: 30px;
}
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
.add {
    width: 100%;
    background-color: #fafff4;
    color: #6695ca;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #6695ca;
    border-radius: 4px;
    cursor: pointer;
}
.delBtn {
    text-align: right;
    height: 30px;
    font-size: 24px;
    cursor: pointer;
    color: rgb(84, 93, 102);
}
.delBtn:hover {
    color: #2c3e50;
}
</style>
