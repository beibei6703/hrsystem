<template>
  <el-container>
    <el-main>
      <div class="main">
        <el-table :data="tableData" style="width: 100%; margin: 10px;">
          <el-table-column prop="name" label="可配置信息"> </el-table-column>
          <el-table-column prop="oprate" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >配置</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                {
                    name: '工作城市',
                    link: 'workcity'
                },
                {
                    name: '雇佣类型',
                    link: 'employ'
                },
                {
                    name: '合同签署公司',
                    link: 'contract'
                },
                {
                    name: '工号规则',
                    link: 'workcode'
                },
                {
                    name: '数据同步规则',
                    link: 'data'
                }
            ]
        };
    },
    methods: {
        handleClick(item) {
            this.$router.push({ path: '/basicsetting/' + item.link });
        }
    }
};
</script>
<style scoped>
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
.main {
  margin: 0 10px;
  background: #fff;
}
</style>
