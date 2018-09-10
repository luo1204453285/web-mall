<template>
  <div class="wrapper" ref="scroll">
    <div>
      <slot></slot>
    </div>
    <div class="scroll-loading" v-show="loading && !noMore">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
        <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"/>
        </path>
      </svg>
    </div>  
    <p v-show="noMore" class="scroll-loaded">没有更多了...</p >
  </div>
</template>

<script>
export default {
  name: "Scroll",
  props: {
    noMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroller: null,
      loading: true,
      timer: null
    };
  },
  computed: {
    clientHeight() {
      //获取视口高度
      return this.scroller && this.scroller.clientHeight;
    }
  },
  mounted() {
    this.scroller = this.$refs.scroll;
    if (this.scrollHeight() < this.clientHeight) {//文档高度小于视口高度(内容不足一屏)
      return (this.loading = false);
    }
    this.scroller.addEventListener("scroll", e => {
      const [scrollTop, scrollHeight] = [this.scrollTop(), this.scrollHeight()];
      console.log(`文档高度: ${scrollHeight}\n 滚动高度: ${scrollTop} \n 视口高度：${this.clientHeight}`)
      if (scrollHeight <= Math.round(scrollTop + this.clientHeight)) {
        this.timer = setTimeout(() => {
          this.$emit("load");
          clearTimeout(this.timer)
        }, 1000);
      }
    });
  },
  beforeDestroy() {
    clearTimeout(this.timer)
    this.timer = null;
  },
  methods: {
    scrollHeight() {
      //获取文档完整的高度
      let h = 0;
      for (let item of this.scroller.children) {
        h += item.scrollHeight;
      }
      return h;
    },
    scrollTop() {
      //获取滚动条当前的位置
      return this.scroller && this.scroller.scrollTop;
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.scroll-loading {
  width: 30px;
  height: 50px;
  margin: 0 auto;
  padding: 10px 0;
}
.scroll-loaded {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ccc;
}
</style>
