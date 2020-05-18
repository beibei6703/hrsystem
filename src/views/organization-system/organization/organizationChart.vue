<template>
    <el-container>
        <el-main>
            <el-header class="header">
                <a class="link" @click="$router.push({ path: '/orhistory' })">查看历史架构</a
                >
                <el-button type="primary" size="mini" @click='exportHrm' style="margin-left: 20px;">导出组织架构和职能</el-button>
                <el-button type="primary" size="mini" @click='productionImage' style="margin-left: 20px;">下载组织架构图</el-button>
            </el-header>
            <el-main>
                <div class="main">
                    <vue2-org-tree @on-expand="onExpand" :collapsable="collapsable" v-if="showTree" id='table' :renderContent="renderContent" :data="hrm" :props="treeProps"/>
                </div>
            </el-main>
        </el-main>
    </el-container>
</template>
<script>
import FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import { getHrm, getHrmHistory } from '@src/api/organization/organize';
import XLSX from 'xlsx';
export default {
    name: 'home',
    data() {
        return {
            treeProps: {
                label: 'name',
                children: 'childrenDepartment',
                expand: 'expand'
            },
            horizontal: true,
            collapsable: true,
            expandAll: false,
            renderContent: function(h, data) {
                return data.name + '\n(' + data.employeeCount + ')';
            },
            formInline: {
                user: '',
                region: ''
            },
            showTree: false,
            hrm: {}
        };
    },
    methods: {
        onExpand(e, data) {
            if ('expand' in data) {
                data.expand = !data.expand;
                if (!data.expand && data.children) {
                    this.collapse(data.children);
                }
            } else {
                this.$set(data, 'expand', true);
            }
        },
        collapse(list) {
            var _this = this;
            list.forEach(function(child) {
                if (child.expand) {
                    child.expand = false;
                }
                child.children && _this.collapse(child.children);
            });
        },
        exportHrm() {
            window.location = '/department/downloadDepartmentTree';
        },
        productionImage() {
            // 手动创建一个 canvas 标签
            const canvas = document.createElement('canvas');
            // 获取父标签，意思是这个标签内的 DOM 元素生成图片
            let canvasBox = document.querySelector('#table');
            // 获取父级的宽高
            const width = parseInt(window.getComputedStyle(canvasBox).width);
            const height = parseInt(window.getComputedStyle(canvasBox).height);
            console.log(width, height);
            // 宽高 * 2 并放大 2 倍 是为了防止图片模糊
            canvas.width = width * 2;
            canvas.height = height * 2;
            console.log(canvas.width, canvas.height);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            // const context = canvas.getContext('2d');
            // context.scale(2, 2);

            const options = {
                backgroundColor: '#fff',
                canvas: canvas,
                useCORS: true,
                width: width,
                height: height * 1.5,
                scale: 2
            };
            html2canvas(canvasBox, options).then((canvas) => {
                // toDataURL 图片格式转成 base64
                let dataURL = canvas.toDataURL('image/png');
                this.downloadImage(dataURL);
            });
        },

        downloadImage(url) {
            // 创建一个 img 标签，把图片插入到 DOM 中
            // 这里使用 img 是因为在客户端中，不能直接下载，要调用原生的方法
            const createImg = document.createElement('img');
            createImg.setAttribute('src', url);
            // 如果是在网页中可以直接创建一个 a 标签直接下载
            let a = document.createElement('a');
            a.href = url;
            a.download = '组织架构';
            a.click();
        },
        getHrm() {
            // 获取组织架构
            getHrm().then(res => {
                if (res.success) {
                    this.showTree = true;
                    this.hrm = res.data;
                }
            });
        },
        downloadExcel() {
            var wb = XLSX.utils.table_to_book(document.querySelector('#table'));
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '组织架构.xlsx');
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout); }
            return wbout;
        },
        getHistory() {
            getHrmHistory({
                id: this.$route.query.id
            })
                .then(res => {
                    this.showTree = true;
                    this.hrm = res.data;
                });
        }
    },
    mounted() {
        if (this.$route.query.id) {
            this.getHistory();
        } else {
            this.getHrm();
        }
    }
};
</script>
<style scoped>
.el-main {
    padding: 0;
}
.el-container{
    height: calc(100% - 90px);
}
.header {
    text-align: right;
    background: #fff;
    margin: 10px;
    line-height: 60px;
}
.header .link {
    color: #409eff;
    text-decoration: underline;
    cursor: pointer;
}
.main {
    margin: 0 10px;
    background: #fff;
    text-align: center;
    overflow-x: scroll;
}
#table{
    /*padding:60px 200px 200px 100px;*/
    padding-bottom:60px;
    margin: 0 auto;
}
</style>
