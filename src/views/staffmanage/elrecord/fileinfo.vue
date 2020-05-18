<template>
  <div class="baseCon">
    <div class="filedowload">
      <span>简历下载:</span>
      <div class="cardImg">
        <div class="filedowload-warp" v-for="(item, index) in data.resume" :key="index">
          <div class="file">
            <i class="el-icon-document"></i>
          </div>
          <div class="btns">
            <a href="javascript:;" @click="down(item)">下载</a>
            <a href="javascript:;" @click="del(item)">删除</a>
          </div>
        </div>
        <el-upload
          class="upload-img"
          drag
          action="/employeeDocument/insert"
          :data="{employeeId: workCode, docTypeEid: 7}"
          :on-success="handleSuccess"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <em>上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="filedowload">
      <span>证件照 :</span>
      <div class="cardImg">
        <div class="filedowload-warp filedowload-warp-small" v-for="(item, index) in data.identityPicture" :key="index">
          <img :src="item.resourceUrl" alt class="imgcard" />
          <div class="btns">
            <a href="javascript:;" @click="preview(item)">预览</a>
             <a href="javascript:;" @click="down(item)">下载</a>
            <a href="javascript:;" @click="del(item)">删除</a>
          </div>
        </div>
        <el-upload
          class="upload-img"
          :show-file-list="false"
          drag
          action="/employeeDocument/insert"
          :data="{employeeId: workCode, docTypeEid: 8}"
          :on-success="handleSuccess"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <em>上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="filedowload">
      <span>身份证扫描件:</span>
      <div class="cardImg">
        <div
          class="filedowload-warp filedowload-warp-small"
          v-for="(item, index) in data.identityCard"
          :key="index"
        >
          <img :src="item.resourceUrl" alt class="imgcard" />
          <div class="btns">
            <a href="javascript:;" @click="preview(item)">预览</a>
             <a href="javascript:;" @click="down(item)">下载</a>
            <a href="javascript:;" @click="del(item)">删除</a>
          </div>
        </div>
        <el-upload
          class="upload-img"
          drag
          action="/employeeDocument/insert"
          :data="{employeeId: workCode, docTypeEid: 1}"
          :before-upload="() => beforeUpload('identityCard')"
          :on-success="handleSuccess"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <em>上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="filedowload">
      <span>薪资流水扫描件:</span>
      <div class="cardImg">
        <div
          class="filedowload-warp filedowload-warp-big"
          v-for="(item, index) in data.salaryHis"
          :key="index"
        >
          <img :src="item.resourceUrl" alt class="imgcard" />
          <div class="btns">
            <a href="javascript:;" @click="preview(item)">预览</a>
            <a href="javascript:;" @click="down(item)">下载</a>
            <a href="javascript:;" @click="del(item)">删除</a>
          </div>
        </div>
        <el-upload
          class="upload-img"
          drag
          action="/employeeDocument/insert"
          :data="{employeeId: workCode, docTypeEid: 2}"
          :before-upload="() => beforeUpload('salaryHis')"
          :on-success="handleSuccess"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <em>上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="filedowload">
      <span>银行卡扫描件:</span>
      <div class="cardImg">
        <div
          class="filedowload-warp filedowload-warp-big"
          v-for="(item, index) in data.bankCard"
          :key="index"
        >
          <img :src="item.resourceUrl" alt class="imgcard" />
          <div class="btns">
            <a href="javascript:;" @click="preview(item)">预览</a>
            <a href="javascript:;" @click="down(item)">下载</a>
            <a href="javascript:;" @click="del(item)">删除</a>
          </div>
        </div>
        <el-upload
          class="upload-img"
          drag
          action="/employeeDocument/insert"
          :data="{employeeId: workCode, docTypeEid: 3}"
          :before-upload="() => beforeUpload('bankCard')"
          :on-success="handleSuccess"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <em>上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="filedowload">
      <span>毕业证扫描件:</span>
      <div class="cardImg">
        <div
          class="filedowload-warp filedowload-warp-big"
          v-for="(item, index) in data.diploma"
          :key="index"
        >
          <img :src="item.resourceUrl" alt class="imgcard" />
          <div class="btns">
            <a href="javascript:;" @click="preview(item)">预览</a>
             <a href="javascript:;" @click="down(item)">下载</a>
            <a href="javascript:;" @click="del(item)">删除</a>
          </div>
        </div>
        <el-upload
          class="upload-img"
          drag
          action="/employeeDocument/insert"
          :data="{employeeId: workCode, docTypeEid: 4}"
          :before-upload="() => beforeUpload('diploma')"
          :on-success="handleSuccess"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <em>上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="filedowload">
      <span>学位证扫描件:</span>
      <div class="cardImg">
        <div
          class="filedowload-warp filedowload-warp-big"
          v-for="(item, index) in data.degree"
          :key="index"
        >
          <img :src="item.resourceUrl" alt class="imgcard" />
          <div class="btns">
            <a href="javascript:;" @click="preview(item)">预览</a>
            <a href="javascript:;" @click="down(item)">下载</a>
            <a href="javascript:;" @click="del(item)">删除</a>
          </div>
        </div>
        <el-upload
          class="upload-img"
          drag
          action="/employeeDocument/insert"
          :data="{employeeId: workCode, docTypeEid: 5}"
          :before-upload="() => beforeUpload('degree')"
          :on-success="handleSuccess"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <em>上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="filedowload">
      <span>资格证扫描件:</span>
      <div class="cardImg">
        <div
          class="filedowload-warp filedowload-warp-big"
          v-for="(item, index) in data.certificate"
          :key="index"
        >
          <img :src="item.resourceUrl" alt class="imgcard" />
          <div class="btns">
            <a href="javascript:;" @click="preview(item)">预览</a>
             <a href="javascript:;" @click="down(item)">下载</a>
            <a href="javascript:;" @click="del(item)">删除</a>
          </div>
        </div>
        <el-upload
          class="upload-img"
          drag
          action="/employeeDocument/insert"
          :data="{employeeId: workCode, docTypeEid: 6}"
          :before-upload="() => beforeUpload('certificate')"
          :on-success="handleSuccess"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <em>上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <component :is="currentComponent" :close="close" :show="show" :data="img"></component>
  </div>
