<template>
  <div class="contents1">
    <div class="infos">
      <div class="leftImg">
        <el-upload
            class="avatar-uploader"
            action="/employee/updateAvatar"
            :data="{employeeId: workCode}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <span class="changeIcon">更换头像</span>
        </el-upload>
      </div>
      <div class="perCon">
        <div class="leftInfo">
          <span>{{data.name}}</span>
          <span>工号：<i>{{data.workCode}}</i></span>
          <span class="tag"><i>{{data.employTypeName}}</i>&nbsp;<i>{{data.companyYear}}</i></span>
          <span>{{data.positionName}}</span>
          <span>{{data.departmentTree}}</span>
        </div>
        <div class="rightCon">
         <el-button size="small" type="primary" v-if="data.employeeStatusEid === 99&&isRender('Re-employment')" @click="reEmploy">重新雇佣</el-button>
         <el-button size="small" type="primary" v-if="data.employeeStatusEid !== 99&&isRender('formerEmployee')" @click="startLeavePerson">离职员工</el-button>
        </div>
      </div>
    </div>
    <div class="perInfoCon">
      <div class="topTab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="个人信息" name="first" lazy>
            <Peopleinfo></Peopleinfo>
          </el-tab-pane>
          <el-tab-pane label="雇佣信息" name="second" lazy>
            <Employinfo ref="employinfo"></Employinfo>
          </el-tab-pane>
          <el-tab-pane label="工资社保" v-if="isRender('wage')" name="third" lazy>
            <Salaryinfo></Salaryinfo>
          </el-tab-pane>
           <el-tab-pane label="合同信息" name="fourth" lazy>
            <Contractinfo></Contractinfo>
          </el-tab-pane>
          <el-tab-pane label="人才盘点" name="fifth" lazy>
            <Talentinfo></Talentinfo>
          </el-tab-pane>
          <el-tab-pane label="奖惩记录" name="sixth" lazy>
            <Rewardinfo></Rewardinfo>
          </el-tab-pane>
          <el-tab-pane label="电子档案" name="seventh" lazy>
            <Fileinfo></Fileinfo>
          </el-tab-pane>
          <el-tab-pane label="异动记录" name="eighth" lazy>
            <Transateinfo></Transateinfo>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
     <component v-bind:is="currentComponent" :close="close" :show="show" :data="currentWorkCode" :refs="$refs.employinfo"></component>

  </div>
</template>
<script>
import Peopleinfo from './peopleinfo'; // 个人信息
import Employinfo from './employ'; // 雇佣信息
import Salaryinfo from './salary/salaryinfo'; // 工资社保
import Talentinfo from './talent/talentinfo'; // 人才盘点
import Contractinfo from './contract/contractinfo'; // 合同信息
import Rewardinfo from './reward/rewardinfo'; // 奖惩记录
import Fileinfo from './elrecord/fileinfo'; // 电子档案
import Transateinfo from './transaction/transateinfo'; // 异动
import LeaveModal from './leaveModal'; // 发起离职
import { mapState } from 'vuex';
import { getBriefInfo } from '@src/api/employee'; // 获取个人简略信息
export default {
    name: 'personinfo',
    components: {
        Peopleinfo,
        Employinfo,
        Salaryinfo,
        Talentinfo,
        Contractinfo,
        Rewardinfo,
        Fileinfo,
        Transateinfo,
        LeaveModal
    },
    data() {
        return {
            currentWorkCode: '',
            workCode: this.$route.params.workCode,
            activeName: 'first',
            imageUrl: '',
            data: {},
            show: false,
            currentComponent: ''
        };
    },
    created() {
        this.getBriefInfo();
        if (this.$route.query.reEmploy) {
            this.reEmploy();
        }
    },
    computed: {
        ...mapState({userMenus: state => state.user.userMenus})
    },
    methods: {
        isRender(key) {
            return this.userMenus.includes(key);
        },
        getBriefInfo() {
            getBriefInfo(this.workCode).then(res => {
                this.data = res.data;
                this.imageUrl = res.data.avatar;
                this.currentWorkCode = res.data.workCode;
            });
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (!isLt1M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isLt1M;
        },
        // 离职员工
        startLeavePerson() {
            this.show = true;
            this.currentComponent = 'LeaveModal';
        },
        // 重新雇佣
        reEmploy() {
            this.activeName = 'second';
            this.$nextTick(() => {
                this.$refs.employinfo.editEmploy = true;
            });
        },
        close() {
            this.show = false;
            this.LeaveModal = '';
            this.getBriefInfo();
        }
    }
};
</script>

<style scoped>
.contents1 {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
  overflow-y: scroll;
}

.titles {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  color: #212121;
  padding-left: 15px;
  border-bottom: 1px solid #dddddd;
}
.infos {
  padding: 20px 0 0;
  display: flex;
  align-items: center;
}
i {
  font-style: normal;
}
.leftImg {
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 5%;
  margin-left: 5%;
}

.leftImg > img {
  width: 50px;
  height: 50px;
  border: 1px solid #4a4c4d;
  border-radius: 50%;
}

.changeIcon {
  margin-top: 10px;
}

.leftInfo {
  width: 350px;
  display: flex;
  flex-direction: column;
}

.leftInfo > span {
  font-size: 14px;
  color: #212121;
  margin-bottom: 10px;
}

.leftInfo .tag i{
   border: 1px  dashed #cd8416;
   padding: 2px;
   color: #cd8416;
}
.perCon {
  flex: 1;
  padding-right: 100px;
  display: flex;
}

.rightCon {
  width: 80px;
  display: flex;
  flex-direction: column;
  margin-left: 40%;
}

.rightCon > span {
  display: block;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 14px;
}

.perInfoCon {
  width: 100%;
  height: 100%;
  background: #fff;
  padding-bottom: 30px;
  position: absolute;
  top: 245px;
  left: 0;
  bottom: 0;
}

.topTab {
  height: 100%;
  position: relative;
  padding: 0 10% 0 6%;
  min-width: 1200px;
}
.topTab >>> .el-tabs{
    padding-bottom: 60px;
}
.topTab >>> .el-tabs__nav-scroll {
  display: flex;
  justify-content: space-around;
}

.topTab >>> .el-tabs__content {
  top: 40px;
  left: 0;
  bottom: 0;
  height: 100%;
}
.topTab >>> .el-tabs__content::-webkit-scrollbar {
  width: 4px;
  /*宽对应滚动条的尺寸*/
}
/*轨道*/
.topTab >>> .el-tabs__content::-webkit-scrollbar-track {
  background: #fff;
}
/*滑块*/
.topTab >>> .el-tabs__content::-webkit-scrollbar-thumb {
  background: #d8d8d8;
  height: 2px;
  border-radius: 2.5px;
}

.topTab >>> .el-tabs__item {
  line-height: 30px !important;
  padding: 0 35px !important;
  text-align: center !important;
  border: 0 !important;
}
.topTab >>> .is-active {
  border: 0 !important;
}

.topTab >>> .el-tabs__nav {
  width: 100% !important;
  display: flex;
  justify-content: space-around;
}

.topTab >>> .el-tabs__active-bar {
  display: none;
}
.header_top {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f3f5f7;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.active {
  color: #409eff;
}
.avatar {
  width: 70px;
  height: 70px;
  border: 1px solid #4a4c4d;
  border-radius: 50%;
  overflow: hidden;
}
</style>
