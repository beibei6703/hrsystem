<template>
  <el-container>
    <el-main>
        <div class="main clear">
            <div class="left">
                <div class="title bg-purple-dark">组织架构</div>
                <div style='height: calc(100% - 60px);overflow-y: scroll;'>
                    <el-tree
                        :expand-on-click-node='false'
                        :render-content='renderContent'
                        class='tree'
                        :default-expanded-keys="[exoandId]"
                        ref='tree'
                        :data="hrm"
                        @node-click="handleNodeClick"
                        node-key="id"
                        :props="departmentProps">
                    </el-tree>
                </div>
            </div>
            <div class="right">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark" style="text-align: right;padding-right: 20px;">
                            <el-button type="text" style="color:#fff;font-size: 14px;" @click="orgAction(0)" v-if="isRender('addOrg')&&isDisabled">新增</el-button>
                            <el-button type="text" style="color:#fff;font-size: 14px;" @click="orgAction(1)" v-if="isRender('editOrg')&&isDisabled">编辑</el-button>
                            <el-button type="text" style="color:#fff;font-size: 14px;" @click="orgAction(2)" v-if="isRender('moveOrg')&&isDisabled">移动</el-button>
                            <el-button type="text" style="color:#fff;font-size: 14px;" @click="orgAction(3)" v-if="isRender('mergOrg')&&isDisabled">合并</el-button>
                            <el-button type="text" style="color:#fff;font-size: 14px;" @click="orgAction(4)" v-if="isRender('deleteOrg')&&isDisabled">删除</el-button>
                        </div>
                    </el-col>
                    <el-col :span="24"><div class="grid-content bg-purple">组织名称：{{orgForm.name}}</div></el-col>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark">
                            <span>在职人数：直属人数：{{orgForm.peopleCount||0}}；下级部门人数：{{orgForm.subPeopleCount||0}}；</span>
                            <el-tooltip v-if='orgForm.level>2'>
                                    <div slot="content" style="padding:10px;">
                                        <span v-for='(item,index) of departmentJobInfos' :key='index'>{{item.positionName}}：{{item.count}}；
                                        </span>
                                    </div>
                                    <span class="overflow">
                                        <span v-for='(item,index) of departmentJobInfos' :key='index'>
                                            {{item.positionName}}：{{item.count}}；
                                        </span>
                                    </span>
                            </el-tooltip>
                            <!-- <span class="overflow">
                                <span v-for='(item,index) of departmentJobInfos' :key='index'>
                                    {{item.positionName}}：{{item.count}}；
                                </span>
                            </span>  -->
                        </div>
                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">负责人：{{orgForm.manager}}</div>
                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark">分管领导：{{orgForm.leader}}</div>
                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">HRBP：{{orgForm.hrbp}}</div>
                    </el-col>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-dark">类型：{{orgForm.isDep===1?'部门':'非部门'}}</div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-main>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        >
        <el-form v-if="dialogVisible" ref="ruleForm" :rules="rules" :model="ruleForm" label-width="80px">
            <el-form-item label="组织名称" prop='name'>
                <el-input size='small' maxlength='20' clearable v-model="ruleForm.name">
                </el-input>
            </el-form-item>
            <el-form-item label="组织类型" prop='isDep'>
                <el-select size='small' clearable v-model="ruleForm.isDep" placeholder="请选择组织类型">
                    <el-option label="部门" :value="1" :disabled="ruleForm.level>5"></el-option>
                    <el-option label="非部门" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if='!edit' label="上级组织" prop='parentId'>
                <el-select
                    disabled
                    size='small'
                    v-model="ruleForm.id"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    >
                    <el-option
                        v-for="item in parentNameOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if='edit' label="上级组织" prop='parentId'>
                <el-select
                    disabled
                    size='small'
                    v-model="ruleForm.parentId"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    >
                    <el-option
                        v-for="item in parentNameOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="负责人">
                <el-select
                    size='small'
                    v-model="ruleForm.managerId"
                    filterable
                    remote
                    @focus='focus(1)'
                    value-key='ruleForm.managerId'
                    :remote-method="searchManager"
                    placeholder="请输入关键词"
                    >
                    <el-option
                        v-for="item in managerOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="HRBP">
                <el-select
                    size='small'
                    v-model="ruleForm.hrbpId"
                    filterable
                    remote
                    clearable
                    @focus='focus(2)'
                    value-key='hrbpId'
                    no-data-text='无数据'
                    :remote-method="searchHrbp"
                    placeholder="请输入关键词"
                    >
                    <el-option
                        v-for="item in hrbpOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分管领导">
                <el-select
                    size='small'
                    v-model="ruleForm.leaderId"
                    filterable
                    remote
                    clearable
                    @focus='focus(3)'
                    reserve-keyword
                    value-key='leaderId'
                    :remote-method="searchLeder"
                    placeholder="请输入关键词"
                    >
                    <el-option
                        v-for="item in leaderOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门职能" prop='description'>
                <el-input v-model="ruleForm.description" type='textarea'></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="insertOrUpdate('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        :title="title"
        :visible.sync="dialog"
        >
        <el-form label-width="80px">
            <el-form-item label="当前组织">
                <span>{{orgForm.name}}</span>
            </el-form-item>
            <el-form-item :label="title+'到'">
                <el-select
                    clearable
                    size='small'
                    v-model="moveId"
                    filterable
                    remote
                    @change="handleChange"
                    @clear="clear"
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod"
                    >
                    <el-option
                        v-for="item in parentNameOptions"
                        :key="item.id"
                        :disabled="orgForm.id==item.id||item.level===9"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="移动后" v-if="showChoose">
                <div v-if="!isDep">
                    <el-radio v-model="resource" label="0">作为“非部门”处理</el-radio>
                    <p>被移动部门作为“非部门”处理</p>
                </div>
                <div v-if="isDep">
                    <div>
                        <el-radio v-model="resource" label="1">沿用原组织层级的部门定义</el-radio>
                    </div>
                    <div>
                        <el-radio v-model="resource" label="2">重新定义第一级为“部门”层级</el-radio>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="moveOrMerg">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="delDialog"
        >
        <span>确定删除{{orgForm.name}}吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delDialog = false">取 消</el-button>
            <el-button type="primary" @click="delDepartment">确 定</el-button>
        </span>
    </el-dialog>
  </el-container>
