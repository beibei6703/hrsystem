<template>
  <div class="dialogCon">
    <el-dialog :visible.sync="dialogTableVisible" title="批量导入/修改成功结果" :before-close="handleClose">
      <el-table :data="tableData1" class="tables_div">
        <el-table-column align="center" label="工号" property="workCode"></el-table-column>
        <el-table-column align="center" label="姓名" property="name"></el-table-column>
        <el-table-column align="center" label="花名" property="nickname"></el-table-column>
        <el-table-column align="center" label="工作邮箱" :show-overflow-tooltip="true" property="email"></el-table-column>
        <el-table-column align="center" label="证件类型" property="certTypeEname" width="200"></el-table-column>
        <el-table-column align="center" label="证件号码" :show-overflow-tooltip="true" property="certNo"></el-table-column>
        <el-table-column align="center" label="合同签署公司" :show-overflow-tooltip="true" property="contractCompanyName"></el-table-column>
        <el-table-column align="center" label="部门层级" :show-overflow-tooltip="true" property="departmentTree"></el-table-column>
        <el-table-column align="center" label="雇佣类型" property="employTypeName"></el-table-column>
        <el-table-column align="center" label="职级" property="employeeGradeEname"></el-table-column>
        <el-table-column align="center" label="在职状态" property="employeeStatusEname"></el-table-column>
        <el-table-column align="center" label="工作城市" property="cityEname"></el-table-column>
        <el-table-column align="center" label="直接上级" property="leaderName"></el-table-column>
        <el-table-column align="center" label="岗位"  :show-overflow-tooltip="true" property="positionName"></el-table-column>
        <el-table-column align="center" label="入职日期" property="joinDateStr"></el-table-column>
        <el-table-column align="center" label="社会雇佣日" property="socialEmployDateStr"></el-table-column>
        <el-table-column align="center" label="试用期" property="probation"></el-table-column>
        <el-table-column align="center" label="安全级别" property="securityLevel"></el-table-column>
        <el-table-column align="center" label="银行账号" :show-overflow-tooltip="true" property="cardNo"></el-table-column>
        <el-table-column align="center" label="账户持有人" property="cardOwner"></el-table-column>
        <el-table-column align="center" label="开户行全称" :show-overflow-tooltip="true" property="branchBank"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name: 'RosterSucc',
    props: ['rosterList', 'isRosterSucc'],
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
            this.$emit('changeShowRoster');
            if (this.isRosterSucc) {
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
