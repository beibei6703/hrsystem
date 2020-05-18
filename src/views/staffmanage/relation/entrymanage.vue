<template>
  <div class="tableCon">
    <div class="titCon">
      <div class="left-top">
        <el-input class="inputs" clearable placeholder="员工姓名，花名，岗位" v-model="keyword"></el-input>
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
          <el-button @click="getMoreEntry" type="primary">批量入职</el-button>
          <el-button @click="getAbandonTab">已放弃入职</el-button>
        </div>
      </div>
      <div class="btns">
        <el-button @click="search" type="primary">查询</el-button>
        <el-button @click="exportExcel">导出</el-button>
      </div>
    </div>
    <div class="tables" v-loading="loading">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" fixed="left" label="姓名" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-checkbox-group class="checked_con" v-if="scope.row.id" v-model="checkIdList">
              <el-checkbox
                :label="scope.row.id"
                @change="getcheck(scope.row.id,scope.row)"
                style="color:#409eff"
              >{{scope.row.name}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" label="公司" prop="companyName"></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="组织层级"
          prop="departmentTree"
        ></el-table-column>
        <el-table-column align="center" label="职位" prop="positionName"></el-table-column>
        <el-table-column align="center" label="预计入职时间" prop="joinDate"></el-table-column>
        <el-table-column align="center" label="工作城市" prop="cityEname"></el-table-column>
        <el-table-column align="center" label="手机号码" prop="mobile"></el-table-column>
        <el-table-column align="center" label="花名" prop="nickName"></el-table-column>
        <el-table-column align="center" label="花名审核" prop="nickNameCheckedStatus">
        </el-table-column>
        <el-table-column align="center" label="HRBP" prop="hrbpName"></el-table-column>
        <el-table-column align="center" label="入职登记" prop="checkinStatus">
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="220px">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getConfrmEntry(scope.row)"
              size="small"
              type="text"
            >确认入职</el-button>
            <el-button
              @click.native.prevent="getAbandonEntry(scope.row)"
              size="small"
              type="text"
            >放弃入职</el-button>
             <el-button
              @click.native.prevent="getLookEdit(scope.row)"
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
    <entry-dialog
      :checkLists="checkList"
      :isEntryDialog="isEntryDialog"
      @isChangeDialog="changeDialog"
      v-if="isEntryDialog"
    ></entry-dialog>
    <abandon-dialog
      :isAbandonDialog="isAbandonDialog"
      :userId="userId"
      @isChangeDialogAb="getAbandonDialog"
      v-if="isAbandonDialog"
    ></abandon-dialog>
  </div>
</template>

<script>
import EntryDialog from '../dialogs/entrydialog';
import AbandonDialog from '../dialogs/abandondialog';
import { getEntryTable } from '@src/api/relation/index.js';
import { getHrm } from '@src/api/organization/organize.js';
import { downFile } from '@src/utils/downFile';
import { mapState } from 'vuex';
import qs from 'qs';
export default {
    name: 'entrymanage',
    components: {
        EntryDialog,
        AbandonDialog
    },
    data() {
        return {
            loading: false,
            keyword: '',
            checkIdList: [],
            checkList: [],
            isEntryDialog: false, // 确认入职
            isAbandonDialog: false, // 放弃入职
            totalCount: 0,
            pageNo: 1,
            pageSize: 10,
            userId: '',
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }
            ],
            tableData: [],
            departmentName: [], // 部门,
            defaultParams: {
                children: 'childrenDepartment',
                label: 'name',
                value: 'id',
                checkStrictly: true
            },
            treeOption: [],
            value4: ''
        };
    },
    created() {
        this.getDepart();
        this.search();
    },
    computed: {
        departIds: function() {
            var departLength = this.departmentName.length;
            return departLength ? this.departmentName[departLength - 1] : '';
        },
        ...mapState({userMenus: state => state.user.userMenus})
    },
    methods: {
        isRender(key) {
            return this.userMenus.includes(key);
        },
        // 部门下拉查询
        getDepart() {
            getHrm().then(res => {
                if (res.success && res.data) {
                    this.treeOption = this.getTreeData(res.data.childrenDepartment);
                }
            });
        },
        // 放弃入职列表
        getAbandonTab() {
            this.$store.commit('changeAbandonShow', true);
        },
        changeDialog() {
            this.isEntryDialog = false;
            this.search();
        },
        getAbandonDialog() {
            this.isAbandonDialog = false;
            this.search();
        },
        // 查看登记记录表
        getLookEdit(row) {
            this.$store.commit('changeRegistration', true);
            this.$store.commit('changeFlag', false);
            this.$store.commit('changeEntryInfo', row);
        },
        // 批量入职
        getMoreEntry() {
            if (this.tableData.length) {
                this.checkList = [];
                this.tableData.forEach((item, index) => {
                    var ids = this.checkIdList.indexOf(item.id);
                    if (ids >= 0) {
                        this.checkList.push(item);
                    } else {
                        this.checkList.splice(index, 1);
                    }
                });
                if (this.checkList.length) {
                    this.isEntryDialog = true;
                } else {
                    this.errorMsg('请先选择入职人员');
                }
            } else {
                this.errorMsg('请先选择入职人员');
            }
        },
        // 查询
        search() {
            this.loading = true;
            this.pageNo = 1;
            const parms = qs.stringify({
                keyword: this.keyword,
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            });
            getEntryTable(parms).then(this.handleTabSucc.bind(this))
                .catch(error => {
                    this.loading = false;
                    console.log(error);
                });
        },
        // 导出
        exportExcel() {
            if (this.tableData.length) {
                const parms = qs.stringify({
                    keyword: this.keyword,
                    departmentId: this.departIds
                });
                let url = '/employeeChange/toJoinExport?' + parms;
                downFile(url);
            } else {
                this.errorMsg('暂无内容导出');
            }
        },
        handleTabSucc(res) {
            if (res.success && res.data) {
                this.totalCount = res.data.total;
                this.tableData = res.data.list;
                this.loading = false;
            } else {
                this.errorMsg(res.message);
                this.loading = false;
            }
        },
        getcheck(id, list) {},
        handleSizeChange(val) {
            this.pageSize = val;
            const parms = qs.stringify({
                keyword: this.keyword,
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            });
            getEntryTable(parms).then(this.handleTabSucc.bind(this))
                .catch(error => {
                    this.loading = false;
                    console.log(error);
                });
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            const parms = qs.stringify({
                keyword: this.keyword,
                departmentId: this.departIds,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            });
            getEntryTable(parms).then(this.handleTabSucc.bind(this));
        },
        getConfrmEntry(row) {
            this.checkList = [];
            this.checkList.push(row);
            this.isEntryDialog = true;
        },
        getAbandonEntry(row) {
            this.userId = row.id;

            this.isAbandonDialog = true;
        }
    }
};
</script>
<style scoped>
.tableCon {
    padding: 0 20px;
    /*display:flex;*/
}

.left-top {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.left-top >>> .el-input {
    width: 220px !important;
    height: 30px;
    margin-right: 30px;
}

.left-top >>> .el-input__inner {
    width: 220px !important;
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

.tables >>> .cell {
    height: 40px;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    line-height: 40px !important;
    padding: 0 !important;
    position: relative;
}
.tables>>>.el-checkbox{
    position: absolute;
    left:8px !important;
    margin-right: 10px;
}
.tables>>>.el-checkbox__label{
    display: inline-block;
    text-align: center;
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
