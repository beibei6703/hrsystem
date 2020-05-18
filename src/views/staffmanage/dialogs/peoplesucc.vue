<template>
  <div class="dialogCon">
    <el-dialog :visible.sync="dialogTableVisible" title="批量导入/修改成功结果" :before-close="handleClose">
      <el-table :data="tableData1" class="tables_div">
        <el-table-column align="center"  label="工号" property="workCode"></el-table-column>
        <el-table-column align="center" label="盘点名称" property="name"></el-table-column>
        <el-table-column align="center" label="绩效" property="performance"></el-table-column>
        <el-table-column align="center" label="盘点九宫格结果" property="result"></el-table-column>
        <el-table-column align="center" label="潜力" property="potential" ></el-table-column>
        <el-table-column align="center" label="价值观" property="valuePoint"></el-table-column>
        <el-table-column align="center" label="综合评估" property="evaluation"></el-table-column>
        <el-table-column align="center" label="是否晋级" property="upgraded"></el-table-column>
        <el-table-column align="center" label="晋级后职级" property="employeeGradeEname"></el-table-column>
        <el-table-column align="center" label="晋级后职位" property="jobTitleName"></el-table-column>
        <el-table-column align="center" label="晋级生效日期" property="upgradeDateStr"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name: 'PeopleSucc',
    props: ['rosterList', 'isPeopleSucc'],
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
            this.$emit('changeShowPeople');
            if (this.isPeopleSucc) {
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
