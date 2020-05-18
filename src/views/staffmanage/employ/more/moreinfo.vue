<template>
  <div class="infonCon">
    <div class="editCon">
      <span @click="getEdit">编辑</span>
    </div>
    <div class="baseInfo">
      <div class="listCon">
        <div class="list">
          <span class="nameTit">招聘类型</span>
          <span class="massage">{{data.hireTypeEname}}</span>
        </div>
        <div class="list">
          <span class="nameTit">招聘负责人</span>
          <span class="massage">{{data.handlerName}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">导师</span>
          <span class="massage">{{data.teacherName}}</span>
        </div>
        <div class="list">
          <span class="nameTit">入职日期</span>
          <span class="massage">{{data.joinDate}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">转正日期</span>
          <span class="massage">{{data.positiveDate}}</span>
        </div>
        <div class="list">
          <span class="nameTit">试用期结束日期</span>
          <span class="massage">{{data.probationEndDate}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">是否完成新员工培训</span>
          <span class="massage" v-if="data.isCompleteTrain===1">是</span>
          <span class="massage" v-else>否</span>
        </div>
        <div class="list">
          <span class="nameTit">最后工作日期</span>
          <span class="massage">{{data.lastWorkDate}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">离职结薪日期</span>
          <span class="massage">{{data.leaveDate}}</span>
        </div>
        <div class="list">
          <span class="nameTit">离职生效日期</span>
          <span class="massage">{{data.leaveEffectDate}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">离职下属继承</span>
          <span class="massage">{{data.leaveSubordinateSuccessorName}}</span>
        </div>
        <div class="list">
          <span class="nameTit">离职原因</span>
          <span class="massage">{{data.leaveReason}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'moreinfo',
    props: ['show', 'data'],
    methods: {
        getEdit() {
            this.$emit('changeShow', { type: 'editMore', value: true });
        }
    }
};
</script>

<style>
@import '../../../../assets/style/detail.css';
</style>
