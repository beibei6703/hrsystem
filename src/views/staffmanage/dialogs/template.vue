<template>
  <el-dialog
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    class="dialogWraps"
    title="表头模板"
    width="60%"
  >
    <div class="template_con" v-if="isTemltateList">
      <span class="template_tit">
        <span style="font-size:14px;">表头模板管理</span>
        <span @click="getTemplateListShow" class="el-icon-close"></span>
      </span>
      <ul class="template_lists">
        <!-- <li>
          <span class="leftSpan">默认模板</span>
          <span class="rightSpan">设置为默认</span>
        </li>-->
        <li :key="items.id" v-for="items in temOptions">
          <span class="leftSpan">
            <span>{{items.name}}</span>
            <span class="leftM" v-if="items.isDefault">默认模板</span>
          </span>
          <span class="rightSpan">
            <span @click="getDeleteTemplate(items.id)" class="rightM">删除</span>
            <span
              @click="getSetDefault(items.id)"
              style="cursor: pointer;"
              v-if="!items.isDefault"
            >设置为默认</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="templateNames" v-if="isAddTemplate">
      <span class="template_tit">另存为模板</span>
      <div class="listItems">
        <span style="margin-right:20px">模板名称</span>
        <el-input ref="count" v-model="templateName"></el-input>
        <span style="margin-left:20px">{{templateName.length}}/10</span>
      </div>
      <div class="btns_temp">
        <el-button @click="getCancles">取消</el-button>
        <el-button @click="getSave" type="primary">保存</el-button>
      </div>
    </div>
    <div class="dialogContain">
      <div class="firTop">
        <span class="titlesTem">模板名称</span>
        <el-select @change="getChooseWord" placeholder="请选择" v-model="templateIdName">
          <!-- <el-option :value="0" label="默认模板"></el-option> -->
          <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in temOptions"></el-option>
        </el-select>
        <span @click="getTemlatemanage" class="temClass">模板管理</span>
      </div>
      <span class="titSpan">已选字段</span>
      <div class="chooseCon">
        <span :key="index" class="chooseSp" v-for=" (chooseitem, index) in chooseWords">
          {{chooseitem.label}}
          <i
            @click="deletChoose(chooseitem)"
            class="el-icon-close deleIcon"
            v-if="chooseitem.label !=='姓名' && chooseitem.label !=='工号' "
          ></i>
        </span>
      </div>
      <span class="titSpan">可选字段</span>
      <div class="chooseCon">
        <span
          :key="index"
          @click="getChooseKey(allItem)"
          v-for=" (allItem, index) in alltemplateWords"
        >{{allItem.label}}</span>
      </div>
    </div>
    <span class="dialog-footer" slot="footer">
      <el-button @click="getEditTemplate">保存到当前模板</el-button>
      <el-button @click="getAddTemplate">另存为模板</el-button>
      <el-button @click="getsearchTemplateInfo" type="primary">查询</el-button>
      <el-button @click="getDialogClose">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
    tempalteAllWord,
    tempalteList,
    tempalteAdd,
    tempalteUpdate,
    tempalteDelete,
    setDefaultTemplate
} from '@src/api/roster/index.js';
import { getKeyWord } from '@src/utils/getKeyWord'; // 方法
import qs from 'qs';
export default {
    name: 'Template',
    props: ['isTemplateDialog'],
    data() {
        return {
            systemDefault: [
                { label: '工号', prop: 'workCode', type: 'model' },
                { label: '姓名', prop: 'name', type: 'model' },
                { label: '花名', prop: 'nickname', type: 'normal' },
                { label: '合同签署公司', prop: 'contractCompanyName', type: 'normal' },
                { label: '组织层级', prop: 'departmentTree', type: 'normal' },
                { label: '岗位', prop: 'positionName', type: 'normal' },
                { label: '入职日期', prop: 'joinDate', type: 'normal' },
                { label: '工作城市', prop: 'cityEname', type: 'normal' },
                { label: '职位类别', prop: 'positionTypeName', type: 'normal' }
            ], // 系统默认模板
            isTemltateList: false,
            dialogVisible: true,
            temOptions: [], // 模板列表
            templateIdName: '',
            alltemplateWords: [], // 全部可选字段
            isDefault: false,
            isAddTemplate: false, // 是否是新增
            templateName: '', // 模板名称
            templatechooseName: '',
            canSave: true,
            chooseWords: [
                { label: '工号', prop: 'workCode', type: 'model' },
                { label: '姓名', prop: 'name', type: 'model' }
            ] // 已选字段
        };
    },
    watch: {
        templateName(newVal, oldVal) {
            if (newVal.length > 10) {
                this.$message({
                    message: '输入不超过10个字符',
                    type: 'warning'
                });
            }
        }
    },
    created() {
        // 模板列表
        this.getTemplateList();
        // 获取全部可选字段调用方法
        this.getAlltemplateWord();
    },
    methods: {
        // 选择不同的模板，可选字段根据所选模板展示模板选择字段
        getChooseWord(val) {
            // val为id值
            if (this.temOptions.length) {
                for (var i = 0; i < this.temOptions.length; i++) {
                    if (this.temOptions[i].id === val) {
                        if (this.temOptions[i].value !== null) {
                            // this.chooseWords = this.temOptions[i].value;
                            this.chooseWords = JSON.parse(this.temOptions[i].value);
                            this.templatechooseName = this.temOptions[i].name;
                        } else {
                            this.chooseWords = [
                                { label: '工号', prop: 'workCode', type: 'model' },
                                { label: '姓名', prop: 'name', type: 'model' }
                            ];
                        }
                    }
                }
            }
        },
        handleClose(done) {
            done();
            // 关闭弹框把，选择的模板传给roster父组件
            this.$emit('getTemplateInfo');
            this.getTemplateList();
            if (this.isTemplateDialog) {
                this.dialogVisible = true;
            } else {
                this.dialogVisible = false;
            }
        },
        // 模板管理，展示模板列表
        getTemplateListShow() {
            this.isTemltateList = false;
        },
        getTemlatemanage() {
            this.isTemltateList = true;
        },
        // 模板列表
        getTemplateList() {
            const parms = {
                workCode: this.$docCookies.getItem('username'),
                etcTypeEid: 1 // 模板类型
            };
            tempalteList(parms).then(res => {
                if (res.success) {
                    if (res.data) {
                        this.temOptions = res.data;
                        // this.temOptions = res.data || [];
                        if (this.temOptions.length) {
                            for (var i = 0; i < this.temOptions.length; i++) {
                                if (this.temOptions[i].isDefault) {
                                    if (this.temOptions[i].value) {
                                        // this.chooseWords = this.temOptions[i].value;
                                        this.chooseWords = JSON.parse(this.temOptions[i].value);
                                    } else {
                                        this.chooseWords = [
                                            { label: '工号', prop: 'workCode', type: 'model' },
                                            { label: '姓名', prop: 'name', type: 'model' }
                                        ];
                                    }
                                    this.templateIdName = this.temOptions[i].id;
                                    this.templatechooseName = this.temOptions[i].name;
                                }
                            }
                        } else {
                            this.chooseWords = this.systemDefault;
                        }
                    } else {
                        this.temOptions = [];
                    }
                } else {
                    this.errorMsg(res.message);
                }
            });
        },
        // 全字段选择
        getChooseKey(val) {
            var flag = true;
            for (var i = 0; i < this.chooseWords.length; i++) {
                if (this.chooseWords[i].prop === val.prop) {
                    this.errorMsg('已存在该字段');
                    flag = false;
                    break;
                }
            }
            if (flag) {
                this.chooseWords.push(val);
            }
        },
        // 删除已选字段中Xdiao的数据
        deletChoose(val) {
            for (var i = 0; i < this.chooseWords.length; i++) {
                if (this.chooseWords[i].prop === val.prop) {
                    this.chooseWords.splice(i, 1);
                    break;
                }
            }
        },
        // 添加名字取消
        getCancles() {
            this.isAddTemplate = false;
        },
        // 保存
        getSave() {
            var parms;
            const chooseListWord = JSON.stringify(this.chooseWords);
            if (this.templateName !== '') {
                if (this.temOptions.length > 0) {
                    parms = {
                        workCode: this.$docCookies.getItem('username'),
                        name: this.templateName,
                        etcTypeEid: 1,
                        value: chooseListWord
                    };
                } else {
                    parms = {
                        workCode: this.$docCookies.getItem('username'),
                        name: this.templateName,
                        etcTypeEid: 1,
                        value: chooseListWord,
                        isDefault: true
                    };
                }

                tempalteAdd(parms).then(res => {
                    if (res.success) {
                        // 成功后崇训渲染模板列表
                        this.getTemplateList();
                        this.successMsg(res.message);
                        this.templateName = '';
                        this.isAddTemplate = false;
                    } else {
                        this.errorMsg(res.message);
                    }
                });
            } else {
                this.errorMsg('请先输入模板名称');
            }
        },
        // 保存为当前模板模板编辑
        getEditTemplate() {
            const chooseListWord = JSON.stringify(this.chooseWords);
            if (this.temOptions.length > 0) {
                const parms = {
                    id: this.templateIdName,
                    name: this.templatechooseName, // 下拉框选择的name
                    etcTypeEid: 1, // 1为花名册
                    value: chooseListWord
                };
                tempalteUpdate(parms).then(this.handleTemplateSUcc.bind(this));
            } else {
                this.errorMsg('请另存为模板');
            }
        },
        // 模板删除
        getDeleteTemplate(val) {
            const parms = qs.stringify({
                id: val
            });
            tempalteDelete(parms).then(this.handleTemplateSUcc.bind(this));
        },
        // 模板设置为默认模板
        getSetDefault(val) {
            const parms = qs.stringify({
                id: val
            });
            setDefaultTemplate(parms).then(this.handleTemplateSUcc.bind(this));
        },
        getDialogClose() {
            this.dialogVisible = false;
            this.getTemplateList();
            this.$emit('getTemplateInfo');
            if (this.isTemplateDialog) {
                this.dialogVisible = true;
            } else {
                this.dialogVisible = false;
            }
        },
        handleTemplateSUcc(res) {
            if (res.success) {
                this.templateIdName = '';
                this.getTemplateList();
                this.successMsg(res.message);
            } else {
                this.errorMsg(res.message);
            }
        },
        // 选择好字段后查询信息展示表格
        getsearchTemplateInfo() {
            this.dialogVisible = false;
            this.$emit('getTemplateInfo', this.chooseWords,this.templateIdName);
            if (this.isTemplateDialog) {
                this.dialogVisible = true;
            } else {
                this.dialogVisible = false;
            }
        },
        // 模板添加
        getAddTemplate() {
            this.isAddTemplate = true;
        },
        // 获取全部可选字段
        getAlltemplateWord() {
            tempalteAllWord().then(this.hanldleAllwordSucc.bind(this));
        },
        hanldleAllwordSucc(res) {
            if (res.success && res.data) {
                this.alltemplateWords = getKeyWord(res.data);
            } else {
                this.errorMsg(res.message);
            }
        }
    }
};
</script>
<style scoped>
.el-icon-close {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    cursor: pointer;
}
.dialogWraps >>> .el-dialog__header {
    padding: 20px !important;
    border-bottom: 1px solid #eee;
}
.leftM {
    margin-left: 30px;
}
.rightM {
    margin-right: 15px;
    cursor: pointer;
}
.btns_temp {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.btns_temp >>> .el-button {
    padding: 8px 15px;
    margin-left: 30px;
    margin-right: 20px;
}
.templateNames {
    position: absolute;
    background: #fff;
    top: 50%;
    left: 50%;
    width: 460px;
    height: 200px;
    margin-top: -100px;
    margin-left: -230px;
    border: 1px solid #ddd;
    z-index: 99;
}
.listItems {
    padding: 20px;
}
.listItems >>> .el-input__inner {
    width: 200px;
    height: 30px;
}
.listItems >>> .el-input {
    width: 200px;
    height: 30px;
}

.template_con {
    position: absolute;
    background: #fff;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -230px;
    width: 460px;
    height: 300px;
    border: 1px solid #ddd;
    z-index: 11;
}
.template_lists {
    padding: 10px 0;
    height: 240px;
    overflow: hidden;
    overflow-y: auto;
}
.template_lists::-webkit-scrollbar {
    width: 10px;
    height: 5px; /*宽对应滚动条的尺寸*/
}
/*轨道*/
.template_lists::-webkit-scrollbar-track {
    background: #fff;
}
/*滑块*/
.template_lists::-webkit-scrollbar-thumb {
    background: #d8d8d8;
    border-radius: 2.5px;
}
.template_lists > li {
    padding: 0 15px;
    display: block;
    height: 30px;
    line-height: 30px;
}
.leftSpan {
    float: left;
    line-height: 30px;
}
.rightSpan {
    float: right;
}
.firTop {
    padding: 10 0px;
    display: flex;
    align-items: center;
    width: 60%;
}
.template_tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
}
.firTop >>> .el-input__inner {
    width: 200px;
    height: 30px;
}
.firTop >>> .el-input__icon {
    line-height: 30px;
}
.dialogContain {
    padding: 0 30px;
}
.firTop > span {
    font-size: 14px;
}
.titlesTem {
    margin-right: 15px;
    text-align: right;
}
.temClass {
    color: #409eff;
    cursor: pointer;
    margin-left: 30px;
}
.titSpan {
    display: block;
    height: 30px;
    line-height: 30px;
    margin-top: 25px;
}
.chooseCon > span {
    display: inline-block;
    padding: 8px 20px;
    margin: 15px 18px 0px 0px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
}
.chooseCon > .chooseSp {
    cursor: auto;
}
.deleIcon {
    display: block;
    z-index: 9;
    position: absolute;
    right: 2px;
    top: 0px;
    text-align: right;
    line-height: 20px;
    font-size: 12px;
}
.dialog-footer >>> .el-button {
    padding: 8px 15px;
}
</style>
