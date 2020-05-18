<template>
  <div class="tableCon">
    <div class="titCon">
      <div class="left-top">
        <el-input placeholder="员工姓名，花名，工号，岗位" clearable v-model="keyWord"></el-input>
        <el-cascader
          :options="treeOption"
          :props="defaultParams"
          :show-all-levels="false"
          clearable
          filterable
          placeholder="请输入或选择部门"
          v-model="departmentName"
        ></el-cascader>
        <div class="enterys">
          <el-button @click="getLeaveTable">已离职员工</el-button>
        </div>
      </div>
      <div class="btns">
        <el-button @click="getSearch" type="primary">查询</el-button>
        <el-button @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="tables" v-loading="loading">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" fixed="left" label="姓名" prop="date" width="120">
          <template slot-scope="scope">
            <!-- <span style="color:#4a4c4d">{{scope.row.name }}</span> -->
            <el-button @click="getDetail(scope.row)" size="small" type="text">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="工号" prop="workCode"></el-table-column>
        <el-table-column align="center" label="花名" prop="nickname"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="center" label="公司" prop="companyName"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="组织层级"
          prop="departmentName"
        ></el-table-column>
        <el-table-column align="center" label="职位" prop="positionName"></el-table-column>
        <el-table-column align="center" label="雇佣类型" prop="typeName"></el-table-column>
        <el-table-column align="center" label="申请日期" prop="leaveApplyDate"></el-table-column>
        <el-table-column align="center" label="工作城市" prop="cityEname"></el-table-column>
        <el-table-column align="center" label="最后工作日" prop="lastWorkDate"></el-table-column>
        <!-- <el-table-column align="center" label="结薪日" prop="lastWorkDate"></el-table-column>
        <el-table-column align="center" label="离职生效日" prop="lastWorkDate"></el-table-column> -->
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="small" v-if="scope.row.leaveConfirmId===1" class="specbt" type="text">已确认</el-button>
            <el-button @click.native.prevent="getLeave(scope.row)" v-else size="small" type="text">确认离职</el-button>

          </template>
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
    <exit-dialog
      :isLeaveDialog="isLeaveDialog"
      :leaveInfo="leaveInfo"
      @isShowexitDialog="getShowexitDialog"
      v-if="isLeaveDialog"
    ></exit-dialog>
  </div>
</template>

<script>
import { toBeLeft } from '@src/api/relation/index.js';
import ExitDialog from '../dialogs/exitdialog';
import { getHrm } from '@src/api/organization/organize.js';
import { downFile } from '@src/utils/downFile';
import qs from 'qs';
export default {
    name: 'exitmanage',
    components: {
        ExitDialog
    },
    data() {
        return {
            loading: false,
            keyWord: '',
            isLeaveDialog: false,
            totalCount: 0,
            pageNo: 1,
            pageSize: 10,
            leaveInfo: {},
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
        this.getDepart();
        this.getSearch();
    },
    computed: {
        departIds: function() {
            var departLength = this.departmentName.length;
            return departLength ? this.departmentName[departLength - 1] : '';
        }
    },
    methods: {
        getDetail(row) {
            this.$router.push({ path: `/personinfo/${row.employeeId}` });
        },
        // 部门下拉查询
        getDepart() {
            getHrm().then(res => {
                if (res.success && res.data) {
                    this.treeOption = this.getTreeData(res.data.childrenDepartment);
                }
            });
        },
        getSearch() {
            this.loading = true;
            this.tableData = [];
            this.totalCount = 0;
            this.pageNo = 1;
            const parms = {
                keyWord: this.keyWord,
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            toBeLeft(parms).then(this.handleLeftTable.bind(this));
        },
        handleLeftTable(res) {
            if (res.success) {
                this.loading = false;
                if (res.data) {
                    this.totalCount = res.data.total;
                    this.tableData = res.data.list;
                }
            } else {
                this.errorMsg(res.message);
                this.loading = false;
            }
        },
        getLeaveTable() {
            this.$store.commit('changeHadleave', true);
        },
        getLeave(row) {
            this.leaveInfo = row;
            if (this.leaveInfo) {
                this.isLeaveDialog = true;
            }
        },
        getShowexitDialog() {
            this.isLeaveDialog = false;
            this.getSearch();
        },
        handleSizeChange(val) {
            this.pageSize = val;
            const parms = {
                keyWord: this.keyWord,
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            toBeLeft(parms).then(this.handleLeftTable.bind(this));
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            const parms = {
                keyWord: this.keyWord,
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            toBeLeft(parms).then(this.handleLeftTable.bind(this));
        },
        // 待离职导出
        exportExcel() {
            const parms = qs.stringify({
                keyWord: this.keyWord,
                departmentId: this.departIds
            });
            let url = '/leave/toLeaveExport?' + parms;
            downFile(url);
        }
    }
};
</script>
<style scoped>
.tableCon {
    padding: 0 20px;
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
    margin-left: 20px;
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
.tables>>>.specbt{
    cursor:text !important ;
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
