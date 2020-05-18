<template>
  <el-dialog
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    class="dialogC"
    title="发起转正流程"
    width="50%"
  >
    <div class="diacontents">
      <div class="items">
        <span>转正类型</span>
        <div class="radiosCon">
          <el-radio label="1" v-model="radio">备选项</el-radio>
          <el-radio label="2" v-model="radio">备选项</el-radio>
        </div>
      </div>
      <div class="items">
        <span>直接上级</span>
        <div class="radiosCon">验真伪</div>
      </div>
      <div class="items">
        <span>导师</span>
        <div class="radiosCon">验真伪</div>
      </div>
      <div class="items">
        <span>转正日期</span>
        <div class="radiosCon">验真伪</div>
      </div>
      <div class="items">
        <span>原计划转正日期</span>
        <div class="radiosCon">
          <el-date-picker
            :picker-options="pickerOptions0"
            placeholder="选择日期"
            type="date"
            v-model="value1"
          ></el-date-picker>
        </div>
      </div>
      <div class="items">
        <span>延迟转正日期</span>
        <div class="radiosCon">
          <el-date-picker
            :picker-options="pickerOptions0"
            placeholder="选择日期"
            type="date"
            v-model="value1"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
      <el-button @click="dialogVisible = false" type="primary">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    name: 'EntryDialog',
    data() {
        return {
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            dialogVisible: true,
            value1: '',
            radio: 1,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        };
    },
    methods: {
        handleClose(done) {
            done();
        }
    }
};
</script>

<style scoped>
.diacontents {
    padding: 0 20px;
    border-top: 1px solid #dddddd;
}

.dialogC >>> .el-dialog__body {
    padding-top: 0 !important;
}

.dialogC >>> .el-button {
    padding: 6px 15px !important;
}

.items {
    display: flex;
    padding-top: 20px;
    align-items: center;
}

.items >>> .el-input__inner {
    height: 30px;
}

.items >>> .el-input__icon {
    line-height: 30px !important;
}

.items > span {
    display: block;
    width: 150px;
    text-align: right;
}

.titCon {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.radiosCon {
    margin-left: 30px;
}
</style>
