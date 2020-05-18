<template>
  <el-dialog :visible="show" :before-close="close" class="modal" title="离职员工">
    <el-form :model="form" ref="ruleForm">
      <el-form-item label="最后工作日期：" :label-width="formLabelWidth">
        <el-date-picker v-model="form.lastWorkDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="离职结薪日期：" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.leaveDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="changeTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="离职生效日期：" :label-width="formLabelWidth">
        <el-date-picker v-model="form.leaveEffectDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="离职原因：" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.leaveReason"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { toLeave } from '@src/api/roster/index.js';
export default {
    props: ['show', 'close', 'data', 'refs'],
    data() {
        return {
            form: {
                lastWorkDate: '', // 最后工作日期
                leaveDate: '', // 离职结薪日期
                leaveEffectDate: '',
                leaveReason: '',
                workCode: this.data
            },
            formLabelWidth: '140px'
        };
    },
    methods: {
        changeTime() {
            this.form.leaveEffectDate = this.dateAdd(this.form.leaveDate);
        },
        dateAdd(startDate) {
            startDate = new Date(startDate);
            startDate = +startDate + 1000 * 60 * 60 * 24;
            startDate = new Date(startDate);
            var nextStartDate =
                startDate.getFullYear() +
                '-' +
                (startDate.getMonth() + 1) +
                '-' +
                startDate.getDate();
            return nextStartDate;
        },
        save() {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.edit();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        edit() {
            toLeave(this.form).then(res => {
                console.log('this.form', this.form);
                if (res.success) {
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    });
                    this.refs && this.refs.getEmployeeHireInfo();
                    this.closeModal();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            });
        },
        closeModal() {
            this.form = {
                leaveDate: '',
                lastWorkDate: '',
                leaveReason: '',
                leaveEffectDate: ''
            };
            this.close();
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
