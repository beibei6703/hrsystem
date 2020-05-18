<template>
  <div class="container">
    <div class="titCon1">
      <span>批量添加</span>
    </div>
    <div class="uploadCOn">
      <el-upload
        :auto-upload="true"
        :before-upload="beforeUpload"
        :data="uploadData"
        :on-success="handleSuccess"
        :show-file-list="false"
        action="/employeeRoster/importEmployeeList"
        class="upload-demo"
        drag
        multiple
        ref="upload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </div>
    <span @click="getDownload" class="fCOlor">人才盘点模板</span>
  </div>
</template>

<script>
import qs from 'qs';
export default {
    name: 'peocheck',
    data() {
        return {
            uploadData: {
                workcode: '',
                importType: 2
            }
        };
    },
    methods: {
        beforeUpload(file) {
            let reg = /\.(xlsx|xls)$/;
            if (!reg.test(file.name)) {
                this.$message({
                    message: '请上传excel文件',
                    type: 'warning'
                });
                this.$refs.upload.clearFiles();
                return false;
            }
            this.uploadData.file = file;
            this.uploadData.workcode = this.$docCookies.getItem('username');
        },
        handleSuccess(res) {
            if (res.success) {
                this.successMsg(res.message);
                this.$store.commit('getResult', res.data);
                this.$store.commit('changeImportResult', true);
            } else {
                this.errorMsg(res.message);
            }
        },
        // 下载导入模板
        getDownload() {
            const parms = qs.stringify({
                importType: 2
            });
            window.location.href = '/importTemplate/downloadEmployeeTemplate?' + parms;
        }
    }
};
</script>

<style scoped>
.container {
    background: #fff;
    padding: 0 80px;
}
.titCon1 {
    padding-top: 30px;
    margin-bottom: 20px;
}
.titCon1 > span {
    font-size: 16px;
}

.uploadCOn {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
}
.fCOlor {
    color: #409eff;
    /*margin-left:100px;*/
    font-size: 16px;
    cursor: pointer;
}
</style>
