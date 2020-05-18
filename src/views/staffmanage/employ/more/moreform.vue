<template>
  <div class="baseformCon">
    <div class="baseInfo">
      <el-form
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="150px"
        ref="ruleForm"
      >
        <div class="listCon">
          <el-form-item label="招聘类型">
            <el-select placeholder="请选择" v-model="ruleForm.hireTypeEid">
              <el-option
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
                v-for="item in enumeration.hireType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招聘负责人" prop="handlerName">
            <el-autocomplete
              :fetch-suggestions="querySearchAsync"
              @select="handleSelect"
              placeholder="请输入内容"
              v-model="ruleForm.handlerName"
            ></el-autocomplete>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="导师" prop="teacherName">
            <el-autocomplete
              :fetch-suggestions="querySearchAsync"
              @select="handleTeacherSelect"
              placeholder="请输入内容"
              v-model="ruleForm.teacherName"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="入职日期" prop="joinDate">
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="ruleForm.joinDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="转正日期" prop="positiveDate">
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="ruleForm.positiveDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="试用期结束日期" prop="probationEndDate">
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="ruleForm.probationEndDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="是否完成新员工培训" prop="isCompleteTrain">
            <el-select placeholder="请选择" v-model="ruleForm.isCompleteTrain">
              <el-option
                :key="itemTrain.value"
                :label="itemTrain.label"
                :value="itemTrain.value"
                v-for="itemTrain in trainList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最后工作日期" prop="lastWorkDate">
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="ruleForm.lastWorkDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="离职结薪日期" prop="leaveDate">
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="ruleForm.leaveDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="离职生效日期" prop="leaveEffectDate">
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="ruleForm.leaveEffectDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="离职下属继承" prop="leaveSubordinateSuccessorName">
            <el-autocomplete
              :fetch-suggestions="querySearchAsync"
              @select="leaveSubordinateSuccessorSelect"
              placeholder="请输入内容"
              v-model="ruleForm.leaveSubordinateSuccessorName"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="离职原因" prop="leaveReason">
            <el-input :rows="2" placeholder="请输入内容" type="textarea" v-model="ruleForm.leaveReason"></el-input>
          </el-form-item>
        </div>
        <div class="btns">
          <el-form-item>
            <el-button @click="cancle">取消</el-button>
            <el-button @click="submitForm('ruleForm')" type="primary">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { updateEmployeeHireInfo } from '@src/api/employeeHireInfo';
import { peopleByName } from '@src/api/relation/index.js'; // 模糊搜索
import { mapGetters } from 'vuex';
import qs from 'qs';
export default {
    name: 'baseform',
    props: ['data'],
    data() {
        return {
            ruleForm: {},
            rules: {},
            hireTypeOptions: [], // 招聘类型
            trainList: [
                {
                    label: '是',
                    value: 1
                },
                {
                    label: '否',
                    value: 0
                }
            ]
        };
    },
    created() {
        this.ruleForm = Object.assign({}, this.data);
        this.$store.dispatch('enumeration/getEnumDict', 'hire_type');
    },
    computed: {
        ...mapGetters(['enumeration'])
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
                                type: 'editMore',
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
        querySearchAsync(queryString, cb) {
            const parms = qs.stringify({
                name: queryString
            });
            peopleByName(parms).then(res => {
                if (res.data === null || res.data.length === 0) {
                    return cb([{ value: '查找不到员工' }]); // eslint-disable-line
                }
                for (let i of res.data) {
                    i.value = `${i.nickName}(${i.name})`; // 将想要展示的数据作为value
                }
                cb(res.data);
            });
        },
        handleSelect(item) {
            this.ruleForm.handlerId = item.employeeId;
            this.ruleForm.handlerName = item.name;
        },
        leaveSubordinateSuccessorSelect(item) {
            this.ruleForm.leaveSubordinateSuccessor = item.workCode;
        },
        handleTeacherSelect(item) {
            this.ruleForm.teacherId = item.employeeId;
            this.ruleForm.teacherName = item.name;
        },
        cancle() {
            this.$emit('changeShow', { type: 'editMore', value: false });
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