</template>

<script>
import {
    getEmployeeDocument,
    deleteEmployeeDocument
} from '@src/api/employeeDocument';
import { downFile } from '@src/utils/downFile';
import modal from './modal';
export default {
    name: 'fileinfo',
    components: {
        modal
    },
    data() {
        return {
            workCode: this.$route.params.workCode,
            data: {},
            currentComponent: '',
            img: '',
            show: false
        };
    },
    created() {
        this.getEmployeeDocument();
    },
    methods: {
        getEmployeeDocument() {
            getEmployeeDocument(this.workCode).then(res => {
                this.data = res.data;
            });
        },
        del(item) {
            this.$confirm('确认删除?', '提示', {
                type: 'warning'
            }).then(() => {
                deleteEmployeeDocument(item.id).then(res => {
                    if (res.success) {
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getEmployeeDocument();
                    } else {
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                });
            });
        },
        preview(item) {
            this.show = true;
            this.img = item.resourceUrl;
            this.currentComponent = 'modal';
        },
        beforeUpload(type) {
            let numLimit = {
                identityCard: { num: 2, tip: '身份证扫描件' },
                salaryHis: { num: 3, tip: '薪资流水扫描件' },
                bankCard: { num: 1, tip: '银行卡扫描件' },
                diploma: { num: 1, tip: '毕业证扫描件' },
                degree: { num: 1, tip: '学位证扫描件' },
                certificate: { num: 1, tip: '资格证扫描件' }
            };
            const isNumLimit = this.data[type].length < numLimit[type].num;
            if (!isNumLimit) {
                this.$message.error(`${numLimit[type].tip}不能超过${numLimit[type].num}!`);
            }
            return isNumLimit;
        },
        handleSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            if (res.success) {
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                });
                this.getEmployeeDocument();
            } else {
                this.$message({
                    message: res.message,
                    type: 'error'
                });
            }
        },
        down(item) {
            let downUrl = item.resourceUrl.split('shanghai.myqcloud.com/')[1];
            const url = `/employeeDocument/downloadFile?employeeId=${this.workCode}&key=${downUrl}`;
            downFile(url);
        },
        close() {
            this.show = false;
            this.currentComponent = '';
        }
    }
};
</script>

<style scoped>
@import '../../../assets/style/detail.css';
.filedowload {
    padding-top: 20px;
    padding-left: 50px;
    width: 84%;
}
.filedowload > span {
    display: block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
}
.file {
    margin-top: 10px;
    width: 100px;
    height: 130px;
    position: relative;
    text-align: center;
    cursor: pointer;
}
.file > a {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 12px;
}
.file > i {
    font-size: 60px;
    line-height: 130px;
}
.imgs {
    width: 100px;
    height: 130px;
    border: 1px solid #212121;
    cursor: pointer;
}
.btns {
    height: 20px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
}
.btns > a {
    font-size: 12px;
    color: #409eff;
}
.cardImg {
    margin-top: 10px;
    display: flex;
}
.imgcard {
    display: inline-block;
    width: 200px;
    height: 130px;
    border: 1px solid #212121;
    margin-right: 8%;
}
.cardImg >>> .el-upload-dragger {
    width: 130px !important;
    height: 130px !important;
}
.cardImg >>> .el-upload__text {
    font-size: 12px !important;
}
.cardImg >>> .el-icon-upload {
    margin-top: 30px;
}
.filedowload-warp {
    width: 100px;
    margin-right: 10px;
}
.filedowload-warp-big {
    width: 200px;
}
.filedowload-warp-small {
    width: 100px;
}
.filedowload-warp-small .imgcard {
    width: 100px;
}
.filedowload-warp:hover .btns {
    display: flex;
    visibility: visible;
}
.btns {
    visibility: hidden;
}
.cardImg >>> .el-upload-list {
    display: none;
}
</style>