</template>
<script>
import { departmentDetail,
    updateDepartment,
    insertDepartment,
    delDepartment,
    searchDepartment,
    searchUser,
    moveDepartment,
    mergDepartment } from '@src/api/organization/department';
import { getHrm } from '@src/api/organization/organize';
import { mapState } from 'vuex';
export default {
    name: 'home',
    data() {
        return {
            exoandId: '0',
            managerId: '',
            isDep: true,
            resource: '',
            delDialog: false,
            leaderOptions: [],
            hrbpOptions: [],
            managerOptions: [],
            parentNameOptions: [],
            userOptions: [],
            options: [],
            hrm: [],
            departmentProps: {
                children: 'childrenDepartment',
                label: 'name'
            },
            changeIsDep: '',
            title: '', // 对话框标题
            orgForm: {}, // 编辑/新增的form表单内容
            ruleForm: {
                name: '',
                level: '',
                parentId: '',
                managerId: '',
                hrbpId: '',
                leaderId: '',
                description: '',
                id: ''
            },
            rules: {
                // form验证
                name: [{ required: true, message: '请输入组织名称', trigger: 'blur' }],
                isDep: [{ required: true, message: '请选择组织类型', trigger: 'change' }],
                parentId: [{ required: true, message: '请选择组织类型', trigger: 'change' }],
                // leaderId: [{ required: true, message: '请选择分管领导', trigger: 'change' }],
                description: [{ required: false, message: '请输入部门职能', trigger: 'blur' }]
            },
            departmentId: '',
            dialogVisible: false, // 新增/编辑时需要的对话框
            dialog: false, // 移动/合并时的对话框
            moveId: '', // 移动/合并时需要的部门id
            isEdit: false, // 是否是编辑
            isMove: false,
            // level: '',
            isDisabled: false,
            showChoose: false,
            departmentJobInfos: []
        };
    },
    watch: {
        dialog: function(val) {
            if (!val) {
                this.moveId = '';
                this.showChoose = false;
                this.resource = '';
            };
        }
    },
    computed: {
        ...mapState({userMenus: state => state.user.userMenus})
    },
    methods: {
        isRender(key) {
            return this.userMenus.includes(key);
        },
        focus(i) {
            switch (i) {
            case 1:
                this.ruleForm.managerId = '';
                break;
            case 2:
                this.ruleForm.hrbpId = '';
                break;
            case 3:
                this.ruleForm.leaderId = '';
                break;
            }
        },
        init() {
            this.orgForm = {// 编辑/新增的form表单内容
                name: '',
                level: '',
                parentId: '',
                managerId: '',
                hrbpId: '',
                leaderId: '',
                description: '',
                id: ''
            };
            this.isDisabled = false;
        },
        clear() {
            this.parentNameOptions = [];
        },
        /*
        *移动部门时需要做的处理
        **/
        handleChange(val) {
            if (this.isMove) {
                let arr = this.parentNameOptions.filter((v, i) => {
                    return v.id === val;
                });
                if (arr.length > 0) {
                    this.showChoose = true;
                    if (arr[0].haveDep === 0) {
                        this.isDep = true;
                        this.resource = '1';
                    } else {
                        this.resource = '0';
                        this.isDep = false;
                    };
                } else {
                    this.showChoose = false;
                }
            }
        },
        delDepartment() {
            delDepartment({
                departmentId: this.departmentId
            })
                .then(res => {
                    this.delDialog = false;
                    if (res.success) {
                        this.$message({
                            message: '删除部门成功',
                            type: 'success'
                        });
                        this.getHrm();
                    } else {
                        this.$message({
                            message: '删除部门失败' + res.message,
                            type: 'error'
                        });
                    }
                });
        },
        // 搜索分管领导
        searchLeder(query) {
            if (query !== '') {
                searchUser({
                    name: query
                })
                    .then(res => {
                        this.leaderOptions = res.data;
                    });
            }
        },
        // 搜索hrbp
        searchHrbp(query) {
            console.log(query);
            if (!query) {
                return;
            };
            searchUser({
                name: query
            })
                .then(res => {
                    this.hrbpOptions = res.data;
                });
        },
        // 搜索负责人
        searchManager(query) {
            console.log(query);
            if (!query) {
                return;
            };
            searchUser({
                name: query
            })
                .then(res => {
                    this.managerOptions = res.data;
                });
        },
        // 搜索上级组织
        remoteMethod(query) {
            if (query !== '') {
                searchDepartment({
                    name: query
                })
                    .then(res => {
                        if (res.success) {
                            this.parentNameOptions = res.data;
                        }
                    });
            }
        },
        renderContent(h, {node, data, store}) {
            return (
                <span class="custom-tree-node">
                    <i class="" id="iconleve" />
                    <span style="margin-left:5px;font-size: 14px;color:#212121;" >{node.label}</span>
                </span>
            );
        },
        handleNodeClick(data, node) {
            if (data.id !== 0) {
                this.departmentId = data.id;
                this.getDepartmentDetail();
            } else {
                this.init();
            };
        },
        // 移动或者合并
        moveOrMerg() {
            if (this.moveId === '') {
                this.$message({
                    type: 'warning',
                    message: '请先选择部门后操作'
                });
                return;
            };
            if (this.isMove) {
                this.moveDepartment();
            } else {
                this.mergDepartment();
            }
        },
        // 移动部门
        moveDepartment() {
            moveDepartment({
                departmentIdA: this.departmentId,
                departmentIdB: this.moveId,
                choose: this.resource
            })
                .then(res => {
                    this.dialog = false;
                    if (res.success) {
                        this.$message({
                            message: '移动成功',
                            type: 'success'
                        });
                        this.getHrm();
                    } else {
                        this.$message({
                            message: '移动失败',
                            type: 'warning'
                        });
                    }
                });
            // .catch(err => {
            //     this.$message({
            //         message: '移动失败',
            //         type: 'warning'
            //     });
            // });
        },
        // 合并部门
        mergDepartment() {
            mergDepartment({
                departmentIdA: this.departmentId,
                departmentIdB: this.moveId
            })
                .then(res => {
                    this.dialog = false;
                    if (res.success) {
                        this.$message({
                            message: '合并成功',
                            type: 'success'
                        });
                        this.exoandId = this.moveId;
                        this.getHrm();
                    } else {
                        this.$message({
                            message: '合并失败',
                            type: 'warning'
                        });
                    }
                });
        },
        // 获取部门信息
        getDepartmentDetail() {
            departmentDetail({
                id: this.departmentId
            })
                .then(res => {
                    if (res.success) {
                        this.isDisabled = true;
                        this.orgForm = res.data;
                        if (res.data.level > 2) {
                            this.departmentJobInfos = JSON.parse(res.data.positionStatistics);
                        }
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.message
                        });
                    }
                });
        },
        // 修改部门信息
        updateDepartment() {
            let { name,
                level,
                parentId,
                managerId,
                hrbpId,
                isDep,
                id,
                leaderId,
                description } = this.ruleForm;
            updateDepartment({
                name,
                level,
                parentId,
                managerId,
                hrbpId,
                leaderId,
                isDep,
                id,
                description })
                .then(res => {
                    if (res.success) {
                        this.exoandId = this.departmentId;
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.getHrm();
                        this.dialogVisible = false;
                    } else {
                        this.$message({
                            type: 'error',
                            message: '修改失败' + res.message
                        });
                    }
                });
        },
        // 新增部门
        insertDepartment() { // 新增
            let { name,
                level,
                managerId,
                hrbpId,
                leaderId,
                isDep,
                description } = this.ruleForm;
            insertDepartment({
                name,
                level,
                parentId: this.ruleForm.id,
                managerId,
                hrbpId,
                isDep,
                leaderId,
                description
            })
                .then(res => {
                    if (res.success) {
                        this.exoandId = this.departmentId;
                        this.dialogVisible = false;
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                        this.getHrm();
                    } else {
                        this.$message({
                            type: 'error',
                            message: '新增失败' + res.message
                        });
                    }
                });
        },
        // 新增或者修改
        insertOrUpdate(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.edit) {
                        this.updateDepartment();
                    } else {
                        this.insertDepartment();
                    }
                } else {
                    return false;
                }
            });
        },
        // 获取组织架构
        getHrm() {
            getHrm().then(res => {
                if (res.success) {
                    this.hrm = [res.data];
                    this.init();
                }
            });
        },
        // 操作集合
        orgAction(i) {
            this.ruleForm = Object.assign({}, this.orgForm);
            this.managerOptions = [{
                name: this.ruleForm.manager,
                id: this.ruleForm.managerId
            }];
            this.hrbpOptions = [{
                name: this.ruleForm.hrbp,
                id: this.ruleForm.hrbpId
            }];
            this.leaderOptions = [{
                name: this.ruleForm.leader,
                id: this.ruleForm.leaderId
            }];
            if (i === 0) {
                if (Number(this.ruleForm.level) + 1 > 9) {
                    this.$message({
                        type: 'warning',
                        message: '组织架构层级最多可添加9层，请确认'
                    });
                    return;
                };
                this.ruleForm.level = String(Number(this.ruleForm.level) + 1);
            };
            switch (i) {
            case 0:
                this.parentNameOptions = [{
                    name: this.ruleForm.name,
                    id: this.ruleForm.id
                }];
                this.ruleForm.name = '';
                this.ruleForm.description = '';
                this.dialogVisible = true;
                this.edit = false;
                this.title = '新增';
                break;
            case 1:
                this.parentNameOptions = [{
                    name: this.ruleForm.parentName,
                    id: this.ruleForm.parentId
                }];
                this.dialogVisible = true;
                this.edit = true;
                this.title = '编辑';
                break;
            case 2:
                this.dialog = true;
                this.isMove = true;
                this.title = '移动';
                this.parentNameOptions = [];
                break;
            case 3:
                this.dialog = true;
                this.isMove = false;
                this.title = '合并';
                this.parentNameOptions = [];
                break;
            case 4:
                this.delDialog = true;
                break;
            default:
                // statements_def
                break;
            };
        }
    },
    mounted() {
        this.getHrm();
    }
};
</script>
<style scoped>
.el-container{
    flex-direction: column;
    height: calc(100% - 60px);
}
.el-main{
    padding:0;
}
.main {
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.left {
    width: 300px;
    height: 100%;
    background: #fff;
    border-right: 1px solid #99a9bf;
}
.left .title{
    line-height: 40px;
    padding-left: 10px;
}
.right{
    flex: 1;
    height: 100%;
    background: #fff;
}
.grid-content{
    line-height: 40px;
    height: 40px;
    padding-left: 20px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple{
    background: #fff;
}
.tree{
    width: 100%;
    left: 0;
    /*background: #F2F6FC;*/
    text-align: center;
    /*border: 1px solid #eee;*/
}
.level{
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url("../../../assets/img/org.png") no-repeat center center !important;
    background-size: 100% 100%;
}
.overflow{
    display: inline-block;
    width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: top;
    cursor:pointer;
}
.el_tooltip__opper{
    width: 50% !important;
}
</style>
