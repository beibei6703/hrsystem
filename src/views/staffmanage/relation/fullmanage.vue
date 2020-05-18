<template>
  <div class="tableCon">
    <div class="titCon">
      <div class="left-top">
        <el-input class="inputs" clearable placeholder="员工姓名，花名，工号，岗位" v-model="keyWord"></el-input>
        <el-cascader
          :options="treeOption"
          :props="defaultParams"
          :show-all-levels="false"
          clearable
          filterable
          placeholder="请输入或选择部门"
          v-model="departmentName"
        ></el-cascader>
        <!-- <div class="settings">
                    <i class="el-icon-edit"></i>
                    <span>表头模板</span>
        </div>-->
      </div>
      <div class="btns">
        <el-button @click="getSearch" type="primary">查询</el-button>
        <el-button @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="tables" v-loading="loading">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" fixed="left" label="姓名" prop="name" width="120">
          <template slot-scope="scope">
            <el-button @click="getDetail(scope.row)" size="small" type="text">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="left" label="工号" prop="workCode"></el-table-column>
        <el-table-column align="center" label="花名" prop="nickName"></el-table-column>
        <el-table-column align="center" label="公司" prop="companyName"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="组织层级"
          prop="departmentTree"
        ></el-table-column>
        <el-table-column align="center" label="职位" prop="positionName"></el-table-column>
        <el-table-column align="center" label="雇佣类型" prop="employTypeName"></el-table-column>
        <el-table-column align="center" label="入职时间" prop="joinDate"></el-table-column>
        <el-table-column align="center" label="试用期"  >
            <template slot-scope="scope">
                <span v-if="scope.row.probation===0">无</span>
                <span v-if="scope.row.probation>0">{{scope.row.probationName}}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="流程状态" prop="positiveFlowStatusEname"></el-table-column>
        <el-table-column align="center" label="是否延期转正" prop="isLatePositiveName" >
        </el-table-column>
      </el-table>
      <div class="pageCon">
        <el-pagination
          :current-page="pageNo"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :total="totalCount"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <fullworker-dialog v-if="isFullDialog"></fullworker-dialog>
  </div>
</template>

<script>
import qs from 'qs';
import FullworkerDialog from '../dialogs/fullworkerdialog';
import { fullManameTable } from '@src/api/relation/index.js';
import { getHrm } from '@src/api/organization/organize.js';
import { downFile } from '@src/utils/downFile';
export default {
    name: 'fullmanage',
    components: {
        FullworkerDialog
    },
    data() {
        return {
            loading: false,
            keyWord: '',
            totalCount: 0,
            pageNo: 1,
            pageSize: 10,
            isFullDialog: false,
            tableData: [],
            departmentName: [], // 部门,
            defaultParams: {
                children: 'childrenDepartment',
                label: 'name',
                value: 'id',
                checkStrictly: true
            },
            treeOption: []
        };
    },
    created() {
        this.getSearch();
        this.getDepart();
    },
    computed: {
        departIds: function() {
            var departLength = this.departmentName.length;
            return departLength ? this.departmentName[departLength - 1] : '';
        }
    },
    methods: {
        getDetail(row) {
            this.$router.push({ path: `/personinfo/${row.id}` });
        },
        // 部门下拉查询
        getDepart() {
            getHrm().then(res => {
                if (res.success && res.data) {
                    this.treeOption = this.getTreeData(res.data.childrenDepartment);
                }
            });
        },
        getProcess(row) {
            // eslint-disable-line
            this.isFullDialog = true;
        },
        getSearch() {
            this.loading = true;
            this.pageNo = 1;
            const parms = qs.stringify({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                keyword: this.keyWord,
                departmentId: this.departIds
            });
            fullManameTable(parms).then(this.handleFullTable.bind(this));
        },
        handleFullTable(res) {
            if (res.success && res.data) {
                this.totalCount = res.data.total;
                this.tableData = res.data.list;
                this.loading = false;
            } else {
                this.loading = false;
            }
        },
        // 导出
        exportExcel() {
            const parms = qs.stringify({
                keyword: this.keyWord,
                departmentId: this.departIds
            });
            let url = '/employeeChange/exportToPositive?' + parms;
            downFile(url);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            const parms = qs.stringify({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                keyword: this.keyWord,
                departmentId: this.departIds
            });
            fullManameTable(parms).then(this.handleFullTable.bind(this));
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            const parms = qs.stringify({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                keyword: this.keyWord,
                departmentId: this.departIds
            });
            fullManameTable(parms).then(this.handleFullTable.bind(this));
        }
    }
};
</script>
<style scoped>
.tableCon {
    padding: 0 20px;
    /*display:flex;*/
}

.diacontents {
    padding: 0 20px;
    border-top: 1px solid #dddddd;
}

.dialogC >>> .el-dialog__body {
    padding-top: 0 !important;
}

.dialogC >>> .el-button {
    padding: 6px 15px !important;
}

.items {
    display: flex;
    padding-top: 20px;
    align-items: center;
}

.items >>> .el-input__inner {
    height: 30px;
}

.items >>> .el-input__icon {
    line-height: 30px !important;
}

.items > span {
    display: block;
    width: 150px;
    text-align: right;
}
.radiosCon {
    margin-left: 30px;
}

.settings {
    font-size: 14px;
    padding-left: 30px;
}

.setting > i {
    margin-right: 10px;
}
.left-top {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.left-top >>> .el-input {
    width: 230px !important;
    height: 30px;
    margin-right: 30px;
}

.left-top >>> .el-input__inner {
    width: 230px !important;
    height: 30px !important;
}

.left-top >>> .el-input__icon {
    line-height: 0px;
}
.btns {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0 0 20px 0;
}

.btns >>> .el-button {
    padding: 6px 15px;
    margin-right: 10px;
}

.enterys {
    display: flex;
    align-items: center;
}
.settings {
    margin-left: 20px;
}

.enterys >>> .el-button {
    padding: 6px 15px;
    margin-right: 10px;
}

.tables >>> .cell {
    height: 40px;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    line-height: 40px !important;
    padding: 0 !important;
}

.tables >>> .el-table th {
    padding: 0 !important;
    font-weight: 500;
    font-size: 12px;
    color: #666666;
    background: #f3f5f7;
}

/* .tables >>> .el-table::before {
    display: none;
}

.tables >>> .el-table::before {
    display: none;
} */

.tables >>> .el-table td {
    padding: 0 !important;
    font-size: 12px;
    color: #4a4c4d;
}

.pageCon {
    margin-top: 20px;
}

.pageCon >>> .el-pagination {
    float: right;
    font-size: 12px;
    color: #606266 !important;
}
</style>
