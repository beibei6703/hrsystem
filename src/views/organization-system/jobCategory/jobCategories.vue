<template>
    <el-container>
        <el-header class="header">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="职位类别查询">
                    <el-input v-model="category" size='small' placeholder="请输入类别名称"></el-input>
                </el-form-item>
                <el-form-item label="部门查询">
                    <el-cascader
                        placeholder="请选择部门"
                        size='small'
                        v-model='departmentId'
                        :options="hrm"
                        :show-all-levels='false'
                        :props="departmentProps"
                        clearable>
                    </el-cascader>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size='small' @click='query'>查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size='small' @click='exportExcel'>导出</el-button>
                </el-form-item>
                <el-form-item class='fr'>
                  <el-button type="primary" size='small' @click='addAndEdit("")' v-if="isRender('addJob')">新增</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-main>
            <el-table
            v-if="isTrue"
            class="table"
            fit
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column type='index' label="序号" width="50">
                </el-table-column>
                <el-table-column label="职位类别" prop='name'>
                    <template slot-scope="scope">
                        <div style="color:#409EFF" @click='showDetail(scope.row.id)'>{{scope.row.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="positionCount" label="岗位数">
                </el-table-column>
                <el-table-column prop="employeeCount" label="在职人数">
                </el-table-column>
                <el-table-column prop="gradeUserCount" label="各职级人数">
                </el-table-column>
                <el-table-column prop="departmentNames" label="所属部门">
                </el-table-column>
                 <el-table-column prop="remark" show-overflow-tooltip label="职位职责">
                </el-table-column>
                 <el-table-column prop="positionCategoryName" label="职类">
                </el-table-column>
                 <el-table-column prop="positionSerialName" label="序列">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type='text' @click="addAndEdit(scope.row)" v-if="isRender('editJob')&&scope.row.deleted===0">编辑</el-button>
                        <el-button type='text' @click="showDel(scope.$index)" v-if="isRender('delJob')">{{scope.row.deleted===0?"禁用":"启用"}}</el-button>
                        <!-- <el-button type='text' v-if='!scope.row.deleted' @click="showDel(scope.$index)" v-if="isRender('delJob')">禁用</el-button> -->
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
        </el-main>
        <el-dialog
            title="新增/编辑职位类别"
            :visible.sync="dialogVisible"
            >
            <el-form ref="form" :rules="rules" v-if='dialogVisible' :model="ruleForm" label-width="110px">
                <el-form-item label="职位类别名称" prop='name'>
                    <el-input size='small' style='width:220px;' clearable v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="所属部门" prop="departmentIds">
                    <el-cascader
                        placeholder="请选择部门"
                        size='small'
                        v-model='ruleForm.departmentIds'
                        :options="hrm"
                        :show-all-levels='false'
                        :props="Object.assign(departmentProps,{multiple:true})"
                        clearable>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="职类" prop='positionCategoryId'>
                    <el-select size='small' @change="change" clearable v-model="ruleForm.positionCategoryId" placeholder="请选择职类">
                        <el-option
                            v-for="(item,index) of categoryOptions"
                            :key="index"
                            @change="change"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="序列" prop='positionSerialId'>
                    <el-select size='small' clearable v-model="ruleForm.positionSerialId" placeholder="请选择序列">
                        <el-option
                            v-for="(item,index) of serialOptions"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职则描述" prop='remark'>
                    <el-input style='width:320px;' maxlength="200" :rows="4" clearable v-model="ruleForm.remark" type='textarea'></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="职位查看"
            :visible.sync="postshow"
            >
            <el-form ref="form" label-width="120px" vif='postshow'>
                <el-form-item label="职位类别名称">
                    <span>{{postInfo.name}}</span>
                </el-form-item>
                <el-form-item label="所属部门">
                    <span>{{postInfo.departmentNames}}</span>
                </el-form-item>
                <el-form-item label="职位职责">
                    <span>{{postInfo.remark}}</span>
                </el-form-item>
                <el-form-item label="已关联岗位">
                    <el-button type="primary" v-for='(item,index) of postInfo.positionNames' size='small' :key='index'>{{item}}</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="postshow = false">关闭</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="delDialog"
            width="30%"
            >
            <span v-if='delDialog'>确定{{tableData[changeIndex].deleted===0?"禁用":"启用"}}此职位类别？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delDialog = false">取 消</el-button>
                <el-button type="primary" @click="changePostStatus">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>
<script>
import { getPostAll,
    enablePost,
    delPost,
    updatePost,
    detailPost,
    serial,
    category,
    addPost } from '@src/api/organization/postCategory';
import { getHrm } from '@src/api/organization/organize';
import qs from 'qs';
import { mapState } from 'vuex';
export default {
    name: 'home',
    data() {
        return {
            delDialog: false,
            departmentProps: {
                checkStrictly: true,
                children: 'childrenDepartment',
                label: 'name',
                value: 'id',
                emitPath: false
            },
            hrm: [], // 组织架构
            totalCount: 0,
            postshow: false,
            dialogVisible: false,
            ruleForm: {
                // 编辑或者修改时的form数据
                name: '',
                remark: '',
                positionSerialId: '',
                positionCategoryId: '',
                departmentIds: []
            },
            postInfo: {// 职位详情
                departmentNames: '',
                name: '',
                positionNames: [],
                remark: ''
            },
            category: '', // 职位类别查询的关键字
            editId: '', // 编辑时的岗位id
            departmentId: '', // 搜索时的部门id
            tableData: [], // 数据列表
            pageSize: 10, // 每页数量
            pageNo: 1, // 页码
            rules: {// form验证
                name: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
                departmentIds: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
                remark: [{ required: true, message: '请输入职位描述', trigger: 'blur' }],
                positionSerialId: [{ required: true, message: '请输入组织名称', trigger: 'change' }],
                positionCategoryId: [{
                    required: true, message: '请输入组织名称', trigger: 'change'
                }]
            },
            changeIndex: '',
            serialOptions: [], // 序列下拉
            categoryOptions: [], // 职类下拉
            level: 0,
            isTrue: true
        };
    },
    watch: {
        dialogVisible: function(val) {
            if (!val) {
                this.ruleForm = {
                    name: '',
                    remark: '',
                    positionSerialId: '',
                    positionCategoryId: '',
                    departmentIds: []
                };
                this.serialOptions = [];
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
        // 切换职位类别的状态。 启用/禁用
        changePostStatus() {
            if (this.tableData[this.changeIndex].deleted === 0) {
                this.delPost();
            } else {
                this.enablePost();
            }
        },
        showDel(index) {
            this.changeIndex = index;
            this.delDialog = true;
        },
        // 启用职位类别
        enablePost() {
            enablePost({
                id: this.tableData[this.changeIndex].id
            })
                .then(res => {
                    this.delDialog = false;
                    if (res.success) {
                        this.$message({
                            message: '职位类别启用成功',
                            type: 'success'
                        });
                        this.pageNo = 1;
                        // this.getPostList();
                        this.tableData[this.changeIndex].deleted = 0;
                    } else {
                        this.$message({
                            message: '职位类别启用失败，' + res.message,
                            type: 'warning'
                        });
                    }
                });
        },
        // 禁用职位类别
        delPost() {
            delPost({
                id: this.tableData[this.changeIndex].id
            })
                .then(res => {
                    this.delDialog = false;
                    if (res.success) {
                        this.$message({
                            message: '职位类别禁用成功',
                            type: 'success'
                        });
                        this.pageNo = 1;
                        // this.getPostList();
                        this.tableData[this.changeIndex].deleted = 1;
                    } else {
                        this.$message({
                            message: '职位类别禁用失败，' + res.message,
                            type: 'warning'
                        });
                    }
                });
        },
        getHrm() {
            // 获取组织架构
            getHrm().then(res => {
                if (res.success) {
                    let data = res.data.childrenDepartment;
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[i].childrenDepartment.length; j++) {
                            for (let z = 0; z < data[i].childrenDepartment[j].childrenDepartment.length; z++) {
                                data[i].childrenDepartment[j].childrenDepartment[z].childrenDepartment = undefined;
                            };
                        };
                    };
                    this.hrm = data;
                }
            });
        },
        // getTreeData(data) {
        //     this.level++;
        //     // 循环遍历json数据
        //     for (var i = 0; i < data.length; i++) {
        //         if(data[i].childrenDepartment.length<1){
        //             // childrenDepartment若为空数组，则将childrenDepartment设为undefined
        //             data[i].childrenDepartment=undefined;
        //         }else {
        //             // childrenDepartment若不为空数组，则继续 递归调用 本方法
        //             this.getTreeData(data[i].childrenDepartment);
        //         };
        //     };
        //     return data;
        // },
        exportExcel() {
            window.location = '/positionType/listExport?' + qs.stringify({
                name: this.category,
                departmentId: this.departmentId
            });
        },
        change(val) {
            this.ruleForm.positionSerialId = '';
            this.getSerial(val);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageNo = 1;
            this.getPostList();
        },
        handleCurrentChange(val) {
            this.pageNo = val;
            this.getPostList();
        },
        query() {
            this.pageNo = 1;
            this.getPostList();
        },
        // 获取序列(serial)下拉框
        getSerial(id) {
            serial({
                categoryId: id
            }).then(res => {
                if (res.success) {
                    this.serialOptions = res.data;
                }
            });
        },
        // 获取职类(category)下拉框
        getCategory() {
            category().then(res => {
                if (res.success) {
                    this.categoryOptions = res.data;
                }
            });
        },
        // 初始化
        init() {
            this.getPostList();
        },
        // 新增或者编辑按钮
        async addAndEdit(row) {
            this.dialogVisible = true;
            if (row !== '') {
                this.editId = row.id;
                await this.getSerial(row.positionCategoryId);
                // if(!!row.departmentIds){
                //     let arr2 = row.departmentIds.split(',');
                //     for(let i of arr2){
                //         arr.push(i)
                //     }
                // };
                this.ruleForm = {
                    name: row.name,
                    remark: row.remark,
                    positionSerialId: row.positionSerialId,
                    positionCategoryId: row.positionCategoryId,
                    departmentIds: !!row.departmentIds ? row.departmentIds.split(',') : []
                };
            } else {

            }
        },
        // 新增
        addPost() {
            let formObj = this.ruleForm;
            formObj.departmentIds = formObj.departmentIds.join(',');
            addPost(formObj)
                .then(res => {
                    if (res.success) {
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        this.getPostList();
                        this.dialogVisible = false;
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                });
        },
        // 编辑更新
        update() {
            let formObj = this.ruleForm;
            formObj.departmentIds = formObj.departmentIds.join(',');
            updatePost(Object.assign(formObj, {
                id: this.editId
            }))
                .then(res => {
                    if (res.success) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getPostList();
                        this.dialogVisible = false;
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                });
        },
        // 点击获取职位详情
        showDetail(id) {
            detailPost({
                id: id
            })
                .then(res => {
                    if (res.success) {
                        this.postshow = true;
                        let data = res.data;
                        data.positionNames = data.positionNames ? data.positionNames.split(',') : '';
                        this.postInfo = data;
                    }
                });
        },
        // 表单提交，判断是编辑还是新增
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.editId !== '') {
                        this.update();
                    } else {
                        this.addPost();
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 获取职位列表数据
        getPostList() {
            getPostAll({
                pageSize: this.pageSize,
                pageNo: this.pageNo,
                name: this.category,
                departmentId: this.departmentId
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
        }
    },
    mounted() {
        this.getPostList();
        this.getCategory();
        this.getHrm();
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
.el-main {
    padding: 10px;
    margin: 10px;
    background: #fff;
}
</style>
