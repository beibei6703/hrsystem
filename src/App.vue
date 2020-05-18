<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style lang="less">
#app {
font-family:'Avenir',Helvetica,Arial,sans-serif;
-webkit-font-smoothing:antialiased;
-moz-osx-font-smoothing:grayscale;
color:#2c3e50;
background-color:#f7f7f7;
width: 100%;
overflow: hidden;
}
#tabel .org-tree-node-label .org-tree-node-label-inner{
box-shadow: none;
}
#app .org-tree-node-label-inner{
box-shadow: none;
border:1px solid rgba(0, 0, 0, .15);
}
#app .org-tree-node-btn{
box-shadow: none;
border:1px solid rgba(0, 0, 0, .15);
}
.el-tooltip__popper{
width: 80%;
}
</style>
