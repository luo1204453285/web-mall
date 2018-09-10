<template>
         <div class="vp-searchbar">
            <i class="vp-searchbar-back" @click="$emit('back')"></i>
            <div class="vp-searchbar-inner">
                <form action="javascript:" @submit="$emit('submit',curValue)">
                    <input type="search" v-model="curValue" class="vp-searchbar-inner-input" @click="clickHandler" @blur="showHolder = true" :readonly="readonly">
                </form>
                <span  class="vp-searchbar-inner-holder" v-show="showHolder && !curValue">{{placeholder}}</span>
            </div>
            <i class="vp-searchbar-search" @click="$emit('submit',curValue)"></i>
         </div> 
</template>
<script type = 'text/javascript'>
    export default {
        props:{
            readonly: {
                type: Boolean,
                default: false
            },
            placeholder: String,
            value: String,
        },
        data() {
            return {
                 curValue: this.value,
                 showHolder: true,
            }
        },
        methods:{
            clickHandler() {
                if (this.readonly) return this.$emit('submit')
               this.showHolder=false
            },
            submitHandler() {
                this.$emit('submit',this.curValue)
            },
        },
         watch:{
             value(val){
                this.curValue = val;
             },
            curValue(val){
                this.$emit('input',val);
            },
        }
    }
</script>
<style lang = 'less' scoped>
@import '../../assets/less/mixin.less';
    .vp-searchbar{
      display:flex;
      align-items: center;
      height: 1.28rem;
      padding-top:0.4rem; 
      background: #F9F9F9;      
      box-shadow: inset 0 -1px 0 0 #AFAFAF;
      .vp-searchbar-back{
          width: 0.8rem;
          height: 100%;
          .bg-img("arrow_back");
          background-size: 0.56rem;
      }
      .vp-searchbar-inner{
          position: relative;
          flex:1 1 auto;
          height:0.56rem;
          background: #F9F9F9;
          border: 1px solid #E0DFDF;
          /* border-radius: 100px; */
          form{
              position: absolute;
              top:0;
              z-index: 10;
              width:100%;
          }
          .vp-searchbar-inner-input{
              width:100%;
              height: 0.56rem;
              padding:0 10px;
              font-size: 0.28rem;
              color: #353535;
              border: none;
              background: none;
          }
          .vp-searchbar-inner-holder{
            position: absolute;
            top:0;
            z-index: 1;
            height: 0.56rem;
            line-height: 0.56rem;
            padding: 0 10px;
             font-size: 0.28rem;
              color: #353535;
          }

      }
      .vp-searchbar-search{
          width: 0.8rem;
          height:100%;
          .bg-img("top_up_search");
          background-size: 0.56rem;
      }
  } 
</style>