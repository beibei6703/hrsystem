<template>
  <el-dialog :visible="show" :before-close="close" class="modal" title="合同签署公司">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="公司名称：" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="请填写"></el-input>
      </el-form-item>
      <el-form-item label="工资卡所属银行：" :label-width="formLabelWidth" prop="bankEid">
        <el-select v-model="form.bankEid" placeholder="请选择" >
          <el-option
            v-for="item in enumeration.bank"
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
import { updateContractCompany, insertContractCompany } from '@src/api/baseSetting/contract';
import { mapGetters } from 'vuex';
export default {
    props: ['show', 'close', 'type', 'data'],
    data() {
        return {
            workCodeRule: [],
            form: {
                name: '',
                bankEid: ''
            },
            formLabelWidth: '140px',
            rules: {
                name: [{ required: true, message: '请输入', trigger: 'blur' }, { max: 30, message: '长度不超过30个字符', trigger: 'blur' }],
                bankEid: [{ required: true, message: '请选择', trigger: 'blur' }]
            }
        };
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    created() {
        this.getEnumeration();
        if (this.type === 'edit') {
            this.form = {
                name: this.data.name,
                bankEid: this.data.bankEid,
                id: this.data.id
            };
        }
    },
    methods: {
        // 获取枚举类型
        getEnumeration() {
            this.$store.dispatch('enumeration/getEnumDict', 'bank');
        },
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
            insertContractCompany(this.form).then(res => {
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
            updateContractCompany(this.form).then(res => {
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
