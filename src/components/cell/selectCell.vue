<template>
<div class="wrapper">
  <router-link :to="to" class="content-cell" :class="{border: hasBorder}">
    <div class="left">{{title}}</div>
    <div class="right">
      <span class="right-text">{{desc}}</span>
      <span class="right-arr" v-show="link"></span>
    </div>
  </router-link>
</div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String
    },
    link: {
      type: Boolean,
      default: true
    },
    to: {
      type: String,
      default: ''
    },
    hasBorder: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/mixin.less';
@import '../../assets/less/theme.less';
.wrapper{
  width: 100%;
  background: #fff;
  padding: 0 @page-space;
}
.content-cell {
  display: flex;
  align-items: center;
  height: 0.98rem;
  font-size: 0.28rem;
  color: #666666;
  background-color: #fff;
  text-decoration: none;
  &.border{
    .border-1px-b();
  }
  .left {
    flex: 1 1 auto;
  }
  .right{
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    .right-text {
      flex: 1 1 auto;
      min-width: 0;
      padding-left: 10px;
      text-align: right;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .right-arr {
      height: 0.56rem;
      width: 0.56rem;
      .bg-img('the_next_level');
      background-size: 0.56rem
    }
  }
  
}
</style>
