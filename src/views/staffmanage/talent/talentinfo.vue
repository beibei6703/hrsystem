<template>
  <div>
  <div class="baseCon" v-if="!edit">
    <div class="infonCon">
      <div class="titInfo">
        <span>人才盘点</span>
      </div>
      <div class="editCon">
        <span @click="changeShow({type: true})">编辑</span>
      </div>
    <div class="baseInfo topline" v-for="item in data" :key="item.id">
        <div class="listCon">
          <div class="list">
            <span class="nameTit">盘点名称</span>
            <span class="massage">{{item.name}}</span>
          </div>
          <div class="list">
            <span class="nameTit">盘点绩效</span>
            <span class="massage">{{item.performance}}</span>
          </div>
        </div>
        <div class="listCon">
          <div class="list">
            <span class="nameTit">盘点九宫格结果</span>
            <span class="massage">{{item.result}}</span>
          </div>
          <div class="list">
            <span class="nameTit">盘点潜力</span>
            <span class="massage">{{item.potential}}</span>
          </div>
        </div>
        <div class="listCon">
          <div class="list">
            <span class="nameTit">盘点价值观</span>
            <span class="massage">{{item.valuePoint}}</span>
          </div>
          <div class="list">
            <span class="nameTit">综合评估结果</span>
            <span class="massage">{{item.evaluation}}</span>
          </div>
        </div>
        <div class="listCon">
          <div class="list">
            <span class="nameTit">是否晋升</span>
            <span class="massage">{{item.upgraded === 2 ? '否' : '是'}}</span>
          </div>
          <div class="list">
            <span class="nameTit">晋升后职级</span>
            <span class="massage">{{item.employeeGradeEname}}</span>
          </div>
        </div>
        <div class="listCon">
          <div class="list">
            <span class="nameTit">晋升后职位名称</span>
            <span class="massage">{{item.jobTitleName}}</span>
          </div>
          <div class="list">
            <span class="nameTit">晋升生效日期</span>
            <span class="massage">{{item.upgradeDate}}</span>
          </div>
        </div>
    </div>
    <div v-if="data.length === 0" class="no-data">
        暂无数据
    </div>
    </div>
  </div>
  <Talentfrom v-if="edit" :data="data" @changeShow="changeShow"></Talentfrom>
 </div>
</template>

<script>
import { getEmployeeQualify } from '@src/api/employeeQualify';
import Talentfrom from './talentfrom';
export default {
    name: 'talentinfo',
    components: {
        Talentfrom
    },
    data() {
        return {
            workCode: this.$route.params.workCode,
            data: {},
            edit: false
        };
    },
    created() {
        this.getEmployeeQualify();
    },
    methods: {
        getEmployeeQualify() {
            getEmployeeQualify(this.workCode).then(res => {
                this.data = res.data;
            });
        },
        changeShow(data) {
            const { type, fn } = data;
            this.edit = type;
            fn && this[fn]();
        }
    }
};
</script>

<style scoped>
@import "../../../assets/style/detail.css";
.topline:nth-of-type(3) {
    border-top: none;
    padding-top: 0px;
    margin-top: 0px;
}
</style>
