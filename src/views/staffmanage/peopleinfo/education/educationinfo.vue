<template>
  <div class="infonCon">
    <div class="editCon">
      <span @click="getEdit">编辑</span>
    </div>
    <div class="baseInfo">
      <div class="listCon">
        <div class="list">
          <span class="nameTit">最高学历</span>
          <span class="massage">{{data.lastEduGradeEname}}</span>
        </div>
        <div class="list">
          <span class="nameTit">最高学位</span>
          <span class="massage">{{data.lastAcademicDegreeEname}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">毕业日期</span>
          <span class="massage">{{data.lastGraduateDate}}</span>
        </div>
        <div class="list">
          <span class="nameTit">专业</span>
          <span class="massage">{{data.lastMajor}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">毕业学校</span>
          <span class="massage">{{data.lastUniversity}}</span>
        </div>
      </div>
    </div>
    <div class="baseInfo topline">
      <div class="listCon">
        <div class="list">
          <span class="nameTit">第一学历</span>
          <span class="massage">{{data.firstEduGradeEname}}</span>
        </div>
        <div class="list">
          <span class="nameTit">第一学历学位</span>
          <span class="massage">{{data.firstAcademicDegreeEname}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">第一学历毕业日期</span>
          <span class="massage">{{data.firstGraduateDate}}</span>
        </div>
        <div class="list">
          <span class="nameTit">第一学历专业</span>
          <span class="massage">{{data.firstMajor}}</span>
        </div>
      </div>
      <div class="listCon">
        <div class="list">
          <span class="nameTit">第一学历毕业学校</span>
          <span class="massage">{{data.firstUniversity}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'education',
    props: ['data'],
    methods: {
        getEdit() {
            this.$emit('changeShow', {type: 'editEducation', value: true});
        }
    }
};
</script>

<style scoped>
@import "../../../../assets/style/detail.css";
</style>
