<template>
  <div class="navigation">
    <h1>导航:</h1>
    <a :href="`https://stage.vpclub.cn/youxuan/web/app/${params}`" class="btn">阿里云预演环境</a>
    <a :href="`https://prod.vpclub.cn/youxuan/web/app/${params}`" class="btn">阿里云生产环境</a>
    <a :href="`http://172.16.0.134:8088/${params}`" class="btn">shengchuang</a>
    <a href="`http://172.16.0.150:8088/${params}`" class="btn">lxm</a>

    <!-- <scroll @load="loadData" :noMore="isNoMore">
      <ul>
        <li v-for="item in items" :key="item" style="height: 30px;width: 100%; border: 1px solid #ccc;line-height: 30px;">{{item}}</li>
      </ul>
    </scroll> -->
  </div>
</template>
<script type = 'text/javascript'>
// import Scroll from 'components/scroll/scroll.vue';
export default {
  // components: {
  //   Scroll
  // },
  computed:{
    params() {
      return location.hash.replace('navigation','')
    }

  },
  // data() {
  //   return {
  //     items: [],
  //     isNoMore: false
  //   }
  // },
  // created() {
  //   this.loadData()
  // },
  // methods: {
  //   loadData() {
  //     let arr = [];
  //     alert(1)
  //     for (var index = 0; index < 20; index++) {
  //       arr[index] = index + 1;
  //     }
  //     if (this.items.length > 60) {
  //       return (this.isNoMore = true);
  //     }
  //     this.items = this.items.concat(arr);
  //   },
  // }
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
  /* border-radius: 10px; */
  color: rgb( 59, 129, 255);
  box-shadow: 0 0 4px 1px rgba( 59, 129, 255, 0.5);
  &.stop {
    color: rgb( 169, 169, 169);
    box-shadow: 0 0 4px rgba( 169, 169, 169, 0.5);
  }
}
</style>