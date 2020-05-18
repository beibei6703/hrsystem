<template>
  <el-container>
    <el-main>
      <el-header class="header">
        <router-link to="/basicsetting">返回</router-link>
      </el-header>
      <div class="main">
        <el-table :data="tableData" style="width: 100%" height="640">
          <el-table-column prop="name" label="需同步的员工类型"></el-table-column>
          <el-table-column prop="autoSync" label="是否同步"><template slot-scope="scope">{{ scope.row.autoSync === 0 ? '否' : '是'}}</template></el-table-column>
          <el-table-column prop="oprate" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="edit(scope.row)"
                type="text"
                size="small"
              >{{ scope.row.autoSync === 0 ? '开启' : '关闭'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { getEmployType } from '@src/api/baseSetting/employ';
import { updateAutoSync } from '@src/api/baseSetting/data';
export default {
    data() {
        return {
            tableData: []
        };
    },
    created() {
        this.getEmployType();
    },
    methods: {
        getEmployType() {
            getEmployType().then(res => {
                this.tableData = res.data;
            });
        },
        // 修改
        edit(data) {
            const { id, autoSync } = data;
            const newAutoSync = autoSync === 0 ? 1 : 0;
            const tip = autoSync === 0 ? '开启' : '关闭';
            this.$confirm(`确认是否${tip}该类型员工的同步?`, '提示', {
                type: 'warning'
            }).then(() => {
                updateAutoSync({ id: id, autoSync: newAutoSync }).then(res => {
                    if (res.success) {
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.getEmployType();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                });
            });
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
