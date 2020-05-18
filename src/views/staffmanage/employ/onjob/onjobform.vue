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
          <el-form-item label="合同签署公司">
            <el-select v-model="ruleForm.contractCompanyId" placeholder="请选择" disabled>
              <el-option
                v-for="item in contractCompanyOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-cascader
              placeholder="试试搜索："
              v-model="ruleForm.departmentIds"
              :options="currentDepartmentTreeOptions"
              :props="{ checkStrictly: true }"
              filterable
            ></el-cascader>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="雇佣类型">
            <el-select v-model="ruleForm.employTypeId" placeholder="请选择" filterable>
              <el-option
                v-for="item in employTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职级">
            <el-select v-model="ruleForm.employeeGradeEid" placeholder="请选择" filterable>
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
          <el-form-item label="职位类别">
            <el-select v-model="ruleForm.positionTypeId" placeholder="请选择" @change="getInfo" filterable>
              <el-option
                v-for="item in positionTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select v-model="ruleForm.positionId" placeholder="请选择" filterable>
              <el-option
                v-for="item in positionListOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="工作城市">
            <el-select v-model="ruleForm.cityEid" placeholder="请选择">
              <el-option
                v-for="item in enumeration.city"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="在职状态">
            <el-select v-model="ruleForm.employeeStatusEid" placeholder="请选择" disabled>
              <el-option
                v-for="item in enumeration.workStatusList"
                :key="item.eid"
                :label="item.ename"
                :value="item.eid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="职类" prop="positionCategoryName">
            <el-input v-model="ruleForm.positionCategoryName" disabled></el-input>
          </el-form-item>
          <el-form-item label="序列" prop="serialName">
            <el-input v-model="ruleForm.serialName" disabled></el-input>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="发展通道" prop="developmentChannel">
            <el-input v-model="ruleForm.developmentChannel" disabled></el-input>
          </el-form-item>
          <el-form-item label="直接上级" prop="leaderName">
             <el-autocomplete
              v-model="ruleForm.leaderName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="getLeaderId"
            ></el-autocomplete>
          </el-form-item>
        </div>
        <div class="listCon">
          <el-form-item label="HRBP" prop="hrbpName">
            <el-input v-model="ruleForm.hrbpName" disabled></el-input>
          </el-form-item>
          <el-form-item label="安全级别" prop="securityLevel">
            <el-input v-model="ruleForm.securityLevel"></el-input>
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
import { getContractCompany } from '@src/api/baseSetting/contract'; // 获取合同签署公司
import { getEmployType } from '@src/api/baseSetting/employ'; // 获取雇佣类型 人名模糊搜索
import { peopleByName, getpositionTypeList, getPostList } from '@src/api/relation/index.js'; // 获取职位类别
import { getHrm } from '@src/api/organization/organize'; // 获取部门
import { detailPost } from '@src/api/organization/postCategory'; // 获取职位详情
import qs from 'qs';
import { mapGetters } from 'vuex';
export default {
    name: 'baseform',
    props: ['data'],
    data() {
        return {
            ruleForm: {
                departmentIds: []
            },
            rules: {},
            contractCompanyOptions: [], // 合同签署公司列表
            employTypeOptions: [], // 雇佣类型
            currentDepartmentTreeOptions: [], // 部门类型
            positionTypeOptions: [], // 职位类别
            positionListOptions: [], // 岗位列表
            stack: []
        };
    },
    created() {
        this.ruleForm = Object.assign({}, this.data);
        this.getContractCompany();
        this.getEmployType();
        this.getHrm();
        this.getPostLists();
        this.getPositionTypeList();
        this.$store.dispatch('enumeration/getEnumDict', 'contract_status');
        this.$store.dispatch('enumeration/getEnumDict', 'employee_status');
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
        // 获取雇佣类型
        getEmployType() {
            getEmployType().then(res => {
                this.employTypeOptions = res.data;
            });
        },
        // 获取职位类别列表 getPositionType
        getPositionTypeList() {
            getpositionTypeList().then(res => {
                if (res.success && res.data) {
                    this.positionTypeOptions = res.data;
                }
            });
        },
        // 职类, 序列, 发展通道
        getInfo(val) {
            const parms = {
                id: val
            };
            detailPost(parms).then(res => {
                if (res.success && res.data) {
                    this.ruleForm.positionCategoryName = res.data.positionCategoryName;
                    this.ruleForm.serialName = res.data.positionSerialName;
                    this.ruleForm.developmentChannel = `${res.data.positionCategoryName}-${res.data.positionSerialName}`;
                }
            });
            this.getPostLists(true);
        },
        // 职位类别查岗位
        getPostLists(val) {
            if (val === true) {
                this.positionListOptions = [];
                this.ruleForm.positionId = '';
            }
            const parms = qs.stringify({
                typeId: this.ruleForm.positionTypeId
            });
            getPostList(parms).then(res => {
                if (res.success && res.data) {
                    this.positionListOptions = res.data;
                }
            });
        },
        getHrm() {
            getHrm().then(res => {
                this.currentDepartmentTreeOptions = this.formData(res.data.childrenDepartment);
                // 获取当前完整节点
                this.getCurrentDepartmentIds(this.currentDepartmentTreeOptions, this.ruleForm.departmentId);
                this.ruleForm.departmentIds = this.stack.reverse();
            });
        },
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
        // 获取当前完整节点
        getCurrentDepartmentIds(data, currentId) {
            if (currentId) {
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    if (item.id === currentId) {
                        this.stack.push(item.id);
                        return 1;
                    }
                    if (item && item.children && item.children.length > 0) {
                        let t = this.getCurrentDepartmentIds(item.children, currentId);
                        if (t === 1) {
                            this.stack.push(item.id);
                            return 1;
                        }
                    }
                }
            }
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
                    i.value = `${i.nickName}(${i.name})`;// 将想要展示的数据作为value
                }
                cb(res.data);
            });
        },
        // 获取id
        getLeaderId(item) {
            this.ruleForm.leaderId = item.employeeId;
            this.ruleForm.leaderName = item.name;
        },
        submitForm(formName) {
            let len = this.ruleForm.departmentIds.length;
            if (len > 0) {
                this.ruleForm.departmentId = this.ruleForm.departmentIds[this.ruleForm.departmentIds.length - 1];
            } else {
                this.ruleForm.departmentId = undefined;
            }
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
                                type: 'editOnjob',
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
            this.$emit('changeShow', { type: 'editOnjob', value: false });
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
