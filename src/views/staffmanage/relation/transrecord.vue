<template>
  <div class="tableCon">
    <div class="titCon">
      <div class="backBtn">
        <el-button @click="goBack" type="primary">返回</el-button>
      </div>
      <div class="left-top">
        <span class="titSpan">异动日期</span>
        <el-date-picker
          class="datas"
          end-placeholder="结束日期"
          range-separator="至"
          start-placeholder="开始日期"
          type="daterange"
          v-model="transDate"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <el-input class="inputs" clearable placeholder="员工姓名，花名，工号，岗位" v-model="keyWord"></el-input>
        <el-cascader
          :options="treeOption"
          :props="defaultParams"
          :show-all-levels="false"
          class="inputs"
          clearable
          filterable
          placeholder="请输入或选择部门"
          v-model="departmentName"
        ></el-cascader>
        <!-- 模板管理下期做 -->
        <!-- <div class="enterys">
          <span class="settings">
            <i class="el-icon-edit"></i>
            <span>表头模板</span>
          </span>
        </div>-->
      </div>
      <div class="btns">
        <el-button @click="getSearch" type="primary">查询</el-button>
        <el-button @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="tables" v-loading="loading">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" label="姓名" prop="name" width="120">
          <template slot-scope="scope">
            <!-- <span>{{scope.row.name }}</span> -->
            <el-button @click="getDetail(scope.row)" size="small" type="text">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="工号" prop="workCode"></el-table-column>
        <el-table-column align="center" label="花名" prop="nickName"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="center" label="公司" prop="companyName"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="组织层级"
          prop="departmentName"
        ></el-table-column>
        <el-table-column align="center" label="职位" prop="positionName"></el-table-column>
        <el-table-column align="center" label="雇佣类型" prop="typeName"></el-table-column>
        <el-table-column align="center" label="申请日期" prop="gmtCreated"></el-table-column>
        <el-table-column align="center" label="工作城市" prop="cityEname"></el-table-column>
        <el-table-column align="center" label="异动类型" prop="personnelChangesTypeEname"></el-table-column>
        <el-table-column align="center" label="生效日期" prop="activeDate"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="异动原因"
          prop="changeContent"
        ></el-table-column>
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
  </div>
</template>

<script>
import { transList } from '@src/api/relation/index.js';
import { getHrm } from '@src/api/organization/organize.js';
import { downFile } from '@src/utils/downFile';

import qs from 'qs';
export default {
    name: 'TransRecord',
    data() {
        return {
            loading: false,
            keyWord: '',
            totalCount: 0,
            pageNo: 1,
            pageSize: 10,
            tableData: [],
            transDate: null, // 异动日期
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
        if (location.href.indexOf('translatemanage') === -1) {
            this.$store.commit('changeTransRecoed', false);
        }
    },
    mounted() {
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
        // 查询
        getSearch() {
            this.loading = true;
            this.pageNo = 1;
            this.totalCount = 0;
            this.tableData = [];
            const parms = {
                keyWord: this.keyWord,
                startTime: this.transDate !== null ? this.transDate[0] : ' ',
                endTime: this.transDate !== null ? this.transDate[1] : ' ',
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            transList(parms).then(this.handleTabSucc.bind(this));
        },
        // 导出
        exportExcel() {
            var parms;
            if (this.transDate !== null) {
                parms = qs.stringify({
                    keyWord: this.keyWord,
                    startTime: this.transDate[0],
                    endTime: this.transDate[1],
                    departmentId: this.departIds
                });
            } else {
                parms = qs.stringify({
                    keyWord: this.keyWord,
                    departmentId: this.departIds
                });
            }

            let url = '/employeeChange/changedExport?' + parms;
            downFile(url);
        },
        handleTabSucc(res) {
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
        goBack() {
            this.$store.commit('changeTransRecoed', false);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            const parms = {
                keyWord: this.keyWord,
                startTime: this.transDate !== null ? this.transDate[0] : ' ',
                endTime: this.transDate !== null ? this.transDate[1] : ' ',
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            transList(parms).then(this.handleTabSucc.bind(this));
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            const parms = {
                keyWord: this.keyWord,
                startTime: this.transDate !== null ? this.transDate[0] : ' ',
                endTime: this.transDate !== null ? this.transDate[1] : ' ',
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            transList(parms).then(this.handleTabSucc.bind(this));
        }
    }
};
</script>
<style scoped>
.tableCon {
    padding: 0 20px;
}
.backBtn {
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
}
.backBtn >>> .el-button {
    padding: 6px 15px;
    margin-left: 30px;
}
.top-tit {
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eeeeee;
}
.titSpan {
    margin-right: 15px;
}
.left-top {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.inputs {
    width: 230px !important;
    margin-left: 20px;
}
.inputs >>> .el-input {
    width: 230px !important;
    height: 30px;
    /* margin-right: 30px; */
}

.inputs >>> .el-input__inner {
    width: 230px !important;
    height: 30px !important;
}
.inputs >>> .el-input__icon {
    display: inline-block;
    height: 30px !important;
    line-height: 30px;
}
.datas {
    width: 350px;
    height: 30px;
    line-height: 30px;
    /* margin-right: 30px; */
}
.datas >>> .el-input {
    width: 300px;
    height: 30px !important;
}
.datas >>> .el-input__inner {
    width: 300px !important;
    height: 30px !important;
}
.datas >>> .el-range-separator {
    display: inline-block;
    width: 20px;
    height: 30px;
    line-height: 30px;
}
.datas >>> .el-input__icon {
    display: inline-block;
    height: 30px !important;
    line-height: 30px;
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
