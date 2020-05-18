<template>
  <div class="infonCon">
    <div class="editCon">
      <span @click="getEdit">编辑</span>
    </div>
    <div class="listCon">
      <div class="list">
        <span class="nameTit">重新雇佣日</span>
        <span class="massage">{{data.rehireDate}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: ['show', 'data'],
    data() {
        return {};
    },
    methods: {
        getEdit() {
            this.$emit('changeShow', {type: 'editEmploy', value: true});
        }
    }
};
</script>

<style>
@import "../../../../assets/style/detail.css";
</style>
