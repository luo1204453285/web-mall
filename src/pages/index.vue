<template>
  <div class="wrapper">
    <router-view :style="`height:${mainHeight}px`" class="content"></router-view>
  </div>
</template>

<script type="text/javascript">
import { mapState } from 'vuex';
import urlParse from '@/utils/urlParse';
import { isWechat, isQQ, isAndroid, isiOS } from '@/utils/userAgent.js';
import config from '@/config'
import { vpHeaderPage } from '@/components';
export default {
  components: {
    vpHeaderPage
  },
  data() {
    return {
      mainHeight: '',
      maskFoo:false,
    }
  },
  computed: {
    routeQuery() {
      return this.$route.query;
    },
    title() {
      let t1 = this.clientData.title;
      let t2 = this.$route.meta.title;
      return t1 || t2;
    },
    isWechat () {
        const ua = navigator.userAgent.toLowerCase(); 
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    },
  },
  mounted() {
    // this.calcMainHeight();
  },
  created() {




    const params = this.$route.query;

    
  },
  methods: {


    calcMainHeight() { //计算主内容区域高度
      this.$nextTick(() => {
        let h1 = document.body.clientHeight; //可见区域
        let h2 = document.getElementsByClassName('header')[0].getBoundingClientRect().height; //头部高度
        let headerShow = this.clientHeaderShow;
        this.mainHeight = headerShow ? h1 - h2 : h1;
      })
    },

  },
  watch: {
  //  clientHeaderShow(val){
  //    this.calcMainHeight();
  //  }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/mixin.less';
@import '../assets/less/theme.less';
.wrapper {
  // opacity: 0.2;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // position: fixed;
  // top: 0;
  // left: 0;
  background: @theme-bg;
  overflow-x: hidden;
  .content {
    position: relative;
    flex: 1 1 0;
    overflow-x: hidden;
    // overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: @theme-bg;
  }
}
</style>
