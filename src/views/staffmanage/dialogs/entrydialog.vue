<template>
  <el-dialog
    :before-close="handleClose"
    :key="1"
    :visible.sync="dialogVisible"
    class="dialogC"
    title="确认入职"
    width="65%"
  >
    <div class="dialogContains">
      <div :key="item.id" class="listItems" v-for="item in checkLists">
        <div class="firCons">
          <span class="sp_titles">姓名：</span>
          <el-input placeholder="请输入姓名" readonly v-model="item.name"></el-input>
        </div>
        <div class="firCons">
          <span class="sp_titles">入职日期：</span>
          <el-date-picker
            :picker-options="pickerOptions"
            placeholder="选择日期"
            type="date"
            v-model="item.joinDate"
          ></el-date-picker>
        </div>
        <div :key="idItem.id" class="firCons" v-for="idItem in workCodeList">
          <div style="margin-left:15px;" v-if="item.id===idItem.id">
            <span class="sp_titles">工号：</span>
            <el-input placeholder="请输入工号" v-model="idItem.workCode" disabled></el-input>
          </div>
        </div>
      </div>
    </div>
    <span class="dialog-footer bottomBtn" slot="footer">
      <el-button @click="getClose">取 消</el-button>
      <el-button @click="submit" type="primary">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { confirmEntry, getWorkCode } from '@src/api/relation/index.js';
export default {
    name: 'EntryDialog',
    props: ['checkLists', 'isEntryDialog'],
    data() {
        return {
            dialogVisible: true,
            value1: '',
            workInfos: [],
            workCodeList: [],
            idList: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        };
    },
    created() {
        if (this.checkLists) {
            for (var i = 0; i < this.checkLists.length; i++) {
                this.idList.push({ id: this.checkLists[i].id });
            }
        }
        this.getWorkCodeList();
    },
    methods: {
        getWorkCodeList() {
            if (this.idList) {
                getWorkCode(this.idList).then(res => {
                    if (res.success && res.data) {
                        this.workCodeList = res.data;
                        console.log(this.workCodeList);
                    }
                });
            }
        },
        handleClose(done) {
            this.$emit('isChangeDialog');
            done();
            if (this.isEntryDialog) {
                this.dialogVisible = true;
            }
        },
        getClose() {
            this.$emit('isChangeDialog');
            this.dialogVisible = false;
            if (this.isEntryDialog) {
                this.dialogVisible = true;
            }
        },
        submit() {
            this.workInfos = [];
            this.checkLists.forEach(item => {
                this.workInfos.push({
                    id: item.id,
                    joinDate: item.joinDate,
                    workCode: item.workCode
                });
            });
            if (this.workInfos) {
                const parms = this.workInfos;
                confirmEntry(parms).then(res => {
                    if (res.success) {
                        this.successMsg(res.message);
                        this.$emit('isChangeDialog');
                        this.dialogVisible = false;
                        if (this.isEntryDialog) {
                            this.dialogVisible = true;
                        }
                    } else {
                        res.errorMsg(res.message);
                    }
                });
            }
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
    padding: 15px 0;
    align-items: center;
    /* justify-content: space-around; */
    border-top: 1px solid #f2f2f2;
    flex-wrap: wrap;
}
.firCons {
    display: flex;
    align-items: center;
    font-size: 14px;
    /* margin-left:20px; */
}
.firCons >>> .el-input {
    width: 180px;
    height: 30px;
}
.firCons >>> .el-input__inner {
    width: 180px;
    height: 30px;
}
.firCons >>> .is-disabled .el-input__inner{
    color:#666;
}
.firCons > span {
    display: block;
}

.firCons >>> .el-input__icon {
    line-height: 30px;
}
.sp_titles {
    width: 75px;
    color: #333;
    text-align: right;
}
.dialogContains {
    /* padding: 0px 20px 0px 0; */
}
.bottomBtn >>> .el-button {
    padding: 6px 15px;
}
</style>
