<template>
  <el-container>
    <el-main>
      <el-header class="header">
        <router-link to="/basicsetting">返回</router-link>
        <el-button type="primary" size="mini" style="margin-left: 20px;" @click="add()">新增</el-button>
      </el-header>
      <div class="main">
        <el-table :data="currentData" style="width: 100%">
          <el-table-column prop="name" label="合同签署公司"></el-table-column>
          <el-table-column prop="bankEname" label="所属银行"></el-table-column>
          <el-table-column prop="oprate" label="操作">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">配置</el-button>
              <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageCon">
          <el-pagination
            :current-page="pageNo"
            :page-size="pageSize"
            :total="tableData.length"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
          ></el-pagination>
        </div>
      </div>
     <component v-bind:is="currentComponent" :close="close" :type="modalObj.type" :show="modalObj.show" :data="modalObj.modalData"></component>
    </el-main>
  </el-container>
</template>
<script>
import { getContractCompany, delContractCompany } from '@src/api/baseSetting/contract';
import modal from './modal';
export default {
    components: {
        modal
    },
    data() {
        return {
            pageNo: 1,
            pageSize: 10,
            tableData: [],
            currentData: [],
            currentComponent: '',
            modalObj: {
                show: false,
                type: '',
                modalData: ''
            }
        };
    },
    created() {
        this.getContractCompany();
    },
    methods: {
        getContractCompany() {
            getContractCompany().then(res => {
                this.tableData = res.data;
                this.handleCurrentChange(1);
            });
        },
        del(item) {
            this.$confirm('确认删除?', '提示', {
                type: 'warning'
            }).then(() => {
                delContractCompany({ id: item.id }).then(res => {
                    if (res.success) {
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getContractCompany();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                });
            });
        },
        // 添加
        add() {
            this.currentComponent = modal;
            this.modalObj = {
                show: true,
                type: 'add',
                modalData: ''
            };
        },
        // 修改
        edit(data) {
            this.currentComponent = modal;
            this.modalObj = {
                show: true,
                type: 'edit',
                modalData: data
            };
        },
        // 关闭弹层
        close() {
            this.currentComponent = '';
            this.modalObj = {
                show: false,
                type: '',
                modalData: ''
            };
            this.getContractCompany();
        },
        // 改变当前页
        handleCurrentChange(val) {
            this.currentData = this.tableData.slice((val - 1) * this.pageSize, this.pageSize * val);
        }
    }
};
</script>
<style scoped>
.el-container {
    height: calc(100% - 90px);
}
.el-main {
    padding: 0;
}
.breadcrumb {
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    background: #fff;
}
.header {
    text-align: left;
    background: #fff;
    margin: 10px;
    line-height: 60px;
    font-size: 16px;
}
.header .link {
    color: #409eff;
    text-decoration: underline;
    cursor: pointer;
}
.main {
    margin: 0 10px;
    padding: 0 20px 40px 20px;
    background: #fff;
}
.router-link-active {
    float: left;
}
.pageCon {
    width: 100%;
    padding-bottom: 40px;
}
.pageCon >>> .el-pagination {
    float: right;
    font-size: 12px;
    color: #606266 !important;
}
</style>
