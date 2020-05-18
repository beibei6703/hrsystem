<template>
  <el-dialog
    :before-close="handleClose"
    :key="1"
    :visible.sync="dialogVisible"
    class="dialogC"
    title="放弃入职"
    width="43%"
  >
    <div class="dialogContains">
      <div class="listItems">
        <div class="firCons">
          <span class="span_titles">放弃入职原因：</span>
          <el-select clearable placeholder="请选择" v-model="abandonTypes">
            <el-option
              :key="item.eid"
              :label="item.ename"
              :value="item.eid"
              v-for="item in enumeration.abandonType"
            ></el-option>
          </el-select>
        </div>
        <div class="firCons">
          <span class="span_titles lineH">备注：</span>
          <el-input :autosize="{ minRows: 2, maxRows: 6 }" type="textarea" v-model="abandonReason"></el-input>
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
import { abandonEntry } from '@src/api/relation/index.js';
import { mapGetters } from 'vuex';
export default {
    name: 'AbandonDialog',
    props: ['isAbandonDialog', 'userId'],
    data() {
        return {
            dialogVisible: true,
            value: '',
            // abandonOptions: [],
            abandonTypes: '',
            abandonReason: ''
        };
    },
    computed: {
        // 证件类型
        ...mapGetters(['enumeration'])
    },
    created() {
        // console.log(this.userId);
        this.$store.dispatch('enumeration/getEnumDict', 'abandon_type');
    },
    methods: {
        handleClose(done) {
            done();
            this.$emit('isChangeDialogAb');
            if (this.isAbandonDialog) {
                this.dialogVisible = true;
            }
        },
        getCancle() {
            this.dialogVisible = false;
            this.$emit('isChangeDialogAb');
            if (this.isAbandonDialog) {
                this.dialogVisible = true;
            }
        },
        getSubmit() {
            const parms = {
                id: this.userId,
                abandonType: this.abandonTypes,
                abandonReason: this.abandonReason
            };
            abandonEntry(parms).then(res => {
                if (res.success) {
                    this.successMsg(res.message);
                    this.dialogVisible = false;
                    this.abandonReason = '';
                    this.$emit('isChangeDialogAb');
                    if (this.isAbandonDialog) {
                        this.dialogVisible = true;
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
    padding: 15px 0;
    border-top: 1px solid #f2f2f2;
    flex-wrap: wrap;
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
}.dialogC >>> .el-dialog__body {
    padding-top: 0 !important;
}

.dialogC >>> .el-button {
    padding: 6px 15px !important;
}
.listItems {
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    border-top: 1px solid #f2f2f2;
    flex-wrap: wrap;
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
