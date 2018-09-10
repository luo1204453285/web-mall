<template>
  <div class="navigation">
  
    <p class="tip">测试小哥哥小姐姐们：有啥问题就反馈给括号里边的人哦~</p>
    <div class="item">
      <h1>工作台:</h1>
      <router-link to="home/userInfoView/validate" class="btn">客户信息查询(盛闯)</router-link>
    </div>
    <div class="item">
      <h1>店铺:</h1>
      <router-link to="home" class="btn">店铺-首页(盛闯)</router-link>
      <router-link to="market/type" class="btn">店铺（菜单）-商品分类(盛闯)</router-link>
      <router-link to="home/bookView/bookList" class="btn">店铺（菜单）-预约业务(盛闯)</router-link>
    </div>
    <!--<div class="wrapper">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>-->

    <div class="item">
      <h1>市场:</h1>
      <router-link to="market/list" class="btn">市场-首页(盛闯)</router-link>
    </div>
    <!--<a href="tel:15815861586">15815861586</a>-->
    <a href="tel: 13972333765" class="needsclick" style="display:block;width:100px;height:30px;margin:0 auto;text-align:center;border:1px solid red;border-radius:5px;">
      打电话
    </a>
    <div class="item">
      <h1>我的:</h1>
      <router-link to="mine/mineOrderView/mineOrderList" class="btn">我的订单(毛志辉)</router-link>
      <router-link to="mine/booking/bookingList" class="btn">我的预约订单(毛志辉)</router-link>
      <router-link to="mine/mineClerkView/mineClerkList" class="btn">我的店员(毛志辉)</router-link>
      <router-link to="mine/mineCustomer" class="btn">我的常客(毛志辉)</router-link>
      <router-link to="mine/mineProfitView/mineProfit" class="btn stop">我的收入(三期内容)</router-link>
      <router-link to="phase1" class="btn">一期</router-link>
    </div>
  
  </div>
</template>
<script type = 'text/javascript'>
export default {
  data() {
    return {
      test: 123456564
    }
  },
  created() {
    let _this = this;
    setTimeout(function() {
      _this.test = 13972333
    }, 1000);
  }
}
</script>
<style lang = 'less' scoped>
/*.wrapper{
  display: flex;
  width: 100%;
  height: 100%;
  .box{
    border:1px solid red;
  }
}*/
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