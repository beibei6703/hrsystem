<template>
  <el-dialog
    :before-close="handleClose"
    :key="1"
    :visible.sync="dialogVisible"
    class="dialogC"
    title="确认离职"
    width="43%"
  >
    <div class="dialogContains">
      <div class="listItems">
        <div class="firCons">
          <span class="span_titles">最后工作日</span>
          <el-date-picker
            placeholder="选择日期"
            type="date"
            v-model="leaveDetailInfo.lastWorkDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <div class="firCons">
          <span class="span_titles">离职结薪日期</span>
          <el-date-picker
            placeholder="选择日期"
            type="date"
            v-model="leaveDetailInfo.leaveDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <div class="firCons">
          <span class="span_titles">离职生效日期</span>
          <el-date-picker
            placeholder="选择日期"
            type="date"
            v-model="leaveDetailInfo.leaveEffectDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <div class="firCons">
          <span class="span_titles">是否有下属</span>
          <span class="content_leave" v-if="successors.length>0">是</span>
          <span class="content_leave" v-else>否</span>
        </div>
        <div class="firCons">
          <span class="span_titles">下属继承</span>
          <div class="con_leave">
            <p :key="index" class="content_leave" v-for="(item, index) in successors">
              <span class="successorSpan">
                <span>继承人：</span>
                {{item.successor}}
              </span>
              <span>继承下属：</span>
              <span
                :key="index"
                class="succList"
                v-for="(itemsub,index) in subordinate"
              >{{itemsub}}</span>
            </p>
          </div>
        </div>
        <div class="firCons">
          <span class="span_titles">离职原因</span>
          <div class="content_leave">{{leaveDetailInfo.leaveReason}}</div>
        </div>
      </div>
    </div>
    <span class="dialog-footer bottomBtn" slot="footer">
      <el-button @click="getCancle">关闭</el-button>
      <el-button @click="getSubmit" type="primary">提交</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { confirmLeave, leaveDetail } from '@src/api/relation/index.js';
import qs from 'qs';
export default {
    name: 'ExitDialog',
    props: ['leaveInfo', 'isLeaveDialog'],
    data() {
        return {
            dialogVisible: true,
            leaveDetailInfo: {},
            successors: [],
            subordinate: []

        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            const parms = qs.stringify({
                employeeId: this.leaveInfo.employeeId
            });
            leaveDetail(parms).then(res => {
                if (res.success && res.data) {
                    this.leaveDetailInfo = res.data;
                    if (this.leaveDetailInfo.leaveEffectDate === null) {
                        var dateTime = new Date(this.leaveDetailInfo.lastWorkDate);
                        dateTime = dateTime.setDate(dateTime.getDate() + 1);
                        this.leaveDetailInfo.leaveEffectDate = new Date(dateTime);
                    }
                    if (this.leaveDetailInfo.leaveDate === null) {
                        this.leaveDetailInfo.leaveDate = this.leaveDetailInfo.lastWorkDate;
                    }
                    // 如果有下属继承
                    if (res.data.leaveSubordinateSuccessor) {
                        const successorList = JSON.parse(res.data.leaveSubordinateSuccessor);
                        console.log(successorList, typeof (successorList));
                        if (successorList.length) {
                            for (var i = 0; i < successorList.length; i++) {
                                if (successorList[i].successor) {
                                    this.successors.push({
                                        successor: successorList[i].successor
                                    });
                                }
                                if (successorList[i].subordinate) {
                                    const brr = successorList[i].subordinate.split(',');
                                    this.subordinate = brr;
                                }
                            }
                        }
                    }
                }
            });
        },
        handleClose(done) {
            this.$emit('isShowexitDialog');
            done();
            if (this.isLeaveDialog) {
                this.dialogVisible = true;
            } else {
                this.dialogVisible = false;
            }
        },
        getCancle() {
            this.$emit('isShowexitDialog');
            if (this.isLeaveDialog) {
                this.dialogVisible = true;
            } else {
                this.dialogVisible = false;
            }
        },
        getSubmit() {
            if (this.leaveDetailInfo) {
                const parms = {
                    employeeId: this.leaveInfo.employeeId,
                    lastWorkDate: this.leaveDetailInfo.lastWorkDate,
                    leaveDate: this.leaveDetailInfo.leaveDate,
                    leaveEffectDate: this.leaveDetailInfo.leaveEffectDate
                };
                confirmLeave(parms).then(res => {
                    if (res.success) {
                        this.successMsg(res.message);
                        this.$emit('isShowexitDialog');
                        this.dialogVisible = false;
                        if (this.isLeaveDialog) {
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
    }
};
</script>

<style scoped>
.dialogC >>> .el-dialog__body {
    padding-top: 0 !important;
}
.content_leave {
    width: 300px;
    line-height: 24px;
    font-size: 12px;
    word-wrap: break-word;
}
.successorSpan {
    display: block;
    font-size: 12px;
}
.succList {
    display: inline-block;
    padding: 5px 8px 5px 0;
    font-size: 12px;
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
    margin-bottom: 20px;
    /* margin-left:20px; */
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
    display: block;
    line-height: 24px;
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
