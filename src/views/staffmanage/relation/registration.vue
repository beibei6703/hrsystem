<template>
  <div class="tableCon">
    <div v-if=" !isEdit">
      <div class="left-top">
        <div class="leftCons">
          <el-button @click="goBack" type="primary">返回</el-button>
          <span class="workName">
            <span class="marginR">{{registInfo.positionName}}</span>
            <span class="marginR">{{registInfo.name}}</span>
            的员工入职登记表
          </span>
        </div>
        <div class="entrys">
          <el-button @click="getLook" type="primary">预览</el-button>
          <el-button @click="getEdit">编辑</el-button>
          <el-button @click="exportExcel">导出</el-button>
        </div>
      </div>
      <div class="tables" v-loading="loading">
        <div class="itemlist">
          <span class="titlesSpan">基本信息</span>
          <div class="infoCon">
            <div class="items">
              <span class="itemtit">中文姓名</span>
              <span class="itemcon">{{registerInfoDetail.name}}</span>
            </div>
            <div class="items">
              <span class="itemtit">性别</span>
              <span class="itemcon" v-if="registerInfoDetail.sex===0">未知</span>
              <span class="itemcon" v-if="registerInfoDetail.sex===1">男</span>
              <span class="itemcon" v-if="registerInfoDetail.sex===2">女</span>
            </div>
            <div class="items">
              <span class="itemtit">婚姻状况</span>
              <span class="itemcon" v-if="registerInfoDetail.married===0">未婚</span>
              <span class="itemcon" v-if="registerInfoDetail.married===1">已婚</span>
            </div>
            <div class="items">
              <span class="itemtit">导师</span>
              <span class="itemcon">{{registerInfoDetail.teacher}}</span>
            </div>
            <div class="items">
              <span class="itemtit">花名</span>
              <span class="itemcon">{{registerInfoDetail.nickname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">衣服尺码</span>
              <span class="itemcon">{{registerInfoDetail.suitSizeEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">证件类型</span>
              <span class="itemcon">{{registerInfoDetail.certTypeEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">证件号码</span>
              <span class="itemcon">{{registerInfoDetail.certNo}}</span>
            </div>
            <div class="items">
              <span class="itemtit">生日</span>
              <span class="itemcon">{{registerInfoDetail.birthday}}</span>
            </div>
            <div class="items">
              <span class="itemtit">国籍</span>
              <span class="itemcon">{{registerInfoDetail.nationalityEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">民族</span>
              <span class="itemcon">{{registerInfoDetail.ethnicityEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">籍贯</span>
              <span class="itemcon">{{registerInfoDetail.nativePlace}}</span>
            </div>
            <div class="items">
              <span class="itemtit">入职日期</span>
              <span class="itemcon">{{registerInfoDetail.joinDate}}</span>
            </div>
            <div class="items">
              <span class="itemtit">社会雇佣日</span>
              <span class="itemcon">{{registerInfoDetail.socialEmployDate}}</span>
            </div>
            <div class="items">
              <span class="itemtit">个人邮箱</span>
              <span class="itemcon">{{registerInfoDetail.personalEmail}}</span>
            </div>
            <div class="items">
              <span class="itemtit">档案是否在公司内</span>
              <span class="itemcon" v-if="registerInfoDetail.hadRecord===1">是</span>
              <span class="itemcon" v-else>否</span>
            </div>
            <div class="items">
              <span class="itemtit">出生地</span>
              <span class="itemcon">{{registerInfoDetail.birthPlace}}</span>
            </div>
            <div class="items">
              <span class="itemtit">职称</span>
              <span class="itemcon">{{registerInfoDetail.positionalTitle}}</span>
            </div>
            <div class="items">
              <span class="itemtit">政治面貌</span>
              <span class="itemcon">{{registerInfoDetail.politicalStatusEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">户口性质</span>
              <span class="itemcon">{{registerInfoDetail.householdTypeEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">招聘类型</span>
              <span class="itemcon">{{registerInfoDetail.hireTypeEname}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">HRBP</span>
              <span class="itemcon">{{registerInfoDetail.hrbpName}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">招聘负责人</span>
              <span class="itemcon">{{registerInfoDetail.handlerName}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">账户持有人</span>
              <span class="itemcon">{{registerInfoDetail.cardOwner}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">银行名称</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.contract"
              >{{registerInfoDetail.contract.bankEname}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">银行账号</span>
              <span class="itemcon">{{registerInfoDetail.cardNo}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">开户行全称</span>
              <span class="itemcon">{{registerInfoDetail.branchBank}}</span>
            </div>
          </div>
        </div>
        <div class="itemlist" v-if="workInfo.length>0">
          <span class="titlesSpan">工作经历</span>
          <div class="infoCon" v-for="(workItem,index) in workInfo" :key="index">
            <div class="items1">
              <span class="itemtit">工作单位</span>
              <span class="itemcon">{{workItem.company}}</span>
            </div>
            <div class="items">
              <span class="itemtit">担任职务</span>
              <span class="itemcon">{{workItem.position}}</span>
            </div>
            <div class="items">
              <span class="itemtit">开始日期</span>
              <span class="itemcon">{{workItem.startDate}}</span>
            </div>
            <div class="items">
              <span class="itemtit">结束日期</span>
              <span class="itemcon">{{workItem.endDate}}</span>
            </div>
            <div class="items">
              <span class="itemtit">证明人</span>
              <span class="itemcon">{{workItem.witness}}</span>
            </div>
            <div class="items">
              <span class="itemtit">联系方式</span>
              <span class="itemcon">{{workItem.witnessMobile}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">工作地点</span>
              <span class="itemcon">{{workItem.address}}</span>
            </div>
          </div>
        </div>
        <div class="itemlist">
          <span class="titlesSpan">受教育情况</span>
          <div class="infoCon">
            <div class="items">
              <span class="itemtit">最高学历</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.lastEducation"
              >{{registerInfoDetail.lastEducation.eduGradeEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">最高学位</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.lastEducation"
              >{{registerInfoDetail.lastEducation.academicDegreeEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">毕业日期</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.lastEducation"
              >{{registerInfoDetail.lastEducation.graduateDate}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">专业</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.lastEducation"
              >{{registerInfoDetail.lastEducation.major}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">毕业学校</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.lastEducation"
              >{{registerInfoDetail.lastEducation.university}}</span>
            </div>
            <div class="items">
              <span class="itemtit">第一学历</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.firstEducation"
              >{{registerInfoDetail.firstEducation.eduGradeEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">第一学位</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.firstEducation"
              >{{registerInfoDetail.firstEducation.academicDegreeEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">毕业时间</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.firstEducation"
              >{{registerInfoDetail.firstEducation.graduateDate}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">专业</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.firstEducation"
              >{{registerInfoDetail.firstEducation.major}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">毕业学校</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.firstEducation"
              >{{registerInfoDetail.firstEducation.university}}</span>
            </div>
          </div>
        </div>
        <div class="itemlist">
          <span class="titlesSpan">家庭情况</span>
          <div class="infoCon">
            <div class="items1">
              <span class="itemtit">本人联系电话</span>
              <span class="itemcon">{{registerInfoDetail.mobile}}</span>
            </div>
            <div class="items1">
              <span class="itemtit">户籍地址</span>
              <span
                class="itemcon"
              >{{registerInfoDetail.householdPlace}}{{registerInfoDetail.householdPlaceAddr}}</span>
            </div>
            <div class="itemsL">
              <span class="itemtit">现居住地址</span>
              <span
                class="itemcon"
              >{{registerInfoDetail.houseDistrict}}{{registerInfoDetail.houseAddr}}</span>
            </div>
            <div class="items">
              <span class="itemtit">紧急联系人</span>
              <span class="itemcon">{{registerInfoDetail.contacterName}}</span>
            </div>
            <div class="items">
              <span class="itemtit">与本人关系</span>
              <span class="itemcon">{{registerInfoDetail.relationshipEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">紧急联系人电话</span>
              <span class="itemcon">{{registerInfoDetail.contacterMobile}}</span>
            </div>
          </div>
        </div>
        <div class="itemlist">
          <span class="titlesSpan">雇佣信息</span>
          <div class="infoCon">
            <!-- <div class="items">
              <span class="itemtit">成本中心</span>
              <span class="itemcon">{{registerInfoDetail.contract.id}}</span>
            </div>-->
            <div class="items">
              <span class="itemtit">组织架构</span>
              <span class="itemcon">{{registerInfoDetail.departmentTree}}</span>
            </div>
            <div class="items">
              <span class="itemtit">所属公司</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.contract"
              >{{registerInfoDetail.contract.contractCompany}}</span>
            </div>
            <div class="items">
              <span class="itemtit">上级主管</span>
              <span class="itemcon">{{registerInfoDetail.leaderName }}</span>
            </div>
            <div class="items">
              <span class="itemtit">职级</span>
              <span class="itemcon">{{registerInfoDetail.employeeGradeEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">职位类别</span>
              <span class="itemcon">{{registerInfoDetail.positionTypeName}}</span>
            </div>
            <div class="items">
              <span class="itemtit">中文岗位</span>
              <span class="itemcon">{{registerInfoDetail.positionName}}</span>
            </div>
            <div class="items">
              <span class="itemtit">职类</span>
              <span class="itemcon">{{registerInfoDetail.positionCategory}}</span>
            </div>
            <div class="items">
              <span class="itemtit">序列</span>
              <span class="itemcon">{{registerInfoDetail.positionSerial}}</span>
            </div>
            <div class="items">
              <span class="itemtit">发展渠道</span>
              <span class="itemcon">{{registerInfoDetail.developWay}}</span>
            </div>
            <div class="items">
              <span class="itemtit">雇佣类型</span>
              <span class="itemcon">{{registerInfoDetail.employType}}</span>
            </div>
            <div class="items">
              <span class="itemtit">合同政策</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.contract"
              >{{registerInfoDetail.policyEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">工作邮箱</span>
              <span class="itemcon">{{registerInfoDetail.email}}</span>
            </div>
            <div class="items">
              <span class="itemtit">社保所在地</span>
              <span class="itemcon">{{registerInfoDetail.socialInsurancePlaceEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">工作城市</span>
              <span class="itemcon">{{registerInfoDetail.cityEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">合同签署地</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.contract"
              >{{registerInfoDetail.contract.cityEname}}</span>
            </div>
            <div class="items">
              <span class="itemtit">是否有试用期</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.contract && registerInfoDetail.contract.probation>0"
              >是</span>
              <span class="itemcon" v-else>否</span>
            </div>
            <div class="items">
              <span class="itemtit">试用期月数</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.contract"
              >{{registerInfoDetail.contract.probation}}</span>
            </div>
            <div class="items">
              <span class="itemtit">试用期结束日期</span>
              <span class="itemcon">{{registerInfoDetail.probationEndDate}}</span>
            </div>
            <div class="items">
              <span class="itemtit">合同开始日</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.contract"
              >{{registerInfoDetail.contract.startDate}}</span>
            </div>
            <div class="items">
              <span class="itemtit">合同截止日</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.contract"
              >{{registerInfoDetail.contract.endDate}}</span>
            </div>
            <div class="items">
              <span class="itemtit">合同签订状态</span>
              <span
                class="itemcon"
                v-if="registerInfoDetail.contract"
              >{{registerInfoDetail.contractPolicy}}</span>
            </div>
            <div class="itemsL">
              <span class="itemtit">社保、公积金缴交起始月份</span>
              <span class="itemcon">{{registerInfoDetail.socialInsuranceStartMonth}}</span>
            </div>
          </div>
        </div>
        <div class="itemlist">
          <span class="titlesSpan">材料</span>
          <div class="infoCon">
            <div class="attItems" v-if="idCardDoc.length">
              <span class="tit_attach">身份证扫描件/照片</span>
              <span :key="item1.id" class="con_attch" v-for="item1 in idCardDoc">
                <img :src="item1.resourceUrl" alt class="img_attach" />
                <span @click="getDownload(1,'img_attach',item1)" class="downloads">下载</span>
              </span>
            </div>
            <div class="attItems" v-if="salaryDoc.length">
              <span class="tit_attach">薪资流水扫描件/照片</span>
              <span :key="item2.id" class="con_attch" v-for="item2 in salaryDoc">
                <img :src="item2.resourceUrl" alt class="img_attach" />
                <span @click="getDownload(2,'img_attach',item2)" class="downloads">下载</span>
              </span>
            </div>
            <div class="attItems" v-if="bankDoc.length">
              <span class="tit_attach">银行卡扫描件/照片</span>
              <span :key="item3.id" class="con_attch" v-for="item3 in bankDoc">
                <img :src="item3.resourceUrl" alt class="img_attach" />
                <span @click="getDownload(3,'img_attach',item3)" class="downloads">下载</span>
              </span>
            </div>
            <div class="attItems" v-if="graduationDoc.length">
              <span class="tit_attach">毕业证扫描件/照片</span>
              <span :key="item4.id" class="con_attch" v-for="item4 in graduationDoc">
                <img :src="item4.resourceUrl" alt class="img_attach" />
                <span @click="getDownload(4,'img_attach',item4)" class="downloads">下载</span>
              </span>
            </div>
            <div class="attItems" v-if="degreeDoc.length">
              <span class="tit_attach">学位证扫描件/照片</span>
              <span :key="item5.id" class="con_attch" v-for="item5 in degreeDoc">
                <img :src="item5.resourceUrl" alt class="img_attach" />
                <span @click="getDownload(5,'img_attach',item5)" class="downloads">下载</span>
              </span>
            </div>
            <div class="attItems" v-if="certificatedDoc.length">
              <span class="tit_attach">资格证扫描件/照片</span>
              <span :key="item6.id" class="con_attch" v-for="item6 in certificatedDoc">
                <img :src="item6.resourceUrl" alt class="img_attach" />
                <span @click="getDownload(6,'img_attach',item6)" class="downloads">下载</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <register-edit
      :isEdit="isEdit"
      :registerInfoDetail="registerInfoDetail"
      :registInfo="registInfo"
      :workInfo="workInfo"
      @changeLooks="changeEdit"
      v-if="isEdit"
    ></register-edit>
  </div>
</template>
<script>
import RegisterEdit from './registeredit.vue'; // 登记表编辑页面
import { entryTableDetail, entryAttachment } from '@src/api/relation/index.js';
import { getWorkHisInfo } from '@src/api/peopleInfo/index.js';
import { downFile } from '@src/utils/downFile';

import qs from 'qs';
export default {
    name: 'Registration',
    components: {
        RegisterEdit
    },
    data() {
        return {
            loading: false,
            isEdit: false,
            registerInfoDetail: {},
            idCardDoc: [],
            salaryDoc: [],
            bankDoc: [],
            graduationDoc: [],
            degreeDoc: [],
            certificatedDoc: [],
            imglink: '',
            workInfo: [] // 工作经历
        };
    },
    created() {
        this.getDetail();
        this.getWorkExpre();
        this.getAttachment();
    },
    computed: {
        registInfo() {
            return this.$store.state.relation.entryInfo;
        },
        isFlag() {
            return this.$store.state.relation.isFlag;
        }
    },
    methods: {
    // 获取工作经历
        getWorkExpre() {
            getWorkHisInfo(this.registInfo.id).then(res => {
                const data = res.data;
                if (data && data !== '0') {
                    this.workInfo = data;
                }
            });
        },

        goBack() {
            this.$store.commit('changeRegistration', false);
            if (this.isFlag !== undefined && this.isFlag === true) {
                this.$store.commit('changeAbandonShow', true);
            }
        },
        changeEdit() {
            this.isEdit = false;
            this.getDetail();
        },
        getDetail() {
            this.loading = true;
            const parms = qs.stringify({
                id: this.registInfo.id
            });
            entryTableDetail(parms).then(res => {
                if (res.success && res.data) {
                    this.loading = false;
                    this.registerInfoDetail = res.data;
                } else {
                    this.loading = false;
                }
            });
        },
        // 获取附件
        getAttachment() {
            // type=1身份证附件
            const IdcardParms = qs.stringify({
                id: this.registInfo.id,
                type: 1
            });
            entryAttachment(IdcardParms).then(res => {
                if (res.success && res.data) {
                    this.idCardDoc = res.data;
                }
            });
            // salary扫面件2
            const salaryParms = qs.stringify({
                id: this.registInfo.id,
                type: 2
            });
            entryAttachment(salaryParms).then(res => {
                if (res.success && res.data) {
                    this.salaryDoc = res.data;
                }
            });
            // 银行卡3
            const bankParms = qs.stringify({
                id: this.registInfo.id,
                type: 3
            });
            entryAttachment(bankParms).then(res => {
                if (res.success && res.data) {
                    this.bankDoc = res.data;
                }
            });
            // 毕业证4
            const graduationParms = qs.stringify({
                id: this.registInfo.id,
                type: 4
            });
            entryAttachment(graduationParms).then(res => {
                if (res.success && res.data) {
                    this.graduationDoc = res.data;
                }
            });
            // 学位5
            const degreeParms = qs.stringify({
                id: this.registInfo.id,
                type: 5
            });
            entryAttachment(degreeParms).then(res => {
                if (res.success && res.data) {
                    this.degreeDoc = res.data;
                }
            });
            // 资格证6
            const certificateParms = qs.stringify({
                id: this.registInfo.id,
                type: 6
            });
            entryAttachment(certificateParms).then(res => {
                if (res.success && res.data) {
                    this.certificatedDoc = res.data;
                }
            });
        },
        // 下载附件图片

        getDownload(type, selector, itemSrc, name) {
            if (itemSrc.resourceUrl !== null) {
                var parms;
                switch (type) {
                case 1:
                    parms = qs.stringify({
                        imgUrl: itemSrc.resourceUrl
                    });
                    break;
                case 2:
                    parms = qs.stringify({
                        imgUrl: itemSrc.resourceUrl
                    });
                    break;
                case 3:
                    parms = qs.stringify({
                        imgUrl: itemSrc.resourceUrl
                    });
                    break;
                case 4:
                    parms = qs.stringify({
                        imgUrl: itemSrc.resourceUrl
                    });
                    break;
                case 5:
                    parms = qs.stringify({
                        imgUrl: itemSrc.resourceUrl
                    });
                    break;
                case 6:
                    parms = qs.stringify({
                        imgUrl: itemSrc.resourceUrl
                    });
                    break;
                }
                this.imglink = '/employeeChange/getImage?' + parms;
                var a = document.createElement('a'); // 将a的download属性设置为我们想要下载的图片名称
                a.download = name || 'pic'; // 将生成的URL设置为a.href属性
                a.href = this.imglink; // 触发a的单击事件
                a.click();
            } else {
                this.errorMsg('没有图片资源可以下载');
            }
        },
        // 编辑
        getEdit() {
            this.isEdit = true;
        },
        // 预览
        getLook() {
            this.isEdit = false;
        },
        // 导出
        exportExcel() {
            if (
                this.registerInfoDetail.name !== '' &&
        // && this.registerInfoDetail.sex !==null
        //  && this.registerInfoDetail.married!==null
        this.registerInfoDetail.teacher !== '' &&
        this.registerInfoDetail.nickname !== '' &&
        this.registerInfoDetail.suitSizeEname !== '' &&
        this.registerInfoDetail.certTypeEname !== '' &&
        this.registerInfoDetail.certNo !== '' &&
        this.registerInfoDetail.birthday !== '' &&
        this.registerInfoDetail.nationalityEname !== '' &&
        this.registerInfoDetail.ethnicityEname !== '' &&
        this.registerInfoDetail.nativePlace !== '' &&
        this.registerInfoDetail.joinDate !== '' &&
        this.registerInfoDetail.socialEmployDate !== '' &&
        this.registerInfoDetail.personalEmail !== '' &&
        //  && this.registerInfoDetail.hadRecord !=='' //档案是否在公司内
        this.registerInfoDetail.birthPlace !== '' &&
        this.registerInfoDetail.positionalTitle !== '' &&
        this.registerInfoDetail.politicalStatusEname !== '' &&
        this.registerInfoDetail.householdTypeEname !== '' &&
        this.registerInfoDetail.hireTypeEname !== '' &&
        this.registerInfoDetail.hrbpName !== '' &&
        this.registerInfoDetail.handlerName !== '' &&
        this.registerInfoDetail.cardOwner !== '' &&
        this.registerInfoDetail.contract.bankEname !== '' &&
        this.registerInfoDetail.cardNo !== '' &&
        this.registerInfoDetail.branchBank !== '' &&
        this.registerInfoDetail.lastEducation.eduGradeEname !== '' &&
        this.registerInfoDetail.lastEducation.academicDegreeEname !== '' &&
        this.registerInfoDetail.lastEducation.graduateDate !== '' &&
        this.registerInfoDetail.lastEducation.major !== '' &&
        this.registerInfoDetail.lastEducation.university !== '' &&
        this.registerInfoDetail.firstEducation.eduGradeEname !== '' &&
        this.registerInfoDetail.firstEducation.academicDegreeEname !== '' &&
        this.registerInfoDetail.firstEducation.graduateDate !== '' &&
        this.registerInfoDetail.firstEducation.major !== '' &&
        this.registerInfoDetail.firstEducation.university !== '' &&
        this.registerInfoDetail.mobile !== '' &&
        this.registerInfoDetail.householdPlace !== '' &&
        this.registerInfoDetail.householdPlaceAddr !== '' &&
        this.registerInfoDetail.houseDistrict !== '' &&
        this.registerInfoDetail.houseAddr !== '' &&
        this.registerInfoDetail.contacterName !== '' &&
        this.registerInfoDetail.relationshipEname !== '' &&
        this.registerInfoDetail.contacterMobile !== '' &&
        this.registerInfoDetail.departmentTree !== '' &&
        this.registerInfoDetail.contract.contractCompany !== '' &&
        this.registerInfoDetail.leaderName !== '' &&
        this.registerInfoDetail.employeeGradeEname !== '' &&
        this.registerInfoDetail.positionTypeName !== '' &&
        this.registerInfoDetail.positionName !== '' &&
        this.registerInfoDetail.positionCategory !== '' &&
        this.registerInfoDetail.positionSerial !== '' &&
        this.registerInfoDetail.developWay !== '' &&
        this.registerInfoDetail.employType !== '' &&
        this.registerInfoDetail.policyEname !== '' &&
        this.registerInfoDetail.email !== '' &&
        this.registerInfoDetail.socialInsurancePlaceEname !== '' &&
        this.registerInfoDetail.cityEname !== '' &&
        this.registerInfoDetail.contract.cityEname !== '' &&
        this.registerInfoDetail.contract.probation !== '' &&
        this.registerInfoDetail.probationEndDate !== '' &&
        this.registerInfoDetail.contract.startDate !== '' &&
        this.registerInfoDetail.contract.endDate !== '' &&
        this.registerInfoDetail.contractPolicy !== '' &&
        this.registerInfoDetail.socialInsuranceStartMonth !== ''
            ) {
                const parms = qs.stringify({
                    id: this.registInfo.id
                });
                let url = '/employeeChange/exportToJoinEmployeeDetail?' + parms;
                downFile(url);
            } else {
                this.errorMsg('信息补充完整后才可以导出哦！');
            }
        }
    }
};
</script>
<style scoped>
.top-tit {
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
  background: #fff;
  border-bottom: 1px solid #eeeeee;
}
.tableCon {
  padding: 0 20px 20px 0;
  background: #f3f5f7;
  /*display:flex;*/
}
.workName {
  margin-left: 20px;
  font-size: 16px;
}
.marginR {
  margin-right: 6px;
  font-size: 16px;
}
.attItems {
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
}
.con_attch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  margin-right: 15px;
  border: 1px solid #eeeeee;
}
.tit_attach {
  display: block;
  width: 150px;
  text-align: right;
  font-size: 14px;
  margin-right: 20px;
}
.img_attach {
  display: inline-block;
  width: 100px;
  height: 60px;
  /* border:1px solid #eee; */
}
.downloads {
  cursor: pointer;
  color: #409eff;
  margin-right: 5px;
}
.titlesSpan {
  display: block;
  line-height: 50px;
  font-size: 16px;
  padding: 0 25px;
  margin-top: 20px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.itemlist {
  /* padding:0 25px; */
  background: #fff;
}
.infoCon {
  /* padding: 0 20px; */
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.items1 {
  display: flex;
  align-items: center;
  width: 48%;
  margin: 15px 0;
}
.items {
  display: flex;
  align-items: center;
  width: 32%;
  margin: 15px 0;
}
.itemsL {
  display: flex;
  align-items: center;
  width: 96%;
  margin: 15px 0;
}
.items > span {
  display: block;
}
.itemtit {
  /* flex:2; */
  width: 120px;
  margin-right: 20px;
  line-height: 30px;
  text-align: right;
  font-size: 14px;
}
.itemcon {
  display: inline-block;
  height: 100%;
  flex: 1;
  color: #0f0f0f;
  font-size: 13px;
  line-height: 30px;
  /* display:flex;
    justify-content: flex-start; */
  padding-left: 15px;
  border-bottom: 1px solid #eee;
}
.left-top {
  background: #fff;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
  /* margin: 0 0 20px 0; */
}

.leftCons >>> .el-button {
  padding: 6px 15px;
  margin-right: 10px;
}

.entrys >>> .el-button {
  padding: 6px 15px;
  margin-right: 10px;
}
</style>
