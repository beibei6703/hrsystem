<template>
  <el-main class="contents">
    <div class="btns">
      <el-button @click="getBack" class="buttons" type="primary">
        <!-- <img class="imgIcon" src="../../assets/img/back.png" /> -->
        <span class="btnFont">返回</span>
      </el-button>
    </div>
    <div class="personCon">
      <el-form
        :key="2999"
        :model="ruleFormAdd"
        :rules="rules"
        class="demo-ruleFormAdd"
        label-width="120px"
        ref="ruleFormAdd"
      >
        <div class="titCon">
          <span>个人信息</span>
        </div>
        <div class="formList">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleFormAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="花名" prop="nickName">
            <el-input v-model="ruleFormAdd.nickName"></el-input>
          </el-form-item>
        </div>
        <div class="formList">
          <el-form-item label="性别">
            <el-radio-group v-model="sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="工作邮箱" prop="email">
            <el-input class="emailinput" v-model="ruleFormAdd.email">
                 <template slot="append">@api.com</template>
            </el-input>
          </el-form-item>
        </div>
        <div class="formList">
          <el-form-item label="证件类型">
            <el-select class="inputIcon" v-model="certTypeEid">
              <el-option
                :key="certitem.eid"
                :label="certitem.ename"
                :value="certitem.eid"
                v-for="certitem in enumeration.certType"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="cardNum">
            <el-input v-model="ruleFormAdd.cardNum"></el-input>
          </el-form-item>
        </div>
        <div class="formList">
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="ruleFormAdd.mobile"></el-input>
          </el-form-item>
        </div>
        <div class="titCon">
          <span>雇佣信息</span>
        </div>
        <div class="formList">
          <el-form-item label="合同签署公司" prop="contractCompany">
            <el-select class="inputIcon" clearable v-model="ruleFormAdd.contractCompany">
              <el-option
                :key="companyItem.id"
                :label="companyItem.name"
                :value="companyItem.id"
                v-for="companyItem in contractCompanyList"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="ruleFormAdd.contractCompany"></el-input> -->
          </el-form-item>
          <el-form-item label="雇佣类型" prop="employTypeId">
            <el-select class="inputIcon" clearable v-model="ruleFormAdd.employTypeId">
              <el-option
                :key="employitem.id"
                :label="employitem.name"
                :value="employitem.id"
                v-for="employitem in employTypelist"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formList">
          <el-form-item label="部门" prop="departmentName">
            <el-cascader
              :options="treeOption"
              :props="defaultParams"
              :show-all-levels="false"
              clearable
              filterable
              placeholder="请输入或选择部门"
              v-model="ruleFormAdd.departmentName"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="工号">
            <el-input :disabled="true" v-model="workCode"></el-input>
          </el-form-item>
        </div>
        <div class="formList">
          <el-form-item label="入职日期">
            <el-date-picker
              class="inputIcon"
              placeholder="选择日期"
              type="date"
              v-model="entryTime"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="试用期">
            <el-select class="inputIcon" clearable v-model="probation">
              <el-option
                :key="itempro.id"
                :label="itempro.name"
                :value="itempro.id"
                v-for="itempro in probationList"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formList">
          <el-form-item label="职级" prop="employeeGrades">
            <el-select class="inputIcon" clearable v-model="ruleFormAdd.employeeGrades">
              <el-option
                :key="gradeitem.eid"
                :label="gradeitem.ename"
                :value="gradeitem.eid"
                v-for="gradeitem in enumeration.employeeGrade"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="在职状态" prop="workStatus">
            <el-select class="inputIcon" clearable v-model="ruleFormAdd.workStatus">
              <el-option
                :key="workitem.value"
                :label="workitem.label"
                :value="workitem.value"
                v-for="workitem in workStatusList"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formList">
          <el-form-item label="工作城市" prop="workCity">
            <el-select class="inputIcon" clearable v-model="ruleFormAdd.workCity">
              <el-option
                :key="cityitem.eid"
                :label="cityitem.ename"
                :value="cityitem.eid"
                v-for="cityitem in enumeration.city"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="社会雇佣日">
            <el-date-picker
              class="inputIcon"
              placeholder="选择日期"
              type="date"
              v-model="socialEmployDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="formList">
          <el-form-item label="职位类别" prop="positionType">
            <el-select class="inputIcon" filterable @change="getPostLists" clearable v-model="ruleFormAdd.positionType">
              <el-option
                :key="typeitem.id"
                :label="typeitem.name"
                :value="typeitem.id"
                v-for="typeitem in positionTypeList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位" prop="position">
            <el-select
              class="inputIcon"
              clearable
              v-model="ruleFormAdd.position"
            >
              <el-option
                :key="posititem.id"
                :label="posititem.name"
                :value="posititem.id"
                v-for="posititem in positionList"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formList listPosit">
          <el-form-item label="直接上级" prop="leader">
            <el-input
              @input="getTeacher"
              class="specinput"
              placeholder="请输入内容"
              v-model="ruleFormAdd.leader"
            ></el-input>
            <div class="listUl" v-if="isLeader && leaderlist.length>0">
              <ul>
                <li
                  :key="perItem.employeeId"
                  @click="getTeacherId(perItem)"
                  v-for="perItem in leaderlist"
                >{{perItem.nickName}}({{perItem.name}})</li>
              </ul>
            </div>
             <div class="noshow" v-if="noPeople && leaderlist.length<=0">
                 <span>查找不到该员工</span>
            </div>
            <!-- <el-select
              :loading="loading"
              class="inputIcon"
              clearable
              filterable
              v-model="ruleFormAdd.leader"
            >
              <el-option
                :key="index"
                :label="leaderitem.name"
                :value="leaderitem.id"
                v-for="(leaderitem, index) in leaderlist"
              ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="安全级别" prop="securityLevel">
            <el-input v-model="ruleFormAdd.securityLevel"></el-input>
          </el-form-item>
        </div>
        <div class="bottomBtn">
          <el-button @click="centerDialogVisible = true">取消</el-button>
          <el-button @click="submitForm('ruleFormAdd',1)" type="primary">保存并添加</el-button>
          <el-button @click="submitForm('ruleFormAdd',2)" type="primary">保存并完善</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog :visible.sync="centerDialogVisible" center width="30%">
      <div style="text-align:center;font-size:14px">确认是否退出该页面</div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button @click="getConfirmCan" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import { addWorker } from '@src/api/roster/index.js';
