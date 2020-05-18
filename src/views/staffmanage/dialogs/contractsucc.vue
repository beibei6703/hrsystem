<template>
  <div class="dialogCon">
    <el-dialog :visible.sync="dialogTableVisible" title="批量导入/修改成功结果" :before-close="handleClose">
      <el-table :data="tableData1" class="tables_div">
        <el-table-column align="center"  label="工号" property="workCode"></el-table-column>
        <el-table-column align="center" label="合同签署公司" property="contractCompany"></el-table-column>
        <el-table-column align="center" label="合同状态" property="contractStatusEname"></el-table-column>
        <el-table-column align="center" label="开始日期" property="startDateStr"></el-table-column>
        <el-table-column align="center" label="结束日期" property="endDateStr"></el-table-column>
        <el-table-column align="center" label="工作年限" property="contractYears"></el-table-column>
        <el-table-column align="center" label="试用期（月）" property="probation"></el-table-column>
        <el-table-column align="center" label="合同签署地" property="cityEname"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name: 'ContractSucc',
    props: ['rosterList', 'isContractSucc'],
    data() {
        return {
            tableData1: [],
            dialogTableVisible: true
        };
    },
    created() {
        this.tableData1 = this.rosterList;
    },
    methods: {
        handleClose(done) {
            done();
            this.$emit('changeShowContract');
            if (this.isContractSucc) {
                this.dialogTableVisible = true;
            } else {
                this.dialogTableVisible = false;
            }
        }
    }

};
</script>
<style scoped>
.tables_div >>> th {
    padding: 0 !important;
    font-weight: 500;
    font-size: 12px;
    color: #666666;
    background: #f3f5f7;
}
.tables_div >>> td {
    padding: 0 !important;
    font-size: 12px;
    color: #4a4c4d;
}

.tables_div >>> .cell {
    height: 40px;
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 40px;
}
.dialogCon >>> .el-table__body-wrapper {
    max-height: 500px;
    overflow: auto;
}
.dialogCon >>> .el-dialog {
    width: 75%;
    padding-bottom: 30px !important;
}
</style>
