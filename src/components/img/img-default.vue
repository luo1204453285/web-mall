<template>
  <div class="img-box" :style="styles">
    <img src="../../assets/images/default_avator@2x.png" ref="default" class="re-img">
    <img :src="src" @error="loadError" @load="loadHandler" class="cur-img">
  </div>
</template>
<script type = 'text/javascript'>
export default {
  props: ['src', 'width', 'height'],
  data() {
    return {

    }
  },
  computed: {
    styles() {
      const width = this.width && `width: ${this.width}` || ''
      const height = this.height && `height: ${this.height}` || ''
      return `${width};${height};`
    }
  },
  methods: {
    loadError() {
      event.target.style.display="none";
    },
    loadHandler() {
      if (!this.src) event.target.style.display="none";
    },
  }
}
</script>
<style lang = 'less' scoped>
@import '~@/assets/less/theme.less';
.img-box {
  position: relative;
  display: inline-block;
    background: @theme-bg;
    overflow: hidden;

    &.roundimg > img {
      border-radius: 50%;
    }
  .cur-img,.re-img{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 100%;
  }
}
</style>