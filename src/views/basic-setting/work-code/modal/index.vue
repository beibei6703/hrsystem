<template>
  <el-dialog :visible="show" :before-close="close" class="modal" title="工号规则">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="规则名称：" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="前缀：" :label-width="formLabelWidth" prop="prefix">
        <el-input v-model="form.prefix" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="流水号：" :label-width="formLabelWidth" prop="serialNumber">
          <el-input v-model="form.serialNumber" autocomplete="off"></el-input>
          <br/>示例：0001
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { insertWorkCodeRule } from '@src/api/baseSetting/workCode';
import { validateEn } from '@src/utils/validateRules';
export default {
    props: ['show', 'close', 'type', 'data'],
    data() {
        return {
            workCodeRule: [],
            form: {
                name: '',
                prefix: '',
                serialNumber: ''
            },
            formLabelWidth: '140px',
            rules: {
                name: [{ required: true, message: '请输入', trigger: 'blur' }, { max: 10, message: '长度不超过10个字符', trigger: 'blur' }],
                prefix: [{ validator: validateEn, trigger: 'blur' }],
                serialNumber: [{ required: true, message: '请输入', trigger: 'blur' }]
            }
        };
    },
    methods: {
        save() {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.add();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        add() {
            insertWorkCodeRule(this.form).then(res => {
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
.modal >>> .el-input {
    width: 200px;
    height: 30px;
}
.modal >>> .el-input__inner {
    width: 200px !important;
    height: 30px;
}
.modal >>> .el-input__icon {
    line-height: 30px;
}
</style>
