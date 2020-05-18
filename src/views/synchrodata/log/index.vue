<template>
  <el-container>
    <el-main>
      <div class="main">
        <el-form ref="form" :model="from" label-width="80px" inline>
          <el-form-item label="操作日期">
            <el-date-picker
              v-model="from.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="操作人">
            <el-input placeholder="请填写" v-model="from.user"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getListSyncHis('search')">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="tables">
          <el-table :data="tableData.list" border>
            <el-table-column :index="typeIndex" type="index" label="序号"></el-table-column>
            <el-table-column prop="syncTypeEname" label="同步类型"></el-table-column>
            <el-table-column prop="status" label="成功状态">
              <template slot-scope="scope">{{getStatus(scope.row.status)}}</template>
            </el-table-column>
            <el-table-column prop="gmtCreated" label="同步时间"></el-table-column>
            <el-table-column label="数据预览">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <div slot="reference" class="sync-result">{{ scope.row.syncResult }}</div>
                  <div class="name-wrapper">{{ scope.row.syncResult }}</div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="syncUser" label="操作人"></el-table-column>
          </el-table>
        </div>
        <div class="pageCon">
          <el-pagination
            :current-page="params.pageNo"
            :page-size="params.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :total="totalCount"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { getListSyncHis } from '@src/api/hrmSync';

export default {
    data() {
        return {
            from: {
                date: '',
                user: ''
            },
            params: {
                user: '',
                startDate: '',
                endDate: '',
                pageNo: 1,
                pageSize: 10
            },
            totalCount: 0,
            tableData: {}
        };
    },
    created() {
        this.getListSyncHis();
    },
    methods: {
        typeIndex(index) {
            return (index = index + (this.params.pageNo - 1) * this.params.pageSize + 1);
        },
        getStatus(status) {
            if (status === 0) {
                return '同步中';
            }
            if (status === 1) {
                return '同步成功';
            }
            if (status === 2) {
                return '同步失败';
            }
        },
        getListSyncHis(type) {
            const { user, date } = this.from;
            this.params.user = user;
            // 搜索时页码重置
            if (type === 'search') {
                this.params.pageNo = 1;
            }
            if (date !== null) {
                this.params.startDate = date[0] || '';
                this.params.endDate = date[1] || '';
            } else {
                this.params.startDate = '';
                this.params.endDate = '';
            }
            getListSyncHis(this.params).then(res => {
                this.tableData = res.data;
                this.totalCount = res.data.total;
            });
        },
        // 改变页码
        handleSizeChange(val) {
            this.params.pageSize = val;
            this.getListSyncHis();
        },
        // 改变当前页
        handleCurrentChange(val) {
            this.params.pageNo = val;
            this.getListSyncHis();
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
.header {
    text-align: left;
    background: #fff;
    line-height: 60px;
    font-size: 16px;
}
.main {
    margin: 10px;
    padding: 20px;
    background: #fff;
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
.tables {
    padding: 0 10px;
    padding-bottom: 20px;
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
    padding: 4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 40px;
    text-align: center;
}
.sync-result {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
