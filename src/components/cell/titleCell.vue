<template>
  <div class="cell-title clearfix">
    <img :src="img" alt="" class="cell-title-left">
    <div class="cell-title-right">
      <span class="title-text">{{title}}</span>
      <span class="title-desc" v-if="desc" v-html="desc"></span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props:{
    img:{
      type:String,
      default:require('../../assets/images/HotPot-Home@2x.png'),
    },
    title:{
      type:String
    },
    desc:{
      type:String
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .cell-title{
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.58rem;
    padding: 0 0.24rem;
    background: #fff;
    .cell-title-left{
      width: 0.98rem;
      height: 0.98rem;
      margin-right: 0.26rem;
    }
    .cell-title-right{
      flex: 1 1 auto;
      width: 0;
      .title-text{
        line-height: 0.46rem;
        font-size: 0.28rem;
        color: #353535;
      }
      .title-desc{
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 0.42rem;
        font-size: 0.24rem;
        color: #999999;
      }
    }
  }
</style>
