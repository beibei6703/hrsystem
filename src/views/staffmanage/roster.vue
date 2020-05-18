<template>
  <el-container class="container">
    <el-main v-if="!isAddworker && !isImportInfo">
      <div class="dataCon">
        <div class="leftCon">
          <span class="specFont">云集</span>
          <div class="items">
            <span class="nums">{{baseInfo.inServiceCount}}</span>
            <span>在职</span>
          </div>
          <div class="items">
            <span class="nums">{{baseInfo.toJoinCount}}</span>
            <span>待入职</span>
          </div>
          <div class="items">
            <span class="nums">{{baseInfo.trialPeriodCount}}</span>
            <span>试用期</span>
          </div>
        </div>
        <div class="rightCon">
          <div class="items">
            <span class="nums">{{baseInfo.fullTimeCount}}</span>
            <span>正式</span>
          </div>
          <div class="items">
            <span class="nums">{{baseInfo.internCount}}</span>
            <span>实习</span>
          </div>
          <div class="items">
            <span class="nums">{{baseInfo.managementTraineeCount}}</span>
            <span>管培生</span>
          </div>
          <div class="items">
            <span class="nums">{{baseInfo.personnelOutCount}}</span>
            <span>人事外包</span>
          </div>
          <div class="items">
            <span class="nums">{{baseInfo.laborOutCount}}</span>
            <span>劳务外包</span>
          </div>
          <div class="items">
            <span class="nums">{{baseInfo.businessOutCount}}</span>
            <span>业务外包</span>
          </div>
        </div>
      </div>
      <div class="tableCOn">
        <div class="titContain">
          <div class="leftInput">
            <el-input class="inputs" clearable placeholder="员工姓名，花名，工号，职位" v-model="keyword"></el-input>
            <el-select class="selects" placeholder="请选择" v-model="workStatus">
              <el-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in options"
              ></el-option>
            </el-select>
            <el-cascader
              :options="treeOption"
              :props="defaultParams"
              :show-all-levels="false"
              class="selects"
              clearable
              filterable
              placeholder="请输入或选择部门"
              v-model="departmentName"
            ></el-cascader>
            <div class="topBtns">
              <el-button @click="getAddWorker"  type="primary" v-if="isRender('addWorker')">添加员工</el-button>
              <el-button @click="getImportRoster" type="primary" v-if="isRender('importRoster')">导入花名册</el-button>
              <span @click="getDialog" class="settings">
                <i class="el-icon-s-tools"></i>
                <span>表头模板</span>
              </span>
            </div>
          </div>
          <div class="btnsCon">
            <el-button @click="search" type="primary">查询</el-button>
            <el-button @click="exportExcel">导出</el-button>
            <el-button @click="exportTotalefull">导出至talefull</el-button>
          </div>
        </div>
        <div class="tables">
          <el-table :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column
              :fixed="col.type==='model'"
              :key="index"
              :label="col.label"
              :prop="col.prop"
              :show-overflow-tooltip="(col.prop==='departmentTree' || col.prop ==='contractCompanyName' || col.prop==='certNo')?true:false "
              :width="(col.prop==='nickname' || col.prop==='workCode') ?'80px':''"
              align="center"
              v-for="(col, index) in cols_title"
            >
              <template slot-scope="scope">
                <el-button
                  @click="getDetail(scope.row)"
                  size="small"
                  type="text"
                  v-if="col.prop==='name'"
                >{{scope.row[col.prop]}}</el-button>

                 <span v-if="col.prop!=='name' && col.prop!=='sex' && col.prop !=='married' && col.prop !=='hadRecord' && col.prop !=='rehireId' && col.prop !=='isLatePositive'"
                >{{scope.row[col.prop]}}</span>
                <span v-if="col.prop==='sex' && scope.row.sex===0">未知</span>
                <span v-if="col.prop==='sex' && scope.row.sex===1">男</span>
                <span v-if="col.prop==='sex' && scope.row.sex===2">女</span>
                <span v-if="col.prop==='married' && scope.row.married===0">未婚</span>
                <span v-if="col.prop==='married' && scope.row.married===1">已婚</span>
                <span v-if="col.prop==='hadRecord' && scope.row.hadRecord===0">否</span>
                <span v-if="col.prop==='hadRecord' && scope.row.hadRecord===1">是</span>
                <span v-if="col.prop==='rehireId' && scope.row.rehireId===0">否</span>
                <span v-if="col.prop==='rehireId' && scope.row.rehireId===1">是</span>
                <span v-if="col.prop==='isLatePositive' && scope.row.isLatePositive===0">否</span>
                <span v-if="col.prop==='isLatePositive' && scope.row.isLatePositive===1">是</span>
                 <span v-if="col.prop==='isCompleteTrain' && scope.row.isCompleteTrain===0">否</span>
                <span v-if="col.prop==='isCompleteTrain' && scope.row.isCompleteTrain===1">是</span>
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
    </el-main>
    <!-- 移动弹框 -->
    <trans-dialog
      :isTransDialog="isTransDialog"
      :transInfo="transInfo"
      @changeTransDialog="getTransDialog"
      v-if="isTransDialog"
    ></trans-dialog>
    <!-- 模板管理 -->
    <Template
      :isTemplateDialog="isTemplateDialog"
      @getTemplateInfo="getTempaltes"
      v-if="isTemplateDialog"
    ></Template>
    <!-- 添加员工 -->
    <Addworker @onChangeAddworker="getshowAddworker" v-if="isAddworker"></Addworker>
    <Importinfo @onChangeImport="getImport" v-if="isImportInfo"></Importinfo>
  </el-container>
