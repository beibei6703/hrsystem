<template>
  <div class="tableCon">
    <div class="titCon">
      <div class="left-top">
        <el-input class="inputs" clearable  placeholder="员工姓名，花名，工号，岗位" v-model="keyWord"></el-input>
        <el-select clearable placeholder="请选择" v-model="changeFlowStatusEid">
          <el-option
            :key="item.eid"
            :label="item.ename"
            :value="item.eid"
            v-for="item in changeOption"
          ></el-option>
        </el-select>

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
        
          <el-button @click="getRecord">异动记录</el-button>
          <!-- <el-button type="primary">导入异动表</el-button> -->
        </div>
      </div>
      <div class="btns">
        <el-button @click="getSearch" type="primary">查询</el-button>
        <el-button @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="tables" v-loading ="loading">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" fixed="left" label="姓名" prop="name" width="120">
          <template slot-scope="scope">
            <el-button @click="getDetail(scope.row)" size="small" type="text">{{ scope.row.name }}</el-button>
            <!-- <el-button @click="getDetail(scope.row)" size="small" type="text">{{ scope.row.name }}</el-button> -->
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="left" label="工号" prop="workCode"></el-table-column>
        <el-table-column align="center" label="花名" prop="nickName"></el-table-column>
        <el-table-column align="center" label="公司" prop="companyName"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="组织层级"
          prop="departmentName"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="职位"
          prop="positionName"
        ></el-table-column>
        <el-table-column align="center" label="雇佣类型" prop="typeName"></el-table-column>
        <el-table-column align="center" label="申请日期" prop="gmtCreated"></el-table-column>
        <el-table-column align="center" label="工作城市" prop="cityEname"></el-table-column>
        <el-table-column align="center" label="异动类型" prop="personnelChangesTypeEname"></el-table-column>
        <el-table-column align="center" label="生效日期" prop="activeDate"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="异动信息"
          prop="changeContent"
        ></el-table-column>
        <el-table-column align="center" label="异动状态" prop="changeStatusEname"></el-table-column>
        <!-- <el-table-column align="center" fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="deleteRow(scope.$index)"
                            size="small"
                            type="text"
                        >待审批</el-button>
                    </template>
        </el-table-column>-->
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
import { willTrans, changeStatus } from '@src/api/relation/index.js';
import { getHrm } from '@src/api/organization/organize.js';
import { downFile } from '@src/utils/downFile';

import qs from 'qs';
export default {
    name: 'entrymanage',
    data() {
        return {
            loading: false,
            keyWord: '',
            totalCount: 0,
            pageNo: 1,
            pageSize: 10,
            changeOption: [],
            tableData: [],
            departmentName: [], // 部门,
            defaultParams: {
                children: 'childrenDepartment',
                label: 'name',
                value: 'id',
                checkStrictly: true
            },
            treeOption: [],
            changeFlowStatusEid: '' // 流程状态
        };
    },
    created() {
        this.getDepart();
        this.getSearch();
        this.getStatus();
    },
    computed: {
        departIds: function() {
            var departLength = this.departmentName.length;
            return departLength ? this.departmentName[departLength - 1] : '';
        }
    },

    methods: {
        // 异动状态
        getStatus() {
            const parms = qs.stringify({
                code: 'change_status'
            });
            changeStatus(parms).then(res => {
                if (res.success && res.data) {
                    this.changeOption = res.data;
                }
            });
        },
        // 部门下拉查询
        getDepart() {
            getHrm().then(res => {
                if (res.success && res.data) {
                    this.treeOption = this.getTreeData(res.data.childrenDepartment);
                }
            });
        },
        getDetail(row) {
            this.$router.push({ path: `/personinfo/${row.employeeId}` });
        },
        // 查询
        getSearch() {
            this.loading = true;
            this.tableData = [];
            this.totalCount = 0;
            this.pageNo = 1;
            const parms = {
                keyWord: this.keyWord,
                changeFlowStatusEid: this.changeFlowStatusEid,
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            willTrans(parms).then(this.handleTable.bind(this));
        },
        handleTable(res) {
            if (res.success) {
                if (res.data) {
                    this.totalCount = res.data.total || 0;
                    this.tableData = res.data.list || [];
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.totalCount = 0;
                    this.tableData = [];
                }
            } else {
                this.errorMsg(res.message);
                this.loading = false;
            }
        },
        // 导出
        exportExcel() {
            if (this.tableData.length) {
                const parms = qs.stringify({
                    keyWord: this.keyWord,
                    changeFlowStatusEid: this.changeFlowStatusEid,
                    departmentId: this.departIds
                });
                let url = '/employeeChange/toChangeExport?' + parms;
                downFile(url);
            } else {
                this.errorMsg('暂无数据导出');
            }
        },
        // 异动记录
        getRecord() {
            this.$store.commit('changeTransRecoed', true);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            const parms = {
                keyWord: this.keyWord,
                changeFlowStatusEid: this.changeFlowStatusEid,
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            willTrans(parms).then(this.handleTable.bind(this));
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            const parms = {
                keyWord: this.keyWord,
                changeFlowStatusEid: this.changeFlowStatusEid,
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            willTrans(parms).then(this.handleTable.bind(this));
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
