<template>
  <el-dialog
    :before-close="handleClose"
    :key="1"
    :visible.sync="dialogVisible"
    class="dialogC"
    title="发起异动流程"
    width="43%"
  >
    <div class="dialogContains">
      <div class="listItems">
        <div class="firCons">
          <span class="span_titles">异动转型</span>
          <el-radio-group class="radios" v-model="radio">
            <el-radio :label="3">部门内调刚</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group>
        </div>
        <div class="firCons">
          <span class="span_titles lineH">异动原因</span>
          <el-input :autosize="{ minRows: 2, maxRows: 6 }" type="textarea" v-model="reason"></el-input>
        </div>
        <div class="firCons">
          <span class="span_titles">调入部门</span>
          <el-cascader
            :options="treeOption"
            :props="defaultParams"
            :show-all-levels="false"
            clearable
            filterable
            placeholder="请输入或选择部门"
            v-model="departmentName"
          ></el-cascader>
        </div>
        <div class="firCons">
          <span class="span_titles">调入岗位</span>
          <el-select clearable placeholder="请选择" v-model="changeToPositionId">
            <el-option
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-for="item in positionOptions"
            ></el-option>
          </el-select>
        </div>
        <div class="firCons">
          <span class="span_titles">调岗日期</span>
          <el-date-picker placeholder="选择日期" type="date" :picker-options="pickerOptions0" v-model="activeDate"></el-date-picker>
        </div>
        <div class="firCons">
          <span class="span_titles">职类</span>
          <el-input v-model="positionType"></el-input>
        </div>
        <div class="firCons">
          <span class="span_titles">序列</span>
          <el-input v-model="order"></el-input>
        </div>
        <div class="firCons">
          <span class="span_titles">导师</span>
          <el-input v-model="teacher"></el-input>
        </div>
      </div>
    </div>
    <span class="dialog-footer bottomBtn" slot="footer">
      <el-button @click="getCancle">取 消</el-button>
      <el-button @click="getSubmit" type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { abandonEntry } from '@src/api/relation/index.js';
import { toTranslate } from '@src/api/roster/index.js';
export default {
    name: 'TransDialog',
    props: ['transInfo', 'isTransDialog'],
    data() {
        return {
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            dialogVisible: true,
            teacher: '',
            // value: '',
            positionType: '', // 职类
            order: '', // 序列
            positionOptions: [],
            changeToPositionId: '',
            reason: '',
            activeDate: '',
            radio: 3,
            departmentName: [], // 部门,
            defaultParams: {
                children: 'children',
                label: 'name',
                value: 'id',
                checkStrictly: true
            },
            treeOption: []
        };
    },
    created() {
        console.log(this.userId);
    },
    methods: {
        handleClose(done) {
            done();
            this.$emit('changeTransDialog');
            if (this.isTransDialog) {
                this.dialogVisible = true;
            } else {
                this.dialogVisible = false;
            }
        },
        getCancle() {
            this.dialogVisible = false;
            this.$emit('changeTransDialog');
            if (this.isTransDialog) {
                this.dialogVisible = true;
            } else {
                this.dialogVisible = false;
            }
        },
        getSubmit() {
            const parms = {
                workCode: this.$docCookies.getItem('username'),
                activeDate: this.activeDate,
                personnelChangesTypeEid: this.radio,
                reason: this.reason,
                changeToDepartmentId: this.departmentName[this.departmentName.length - 1],
                changeToPositionId: this.positionOptions,
                changeToSerialId: this.order,
                changeToPositionTypeId: this.changeToPositionId,
                changeToTeacherId: this.teacher
            };
            toTranslate(parms).then(res => {
                if (res.success) {
                    this.successMsg(res.message);
                    this.$emit('changeTransDialog');
                    if (this.isTransDialog) {
                        this.dialogVisible = true;
                    } else {
                        this.dialogVisible = false;
                    }
                } else {
                    this.errorMsg(res.message);
                }
            });
        }
    }
};
</script>

<style scoped>
.dialogC >>> .el-dialog__body {
    padding-top: 0 !important;
}

.dialogC >>> .el-button {
    padding: 6px 15px !important;
}
.listItems {
    display: flex;
    flex-direction: column;
    padding: 15px 0 0 8%;
    border-top: 1px solid #f2f2f2;
    flex-wrap: wrap;
}
.radios {
    display: flex;
    flex-wrap: wrap;
}
.radios >>> .el-radio__label {
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 15px;
}
.firCons {
    display: flex;
    align-items: flex-start;
    font-size: 14px;
    margin-bottom: 20px;
}
.firCons >>> .el-input {
    width: 200px;
    height: 30px;
}
.firCons >>> .el-input__inner {
    width: 200px;
    height: 30px;
}
.firCons >>> .el-input__icon {
    line-height: 30px;
}
.firCons >>> .el-textarea {
    width: 200px;
}
.firCons >>> .el-textarea__inner {
    width: 200px;
}
.span_titles {
    display: inline-block;
    line-height: 30px;
    width: 120px;
    color: #333;
    text-align: right;
    margin-right: 15px;
}

.dialogContains {
    padding: 0px 20px 0px 0;
}
.bottomBtn >>> .el-button {
    padding: 6px 15px;
}
.dialogC >>> .el-dialog__body {
    padding-top: 0 !important;
}

.dialogC >>> .el-button {
    padding: 6px 15px !important;
}

.firCons {
    display: flex;
    align-items: flex-start;
    font-size: 14px;
    margin-bottom: 20px;
    /* margin-left:20px; */
}
.firCons >>> .el-input__inner {
    width: 200px;
    height: 30px;
}
.firCons >>> .el-input__icon {
    line-height: 30px;
}
.firCons >>> .el-textarea {
    width: 200px;
}
.firCons >>> .el-textarea__inner {
    width: 200px;
}
.span_titles {
    display: inline-block;
    line-height: 30px;
    width: 120px;
    color: #333;
    text-align: right;
    margin-right: 15px;
}

.dialogContains {
    padding: 0px 20px 0px 0;
}
.bottomBtn >>> .el-button {
    padding: 6px 15px;
}
</style>
