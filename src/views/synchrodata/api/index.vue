<template>
  <el-container>
    <el-main>
      <div class="main" v-loading="loading">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="同步类型">
            <el-radio-group v-model="form.type">
              <el-radio :label="1">增量更新</el-radio>
              <el-radio :label="2" disabled>全量更新</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="同步设置">
            <el-radio-group v-model="form.sync" @change="changeSyncType">
              <el-radio :label="1" >开启定时同步</el-radio>
              <el-radio :label="0">关闭定时同步</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手动同步">
            <el-button @click="syncHandleClick('syncOrganization')" type="text" size="small">组织架构数据同步</el-button>
            <el-button @click="syncHandleClick('syncPosition')" type="text" size="small">职位类别/岗位数据同步</el-button>
            <el-button @click="syncHandleClick('syncPmployee')" type="text" size="small">员工信息数据同步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { syncSetting, syncPmployee, syncPosition, syncOrganization, getSystemSetting } from '@src/api/hrmSync';
export default {
    data() {
        return {
            syncPmployee,
            syncPosition,
            syncOrganization,
            loading: false,
            form: {
                type: 1,
                sync: null
            }
        };
    },
    mounted() {
        this.getSystemSetting();
    },
    methods: {
        changeSyncType(type) {
            console.log(type);
            syncSetting({ name: 'syncJob', value: type }).then(res => {
                if (res.success) {
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            });
        },
        getSystemSetting() {
            getSystemSetting({name: 'syncJob'}).then(res => {
                if (res.success) {
                    this.form.sync = Number(res.data[0].value);
                }
            });
        },
        syncHandleClick(syncType) {
            this.loading = true;
            this.$message({
                duration: 600,
                message: '正在同步中，请稍等',
                type: 'warning'
            });
            const { type } = this.form;
            this[syncType](type).then(res => {
                setTimeout(() => {
                    this.loading = false;
                    if (res.success) {
                        this.$message({
                            message: '同步成功！',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                }, 800);
            });
        }
    }
};
</script>
<style scoped>
.el-main {
    padding: 0;
}
.header {
    text-align: left;
    background: #fff;
    line-height: 60px;
    font-size: 16px;
}
.main {
    margin: 10px;
    padding: 20px;
    background: #fff;
}
</style>
