<template>
  <div>
    <!-- <div class="titles">
      <span>员工管理</span>
      <span class="margins">/</span>
      <span>员工花名册</span>
      <span class="margins">/</span>
      <span>导入员工</span>
      <span class="margins">/</span>
      <span>导入记录</span>
    </div> -->
    <div class="btns">
      <el-button @click="goBack" class="buttons" type="primary">返回</el-button>
    </div>
    <div class="tableContent">
      <div class="topCOn">
        <div class="SearchTop searchDate">
          <span class="seTit">操作日期</span>
          <el-date-picker
            end-placeholder="结束日期"
            range-separator="至"
            start-placeholder="开始日期"
            type="daterange"
            v-model="operateDate"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
        <div class="SearchTop opretor">
          <span class="seTit">操作人</span>
          <el-input placeholder="姓名，花名，工号" clearable v-model="keyWord"></el-input>
        </div>
        <div class="searchBtn">
          <el-button @click="getSearch" type="primary">查询</el-button>
        </div>
      </div>
      <div class="tables">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column :index="typeIndex" align="center" label="序号" type="index"></el-table-column>
          <el-table-column align="center" label="类型" >
              <template slot-scope ="scope">
                  <span v-if="scope.row.operatorTypeId===1">员工花名册</span>
                  <span v-if="scope.row.operatorTypeId===2">人才盘点</span>
                  <span v-if="scope.row.operatorTypeId===3">合同信息</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="成功数据" prop="successCount"></el-table-column>
          <el-table-column align="center" label="操作时间" prop="gmtCreated"></el-table-column>
          <el-table-column align="center" label="操作人" prop="operatorName"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="lookDetail(scope.row)" size="small" type="text">查看</el-button>
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
    <roster-succ
      :isRosterSucc="isRosterSucc"
      :rosterList="rosterList"
      @changeShowRoster="showRoster"
      v-if="isRosterSucc"
    ></roster-succ>
    <contract-succ
      :isContractSucc="isContractSucc"
      :rosterList="rosterList"
      @changeShowContract="showContract"
      v-if="isContractSucc"
    ></contract-succ>
    <people-succ
      :isPeopleSucc="isPeopleSucc"
      :rosterList="rosterList"
      @changeShowPeople="showPeople"
      v-if="isPeopleSucc"
    ></people-succ>
  </div>
</template>

<script>
import { importRecords } from '@src/api/roster/index.js';
import RosterSucc from './dialogs/rostersucc';
import ContractSucc from './dialogs/contractsucc';
import PeopleSucc from './dialogs/peoplesucc';
export default {
    name: 'importrecord',
    components: {
        RosterSucc,
        PeopleSucc,
        ContractSucc
    },
    data() {
        return {
            operateDate: '', // 操作日期
            keyWord: '', // 操作人
            totalCount: 0,
            pageNo: 1,
            pageSize: 10,
            dialogTableVisible: false,
            tableData: [],
            isRosterSucc: false,
            isContractSucc: false,
            isPeopleSucc: false,
            rosterList: []
        };
    },
    computed: {
        getrecordStatus() {
            return this.$store.state.relation.recordStatus;
        }
    },
    mounted() {
        this.getSearch();
        // console.log(typeof(this.getrecordStatus),this.getrecordStatus)
    },

    methods: {
        // 序号
        typeIndex(index) {
            return (index = index + (this.pageNo - 1) * this.pageSize + 1);
        },
        showRoster() {
            this.isRosterSucc = false;
        },
        showContract() {
            this.isContractSucc = false;
        },
        showPeople() {
            this.isPeopleSucc = false;
        },

        lookDetail(row) {
            this.rosterList = JSON.parse(row.successJson);
            if (this.rosterList && row.operatorTypeId) {
                switch (row.operatorTypeId) {
                case 1:
                    this.isRosterSucc = true;
                    break;
                case 2:
                    this.isPeopleSucc = true;
                    break;
                case 3:
                    this.isContractSucc = true;
                    break;
                }
            }
        },
        handleSizeChange(val) {
            this.pageSize = val;
            const parms = {
                startDate: this.operateDate ? this.operateDate[0] : ' ',
                endDate: this.operateDate ? this.operateDate[1] : ' ',
                keyword: this.keyWord,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            importRecords(parms).then(this.handleTable.bind(this));
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            const parms = {
                startDate: this.operateDate ? this.operateDate[0] : ' ',
                endDate: this.operateDate ? this.operateDate[1] : ' ',
                keyword: this.keyWord,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            importRecords(parms).then(this.handleTable.bind(this));
        },
        goBack() {
            this.$store.commit('changeImportRecord', false);
            if (this.getrecordStatus === 1) {
                this.$store.commit('changeImportRecord', false);
                this.$store.commit('changeImportResult', false);
            } else {
                this.$store.commit('changeImportRecord', false);
                this.$store.commit('changeImportResult', true);
            }
            // this.$emit('changeGetrecord');
        },
        // 查询
        getSearch() {
            this.pageNo = 1;
            const parms = {
                startDate: this.operateDate ? this.operateDate[0] : ' ',
                endDate: this.operateDate ? this.operateDate[1] : ' ',
                keyword: this.keyWord,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            importRecords(parms).then(this.handleTable.bind(this));
        },
        handleTable(res) {
            if (res.success && res.data) {
                this.tableData = res.data.list;
                this.totalCount = res.data.total;
            } else {
                this.errorMsg(res.message);
            }
        }
    }
};
</script>

<style scoped>
@import '../../assets/style/staffinfo.css';
.tableContent {
    padding-bottom: 30px;
}

.SearchTop {
    width: 410px;
    display: flex;
    height: 30px;
    align-items: center;
}
.searchDate >>> .el-date-editor {
    width: 300px;
    height: 30px;
}
.searchDate >>> .el-input__inner {
    width: 300px;
    height: 30px;
}
.searchDate >>> .el-range-separator {
    padding: 0;
}
.opretor >>> .el-input {
    width: 220px;
    height: 30px;
}

.opretor >>> .el-input__inner {
    width: 220px;
    height: 30px;
}
.opretor>>>.el-input__icon{
    line-height: 30px;
}

.topCOn {
    padding: 20px 0;
    display: flex;
    align-items: center;
}

.seTit {
    display: block;
    width: 120px;
    text-align: right;
    margin-right: 15px;
}

.SearchTop >>> .el-range__icon {
    line-height: 25px !important;
}
.SearchTop >>> .el-range-separator {
    line-height: 25px !important;
}
.SearchTop >>> .el-range__close-icon {
    line-height: 25px !important;
}

.searchBtn >>> .el-button {
    padding: 6px 15px;
}

.pageCon {
    width: 100%;
    margin-top: 20px;
}

.pageCon >>> .el-pagination {
    float: right;
    font-size: 12px;
    color: #606266 !important;
}

.tables {
    padding: 0 25px;
    padding-bottom: 50px;
    margin-top: 20px;
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

.tables >>> .cell {
    height: 40px;
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 40px;
}
</style>
