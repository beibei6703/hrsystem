<template>
  <div class="infonCon">
    <div class="editCon">
      <span @click="getEdit">编辑</span>
    </div>
    <div class="baseInfo topline" v-for="item in data" :key="item.id">
      <div class="listCon">
        <div class="list">
          <span class="nameTit">开始日期</span>
          <span class="massage">{{item.startDate}}</span>
        </div>
        <div class="list">
          <span class="nameTit">结束日期</span>
          <span class="massage">{{item.endDate}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">公司名称</span>
          <span class="massage">{{item.company}}</span>
        </div>
        <div class="list">
          <span class="nameTit">所在部门</span>
          <span class="massage">{{item.department}}</span>
        </div>
      </div>
       <div class="listCon">
        <div class="list">
          <span class="nameTit">担任职务</span>
          <span class="massage">{{item.position}}</span>
        </div>
        <div class="list">
          <span class="nameTit">工作地点</span>
          <span class="massage">{{item.address}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">证明人</span>
          <span class="massage">{{item.witness}}</span>
        </div>
        <div class="list">
          <span class="nameTit">证明人电话</span>
          <span class="massage">{{item.witnessMobile}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">薪资</span>
          <span class="massage">{{item.salary}}</span>
        </div>
      </div>
       <div class="listCon">
        <div class="list">
          <span class="nameTit">离职原因</span>
          <span class="massage">{{item.leaveReason}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">备注</span>
          <span class="massage">{{item.remark}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'workinfo',
    props: ['data'],
    methods: {
        getEdit() {
            this.$emit('changeShow', {type: 'editWorkinfo', value: true});
        }
    }
};
</script>

<style scoped>
@import "../../../../assets/style/detail.css";
</style>
