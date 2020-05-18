<template>
  <el-dialog :visible="show"  :before-close="close" class="modal">
    <img :src="data">
  </el-dialog>
</template>
<script>
export default {
    props: ['show', 'close', 'data']
};
</script>
<style scoped>
.modal img {
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

</style>
