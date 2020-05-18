<template>
  <div class="tableCon">
    <div>
      <div class="backBtn">
        <el-button @click="goBack" type="primary">返回</el-button>
      </div>
      <div class="left-top">
        <el-cascader
          :options="treeOption"
          :props="defaultParams"
          :show-all-levels="false"
          clearable
          filterable
          placeholder="请输入或选择部门"
          v-model="departmentName"
        ></el-cascader>
        <el-select clearable placeholder="请选择放弃入职原因" v-model="abandonTypes">
          <el-option
            :key="item.eid"
            :label="item.ename"
            :value="item.eid"
            v-for="item in enumeration.abandonType"
          ></el-option>
        </el-select>
        <div class="enterys">
          <el-button @click="search" type="primary">查询</el-button>
          <el-button @click="exportExcel">导出</el-button>
        </div>
      </div>
      <div class="tables">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" label="姓名"  prop="name"></el-table-column>
          <el-table-column align="center" :show-overflow-tooltip="true"  label="部门" prop="departmentTree"></el-table-column>
          <el-table-column align="center" :show-overflow-tooltip="true"  label="职位" prop="positionName"></el-table-column>
          <el-table-column align="center" :show-overflow-tooltip="true"  label="手机号" prop="mobile"></el-table-column>
          <el-table-column align="center" label="预计入职时间" prop="joinDate"></el-table-column>
          <el-table-column align="center" label="登记表状态">放弃入职</el-table-column>
          <el-table-column align="center" :show-overflow-tooltip="true" label="放弃入职原因" prop="abandonReason"></el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="180px">
            <template slot-scope="scope">
                 <el-button
                    @click.native.prevent="getMove(scope.row)"
                    size="small"
                    type="text"
                    >移动至待入职</el-button>
              <el-button
                @click.native.prevent="getCheckDetail(scope.row)"
                size="small"
                type="text"
              >查看登记表</el-button>
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
    <!-- <Registration
      :registInfo="registInfo"
      @IsShowentryTab="getIsShowentryTab"
      v-if="isRegistration"
    ></Registration> -->
  </div>
</template>

<script>
import { getHrm } from '@src/api/organization/organize.js';
import { abandonEntryTable, MoveEntry } from '@src/api/relation/index.js';
import { downFile } from '@src/utils/downFile';
import qs from 'qs';
import { mapGetters } from 'vuex';
export default {
    name: 'abandonentry',
    data() {
        return {
            totalCount: 0,
            pageNo: 1,
            pageSize: 10,
            userId: '',
            tableData: [],
            departmentName: [], // 部门,
            defaultParams: {
                children: 'childrenDepartment',
                label: 'name',
                value: 'id',
                checkStrictly: true
            },
            treeOption: [],
            abandonTypes: '',
            registInfo: {}
        };
    },
    computed: {
        // 证件类型
        ...mapGetters(['enumeration']),
        // isRegistration() {
        //     return this.$store.state.relation.isRegistration;
        // },
        departIds: function() {
            var departLength = this.departmentName.length;
            return departLength ? this.departmentName[departLength - 1] : '';
        }
    },
    created() {
        // console.log(this.userId);
        this.$store.dispatch('enumeration/getEnumDict', 'abandon_type');
        this.getDepart();
    },

    mounted() {
        this.search();
    },

    methods: {
        // 部门下拉查询
        getDepart() {
            getHrm().then(res => {
                if (res.success && res.data) {
                    this.treeOption = this.getTreeData(res.data.childrenDepartment);
                }
            });
        },
        search() {
            this.pageNo = 1;
            const parms = qs.stringify({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                abandonType: this.abandonTypes,
                departmentId: this.departIds
            });
            abandonEntryTable(parms).then(this.handleTabSucc.bind(this));
        },
        exportExcel() {
            if (this.tableData.length) {
                const parms = qs.stringify({
                    abandonType: this.abandonTypes,
                    departmentId: this.departIds
                });
                let url = '/employeeChange/toAbandonExport?' + parms;
                downFile(url);
            } else {
                this.errorMsg('暂无数据导出');
            }
        },
        handleTabSucc(res) {
            if (res.success && res.data) {
                this.totalCount = res.data.total;
                this.tableData = res.data.list || [];
            } else {
                this.errorMsg(res.message);
            }
        },

        handleSizeChange(val) {
            this.pageSize = val;
            const parms = qs.stringify({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                abandonType: this.abandonTypes,
                departmentId: this.departIds
            });
            abandonEntryTable(parms).then(this.handleTabSucc.bind(this));
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            const parms = qs.stringify({
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                abandonType: this.abandonTypes,
                departmentId: this.departIds
            });
            abandonEntryTable(parms).then(this.handleTabSucc.bind(this));
        },
        // 移动至待入职
        getMove(row) {
            const parms = qs.stringify({
                id: row.id
            });
            MoveEntry(parms).then(res => {
                if (res.success) {
                    this.successMsg(res.message);
                    this.search();
                } else {
                    this.errorMsg(res.message);
                }
            });
        },
        getCheckDetail(row) {
            // 放弃入职页面不展示登记表展示
            this.$store.commit('changeAbandonShow', false);
            this.$store.commit('changeRegistration', true);
            // 在放弃入职页面进入登记表是isflag为true，从待入职进入则是false
            this.$store.commit('changeFlag', true);
            this.$store.commit('changeEntryInfo', row);
            // this.registInfo = row;
            // this.isRegistration = true;
        },
        // 返回待入职页面
        goBack() {
            this.$store.commit('changeAbandonShow', false);
        }
    }
};
</script>
<style scoped>
.top-tit {
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #eeeeee;
}
.tableCon {
    padding: 0 20px 20px 0;
    /*display:flex;*/
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

.left-top {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.left-top >>> .el-input {
    width: 200px !important;
    height: 30px;
    margin-right: 30px;
}

.left-top >>> .el-input__inner {
    width: 200px !important;
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

.enterys >>> .el-button {
    padding: 6px 15px;
    margin-right: 10px;
}
.tables {
    margin-top: 30px;
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
.tables >>> .el-table::before {
    /* display: none; */
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
