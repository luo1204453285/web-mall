<template>
    <button 
    type="button" 
    :class="['commonButton',{'radius':radius,'disable':disable}]" 
    @click="clickAction">
          {{content}}
    </button>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
    }
  },
  methods: {
     clickAction(){
       if (this.disable) return;
         this.$emit('click')
     }
  },
  props:{
      content:{
        type:String,
        required: true
      },
      radius:{
        type:Boolean,
        default:false
      },
      disable:{
        type:Boolean,
        default:false
      }

   }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/theme.less';
.commonButton{
    background-color: @theme;
    // background-image: linear-gradient(90deg, #FF4C12 0%, #FF2E2D 100%);
    color: white;
    font-size: 0.32rem;
    line-height: 0.98rem;
    height: 0.98rem;
    text-align: center;
    width: 100%;
    border: none;
    &.radius{
      // border-radius: 0.04rem;
    }
    &.disable{
      background:#ccc;
    }
}
</style>
