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
          <span>人才盘点</span>
        </div>
        <div class="topline" v-for="(item, index) in ruleForm.data" :key="index">
        <div class="delBtn" @click="del(index, item)">
          <i class="el-icon-error"></i>
        </div>
        <div class="listCon">
          <el-form-item label="盘点名称"  :prop="`data.${index}.name`" :rules="rules.require">
            <el-input v-model="item.name"></el-input>
          </el-form-item>
          <el-form-item label="盘点绩效" prop="performance">
            <el-input v-model="item.performance"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="盘点价值观" prop="valuePoint">
            <el-input v-model="item.valuePoint"></el-input>
          </el-form-item>
          <el-form-item label="综合评估结果" prop="evaluation">
            <el-input v-model="item.evaluation"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="盘点九宫格结果" prop="result">
            <el-input v-model="item.result"></el-input>
          </el-form-item>
          <el-form-item label="盘点潜力" prop="potential">
            <el-input v-model="item.potential"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
        <el-form-item label="是否晋升">
            <el-select v-model="item.upgraded" placeholder="请选择">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="2"></el-option>
            </el-select>
          </el-form-item>
         <el-form-item label="晋升后职级">
            <el-select v-model="item.employeeGradeEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.employeeGrade"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="晋升后职位名称" prop="employeeGradeEname">
              <el-select v-model="item.jobTitleId" placeholder="请选择" filterable>
              <el-option
                v-for="item in positionListOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="晋升生效日期" prop="upgradeDate">
              <el-date-picker
                v-model="item.upgradeDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
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
import { updateEmployeeQualify, deleteEmployeeQualify } from '@src/api/employeeQualify';
import { getPosition } from '@src/api/organization/position'; // 获取岗位列表
import { mapGetters } from 'vuex';
export default {
    name: 'baseform',
    props: ['data'],
    data() {
        return {
            ruleForm: {
                data: []
            },
            positionListOptions: [],
            rules: {
                require: [{
                    required: true,
                    message: '不能为空',
                    trigger: 'blur'
                }]
            }
        };
    },
    created() {
        this.ruleForm.data = [].concat(this.data);
        this.getPosition();
        this.$store.dispatch('enumeration/getEnumDict', 'employee_grade');
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    methods: {
        // 获取岗位
        getPosition() {
            getPosition({}).then(res => {
                this.positionListOptions = res.data.list;
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    updateEmployeeQualify(this.ruleForm.data).then(res => {
                        if (res.success) {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.$emit('changeShow', {
                                type: false,
                                fn: 'getEmployeeQualify'
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
                name: '',
                performance: '',
                result: '',
                potential: '',
                upgraded: '',
                employeeGradeEid: '',
                jobTitleName: '',
                upgradeDate: '',
                employeeId: this.$route.params.workCode
            });
        },
        del(index, item) {
            this.$confirm('确认删除?', '提示', {
                type: 'warning'
            }).then(() => {
                this.ruleForm.data.splice(index, 1);
                if (item.id) {
                    deleteEmployeeQualify(item.id).then(res => {
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
            this.$emit('changeShow', { type: false, fn: 'getEmployeeQualify' });
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
