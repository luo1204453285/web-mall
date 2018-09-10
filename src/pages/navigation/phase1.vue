<template>
  <div class="navigation">
      <router-link to="home" class="btn">店铺首页</router-link>
      <router-link to="home/recharge/recharge" class="btn">充值</router-link>
      <router-link to="broadband/new/install" class="btn">宽带</router-link>
  </div>
</template>
<script type = 'text/javascript'>

export default {
  data() {
    return {

    }
  },
}
</script>
<style lang = 'less' scoped>
.navigation {
  overflow-y: auto;
  padding-bottom: 10px;
}

.tip {
  padding: 10px;
}

.item {
  margin-top: 20px;
  h1 {
    padding-left: 20px;
    color: #333;
    font-size: 14px;
  }
}

.btn {
  display: block;
  width: 200px;
  height: 45px;
  margin: 10px auto 0;
  line-height: 45px;
  text-align: center;
  background: #fff;
  border-radius: 10px;
  color: rgb( 59, 129, 255);
  box-shadow: 0 0 4px 1px rgba( 59, 129, 255, 0.5);
  &.stop {
    color: rgb( 169, 169, 169);
    box-shadow: 0 0 4px rgba( 169, 169, 169, 0.5);
  }
}
</style>