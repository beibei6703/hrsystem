<template>
  <div class="contents">
    <div v-if="!getImportRecord && !getisImportResult">
      <!-- <div class="titles">
        <span>员工管理</span>
        <span class="margins">/</span>
        <span>员工花名册</span>
        <span class="margins">/</span>
        <span>导入员工</span>
      </div> -->
      <div class="resubtn">
        <el-button @click="getBack" class="buttons" type="primary">
          返回
          <!-- <img src="../../assets/img/back.png" class="imgIcon" />
          <span class="btnFont">返回</span>-->
        </el-button>
      </div>
      <div class="tabContain">
        <div class="topTit">
          <span :class="{ isActive: isActive1 }" @click="gettab(1)" class="spanTit">员工花名册导入</span>
          <span :class="{ isActive: isActive2 }" @click="gettab(2)" class="spanTit">人才盘点导入</span>
          <span :class="{ isActive: isActive3 }" @click="gettab(3)" class="spanTit">合同信息导入</span>
        </div>
        <span @click="getLookRecord" class="fColor">查看导入记录</span>
      </div>
      <div class="importCon">
        <Rosterimport v-if="isActive1"></Rosterimport>
        <Peocheck v-if="isActive2"></Peocheck>
        <Contract v-if="isActive3"></Contract>
      </div>
    </div>
    <Importrecord v-if="getImportRecord"></Importrecord>
    <import-result v-if="getisImportResult"></import-result>
  </div>
</template>

<script>
import Rosterimport from './rosterimport'; // 花名册导入
import Peocheck from './peocheck'; // 人才盘点导入
import Contract from './contract'; // 合同信息导入
import Importrecord from './importrecord'; // 导入记录
import ImportResult from './importresult';

export default {
    name: 'importinfo',
    components: {
        Rosterimport,
        Peocheck,
        Contract,
        Importrecord,
        ImportResult
    },
    data() {
        return {
            isActive1: true,
            isActive2: false,
            isActive3: false
        };
    },
    computed: {
        getisImportResult() {
            return this.$store.state.relation.isImportResult;
        },
        getImportRecord() {
            return this.$store.state.relation.isImportRecord;
            // changeImportRecord
        }
    },
    methods: {
        getBack() {
            this.$emit('onChangeImport');
        },
        gettab(num) {
            switch (num) {
            case 1:
                this.isActive1 = true;
                this.isActive2 = false;
                this.isActive3 = false;
                this.$store.commit('changeFailStatus', 1);
                break;
            case 2:
                this.isActive1 = false;
                this.isActive2 = true;
                this.isActive3 = false;
                this.$store.commit('changeFailStatus', 2);
                break;
            case 3:
                this.isActive1 = false;
                this.isActive2 = false;
                this.isActive3 = true;
                this.$store.commit('changeFailStatus', 3);
                break;
            }
        },
        // 查看导入记录
        getLookRecord() {
            this.$store.commit('changeImportRecord', true);
            this.$store.commit('changeStatus', 1);

            // this.showRecord = true;
        }
    }
};
</script>

<style scoped>
@import '../../assets/style/staffinfo.css';
.tabContain {
    padding: 0 40px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #9a9a9a;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd;
}
.contents{
    width:100%;
}
.isActive {
    color: #409eff;
}
.topTit {
    padding-left: 10px;
}
.spanTit {
    display: inline-block;
    margin-left: 50px;
    cursor: pointer;
}
.fColor {
    color: #409eff;
    cursor: pointer;
}
/* .resubtn>>>.el-button{
    padding: 6px 15px;
} */
</style>
