<template>
  <div class="baseformCon">
    <div class="baseInfo">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <div class="listCon">
          <el-form-item label="最高学历">
            <el-select v-model="ruleForm.lastEduGradeEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.eduGrade"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最高学位">
             <el-select v-model="ruleForm.lastAcademicDegreeEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.academicDegree"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="毕业日期">
              <el-date-picker
                v-model="ruleForm.lastGraduateDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
             </el-date-picker>
          </el-form-item>
          <el-form-item label="专业" prop="lastMajor">
            <el-input v-model="ruleForm.lastMajor"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="毕业学校" prop="lastUniversity">
            <el-input v-model="ruleForm.lastUniversity"></el-input>
          </el-form-item>
        </div>
         <div class="listCon topline">
          <el-form-item label="第一学历">
            <el-select v-model="ruleForm.firstEduGradeEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.eduGrade"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="第一学历学位">
             <el-select v-model="ruleForm.firstAcademicDegreeEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.academicDegree"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="第一学历毕业日期">
              <el-date-picker
                v-model="ruleForm.firstGraduateDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
             </el-date-picker>
          </el-form-item>
          <el-form-item label="第一学历专业" prop="firstMajor">
            <el-input v-model="ruleForm.firstMajor"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="第一学历毕业学校" prop="firstUniversity">
            <el-input v-model="ruleForm.firstUniversity"></el-input>
          </el-form-item>
        </div>
        <div class="btns">
          <el-form-item>
            <el-button @click="cancle">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >保存</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { updateEducationInfo } from '@src/api/peopleInfo';
export default {
    name: 'baseform',
    props: ['data'],
    data() {
        return {
            ruleForm: {}
        };
    },
    created() {
        this.ruleForm = Object.assign({}, this.data);
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ruleForm.employeeId = this.$route.params.workCode;
                    updateEducationInfo(this.ruleForm).then(res => {
                        if (res.success) {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.$emit('changeShow', {
                                type: 'editEducation',
                                value: false,
                                fn: 'getEducationInfo'
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
            this.$emit('changeShow', { type: 'editEducation', value: false });
        }
    }
};
</script>

<style scoped>
@import "../../../../assets/style/detail.css";
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
