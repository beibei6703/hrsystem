<template>
  <div class="baseformCon">
    <div class="baseInfo">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <div class="listCon">
          <el-form-item label="重新雇佣日" prop="rehireDate">
              <el-date-picker
                v-model="ruleForm.rehireDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
             </el-date-picker>
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
import { updateEmployeeHireInfo } from '@src/api/employeeHireInfo';
export default {
    name: 'baseform',
    props: ['data'],
    data() {
        return {
            ruleForm: {},
            rules: {}
        };
    },
    created() {
        this.ruleForm = Object.assign({}, this.data);
    },
    watch: {
        'data': function() {
            this.ruleForm = Object.assign({}, this.data);
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ruleForm.employeeId = this.$route.params.workCode;
                    updateEmployeeHireInfo(this.ruleForm).then(res => {
                        if (res.success) {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.$emit('changeShow', {
                                type: 'editEmploy',
                                value: false,
                                fn: 'getEmployeeHireInfo'
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
            this.$emit('changeShow', { type: 'editEmploy', value: false });
        }
    }
};
</script>

<style scoped>
@import '../../../../assets/style/detail.css';
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
</style>
