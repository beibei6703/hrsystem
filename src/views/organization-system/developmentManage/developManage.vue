<template>
    <el-container>
        <el-header class="header">
             <el-form :inline="true">
                <el-form-item label="序列名称">
                    <el-input v-model="serialName" size='mini' placeholder="请输入序列名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size='mini' @click='query'>查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size='mini' @click="dialogVisible=true" v-if="isRender('serialAdd')">新增</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main>
            <div class="table">
                <el-table border :data="tableData" v-if='isTrue'>
                    <el-table-column label="序列">
                        <template slot-scope="scope">
                            <el-button
                                @click="viewSerial(scope.row)"
                                type="text"
                                size="small"
                                >{{scope.row.name}}</el-button
                            >
                        </template>
                    </el-table-column>
                    <el-table-column prop="categoryName" label="职类">
                    </el-table-column>
                    <el-table-column prop="peopleCount" label="人数"> </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click="handleClick(scope.row,1)"
                                type="text"
                                size="small"
                                v-if="isRender('serialEdit')"
                                >编辑</el-button
                            >
                            <el-button
                                @click="handleClick(scope.row,2)"
                                type="text"
                                size="small"
                                v-if="isRender('serialDel')"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                v-if="totalCount>0"
                style="background: #fff;padding-bottom:5px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next"
                :total="totalCount"
            >
            </el-pagination>
        </el-main>
        <el-dialog title='新增序列' :visible.sync='dialogVisible' width='50%'>
            <el-form v-if='dialogVisible' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="序列名称" prop="name">
                    <el-input style='width: 194px;' size='small' clearable v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="职类" prop="positionCategoryId">
                    <el-select size='small' clearable v-model="ruleForm.positionCategoryId" placeholder="请选择职类">
                        <el-option
                            v-for='(item,index) of options'
                            :key='index'
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editOrUpdate">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="delDialog"
            width="30%"
            >
            <span>确定删除此序列？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delDialog = false">取 消</el-button>
                <el-button type="primary" @click="delSerial">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title='序列信息'
            :visible.sync='serialInfoVisible'
            width='50%'>
            <el-form label-width="120px" class="demo-ruleForm">
                <el-form-item label="序列名称">
                    <span>{{serialInfos.name}}</span>
                </el-form-item>
                <el-form-item label="职类">
                    <span>{{serialInfos.categoryName}}</span>
                </el-form-item>
                <el-form-item label="已关联职位类别">
                    <ul class="clear">
                        <li class="fl postItme" v-for="(item,index) of serialInfos.typeNames" :key="index">{{item}}</li>
                    </ul>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type='primary' @click="serialInfoVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>