import { peopleByName, getpositionTypeList, getPostList } from '@src/api/relation/index.js';
import { getContractCompany } from '@src/api/baseSetting/contract.js';
import qs from 'qs';
import { getEmployType } from '@src/api/baseSetting/employ.js';
import { getHrm } from '@src/api/organization/organize.js';
import { mapGetters } from 'vuex';
import { validateIdCard, validatePhone, validateEmail } from '@src/utils/validateRules.js';
export default {
    name: 'addworker',
    data() {
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入姓名'));
            }
            setTimeout(() => {
                var nameReg = /^[\u4E00-\u9FA5]{1,10}$|^[A-Za-z]{1,20}$/;
                if (!nameReg.test(value)) {
                    callback(new Error('汉字不超过10个英文不超过20个'));
                } else {
                    callback();
                }
            }, 1000);
        };
        var checkNickname = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入花名'));
            }
            setTimeout(() => {
                var nickReg = /^[\u4E00-\u9FA5]{2}$/;
                let str1 = this.ruleFormAdd.name.substr(0, 2);
                let str2 = this.ruleFormAdd.name.substr(1, 2);
                let str3 = this.ruleFormAdd.name.substr(2, 2);
                let str4 = this.ruleFormAdd.name.substr(3, 2);
                if (!nickReg.test(value)) {
                    callback(new Error('花名必须为非姓名的两个中文字符!'));
                } else {
                    if (value === str1 || value === str2 || value === str3 || value === str4) {
                        callback(new Error('花名必须为非姓名的两个中文字符!'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var checkLevel = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入安全等级'));
            }
            setTimeout(() => {
                var levelReg = /^[0-9]*$/;
                if (!levelReg.test(value)) {
                    callback(new Error('请输入正整数值'));
                } else {
                    callback();
                }
            }, 1000);
        };
        return {
            noPeople: true, // 查找直接上级为空
            isLeader: false,
            options: [],
            value: '',
            centerDialogVisible: false,
            ruleFormAdd: {
                name: '',
                email: '',
                cardNum: '', // 身份证号码
                nickName: '',
                mobile: '', // 手机号
                employTypeId: '', // 雇佣类型id
                position: '', // 职位
                employeeGrades: '', // 职级
                contractCompany: '', // 合同签署公司
                departmentName: [], // 部门,
                workStatus: '', // 在职状态
                workCity: '', // 工作城市
                positionType: '', // 职位类别
                leader: '', // 直接上级
                securityLevel: '' // 安全级别
            },
            typeId: '', // 岗位类别id
            workStatusList: [
                {
                    value: 1,
                    label: '试用'
                },
                {
                    value: 2,
                    label: '正式'
                }
            ], // 在职状态
            // workCityList: [],
            positionTypeList: [], // 岗位类别列表
            contractCompanyList: [],
            positionList: [], // 岗位列表
            employTypelist: [], // 雇佣类型
            isflag: false,
            workCode: '',
            certTypeEid: '',
            sex: Number, // 性别
            // employGradeLists: [], //职级list
            probation: '', // 试用期
            probationList: [
                {
                    id: 0,
                    name: 0
                },
                {
                    id: 1,
                    name: '1个月'
                },
                {
                    id: 3,
                    name: '3个月'
                },
                {
                    id: 6,
                    name: '6个月'
                }
            ], // 试用期option
            defaultParams: {
                children: 'childrenDepartment',
                label: 'name',
                value: 'id',
                checkStrictly: true
            },
            loading: false,
            leaderlist: [], // 直接上级下拉框
            leaderId: '',
            treeOption: [],
            socialEmployDate: '', // 社会雇佣日
            entryTime: '', // 入职日期
            rules: {
                email: [
                    { required: true, validator: validateEmail, trigger: 'blur' }
                ],
                name: [
                    {
                        required: true,
                        validator: checkName,
                        trigger: 'blur'
                    }
                ],
                mobile: [
                    {
                        required: true,
                        validator: validatePhone,
                        trigger: 'blur'
                    }
                ],
                cardNum: [
                    {
                        validator: validateIdCard,
                        trigger: 'blur'
                    }
                ],
                nickName: [
                    {
                        required: true,
                        validator: checkNickname,
                        trigger: 'blur'
                    }
                ],
                departmentName: [
                    {
                        required: true,
                        message: '请选择部门',
                        trigger: 'change'
                    }
                ],
                contractCompany: [
                    {
                        required: true,
                        message: '请选择合同签署公司',
                        trigger: 'blur'
                    }
                ],
                employTypeId: [
                    {
                        required: true,
                        message: '请选择雇佣类型',
                        trigger: 'change'
                    }
                ],
                employeeGrades: [
                    {
                        required: true,
                        message: '请选择职级',
                        trigger: 'change'
                    }
                ],
                workStatus: [
                    {
                        required: true,
                        message: '请选择在职状态',
                        trigger: 'change'
                    }
                ],
                positionType: [
                    {
                        required: true,
                        message: '请选择职位类别',
                        trigger: 'change'
                    }
                ],
                workCity: [
                    {
                        required: true,
                        message: '请选择工作城市',
                        trigger: 'change'
                    }
                ],
                leader: [
                    {
                        required: true,
                        message: '请输入或者选择直接上级',
                        trigger: 'blur'
                    }
                ],

                position: [
                    {
                        required: true,
                        message: '请选择岗位',
                        trigger: 'change'
                    }
                ],
                securityLevel: [
                    {
                        validator: checkLevel,
                        required: true,
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    computed: {
        // 证件类型
        ...mapGetters(['enumeration'])
    },
    watch: {
        // 'ruleFormAdd.leader'(newval, oldval) {
        //     if (newval !==oldval) {
        //         this.isflag = false
        //     }
        // }
    },
    created() {
        // 证件类型下拉列表
        this.$store.dispatch('enumeration/getEnumDict', 'cert_type');
        this.$store.dispatch('enumeration/getEnumDict', 'city');
        // 职级
        this.$store.dispatch('enumeration/getEnumDict', 'employee_grade');
        // // 岗位
        // this.getPositionList();
        // 岗位类别
        this.getPositionType();
        // 公司
        this.getCompanyList();
        this.getemployTypes();
        this.getDepart();
    },
    mounted() {
        document.addEventListener('click', e => {
            if (e.target.className !== 'specinput') {
                this.isLeader = false;
                this.noPeople = false;
                if (!this.isflag) {
                    this.ruleFormAdd.leader = '';
                }
            }
        });
    },
    methods: {
        // 获取岗位类别
        getPositionType() {
            getpositionTypeList().then(res => {
                if (res.success && res.data) {
                    this.positionTypeList = res.data;
                }
            });
        },
        // 职位类别查岗位
        getPostLists(val) {
            this.positionList = [];
            this.ruleFormAdd.position = '';
            const parms = qs.stringify({
                typeId: val
            });
            getPostList(parms).then(res => {
                if (res.success && res.data) {
                    this.positionList = res.data;
                }
            });
        },
        // 根据人名花名，查询
        getPeople(parms) {
            this.isflag = false;
            peopleByName(parms).then(res => {
                if (res.success) {
                    if (res.data && res.data.length > 0) {
                        this.isLeader = true;
                        this.leaderlist = res.data;
                    } else {
                        this.noPeople = true;
                        this.leaderlist = [];
                    }
                } else {
                    this.isLeader = false;
                    this.noPeople = true;
                    this.leaderlist = [];
                }
            });
        },
        getTeacher() {
            if (this.ruleFormAdd.leader.length) {
                const parms = qs.stringify({
                    name: this.ruleFormAdd.leader
                });
                this.getPeople(parms);
            } else {
                this.isLeader = false;
                this.noPeople = false;
                this.leaderlist = [];
                this.isflag = false;
            }
        },
        getTeacherId(val) {
            this.leaderId = val.employeeId;
            this.ruleFormAdd.leader = val.name;
            this.isLeader = false;
            this.isflag = true;
        },
        // 部门
        getDepart() {
            getHrm().then(res => {
                if (res.success && res.data) {
                    this.treeOption = this.getTreeData(res.data.childrenDepartment);
                }
            });
        },

        // 确定取消
        getConfirmCan() {
            this.$emit('onChangeAddworker');
            this.ruleFormAdd.name = '';
            this.ruleFormAdd.nickName = '';
            this.sex = '';
            this.certTypeEid = '';
            this.ruleFormAdd.cardNum = '';
            this.ruleFormAdd.email = '';
            this.ruleFormAdd.departmentName = [];
            this.ruleFormAdd.position = '';
            this.ruleFormAdd.contractCompany = '';
            this.ruleFormAdd.employTypeId = '';
            this.entryTime = '';
            this.probation = '';
            this.ruleFormAdd.employeeGrades = '';
            this.ruleFormAdd.workStatus = '';
            this.ruleFormAdd.workCity = '';
            this.ruleFormAdd.leader = '';
            this.ruleFormAdd.securityLevel = '';
            this.socialEmployDate = '';
            this.leaderId = '';
            this.ruleFormAdd.positionType = '';
            this.ruleFormAdd.mobile = '';
        },
        // 雇佣类型
        getemployTypes() {
            getEmployType().then(res => {
                if (res.success && res.data) {
                    this.employTypelist = res.data;
                }
            });
        },

        submitForm(formName, num) {
            var departLength = this.ruleFormAdd.departmentName.length;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const parms = {
                        name: this.ruleFormAdd.name,
                        nickname: this.ruleFormAdd.nickName,
                        sex: this.sex,
                        mobile: this.ruleFormAdd.mobile,
                        certTypeEid: this.certTypeEid,
                        certNo: this.ruleFormAdd.cardNum,
                        email: this.ruleFormAdd.email + '@api.com',
                        departmentId: departLength > 0 ? this.ruleFormAdd.departmentName[departLength - 1] : '',
                        positionId: this.ruleFormAdd.position,
                        contractCompanyId: this.ruleFormAdd.contractCompany,
                        employTypeId: this.ruleFormAdd.employTypeId,
                        joinDate: this.entryTime,
                        probation: this.probation,
                        employeeGradeEid: this.ruleFormAdd.employeeGrades,
                        employeeStatusEid: this.ruleFormAdd.workStatus,
                        cityEid: this.ruleFormAdd.workCity,
                        leaderId: this.leaderId,
                        securityLevel: this.ruleFormAdd.securityLevel,
                        socialEmployDate: this.socialEmployDate,
                        positionTypeId: this.ruleFormAdd.positionType
                    };
                    addWorker(parms).then(res => {
                        this.handleAddSucc(res, num);
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleAddSucc(res, num) {
            if (res.success && res.data) {
                if (num === 1) {
                    this.ruleFormAdd.name = '';
                    this.ruleFormAdd.nickName = '';
                    this.sex = '';
                    this.certTypeEid = '';
                    this.ruleFormAdd.cardNum = '';
                    this.ruleFormAdd.email = '';
                    this.ruleFormAdd.departmentName = [];
                    this.ruleFormAdd.position = '';
                    this.ruleFormAdd.contractCompany = '';
                    this.ruleFormAdd.employTypeId = '';
                    this.entryTime = '';
                    this.probation = '';
                    this.ruleFormAdd.employeeGrades = '';
                    this.ruleFormAdd.workStatus = '';
                    this.ruleFormAdd.workCity = '';
                    this.ruleFormAdd.leader = '';
                    this.leaderId = '';
                    this.ruleFormAdd.securityLevel = '';
                    this.socialEmployDate = '';
                    this.ruleFormAdd.positionType = '';
                    this.ruleFormAdd.mobile = ' ';
                } else if (num === 2) {
                    this.$router.push({ path: `/personinfo/${res.data}` });
                }
                this.successMsg(res.message);
            } else {
                this.errorMsg(res.message);
            }
        },

        getBack() {
            this.$emit('onChangeAddworker');
        },
        // 获取合同签署公司列表
        getCompanyList() {
            getContractCompany().then(res => {
                if (res.success && res.data) {
                    this.contractCompanyList = res.data;
                }
            });
        }
    }
};
</script>
<style scoped>
.contents {
    width: 100%;
    padding: 0 20px;
    padding-bottom: 30px;
    background: #fff;
}
.inputIcon >>> .el-input__icon {
    line-height: 30px;
}

.titles {
    padding-left: 15px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #666;
    border-bottom: 1px solid #dddddd;
}
.dialog-footer >>> .el-button {
    padding: 8px 15px;
    margin: 0 10px;
}
.margins {
    margin: 0 8px;
}
.listPosit {
    position: relative;
}

.listUl {
    display: block;
    width: 220px;
    /* height: 100px; */
    max-height: 120px;
    overflow: hidden;
    overflow-y: auto;
    position: absolute;
    top: 40px;
    left: 0px;
    z-index: 99;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}
.listUlspan {
    height: 40px !important;
    overflow: hidden;
    line-height: 40px;
    text-align: center;
    color: #909399;
}
.listUl li {
    display: block;
    height: 35px;
    line-height: 30px;
    text-align: left;
    padding-left: 15px;
}
.listUl li:hover {
    background: #f5f6f8 !important;
    color: #3a404c !important;
}
.noshow{
    display: block;
    width: 220px;
    height:50px;
    overflow: hidden;
    overflow-y: auto;
    position: absolute;
    top: 40px;
    left: 0px;
    z-index: 99;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
}
.noshow span{
    padding-left:20px;
}
.btns {
    height: 70px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f7f7f7;
}

.buttons {
    margin-left: 30px;
    padding-top: 4px;
    padding-bottom: 4px;
    display: flex;
    line-height: 25px;
}

.imgIcon {
    display: block;
    margin-top: 4px;
    width: 16px;
    margin-right: 5px;
    float: left;
}

.personCon >>> .el-input {
    width: 220px !important;
    height: 30px;
}
.personCon >>> .el-input__icon {
    line-height: 30px;
}

.personCon >>> .el-input__inner {
    width: 220px !important;
    height: 30px;
}

.personCon >>> .el-form-item {
    width: 340px !important;
    margin-right: 50px;
}

.personCon >>> .formList {
    display: flex;
    align-items: center;
    padding-left: 80px;
}

.titCon {
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f7f7f7;
    margin-bottom: 20px;
}

.titCon > span {
    display: inline-block;
    width: 120px;
    border-top-right-radius: 10px;
    text-align: center;
    background: #409eff;
    font-size: 14px;
    color: #fff;
    font-weight: bold;
}
.bottomBtn {
    margin-top: 20px;
    padding-left: 240px;
}
.bottomBtn >>> .el-button {
    padding: 5px 15px;
    margin-right: 15px;
}
.emailinput>>>.el-input{
    width:110px !important;

}
.emailinput>>>.el-input__inner{
    width:110px !important;

}
.emailinput>>>.el-input-group__append{
    padding:0 5px !important;
}
</style>
