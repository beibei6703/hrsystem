<template>
  <div class="infonCon">
    <div class="editCon">
      <span @click="getEdit">编辑</span>
    </div>
    <div class="baseInfo topline" v-for="item in data" :key="item.id">
      <div class="listCon">
        <div class="list">
          <span class="nameTit">成员名字</span>
          <span class="massage">{{item.name}}</span>
        </div>
        <div class="list">
          <span class="nameTit">关系</span>
          <span class="massage">{{item.relationshipEname}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">手机号码</span>
          <span class="massage">{{item.mobile}}</span>
        </div>
        <!-- <div class="list">
          <span class="nameTit">出生日期</span>
          <span class="massage">{{item.birthday}}</span>
        </div> -->
      </div>
      <!-- <div class="listCon">
        <div class="list">
          <span class="nameTit">性别</span>
          <span class="massage">{{enumeration.sex[item.sex]}}</span>
        </div>
        <div class="list">
          <span class="nameTit">国籍</span>
          <span class="massage">{{item.nationalityEname}}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import enumeration from '../enumeration.js';
export default {
    name: 'familyinfo',
    props: ['data'],
    data() {
        return {
            enumeration
        };
    },
    methods: {
        getEdit() {
            this.$emit('changeShow', { type: 'editFamilyinfo', value: true });
        }
    }
};
</script>

<style>
@import "../../../../assets/style/detail.css";
</style>
