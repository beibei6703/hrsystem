<template>
  <div class="infonCon">
    <div class="editCon">
      <span @click="getEdit">编辑</span>
    </div>
    <div class="baseInfo">
      <div class="listCon">
        <div class="list">
          <span class="nameTit">姓名</span>
          <span class="massage">{{data.name}}</span>
        </div>
        <div class="list">
          <span class="nameTit">花名</span>
          <span class="massage">{{data.nickname}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">工号</span>
          <span class="massage">{{data.workCode}}</span>
        </div>
        <div class="list">
          <span class="nameTit">手机号</span>
          <span class="massage">{{data.mobile}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">工作邮箱</span>
          <span class="massage">{{data.email}}</span>
        </div>
        <div class="list">
          <span class="nameTit">社会雇佣日</span>
          <span class="massage">{{data.socialEmployeeDate}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">证件类型</span>
          <span class="massage">{{data.certTypeEname}}</span>
        </div>
        <div class="list">
          <span class="nameTit">证件号码</span>
          <span class="massage">{{data.certNo}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">生日</span>
          <span class="massage">{{data.birthday}}</span>
        </div>
        <div class="list">
          <span class="nameTit">政治面貌</span>
          <span class="massage">{{data.politicalStatusEname}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">性别</span>
          <span class="massage">{{enumeration.sex[data.sex]}}</span>
        </div>
        <div class="list">
          <span class="nameTit">婚姻状况</span>
          <span class="massage">{{enumeration.married[data.married]}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">国籍</span>
          <span class="massage">{{data.nationalityEname}}</span>
        </div>
        <div class="list">
          <span class="nameTit">民族</span>
          <span class="massage">{{data.ethnicityEname}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">籍贯</span>
          <span class="massage">{{data.nativePlace}}</span>
        </div>
        <div class="list">
          <span class="nameTit">出生地</span>
          <span class="massage">{{data.birthPlace}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">户口性质</span>
          <span class="massage">{{data.householdTypeEname}}</span>
        </div>
        <div class="list">
          <span class="nameTit">户口所在地</span>
          <span class="massage">{{ (data.householdPlace + data.householdPlaceAddr) === 0 ? '' : (data.householdPlace + data.householdPlaceAddr)}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">现居地址</span>
          <span class="massage">{{(data.houseDistrict + data.houseAddr) === 0 ? '' : (data.houseDistrict + data.houseAddr)}}</span>
        </div>
        <div class="list">
          <span class="nameTit">社保所在地</span>
          <span class="massage">{{data.socialInsurancePlaceEname}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">衣服尺码</span>
          <span class="massage">{{data.suitSizeEname}}</span>
        </div>
        <div class="list">
          <span class="nameTit">个人邮箱</span>
          <span class="massage">{{data.personalEmail}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">档案是否在公司内</span>
          <span class="massage">{{enumeration.hadRecord[data.hadRecord]}}</span>
        </div>
        <div class="list">
          <span class="nameTit">职称</span>
          <span class="massage">{{data.positionalTitle}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import enumeration from '../enumeration.js';
export default {
    name: 'baseinfo',
    props: ['show', 'data'],
    data() {
        return {
            enumeration
        };
    },
    methods: {
        getEdit() {
            this.$emit('changeShow', {type: 'editBase', value: true});
        }
    }
};
</script>

<style>
@import "../../../../assets/style/detail.css";
</style>
