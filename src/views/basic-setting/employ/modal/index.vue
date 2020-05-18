<template>
  <el-dialog :visible="show" :before-close="close" class="modal" title="雇佣类型">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="雇佣类型名称：" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="工号规则：" :label-width="formLabelWidth" prop="workCodeRuleId">
        <el-select v-model="form.workCodeRuleId" placeholder="请选择" >
          <el-option
            v-for="item in workCodeRule"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合同政策：" :label-width="formLabelWidth" prop="policyEid">
        <el-select v-model="form.policyEid" placeholder="请选择" >
          <el-option
            v-for="item in enumeration.policy"
            :key="item.eid"
            :label="item.ename"
            :value="item.eid"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { insertEmployType, updateEmployType } from '@src/api/baseSetting/employ';
import { getWorkCodeRule } from '@src/api/baseSetting/workCode';
import { mapGetters } from 'vuex';
export default {
    props: ['show', 'close', 'type', 'data'],
    data() {
        return {
            workCodeRule: [],
            form: {
                name: '',
                workCodeRuleId: ''
            },
            formLabelWidth: '140px',
            rules: {
                name: [{ required: true, message: '请输入', trigger: 'blur' }, { max: 10, message: '长度不超过10个字符', trigger: 'blur' }],
                workCodeRuleId: [{ required: true, message: '请选择', trigger: 'blur' }],
                policyEid: [{ required: true, message: '请选择', trigger: 'blur' }]
            }
        };
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    created() {
        getWorkCodeRule().then(res => {
            this.workCodeRule = res.data;
        });
        this.$store.dispatch('enumeration/getEnumDict', 'policy');
        if (this.type === 'edit') {
            this.form = {
                name: this.data.name,
                workCodeRuleId: this.data.workCodeRuleId,
                id: this.data.id,
                policyEid: this.data.policyEid
            };
        }
    },
    methods: {
        save() {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    if (this.type === 'edit') {
                        this.edit();
                    }
                    if (this.type === 'add') {
                        this.add();
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        add() {
            insertEmployType(this.form).then(res => {
                if (res.success) {
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    });
                    this.close();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            });
        },
        edit() {
            updateEmployType(this.form).then(res => {
                if (res.success) {
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    });
                    this.close();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>
<style scoped>
.modal>>>.el-input{
  width:200px;
  height:30px;
}
.modal>>>.el-input__inner{
  width:200px !important;
  height:30px;
}
.modal>>>.el-input__icon{
  line-height: 30px;
}

</style>
