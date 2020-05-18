<template>
  <div class="baseCon">
    <div class="transaction">
      <el-steps direction="vertical" :active="1">
        <el-step v-for="(item, index) in data" :key="index">
          <template slot="title">
            <span class="time">{{item.activeDate}}</span>
            <span class="event">{{item.reason || ''}}</span>
          </template>
          <template slot="description">
            <div class="item" v-for="(_item, _index) in item.data" :key="_index">
              <span class="label" v-if="_item.value">{{_item.name}}</span>
              <span class="value" v-if="_item.value">{{_item.value}}</span>
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
    <div v-if="data.length === 0" class="no-data">
        暂无数据
    </div>
  </div>
</template>
<script>
import { getEmployeeChangHis } from '@src/api/employeeChangHis';
import fromData from './fromData.js';

export default {
    name: 'transaction',
    data() {
        return {
            workCode: this.$route.params.workCode,
            data: {}
        };
    },
    created() {
        this.getEmployeeChangHis();
    },
    methods: {
        getEmployeeChangHis() {
            getEmployeeChangHis(this.workCode).then(res => {
                this.data = fromData(res.data);
            });
        }
    }
};
</script>
<style lang="less">
.transaction {
    padding: 20px 100px;
    width: 700px;
    .el-step__main {
        padding-bottom: 20px;
    }
    .el-step__icon {
        font-size: 0px;
        width: 7px;
        height: 7px;
        color: #ddd;
        background: #ddd;
        border-color: #ddd;
    }
    .el-step__title.is-process {
        font-weight: normal;
    }
    .el-step.is-vertical .el-step__line {
        width: 1px;
        left: 3px;
        top: 13px;
        bottom: -13px;
        background-color: #ddd;
    }
    .time {
        font-size: 14px;
        color: #3a404c;
        letter-spacing: -0.34px;
        line-height: 14px;
        padding-right: 10px;
    }
    .event {
        font-size: 14px;
        color: #3a404c;
        letter-spacing: -0.34px;
        line-height: 14px;
    }
    .item {
        .label {
            display: inline-block;
            font-size: 13px;
            color: #a1a7b3;
            letter-spacing: -0.31px;
            line-height: 14px;
            text-align: left;
            padding-right: 10px;
        }
        .value {
            font-size: 13px;
            color: rgb(64, 158, 255);
            letter-spacing: -0.31px;
            line-height: 14px;
        }
    }
    .el-step__head.is-finish {
        .el-step__icon {
            position: relative;
            transform: translateX(-2px);
            background: #f10d3b;
            color: #f10d3b;
            border-color: #f10d3b;
            width: 11px;
            height: 11px;
        }
    }
    .el-step__icon-inner {
        line-height: unset;
        font-size: 0;
    }
}
</style>
