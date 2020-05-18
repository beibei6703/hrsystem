<template>
  <div class="infonCon">
    <div class="editCon">
      <span @click="getEdit">编辑</span>
    </div>
    <div class="baseInfo">
      <div class="listCon">
        <div class="list">
          <span class="nameTit">合同签署公司</span>
          <span class="massage">{{data.contractCompanyName}}</span>
        </div>
        <div class="list">
          <span class="nameTit">部门</span>
          <span class="massage">{{data.departmentName}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">雇佣类型</span>
          <span class="massage">{{data.employTypeName}}</span>
        </div>
         <div class="list">
          <span class="nameTit">职级</span>
          <span class="massage">{{data.employeeGradeEname}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">职位类别</span>
          <span class="massage">{{data.positionTypeName}}</span>
        </div>
        <div class="list">
          <span class="nameTit">岗位</span>
          <span class="massage">{{data.positionName}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">工作城市</span>
          <span class="massage">{{data.cityEname}}</span>
        </div>
        <div class="list">
          <span class="nameTit">在职状态</span>
          <span class="massage">{{data.employeeStatusEname}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">职类</span>
          <span class="massage">{{data.positionCategoryName}}</span>
        </div>
        <div class="list">
          <span class="nameTit">序列</span>
          <span class="massage">{{data.serialName}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">发展通道</span>
          <span class="massage">{{data.developmentChannel}}</span>
        </div>
         <div class="list">
          <span class="nameTit">直接上级</span>
          <span class="massage">{{data.leaderName}}</span>
        </div>
      </div>
      <div class="listCon">
         <div class="list">
          <span class="nameTit">HRBP</span>
          <span class="massage">{{data.hrbpName}}</span>
        </div>
        <div class="list">
          <span class="nameTit">安全级别</span>
          <span class="massage">{{data.securityLevel}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'onjobinfo',
    props: ['data'],
    methods: {
        getEdit() {
            this.$emit('changeShow', {type: 'editOnjob', value: true});
        }
    }
};
</script>

<style>
@import "../../../../assets/style/detail.css";
</style>
