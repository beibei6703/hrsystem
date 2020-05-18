<template>
  <div class="baseCon">
    <div class="titInfo">
      <span>基本信息</span>
    </div>
    <Baseinfo v-if="!editBase" :data="base" @changeShow="changeShow"></Baseinfo>
    <Baseform v-if="editBase" :data="base" @changeShow="changeShow"></Baseform>
    <div class="titInfo">
      <span>教育经历</span>
    </div>
    <Education v-if="!editEducation" :data="education" @changeShow="changeShow"></Education>
    <Educationform v-if="editEducation" :data="education" @changeShow="changeShow"></Educationform>
    <div class="titInfo">
      <span>工作经历</span>
    </div>
    <Workinfo v-if="!editWorkinfo" :data="work" @changeShow="changeShow"></Workinfo>
    <Workinfoform v-if="editWorkinfo" :data="work" @changeShow="changeShow"></Workinfoform>
    <div class="titInfo">
      <span>家庭成员</span>
    </div>
    <Familyinfo v-if="!editFamilyinfo" :data="family" @changeShow="changeShow"></Familyinfo>
    <FamilyinfoForm v-if="editFamilyinfo" :data="family" @changeShow="changeShow"></FamilyinfoForm>

  </div>
</template>
<script>
import Baseinfo from './base/baseinfo'; // 基本信息
import Baseform from './base/baseform'; // 基本信息编辑
import Education from './education/educationinfo'; // 教育信息
import Educationform from './education/educationform'; // 教育信息编辑
import Workinfo from './workinfo/workinfo'; // 工作经历
import Workinfoform from './workinfo/workinfoform'; // 工作经历编辑
import Familyinfo from './family/familyinfo'; // 家庭成员信息
import FamilyinfoForm from './family/familyinfoform'; // 家庭成员信息表单
import { getBaseInfo, getEducationInfo, getWorkHisInfo, getFamilyInfo } from '@src/api/peopleInfo';
export default {
    name: 'peopleinfo',
    components: {
        Baseinfo,
        Baseform,
        Education,
        Educationform,
        Workinfo,
        Workinfoform,
        Familyinfo,
        FamilyinfoForm
    },
    data() {
        return {
            workCode: this.$route.params.workCode,
            editBase: false,
            editEducation: false,
            editWorkinfo: false,
            editFamilyinfo: false,
            base: {},
            education: {},
            work: {},
            family: {}
        };
    },
    created() {
        this.getBaseInfo();
        this.getEducationInfo();
        this.getWorkHisInfo();
        this.getFamilyInfo();
        this.getEnumeration();
    },
    methods: {
        // 获取枚举类型
        getEnumeration() {
            let enumeration = [
                'city', // 城市
                'political_status', // 政治面貌
                'ethnicity', // 民族
                'household_type', // 户口性质
                'suit_size', // 衣服尺寸
                'edu_grade', // 学历
                'academic_degree', // 学位,
                'nationality', // 国籍
                'relationship', // 与本人关系,
                'cert_type' // 证件类型
            ];
            enumeration.forEach(item => {
                this.$store.dispatch('enumeration/getEnumDict', item);
            });
        },
        getBaseInfo() {
            getBaseInfo(this.workCode).then(res => {
                this.base = res.data || {};
            });
        },
        getEducationInfo() {
            getEducationInfo(this.workCode).then(res => {
                this.education = res.data || {};
            });
        },
        getWorkHisInfo() {
            getWorkHisInfo(this.workCode).then(res => {
                this.work = res.data || [];
            });
        },
        getFamilyInfo() {
            getFamilyInfo(this.workCode).then(res => {
                this.family = res.data || [];
            });
        },
        changeShow({ type, value, fn }) {
            console.log(fn);
            this[type] = value;
            fn && this[fn]();
        }
    }
};
</script>

<style scoped>
@import '../../../assets/style/detail.css';
</style>