<script>
import {
    serialInsert,
    serialUpdate,
    serialList,
    serialDelete,
    serialDetail
} from '@src/api/organization/develop';
import {
    category
} from '@src/api/organization/postCategory';
import { mapState } from 'vuex';
export default {
    name: 'development',
    data() {
        return {
            isTrue: true,
            serialInfoVisible: false, // 查看序列信息的对话框
            serialName: '',
            dialogVisible: false,
            delDialog: false, // 删除序列时的对话框
            pageNum: 1,
            pageSize: 10,
            tableData: [],
            ruleForm: {
                name: '',
                positionCategoryId: ''
            },
            totalCount: 0,
            options: [],
            editId: '',
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                positionCategoryId: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ]
            },
            serialInfos: {
                name: '',
                categoryName: '',
                typeNames: []
            }
        };
    },
    watch: {
        dialogVisible: function(val) {
            if (!val) {
                this.ruleForm = {
                    name: '',
                    positionCategoryId: ''
                };
                this.editId = '';
            }
        }
    },
    computed: {
        ...mapState({userMenus: state => state.user.userMenus})
    },
    methods: {
        isRender(key) {
            return this.userMenus.includes(key);
        },
        viewSerial(row) {
            // 查看序列信息
            this.serialInfoVisible = true;
            serialDetail({
                id: row.id
            })
                .then(res => {
                    if (res.success) {
                        let types = [];
                        if (!!res.data.typeNames) {
                            types = res.data.typeNames.split(',');
                        };
                        this.serialInfos = {
                            name: res.data.name,
                            categoryName: res.data.categoryName,
                            typeNames: types
                        };
                    }
                });
        },
        query() {
            this.pageNum = 1;
            this.getSerialList();
        },
        // 获取职类下拉框
        getCategory() {
            category().then(res => {
                if (res.success) {
                    this.options = res.data;
                }
            });
        },
        editOrUpdate() {
            // 编辑或者新增序列
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if (this.editId !== '') {
                        this.editSerial();
                    } else {
                        this.insertSerial();
                    };
                } else {
                    return false;
                }
            });
        },
        insertSerial() { // 新增序列
            serialInsert(this.ruleForm)
                .then(res => {
                    if (res.success) {
                        this.$message({
                            message: '新增序列成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.getSerialList();
                    } else {
                        this.dialogVisible = false;
                        this.$message({
                            message: '新增序列失败' + res.message,
                            type: 'error'
                        });
                    }
                });
        },
        editSerial() { // 序列编辑
            serialUpdate(Object.assign(this.ruleForm, {
                id: this.editId
            }))
                .then(res => {
                    if (res.success) {
                        this.$message({
                            message: '修改序列成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.getSerialList();
                    } else {
                        this.dialogVisible = false;
                        this.$message({
                            message: '修改序列失败' + res.message,
                            type: 'error'
                        });
                    }
                })
                .catch(res => {
                    this.delDialog = false;
                    this.$message({
                        type: 'error',
                        message: '删除序列失败'
                    });
                });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageNum = 1;
            this.getSerialList();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getSerialList();
        },
        delSerial() { // 删除序列
            serialDelete({
                id: this.delId
            })
                .then(res => {
                    if (res.success) {
                        this.delDialog = false;
                        this.$message({
                            type: 'success',
                            message: '删除序列成功'
                        });
                        this.getSerialList();
                    } else {
                        this.delDialog = false;
                        this.$message({
                            type: 'error',
                            message: '删除序列失败，' + res.message
                        });
                    }
                })
                .catch(res => {
                    this.delDialog = false;
                    this.$message({
                        type: 'error',
                        message: '删除序列失败'
                    });
                });
        },
        getSerialList() { // 获取序列列表
            serialList({
                name: this.serialName,
                pageNo: this.pageNum,
                pageSize: this.pageSize
            })
                .then(res => {
                    this.isTrue = false;
                    if (res.success) {
                        this.$nextTick(() => {
                            this.isTrue = true;
                            this.tableData = res.data ? res.data.list : [];
                            this.totalCount = res.data ? res.data.total : 0;
                        });
                    } else {
                        this.$nextTick(() => {
                            this.isTrue = true;
                            this.tableData = [];
                            this.totalCount = 0;
                        });
                    }
                });
        },
        handleClick(row, i) {
            switch (i) {
            case 1:
                this.dialogVisible = true;
                this.editId = row.id;
                this.ruleForm = {
                    name: row.name,
                    positionCategoryId: row.positionCategoryId
                };
                break;
            case 2:
                this.delId = row.id;
                this.delDialog = true;
                break;
            }
        }
    },
    mounted() {
        this.getCategory();
        this.getSerialList();
    }
};
</script>
<style scoped>
.el-container{
    height: calc(100% - 90px);
}
.header {
    padding: 10px;
    background: #fff;
    margin: 10px;
}
.table {
    padding: 10px;
    background: #fff;
}
.el-main {
    padding: 10px;
}
.postItme{
    padding: 2px 12px;
    border: 1px solid #409EFF;
    line-height: 24px;
    margin-right: 10px;
    margin-top: 5px;
    border-radius: 4px;
    color: #409EFF;
}
</style>
