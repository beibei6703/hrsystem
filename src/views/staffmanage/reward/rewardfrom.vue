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
          <span>奖惩记录</span>
        </div>
        <div class="topline" v-for="(item, index) in ruleForm.data" :key="index">
          <div class="delBtn" @click="del(index, item)">
            <i class="el-icon-error"></i>
          </div>
          <div class="listCon">
            <el-form-item label="奖惩类型">
              <el-select v-model="item.rpTypeEid" placeholder="请选择">
                <el-option
                  v-for="item in enumeration.rpType"
                  :key="item.eid"
                  :label="item.ename"
                  :value="item.eid"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="奖惩日期" prop="rpDate">
              <el-date-picker
                v-model="item.rpDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="listCon" v-if="item.rpTypeEid !== 1">
            <el-form-item label="处罚等级">
              <el-select v-model="item.penaltyGradeEid" placeholder="请选择">
                <el-option
                  v-for="item in enumeration.penaltyGrade"
                  :key="item.eid"
                  :label="item.ename"
                  :value="item.eid"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处罚金额" prop="penaltyAmount">
              <el-input v-model="item.penaltyAmount"></el-input>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="所在部门">
              <el-cascader
                placeholder="试试搜索："
                v-model="item.departmentIds"
                :options="currentDepartmentTreeOptions"
                :props="{ checkStrictly: true }"
                filterable
              ></el-cascader>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="事由" prop="reason">
              <el-input v-model="item.reason"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="add" @click="add">+ 添加奖惩记录</div>
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
import {
    updateEmployeeSalaryInfo,
    deleteEmployeeRewardAndPunish
} from '@src/api/employeeRewardAndPunish';
import { getHrm } from '@src/api/organization/organize'; // 获取部门
import { mapGetters } from 'vuex';
export default {
    name: 'baseform',
    props: ['data'],
    data() {
        return {
            workCode: this.$route.params.workCode,
            currentDepartmentTreeOptions: [], // 部门类型
            ruleForm: {
                data: []
            },
            rules: {},
            stack: []
        };
    },
    created() {
        this.ruleForm.data = [].concat(this.data);
        this.getHrm();
        this.$store.dispatch('enumeration/getEnumDict', 'rp_type');
        this.$store.dispatch('enumeration/getEnumDict', 'penalty_grade');
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    methods: {
        formData(data) {
            data.forEach(item => {
                item.label = item.name;
                item.value = item.id;
                if (item.childrenDepartment.length > 0) {
                    item.children = item.childrenDepartment;
                    this.formData(item.childrenDepartment);
                }
            });
            return data;
        },
        getHrm() {
            getHrm().then(res => {
                this.currentDepartmentTreeOptions = this.formData(res.data.childrenDepartment);
                this.ruleForm.data.forEach(item => {
                    let stack = [];
                    this.getCurrentDepartmentIds(
                        this.currentDepartmentTreeOptions,
                        item.departmentId,
                        stack
                    );
                    item.departmentIds = stack.reverse();
                });
            });
        },
        // 获取当前完整节点
        getCurrentDepartmentIds(data, currentId, stack) {
            if (currentId) {
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    if (item.id === currentId) {
                        stack.push(item.id);
                        return 1;
                    }
                    if (item && item.children && item.children.length > 0) {
                        let t = this.getCurrentDepartmentIds(item.children, currentId, stack);
                        if (t === 1) {
                            stack.push(item.id);
                            return 1;
                        }
                    }
                }
            }
        },
        submitForm(formName) {
            this.ruleForm.data.forEach(item => {
                let len = item.departmentIds.length;
                if (len > 0) {
                    item.departmentId = item.departmentIds[item.departmentIds.length - 1];
                } else {
                    item.departmentId = undefined;
                }
            });
            this.$refs[formName].validate(valid => {
                if (valid) {
                    updateEmployeeSalaryInfo(this.ruleForm.data).then(res => {
                        if (res.success) {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.$emit('changeShow', {
                                type: false,
                                fn: 'getEmployeeRewardAndPunish'
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
                rpTypeEid: '',
                rpDate: '',
                departmentName: '',
                reason: '',
                penaltyGradeEid: '',
                penaltyAmount: '',
                employeeId: this.$route.params.workCode
            });
        },
        del(index, item) {
            this.$confirm('确认删除?', '提示', {
                type: 'warning'
            }).then(() => {
                this.ruleForm.data.splice(index, 1);
                if (item.id) {
                    deleteEmployeeRewardAndPunish(item.id).then(res => {
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
            this.$emit('changeShow', { type: false, fn: 'getEmployeeRewardAndPunish' });
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
.topline:nth-of-type(2) {
    border-top: none;
    margin-top: 0px;
}
</style>
