<template>
  <div class="tableCon">
    <div class="titCon">
      <div class="backBtn">
        <el-button @click="goBack" type="primary">返回</el-button>
      </div>
      <div class="left-top">
        <span class="titSpan">离职结薪日期</span>
        <el-date-picker
          class="datas"
          end-placeholder="结束日期"
          range-separator="至"
          start-placeholder="开始日期"
          type="daterange"
          v-model="leaveDate"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-input clearable class="inputs" placeholder="员工姓名，花名，工号，岗位" v-model="keyWord"></el-input>
      </div>
      <div class="btns">
        <el-button @click="search" type="primary">查询</el-button>
        <el-button @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="tables" v-loading="loading">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" label="姓名" prop="name" width="120">
          <template slot-scope="scope">
            <el-button @click="getDetail(scope.row)" size="small" type="text">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="工号" prop="workCode"></el-table-column>
        <el-table-column align="center" label="花名" prop="nickname"></el-table-column>
        <el-table-column align="center" label="公司" prop="companyName"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="组织层级"
          prop="departmentName"
        ></el-table-column>
        <el-table-column align="center" label="职位" prop="positionName"></el-table-column>
        <el-table-column align="center" label="雇佣类型" prop="typeName"></el-table-column>
        <el-table-column align="center" label="工作城市" prop="cityEname"></el-table-column>
        <el-table-column align="center" label="最后工作日" prop="lastWorkDate"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="getHire(scope.row)" size="small" type="text">重新雇佣</el-button>
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
  </div>
</template>

<script>
import { hadLeaveTable } from '@src/api/relation/index.js';
import { downFile } from '@src/utils/downFile';
import qs from 'qs';
export default {
    name: 'HadLeave',
    data() {
        return {
            loading: false,
            keyWord: '',
            totalCount: 0,
            pageNo: 1,
            pageSize: 10,
            tableData: [],
            leaveDate: null
        };
    },
    created() {
        if (location.href.indexOf('exitmanage') === -1) {
            this.$store.commit('changeHadleave', false);
        }
    },
    mounted() {
        this.search();
    },
    methods: {
        getDetail(row) {
            this.$router.push({ path: `/personinfo/${row.employeeId}` });
        },
        // 查询
        search() {
            this.loading = true;
            this.totalCount = 0;
            this.tableData = [];
            this.pageNo = 1;
            const parms = {
                keyWord: this.keyWord,
                startTime: this.leaveDate !== null ? this.leaveDate[0] : ' ',
                endTime: this.leaveDate !== null ? this.leaveDate[1] : ' ',
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            hadLeaveTable(parms).then(this.handleTabSucc.bind(this));
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
        // 重新雇佣
        getHire(row) {
            this.$router.push({ path: `/personinfo/${row.employeeId}`, query: { reEmploy: true } });
            this.$store.commit('changeHadleave', false);
        },
        goBack() {
            this.$store.commit('changeHadleave', false);
        },
        getShowexitDialog() {},
        handleSizeChange(val) {
            this.pageSize = val;
            const parms = {
                keyWord: this.keyWord,
                startTime: this.leaveDate !== null ? this.leaveDate[0] : ' ',
                endTime: this.leaveDate !== null ? this.leaveDate[1] : ' ',
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            hadLeaveTable(parms).then(this.handleTabSucc.bind(this));
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            const parms = {
                keyWord: this.keyWord,
                startTime: this.leaveDate !== null ? this.leaveDate[0] : ' ',
                endTime: this.leaveDate !== null ? this.leaveDate[1] : ' ',
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            hadLeaveTable(parms).then(this.handleTabSucc.bind(this));
        },
        exportExcel() {
            var parms;
            if (this.leaveDate !== null) {
                parms = qs.stringify({
                    keyWord: this.keyWord,
                    startTime: this.leaveDate[0],
                    endTime: this.leaveDate[1]
                });
            } else {
                parms = qs.stringify({
                    keyWord: this.keyWord
                });
            }
            let url = '/leave/leftExport?' + parms;
            downFile(url);
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
}
.inputs >>> .el-input {
    width: 230px !important;
    height: 30px;
    margin-right: 30px;
}

.inputs >>> .el-input__inner {
    width: 230px !important;
    height: 30px !important;
}
.datas {
    width: 350px;
    height: 30px;
    line-height: 30px;
    margin-right: 30px;
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
