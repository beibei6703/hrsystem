<template>
  <div class="baseformCon">
    <div class="baseInfo">
      <el-form :model="ruleForm" ref="ruleForm" label-width="150px">
        <div class="topline" v-for="(item, index) in ruleForm.data" :key="index">
          <div class="delBtn" @click="del(index, item)">
            <i class="el-icon-error"></i>
          </div>
          <div class="listCon">
            <el-form-item label="成员名字" :prop="`data.${index}.name`" :rules="rules.require">
              <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="关系" :prop="`data.${index}.relationshipEid`" :rules="rules.require">
              <el-select v-model="item.relationshipEid" placeholder="请选择">
                <el-option
                  v-for="item in enumeration.relationshipList"
                  :key="item.eid"
                  :label="item.ename"
                  :value="item.eid"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="listCon">
            <el-form-item label="手机号码" :prop="`data.${index}.mobile`" :rules="rules.mobile">
              <el-input v-model="item.mobile"></el-input>
            </el-form-item>
          </div>
          <!-- <div class="listCon">
            <el-form-item label="性别">
              <el-select v-model="item.sex" placeholder="请选择">
                <el-option label="未知" :value="0"></el-option>
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="国籍" :prop="`data.${index}.nationalityEid`">
              <el-select v-model="item.nationalityEid" placeholder="请选择">
                <el-option
                  v-for="item in enumeration.nationality"
                  :key="item.eid"
                  :label="item.ename"
                  :value="item.eid"
                ></el-option>
              </el-select>
            </el-form-item>
          </div> -->
        </div>
        <div class="add" @click="add">+ 添加成员</div>
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
import { updateFamilyInfo, deleteFamilyInfo } from '@src/api/peopleInfo';
import { validatePhoneNo } from '@src/utils/validateRules.js';
export default {
    name: 'familyinfoform',
    props: ['data'],
    data() {
        return {
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
                ],
                mobile:[{
                      validator: validatePhoneNo, trigger: 'blur' 
                }]
            }
        };
    },
    created() {
        console.log(this.data,2121)
        this.ruleForm.data = [].concat(this.data);
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    updateFamilyInfo(this.ruleForm.data).then(res => {
                        if (res.success) {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.$emit('changeShow', {
                                type: 'editFamilyinfo',
                                value: false,
                                fn: 'getFamilyInfo'
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
                    deleteFamilyInfo({ id: item.id }).then(res => {
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
            this.$emit('changeShow', { type: 'editFamilyinfo', value: false, fn: 'getFamilyInfo' });
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
