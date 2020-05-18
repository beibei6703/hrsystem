<template>
  <div class="baseformCon">
    <div class="baseInfo">
      <el-form :model="ruleForm" ref="ruleForm" label-width="150px">
        <div class="topline" v-for="(item, index) in ruleForm.data" :key="index">
          <div class="delBtn" @click="del(index, item)">
            <i class="el-icon-error"></i>
          </div>
          <div class="listCon">
            <el-form-item label="开始日期" :prop="`data.${index}.startDate`" :rules="rules">
              <el-date-picker
                v-model="item.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期" :prop="`data.${index}.endDate`" :rules="rules">
              <el-date-picker
                v-model="item.endDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="公司名称" :prop="`data.${index}.company`" :rules="rules">
              <el-input v-model="item.company"></el-input>
            </el-form-item>
            <el-form-item label="所在部门" :prop="`data.${index}.department`" :rules="rules">
              <el-input v-model="item.department"></el-input>
            </el-form-item>
          </div>
            <div class="listCon">
            <el-form-item label="担任职务" :prop="`data.${index}.position`">
              <el-input v-model="item.position"  maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="工作地点" :prop="`data.${index}.address`" >
              <el-input v-model="item.address" maxlength="30"></el-input>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="证明人" prop="witness">
              <el-input v-model="item.witness"></el-input>
            </el-form-item>
            <el-form-item label="证明人电话" :prop="`data.${index}.witnessMobile`" :rules="mobile">
              <el-input v-model="item.witnessMobile"></el-input>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="薪资" prop="salary">
              <el-input v-model="item.salary"></el-input>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="离职原因" prop="leaveReason">
              <el-input v-model="item.leaveReason"></el-input>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="item.remark"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="addWorkInfo" @click="add">+添加工作经历</div>
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
import { mapGetters } from 'vuex';
import { updateWorkHisInfo, deleteWorkHisInfo } from '@src/api/peopleInfo';
import { validatePhone } from '@src/utils/validateRules';
export default {
    name: 'workinfoform',
    props: ['data'],
    data() {
        return {
            ruleForm: {
                data: []
            },
            rules: [
                {
                    required: true,
                    message: '不能为空',
                    trigger: 'blur'
                }
            ],
            mobile: [{ validator: validatePhone, trigger: 'blur' }]
        };
    },
    created() {
        this.ruleForm.data = [].concat(this.data);
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    updateWorkHisInfo(this.ruleForm.data).then(res => {
                        if (res.success) {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.$emit('changeShow', {
                                type: 'editWorkinfo',
                                value: false,
                                fn: 'getWorkHisInfo'
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
                startDate: '',
                endDate: '',
                company: '',
                department: '',
                position: '',
                address: '',
                witness: '',
                witnessMobile: '',
                salary: '',
                leaveReason: '',
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
                    deleteWorkHisInfo({ id: item.id }).then(res => {
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
            this.$emit('changeShow', { type: 'editWorkinfo', value: false, fn: 'getWorkHisInfo' });
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
.addWorkInfo {
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