</template>
<script>
import Addworker from './addworker'; // 添加员工
import Importinfo from './importinfo'; // 导入花名册
import Template from './dialogs/template'; // 模板管理
import TransDialog from './dialogs/transdialog'; // 异动
import { downFile } from '@src/utils/downFile';
import qs from 'qs';
import { mapState } from 'vuex';
import { getHrm } from '@src/api/organization/organize.js';
import { getRoster, rosterBaseInfo, tempalteList, ExportRost } from '@src/api/roster/index.js';
export default {
    name: 'roster',
    components: {
        Addworker,
        Importinfo,
        Template,
        TransDialog
    },
    data() {
        return {
            loading: false,
            cols_title: [
                { label: '工号', prop: 'workCode', type: 'model' },
                { label: '姓名', prop: 'name', type: 'model' },
                { label: '花名', prop: 'nickname', type: 'normal' },
                { label: '合同签署公司', prop: 'contractCompanyName', type: 'normal' },
                { label: '组织层级', prop: 'departmentTree', type: 'normal' },
                { label: '岗位', prop: 'positionName', type: 'normal' },
                { label: '入职日期', prop: 'joinDate', type: 'normal' },
                { label: '工作城市', prop: 'cityEname', type: 'normal' },
                { label: '职位类别', prop: 'positionTypeName', type: 'normal' }
            ],
            isTemplateDialog: false,
            baseInfo: {},
            keyword: '',
            isAddworker: false, // 添加员工页面
            isImportInfo: false, // 导入花名册
            isTransDialog: false, // 异动
            transInfo: {},
            totalCount: 0,
            pageNo: 1,
            pageSize: 10,
            workStatus: '2',
            options: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '试用'
                },
                {
                    value: '3',
                    label: '试用延期'
                },
                {
                    value: '2',
                    label: '正式'
                },
                 {
                    value: '4',
                    label: '临时'
                },
                {
                    value: '99',
                    label: '已离职'
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
            value4: '',
            templateId: '' // 模板Id
        };
    },
    computed: {
        departIds: function() {
            var departLength = this.departmentName.length;
            return departLength ? this.departmentName[departLength - 1] : '';
        },
        ...mapState({userMenus: state => state.user.userMenus})
    },
    created() {
        // 判断是否有默认模板，如果有测更新默认数据展示
        this.getTemplateList();
        // 头部基础数据
        this.getBaseInfo();
        this.getDepart();
    
    },
    methods: {
        isRender(key) {
            return this.userMenus.includes(key);
        },
        // 导出到talefull
        exportTotalefull() {
            const parms = qs.stringify({
                keyword: this.keyword,
                departmentId: this.departIds,
                employeeStatusEid: this.workStatus,
                templateId: this.templateId,
                workCode: this.$docCookies.getItem('username'),
                contractCompanyId: 1
            });
            let url = '/employeeRoster/exportTalefull?' + parms;
            downFile(url);
        },
        // 部门下拉查询
        getDepart() {
            getHrm().then(res => {
                if (res.success && res.data) {
                    this.treeOption = this.getTreeData(res.data.childrenDepartment);
                }
            });
        },
        // 模板列表
        getTemplateList() {
            const parms = {
                workCode: this.$docCookies.getItem('username'),
                etcTypeEid: 1 // 模板类型
            };
            tempalteList(parms).then(res => {
                if (res.success) {
                    if (res.data.length > 0) {
                        for (var i = 0; i < res.data.length; i++) {
                            // 判断是否有默认模板
                            if (res.data[i].isDefault) {
                                // 有默认模板
                                this.templateId = res.data[i].id;
                                this.cols_title = JSON.parse(res.data[i].value);
                                this.search();
                                // return;
                            }
                        }
                    } else {
                        // 没有任何模板
                        this.templateId = -1;
                        this.cols_title = [
                            { label: '工号', prop: 'workCode', type: 'model' },
                            { label: '姓名', prop: 'name', type: 'model' },
                            { label: '花名', prop: 'nickname', type: 'normal' },
                            { label: '合同签署公司', prop: 'contractCompanyName', type: 'normal' },
                            { label: '组织层级', prop: 'departmentTree', type: 'normal' },
                            { label: '岗位', prop: 'positionName', type: 'normal' },
                            { label: '入职日期', prop: 'joinDate', type: 'normal' },
                            { label: '工作城市', prop: 'cityEname', type: 'normal' },
                            { label: '职位类别', prop: 'positionTypeName', type: 'normal' }
                        ];
                        this.search();
                    }
                } else {
                    this.templateId=''
                    this.cols_title = [
                        { label: '工号', prop: 'workCode', type: 'model' },
                        { label: '姓名', prop: 'name', type: 'model' },
                        { label: '花名', prop: 'nickname', type: 'normal' },
                        { label: '合同签署公司', prop: 'contractCompanyName', type: 'normal' },
                        { label: '组织层级', prop: 'departmentTree', type: 'normal' },
                        { label: '岗位', prop: 'positionName', type: 'normal' },
                        { label: '入职日期', prop: 'joinDate', type: 'normal' },
                        { label: '工作城市', prop: 'cityEname', type: 'normal' },
                        { label: '职位类别', prop: 'positionTypeName', type: 'normal' }
                    ];
                    this.search();
                }
               
            });
        },
        getTransDialog() {
            this.isTransDialog = false;
        },
        getTempaltes(val,id) {
            if (val && id) {
                this.templateId = id
                this.cols_title = val;
                this.search();
            } else {
                this.getTemplateList();
            }
            this.isTemplateDialog = false;
        },
        // 获取花名册基础信息
        getBaseInfo() {
            // const parms = qs.stringify({
            //     contractCompanyId: 0
            // });
            rosterBaseInfo().then(this.handleBaseSucc.bind(this));
        },
        handleBaseSucc(res) {
            if (res.success && res.data) {
                this.baseInfo = res.data;
            } else {
                this.errorMsg(res.message);
            }
        },
        // 查询
        search() {
            this.totalCount = 0;
            this.tableData = [];
            this.loading = true;
            this.pageNo = 1;
            const parms = {
                keyword: this.keyword,
                departmentId: this.departIds,
                employeeStatusEid: this.workStatus,
                templateId: this.templateId,
                workCode: this.$docCookies.getItem('username'),
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            getRoster(parms).then(this.handleTable.bind(this));
        },
        handleTable(res) {
            if (res.success) {
                this.totalCount = res.data.total;
                this.tableData = res.data.list;
                this.loading = false;
            } else {
                this.errorMsg(res.message);
                this.loading = false;
            }
        },
        // 导出
        exportExcel() {
            if(this.tableData){
                const parms = qs.stringify({
                    keyword: this.keyword,
                    departmentId: this.departIds,
                    employeeStatusEid: this.workStatus,
                    templateId: this.templateId,
                    workCode: this.$docCookies.getItem('username')
                    // contractCompanyId: 1,
                });
                ExportRost(parms).then(res=>{
                   if(res.success){
                       this.successMsg(res.data)
                   }else{
                        this.errorMsg(res.message)
                   }
                })
                // let url = '/employeeRoster/export?' + parms;
                // downFile(url);
            }else{
                this.errorMsg('暂无内容导出');
            }

        },

        getTransacte(row) {
            this.transInfo = row;
            this.isTransDialog = true;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            const parms = {
                keyword: this.keyword,
                departmentId: this.departIds,
                employeeStatusEid: this.workStatus,
                templateId: this.templateId,
                workCode: this.$docCookies.getItem('username'),
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            getRoster(parms).then(this.handleTable.bind(this));
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            const parms = {
                keyword: this.keyword,
                departmentId: this.departIds,
                employeeStatusEid: this.workStatus,
                templateId: this.templateId,
                workCode: this.$docCookies.getItem('username'),
                pageNo: this.pageNo,
                pageSize: this.pageSize
            };
            getRoster(parms).then(this.handleTable.bind(this));
        },
        getDetail(row) {
            if (this.isRender('personinfo')) {
                this.$router.push({ path: `/personinfo/${row.id}` });
            } else {

            }
        },
        getAddWorker() {
            this.isAddworker = true;
        },
        getImportRoster() {
            this.isImportInfo = true;
        },
        getImport() {
            this.isImportInfo = false;
        },
        getshowAddworker() {
            this.isAddworker = false;
        },
        // 表头模板展示
        getDialog() {
            this.isTemplateDialog = true;
        }
    }
};
</script>
<style scoped >
.container {
    width: 100%;
    height: calc(100% - 90px);
}

.headerw {
    background: #fff;
    width: 100%;
    height: 60px;
    font-size: 16px;
    line-height: 60px;
    border-bottom: 1px solid #f7f7f7;
}

.firTit {
    margin-left: 20px;
}

.lineMargin {
    margin: 0 5px;
}

.dataCon {
    padding: 15px 0;
    display: flex;
    background: #fff;
    border-top: 1px solid #f2f2f2;
}
.leftCon {
    flex: 3;
    display: flex;
    align-items: center;
    border-right: 1px solid #333333;
    justify-content: space-around;
}
.items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #333;
}

.nums {
    margin-bottom: 10px;
    font-size: 20px;
}

.specFont {
    font-size: 20px;
    font-weight: bold;
}
.rightCon {
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.leftInput {
    display: flex;
    padding: 20px;
    padding-bottom: 0;
    align-items: center;
}
.el-icon-s-tools {
    font-size: 20px;
    margin-right: 5px;
    /* line-height: 30px; */
}
.settings {
    display: flex;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
}
.tableCOn {
    width: 100%;
    padding-top: 10px;
    padding-bottom: 30px;
    border-top: 1px solid #f2f2f2;
    background: #fff;
}
.inputs {
    width: 230px;
    margin-right: 15px;
}
.inputs >>> .el-input {
    width: 230px !important;
    height: 30px !important;
}

.inputs >>> .el-input__inner {
    width: 230px !important;
    height: 30px !important;
    line-height: 0 !important;
}
.inputs >>> .el-input__icon {
    line-height: 30px !important;
}
.selects >>> .el-input__icon {
    line-height: 30px !important;
}
.selects >>> .el-input {
    width: 200px !important;
    height: 30px !important;
    margin-right: 15px;
}
.selects >>> .el-input__inner {
    width: 200px !important;
    height: 30px !important;
    line-height: 0 !important;
}
.topBtns {
    display: flex;
    align-items: center;
}
.topBtns >>> .el-button {
    padding: 6px 15px !important;
    margin-left: 10px;
}
.btnsCon {
    width: 100%;
    display: flex;
    margin-top: 15px;
    margin-bottom: 20px;
    justify-content: center;
}
.btnsCon >>> .el-button {
    padding: 6px 15px !important;
    margin-right: 10px;
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
.tables>>>.el-table__fixed{
    height:100% !important;
}
</style>
