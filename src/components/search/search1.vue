<template>
    <div class="vp-search">
         <div class="vp-searchbar">
            <i class="vp-searchbar-back" @click="back"></i>
            <div class="vp-searchbar-inner">
                <form action="javascript:" @submit="submitHandler">
                    <input type="search" v-model="curValue" class="vp-searchbar-inner-input" @click="showHolder=false" @blur="blurHandler">
                </form>
                <span  class="vp-searchbar-inner-holder" v-show="showHolder && !curValue">{{placeholder}}</span>
            </div>
            <i class="vp-searchbar-search" @click="submitHandler"></i>
         </div>
         <div class="vp-search-history" v-show="showHistory && history && history.length">
             <h3 class="vp-search-history-title">搜索历史</h3>
             <ul>
                 <li v-for="(item,index) in history" 
                 :key="index"  
                 @click="clickHistoryHandler(item)"
                 class="vp-search-history-item">{{item}}</li>
             </ul>
             <p class="vp-search-history-clear" @click="clearHistoryHandler">清除历史</p>
         </div>
         <div class="vp-search-list" v-show="showList" ref="scroll_wrapper" :style="`bottom:${bottom}`">
            <ul>
                <li v-for="(item,index) in result" 
                    :key="index"
                     @click="clickItemHandler(item)" 
                    class="vp-search-list-item">
                    <span class="vp-search-list-item-text row-2-ellipsis">{{item.addrName}}</span>
                 </li>
            </ul>
         </div>
         <slot></slot>
    </div>
</template>
<script type = 'text/javascript'>
/**
 * vp-search
 * @module components/search
 * @desc 搜索框
 * @param {string} placeholder - 输入框的提示文字
 * @param {string} value - 绑定输入值
 * @param {string} historyKey - 保存在localstorage里的键
 * @param {string} bottom - 如果有底部slot就要设置bottom来控制list距离底部的距离，默认是0
 * @param {string[]} [result] - 结果列表
 * @param {function} @getItem - 点击搜索列表
 * @param {function} @submit - 搜索
 *
 * @example
 * <vp-search placeholder="请输入搜索的内容"
 *         v-model="searchVal"
 *         :result="['搜索结果1','搜索结果2','搜索结果3','搜索结果4']"
 *          @getItem="getItemHandler"
 *          @submit="submitHandler"
 *          >       
 *         </vp-search> 
 */
 const HISTORY_LENGTH = 10; //存储历史纪录数量

    export default {
        props:{
            placeholder: String,
            value: String,
            result: Array,
            historyKey: String,
            bottom:{
                type: String,
                default: '0'
            }
        },
        data() {
            return {
                curValue: this.value,
                history: [],
                showHolder: true,
                showHistory: true,
                showList:false 
            }
        },
        methods:{
            clickHistoryHandler(val){
                this.curValue = val;
            },
            clearHistoryHandler(){
                this.history = [];
                localStorage.removeItem(this.historyKey);
            },
            clickItemHandler(item){
                this.$emit('getItem',item);
            },
            blurHandler(){
                this.showHolder = true;
            },
            submitHandler(){
                if (this.history.length >= HISTORY_LENGTH) this.history.pop();//如果存储的历史数量大于限制，就从数组尾部删除一个
                this.history.forEach((item,index)=>{//如果当前搜索值已在搜索历史中则删除之前的该记录，下面重新push进去
                    if(item === this.curValue) this.history.splice(index,1)
                })
              this.history.unshift(this.curValue);
              window.localStorage.setItem(this.historyKey,JSON.stringify(this.history));
              this.showHistory = false;
              this.showList = true;
              this.$emit('submit');
            },
            back() {
                this.$emit('back');
            }
        },
        created(){
            this.history = localStorage.getItem(this.historyKey) ? JSON.parse(localStorage.getItem(this.historyKey)) : [];       
        },
        watch:{
            curValue(val){
                if(!val){
                    this.showHistory = true;
                    this.showList = false;
                }
                this.$emit('input',val);
            },
            result(val){
                this.$nextTick(()=>{
                  let scroll = new this.BScroll(this.$refs.scroll_wrapper, {
                      click:true
                    // bounce: false,
                    // momentumLimitDistance: 5
                })
              })
            } 
        }

    }
</script>
    <style lang = 'less' scoped>
@import '../../assets/less/mixin.less';
.vp-search{
    position: relative;
    height: 100%;
    background: #F6F5F6;
}
  .vp-searchbar{
      display:flex;
      align-items: center;
      height: 1.28rem;
      padding-top:0.4rem; 
      margin-bottom: 0.2rem;
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
  .vp-search-history{
      padding: 0.30rem 0.11rem;
      background: #fff;
      font-size: 0;
      .vp-search-history-title{
          padding-left: 0.19rem;
          margin-bottom: 0.08rem;
          line-height: 1;
          font-size: 0.26rem;
          color: #222222;
          font-weight: bold;
      }
      .vp-search-history-item{
          display: inline-block;
          padding: 0 0.33rem;
          margin: 0.24rem 0.13rem 0;
          line-height: 0.5rem;
          font-size: 0.24rem;
          color: #353535;
          background: #F6F5F6;
          /* border-radius: 100px; */
      }
      .vp-search-history-clear{
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        font-size: 0.2rem;
        color: #333;
        text-decoration: underline;
      }
  }
  .vp-search-list{
      position: absolute;
      top: 1.28rem;
      /*bottom: 0;*/
      overflow: hidden;
      width: 100%;
      background: #fff;
      
      .vp-search-list-item{
          position: relative;
          width: 100%;
          height: 1.08rem;
          padding:0 0.4rem;
          /*line-height: 1.08rem;*/
          font-size: 0.26rem;
          /*font-weight: bold;*/
          color: #222;
          .border-1px-b();
        .vp-search-list-item-text{
            position: absolute;
            top: 50%;
            transform: translateY(-50%)
        }
      }
  }
</style>