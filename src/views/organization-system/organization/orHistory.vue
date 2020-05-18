<template>
  <el-container class="container">
    <el-header>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="操作日期">
                <el-date-picker
                    size="mini"
                    v-model="dateVal"
                    type="daterange"
                    range-separator="至"
                    value-format='yyyy-MM-dd'
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="操作人">
                <el-input
                    size="mini"
                    v-model="workCodeOrName"
                    placeholder="请输入内容"
                ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" @click='query'>查询</el-button>
            </el-form-item>
        </el-form>
    </el-header>
    <el-main>
        <el-table :data="historyData" border style="width: 100%" v-if="isTrue">
            <el-table-column label="序号" type="index" width="180">
            </el-table-column>
            <el-table-column prop="date" label="操作时间"> </el-table-column>
            <el-table-column prop="name" label="操作人">
                <template slot-scope="scope">
                    <span>{{scope.row.nickName}}（{{scope.row.name}}）</span>
                </template>
             </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-if="totalCount>0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="totalCount"
        >
        </el-pagination>
    </el-main>
  </el-container>
</template>
<script>
import { getOrgHistory } from '@src/api/organization/organize';
export default {
    data() {
        return {
            isTrue: true,
            pageNo: 1,
            pageSize: 10,
            dateVal: '', // 查询的日期
            workCodeOrName: '', // 查询人姓名/花名/工号
            historyData: [],
            totalCount: 0
        };
    },
    methods: {
        query() {
            this.pageNo = 1;
            this.getHisData();
        },
        handleClick(id) {
            this.$router.push({
                query: {
                    id: id
                },
                path: '/organization'
            });
        },
        getHisData() {
            let startDate = '';
            let endDate = '';
            let reg = /^[A-Za-z0-9]*$/;
            let name = null;
            let workCode = null;
            if (this.dateVal) {
                startDate = this.dateVal[0] || '';
                endDate = this.dateVal[1] || '';
            };
            if (reg.test(this.workCodeOrName)) {
                workCode = this.workCodeOrName || null;
            } else {
                name = this.workCodeOrName;
            }
            getOrgHistory({
                startDate: startDate,
                endDate: endDate,
                name: name,
                workCode: workCode,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            })
                .then(res => {
                    this.isTrue = false;
                    if (res.success) {
                        this.$nextTick(() => {
                            this.isTrue = true;
                            this.historyData = res.data.list.length ? res.data.list : [];
                            this.totalCount = res.data.list.length ? res.data.total : 0;
                        });
                    } else {
                        this.$nextTick(() => {
                            this.isTrue = true;
                            this.historyData = [];
                            this.totalCount = 0;
                        });
                    }
                });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageNo = 1;
            this.getHisData();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getHisData();
        }
    },
    mounted() {
        this.getHisData();
    }
};
</script>
<style scoped>
.el-container{
    height: calc(100% - 90px);
}
.el-header {
  padding: 10px;
  background: #fff;
  margin: 10px;
}
.el-main {
  padding: 10px;
  margin: 10px;
  background: #fff;
}
</style>
