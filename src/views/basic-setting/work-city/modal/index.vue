<template>
  <el-dialog :visible="show" :before-close="close" class="modal" title="工作城市">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="工作城市：" :label-width="formLabelWidth" prop="cityEid">
        <el-select v-model="form.cityEid" placeholder="请选择" >
          <el-option
            v-for="item in enumeration.city"
            :key="item.eid"
            :label="item.ename"
            :value="item.eid"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="地点名称：" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="请填写"></el-input>
      </el-form-item>
       <el-form-item label="详细地址：" :label-width="formLabelWidth" prop="address">
        <el-input v-model="form.address" autocomplete="off" placeholder="请填写"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { insertOfficeAddress, updateOfficeAddress } from '@src/api/baseSetting/workCity';
import { mapGetters } from 'vuex';
export default {
    props: ['show', 'close', 'type', 'data'],
    data() {
        return {
            form: {
                cityEid: '',
                name: '',
                address: ''
            },
            formLabelWidth: '120px',
            rules: {
                cityEid: [{ required: true, message: '请选择', trigger: 'blur' }],
                name: [{ required: true, message: '请填写', trigger: 'blur' }, { max: 50, message: '长度不超过50个字符', trigger: 'blur' }],
                address: [{ required: true, message: '请填写', trigger: 'blur' }, { max: 50, message: '长度不超过50个字符', trigger: 'blur' }]
            }
        };
    },
    computed: {
        ...mapGetters(['enumeration'])
    },
    created() {
        this.getEnumeration();
        if (this.type === 'edit') {
            this.form = {
                cityEid: this.data.cityEid,
                name: this.data.name,
                address: this.data.address,
                id: this.data.id
            };
        }
    },
    methods: {
        // 获取枚举类型
        getEnumeration() {
            this.$store.dispatch('enumeration/getEnumDict', 'city');
        },
        save() {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    if (this.type === 'edit') {
                        this.edit();
                    }
                    if (this.type === 'add') {
                        this.add();
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        add() {
            insertOfficeAddress(this.form).then(res => {
                if (res.success) {
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    });
                    this.close();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            });
        },
        edit() {
            updateOfficeAddress(this.form).then(res => {
                if (res.success) {
                    this.$message({
                        message: '保存成功！',
                        type: 'success'
                    });
                    this.close();
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>
<style scoped>
.modal>>>.el-input{
  width:200px;
  height:30px;
}
.modal>>>.el-input__inner{
  width:200px !important;
  height:30px;
}
.modal>>>.el-input__icon{
  line-height: 30px;
}

</style>
