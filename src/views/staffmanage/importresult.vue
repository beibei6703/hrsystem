<template>
  <div class="contents">
    <div>
      <div class="resubtns">
        <el-button @click="getBack" type="primary">返回</el-button>
      </div>
      <div class="resultCon">
        <el-steps :active="active" :align-center="true" finish-status="success">
          <el-step title="上传文件"></el-step>
          <el-step title="解析并匹配数据"></el-step>
          <el-step title=" 导入结果"></el-step>
        </el-steps>
      </div>
      <div class="resultInfos">
        <div class="resultList">
          <span>导入完成，</span>
          <span>
            共解析
            <i class="datas">{{getResultInfo.all}}</i>条数据
          </span>
        </div>
        <div class="resultList">
          <span class="rightIcon">
            <i class="el-icon-check"></i>
          </span>
          <span>
            导入成功
            <i class="datas">{{getResultInfo.success}}</i> 条数据
          </span>
          <span @click="getRecord" class="importR">查看导入记录</span>
        </div>
        <div class="resultList">
          <span class="warnIcon">
            <i>!</i>
          </span>
          <span>
            导入失败
            <i class="datas">{{getResultInfo.fail}}</i> 条数据
          </span>
          <span @click="expotExcel" class="importR">导出未解析成功数据</span>
          <span @click="reDownload" class="importR">重新上传</span>
        </div>
      </div>
    </div>
    <!-- <ImportRecord v-if="isRecord"></ImportRecord> -->
  </div>
</template>

<script>
// import ImportRecord from './importrecord'
import { downFile } from '@src/utils/downFile';
import qs from 'qs';
export default {
    name: 'ImportResult',
    // components:{
    //     ImportRecord
    // },
    data() {
        return {
            active: 3
        };
    },
    computed: {
        // 导入成功数据返回信息
        getResultInfo() {
            return this.$store.state.relation.resultInfo;
        },
        getFaildStatus() {
            return this.$store.state.relation.faildStatus;
        }
    },
    methods: {
        getBack() {
            this.$store.commit('changeImportResult', false);
        },
        // 查看记录
        getRecord() {
            this.$store.commit('changeImportRecord', true);
            this.$store.commit('changeImportResult', false);
            this.$store.commit('changeStatus', 2);
        },
        // 重新上传
        reDownload() {
            this.$store.commit('changeImportResult', false);
        },
        // 导出
        expotExcel() {
            // 导出失败数据
            if (this.getResultInfo.failId) {
                const parms = qs.stringify({
                    failId: this.getResultInfo.failId
                });
                if (this.getFaildStatus === 1) {
                    // window.location.href = '/employeeRoster/exportFailDataOfEmployee?' + parms;
                    let url = '/employeeRoster/exportFailDataOfEmployee?' + parms;
                    downFile(url);
                } else if (this.getFaildStatus === 2) {
                    let url = '/employeeRoster/exportFailDataOfInventory?' + parms;
                    downFile(url);
                } else if (this.getFaildStatus === 3) {
                    let url = '/employeeRoster/exportFailDataOfContract?' + parms;
                    downFile(url);
                }
            } else {
                this.errorMsg('暂无失败数据导出');
            }
        }
    }
};
</script>

<style scoped>
@import '../../assets/style/staffinfo.css';
i {
    font-style: normal;
}
.resubtns >>> .el-button {
    padding: 6px 15px;
    margin-left: 15px;
}
.resultCon {
    padding: 30px 20px;
}
.resultInfos {
    width: 60%;
    height: 200px;
    border: 1px solid #eee;
    margin: 20px auto;
    background-color: rgba(250, 251, 255, 1);
    border-radius: 10px;
}
.datas {
    margin: 0 5px;
    font-style: normal !important;
    font-size: 14px;
    font-weight: 500;
}
.warnIcon {
    display: inline-block;
    line-height: 20px;
    text-align: center;
    background: #e6a23c;
    border-radius: 50%;
    color: #fff;
    font-weight: 300;
    width: 20px;
    height: 20px;
    margin-right: 5px;
}
.importR {
    color: #409eff;
    cursor: pointer;
    margin-left: 12px;
}

.rightIcon {
    display: inline-block;
    line-height: 20px;
    text-align: center;
    background: #67c23a;
    border-radius: 50%;
    color: #fff;
    margin-right: 5px;
    width: 20px;
    height: 20px;
}
.resultList {
    margin-top: 25px;
    padding-left: 50px;
}
</style>
