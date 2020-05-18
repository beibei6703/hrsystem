<template>
  <el-container>
    <el-main>
      <el-header class="header">
        <router-link to="/basicsetting">返回</router-link>
        <el-button type="primary" size="mini" style="margin-left: 20px;" @click="add()">新增</el-button>
      </el-header>
      <div class="main">
        <el-table :data="tableData" style="width: 100%"  height="640">
          <el-table-column prop="name" label="工号规则"></el-table-column>
          <el-table-column prop="prefix" label="工号前缀"></el-table-column>
          <el-table-column prop="serialNumber" label="工号流水"></el-table-column>
          <el-table-column prop="oprate" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="edit(scope.row)"
                type="text"
                size="small"
              >{{scope.row.deleted === 0 ? '禁用' : '启用'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <component
        v-bind:is="currentComponent"
        :close="close"
        :type="modalObj.type"
        :show="modalObj.show"
        :data="modalObj.modalData"
      ></component>
    </el-main>
  </el-container>
</template>
<script>
import { updateWorkCodeRule, getManageWorkCodeRule } from '@src/api/baseSetting/workCode';
import modal from './modal';
export default {
    components: {
        modal
    },
    data() {
        return {
            tableData: [],
            currentComponent: '',
            modalObj: {
                show: false,
                type: '',
                modalData: ''
            }
        };
    },
    created() {
        this.getManageWorkCodeRule();
    },
    methods: {
        getManageWorkCodeRule() {
            getManageWorkCodeRule().then(res => {
                this.tableData = res.data;
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
            const { id, deleted } = data;
            const newDeleted = deleted === 0 ? 1 : 0;
            const tip = deleted === 0 ? '禁用' : '启用';
            this.$confirm(`确认是否立即${tip}?`, '提示', {
                type: 'warning'
            }).then(() => {
                updateWorkCodeRule({ id: id, deleted: newDeleted }).then(res => {
                    if (res.success) {
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.getManageWorkCodeRule();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                });
            });
        },
        // 关闭弹层
        close() {
            this.currentComponent = '';
            this.modalObj = {
                show: false,
                type: '',
                modalData: ''
            };
            this.getManageWorkCodeRule();
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
</style>
