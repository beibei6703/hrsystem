<template>
  <el-container>
    <el-header class="header">
        <el-form :inline="true">
            <el-form-item label="岗位查询">
                <el-input v-model="name" size='small' clearable placeholder="请输入岗位名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size='small' @click='query'>查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size='small' @click="dialogVisible=true" v-if="isRender('addPost')">新增</el-button>
            </el-form-item>
        </el-form>
    </el-header>
    <el-main>
        <div class="table">
            <el-table border :data="positionList" v-if="isTrue">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="name" label="岗位名称"></el-table-column>
                <el-table-column prop="peopleCount" label="在职人数"></el-table-column>
                <el-table-column prop="positionTypeName" label="职位类别"></el-table-column>
                <el-table-column prop="code" label="岗位编码"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleClick(scope.row,1)"
                            type="text"
                            size="small"
                            v-if="isRender('editPost')&&scope.row.deleted===0"
                            >编辑</el-button
                        >
                        <el-button
                            @click="handleClick(scope.$index,2)"
                            type="text"
                            size="small"
                            v-if="isRender('delPost')"
                            >{{scope.row.deleted===0?"禁用":"启用"}}</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-if='totalCount>0'
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 20, 30]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next"
                :total="totalCount"
            >
            </el-pagination>
        </div>
    </el-main>
    <el-dialog title="岗位新增/修改" :visible.sync="dialogVisible" width="700px">
        <el-form :model="ruleForm" :rules="rules" ref='form' label-width="80px" v-if='dialogVisible'>
            <el-form-item label="岗位名称" prop="postName">
                <el-input style="width:300px;" size='small' v-model="ruleForm.postName"></el-input>
            </el-form-item>
            <el-form-item label="职位类别" prop="postCategoryId">
                <el-select
                    v-model="ruleForm.postCategoryId"
                    style="width:300px;"
                    filterable
                    multiple
                    size='small'
                    placeholder="请输入关键词"
                    >
                    <el-option
                        v-for="(item,index) of options"
                        :key="index"
                        :label="item.name"
                        :value="item.id.toString()">
                    </el-option>

                  </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="postEditOrAdd('form')">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="dialog"
        width="30%"

        >
        <span v-if='dialog'>确定{{positionList[changeIndex].deleted===0?'禁用':'启用'}}此岗位？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="changePositon">确 定</el-button>
        </span>
    </el-dialog>
  </el-container>
</template>
<script>
import { getPositionAll,
    deletePosition,
    enablePosition,
    updatePosition,
    insertPosition } from '@src/api/organization/position';
import { getPost } from '@src/api/organization/postCategory';
import utils from '@src/utils/cookie';
import { mapState } from 'vuex';
export default {
    name: 'home',
    data() {
        return {
            isTrue: true,
            totalCount: 0,
            name: '', // 查询岗位名称
            dialogVisible: false, // 新增/编辑弹窗
            dialog: false, // 删除岗位的提示对话框
            pageNo: 1,
            pageSize: 10,
            changeIndex: '',
            updateId: '',
            ruleForm: {
                postName: '',
                postCategoryId: []
            },
            rules: {
                postName: [
                    { required: true, message: '请输入岗位名称', trigger: 'blur' }
                ],
                postCategoryId: [
                    { required: true, message: '请选择职位类别', trigger: 'change' }
                ]
            },
            options: [],
            positionList: []
        };
    },
    watch: {
        dialogVisible: function(val) {
            if (!val) {
                this.ruleForm = {
                    postName: '',
                    postCategoryId: []
                };
                this.updateId = '';
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
        query() {
            this.pageNo = 1;
            this.getPostion();
        },
        remoteMethod(query) {
            getPost({
                name: '',
                pageNo: 0,
                pageSize: 0
            })
                .then(res => {
                    if (res.success) {
                        this.options = res.data.list;
                    }
                });
        },
        getPostCategoryList() { // 获取职位类别列表
            getPost({
                name: '',
                pageNo: 0,
                pageSize: 0
            })
                .then(res => {
                    if (res.success) {
                        this.options = res.data.list;
                    }
                });
        },
        changePositon() {
            if (this.positionList[this.changeIndex].deleted === 0) {
                this.deletePosition();
            } else {
                this.enablePosition();
            }
        },
        getPostion() {
            getPositionAll({
                name: this.name,
                typeId: null,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            })
                .then(res => {
                    this.isTrue = false;
                    if (res.success) {
                        this.$nextTick(() => {
                            this.isTrue = true;
                            this.positionList = res.data ? res.data.list : [];
                            this.totalCount = res.data ? res.data.total : 0;
                        });
                    } else {
                        this.$nextTick(() => {
                            this.isTrue = true;
                            this.positionList = [];
                            this.totalCount = 0;
                        });
                    }
                });
        },
        // 启用
        enablePosition() {
            enablePosition({
                id: this.positionList[this.changeIndex].id
            })
                .then(res => {
                    this.dialog = false;
                    if (res.success) {
                        this.$message({
                            message: '岗位启用成功',
                            type: 'success'
                        });
                        this.pageNo = 1;
                        // this.getPostion();
                        this.positionList[this.changeIndex].deleted = 0;
                    } else {
                        this.$message({
                            message: '岗位启用失败，' + res.message,
                            type: 'warning'
                        });
                    }
                });
        },
        // 禁用
        deletePosition() {
            deletePosition({
                id: this.positionList[this.changeIndex].id
            })
                .then(res => {
                    this.dialog = false;
                    if (res.success) {
                        this.$message({
                            message: '岗位禁用成功',
                            type: 'success'
                        });
                        this.pageNo = 1;
                        // this.getPostion();
                        this.positionList[this.changeIndex].deleted = 1;
                    } else {
                        this.$message({
                            message: '岗位禁用失败，' + res.message,
                            type: 'warning'
                        });
                    }
                });
        },
        queryPostion() {

        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageNo = 1;
            this.getPostion();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getPostion();
        },
        handleClick(row, i) {
            switch (i) {
            case 1:
                this.ruleForm = {
                    postName: row.name,
                    postCategoryId: !!row.typeIds ? row.typeIds.split(',') : []
                };
                this.updateId = row.id;
                this.dialogVisible = true;
                break;
            case 2:
                this.dialog = true;
                this.changeIndex = row;
                break;
            default:
                break;
            }
        },
        addPost() {
            insertPosition({
                name: this.ruleForm.postName,
                workCode: utils.getItem('username'),
                typeIds: this.ruleForm.postCategoryId.join(',')
            })
                .then(res => {
                    if (res.success) {
                        this.dialogVisible = false;
                        this.$message({
                            message: '新增岗位成功',
                            type: 'success'
                        });
                        this.getPostion();
                    } else {
                        this.$message({
                            message: '新增岗位失败，' + res.message,
                            type: 'warning'
                        });
                    }
                });
        },
        updatePost() {
            updatePosition({
                id: this.updateId,
                name: this.ruleForm.postName,
                typeIds: this.ruleForm.postCategoryId.join(',')
            })
                .then(res => {
                    if (res.success) {
                        this.dialogVisible = false;
                        this.$message({
                            message: '修改岗位成功',
                            type: 'success'
                        });
                        this.getPostion();
                    } else {
                        this.$message({
                            message: '修改岗位失败，' + res.message,
                            type: 'warning'
                        });
                    }
                });
        },
        postEditOrAdd(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.updateId !== '') {
                        this.updatePost();
                    } else {
                        this.addPost();
                    }
                } else {
                    return false;
                }
            });
        }
    },
    mounted() {
        this.getPostion();
        this.getPostCategoryList();
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
</style>
