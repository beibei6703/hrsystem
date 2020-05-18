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
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="花名" prop="nickname">
            <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="工号" prop="workCode">
            <el-input v-model="ruleForm.workCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="工作邮箱" prop="email" class="email">
            <el-input v-model="ruleForm.email">
                <template slot="append">@api.com</template>
            </el-input>
          </el-form-item>
          <el-form-item label="社会雇佣日">
              <el-date-picker
                v-model="ruleForm.socialEmployeeDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
             </el-date-picker>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="证件类型">
            <el-select v-model="ruleForm.certTypeEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.certType"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="ruleForm.certNo"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
           <el-form-item label="生日">
              <el-date-picker
                v-model="ruleForm.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
             </el-date-picker>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-select v-model="ruleForm.politicalStatusEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.politicalStatus"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="性别">
            <el-select v-model="ruleForm.sex" placeholder="请选择">
              <el-option label="未知" :value="0"></el-option>
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚姻状况">
            <el-select v-model="ruleForm.married" placeholder="请选择">
              <el-option label="未婚" :value="0"></el-option>
              <el-option label="已婚" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="国籍">
            <el-select v-model="ruleForm.nationalityEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.nationality"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族">
            <el-select v-model="ruleForm.ethnicityEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.ethnicity"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="籍贯">
            <el-cascader
              :options="cityoption"
              :props="defaultParams"
              clearable
              filterable
              placeholder="请输入或选择"
              v-model="ruleForm.nativePlace"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="出生地">
               <el-cascader
              :options="cityoption"
              :props="defaultParams"
              clearable
              filterable
              emitPath
              placeholder="请输入或选择"
              v-model="ruleForm.birthPlace"
            ></el-cascader>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="户口所在地">
              <el-cascader
              :options="cityoption"
              :props="defaultParams"
              clearable
              filterable
              emitPath
              placeholder="请输入或选择"
              v-model="ruleForm.householdPlace"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="户口所在地详细地址">
            <el-input v-model="ruleForm.householdPlaceAddr"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="现居地址">
              <el-cascader
              :options="cityoption"
              :props="defaultParams"
              clearable
              filterable
              emitPath
              placeholder="请输入或选择"
              v-model="ruleForm.houseDistrict"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="现居住地详细地址">
            <el-input v-model="ruleForm.houseAddr"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="社保所在地">
            <el-select v-model="ruleForm.socialInsurancePlaceEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.city"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="户口性质">
            <el-select v-model="ruleForm.householdTypeEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.householdType"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="衣服尺码">
            <el-select v-model="ruleForm.suitSizeEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.suitSize"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人邮箱" prop="personalEmail">
            <el-input v-model="ruleForm.personalEmail"></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="档案是否在公司内">
            <el-select v-model="ruleForm.hadRecord" placeholder="档案是否在公司内">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职称">
            <el-input v-model="ruleForm.positionalTitle"></el-input>
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
import { validatePhone, validateEmail } from '@src/utils/validateRules';
import { updateBaseInfo } from '@src/api/peopleInfo';
import { city } from '@src/utils/city.js';
import { mapGetters } from 'vuex';
export default {
    name: 'baseform',
    props: ['data'],
    data() {
        return {
            ruleForm: {},
            cityoption: this.getTreeData(city),
            defaultParams: {
                children: 'children',
                label: 'label',
                value: 'label',
                checkStrictly: true
            },
            rules: {
                name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
                nickname: [{ required: true, message: '请输入花名', trigger: 'blur' }],
                workCode: [{ required: true, message: '请输入工号', trigger: 'blur' }],
                mobile: [{ required: true, validator: validatePhone, trigger: 'blur' }],
                email: [{ required: true, validator: validateEmail, trigger: 'blur' }],
                personalEmail: [
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        };
    },
    created() {
        this.ruleForm = Object.assign({}, this.data);
        this.ruleForm.email = this.ruleForm.email && this.ruleForm.email.split('@')[0];
        this.ruleForm.birthPlace = this.ruleForm.birthPlace && this.ruleForm.birthPlace.split('/');
        this.ruleForm.nativePlace = this.ruleForm.nativePlace && this.ruleForm.nativePlace.split('/');
        this.ruleForm.householdPlace = this.ruleForm.householdPlace && this.ruleForm.householdPlace.split('/');
        this.ruleForm.houseDistrict = this.ruleForm.houseDistrict && this.ruleForm.houseDistrict.split('/');
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    methods: {
        submitForm(formName) {
            let params = Object.assign({}, this.ruleForm);
            params.birthPlace = params.birthPlace && params.birthPlace.join('/');
            params.nativePlace = params.nativePlace && params.nativePlace.join('/');
            params.householdPlace = params.householdPlace && params.householdPlace.join('/');
            params.houseDistrict = params.houseDistrict && params.houseDistrict.join('/');
            params.email = this.ruleForm.email + '@api.com';
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ruleForm.employeeId = this.$route.params.workCode;
                    updateBaseInfo(params).then(res => {
                        if (res.success) {
                            this.$message({
                                message: '保存成功！',
                                type: 'success'
                            });
                            this.$emit('changeShow', {
                                type: 'editBase',
                                value: false,
                                fn: 'getBaseInfo'
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
            this.$emit('changeShow', { type: 'editBase', value: false });
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
.email >>> .el-input {
    width: 90px !important;
}
.email >>> .el-input__inner {
    width: 90px !important;
}
.email >>> .el-input-group__append, .el-input-group__prepend {
    padding: 0 6px;
}
.email >>> .el-input, .el-input-group, .el-input-group--append {
    margin-top: 4px;
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
