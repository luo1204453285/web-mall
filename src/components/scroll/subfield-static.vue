<template>
  <div class="business">
    <div class="menu_left" ref="menu_left">
      <ul>
        <li v-for="(item,index) in dataList" 
        class="menu_left_item" 
        :class="{'active':index===menuLeftCurIndex}" 
        @click="clickMenuLeft(index,item.menuId)"><span class="menu_left_item_text">{{item.menuName}}</span></li>
      </ul>
    </div>
    <div class="menu_right" ref="menu_right">
        
      <ul>
        <slot name="menu_right_item"></slot>
        <!--<li class="menu_right_area" v-for="item in dataList">
          <p class="through_line_title">
            <span class="through_line"></span>
            <span class="through_title">{{item.menuName}}</span>
            <span class="through_line"></span>
          </p>
          <ul class="menu_right_content">
            <li v-for="combo in item.combo" class="menu_right_item">
              <router-link to="flow/detail/1" class="menu_right_item_link">
                <img :src="combo.thumbnail" alt="" class="menu_right_item_img">
                <p class="menu_right_item_title">{{combo.title}}</p>
              </router-link>
            </li>
          </ul>
        </li>-->
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
/**
 * dataList格式如下。records为slot里li标签循环用的数据
 * {
 *        menuName:'菜单名',
 *        menuId: '菜单id',
 *        records: []
 *   }
 */
export default {
    props: {
        dataList:{
            type: Array,
            require: true
        }
    },
  data() {
    return {
      scrollMenuLeft: null,
      scrollMenuRight: null,
      menuLeftCurIndex: 0,
    }
  },
  methods: {
    // initSrcollMenuLeft(){//初始化左边内容区域的滑动
    //   let ml = this.$refs.menu_left;
    //   this.scrollMenuLeft = new this.BScroll(ml, {
    //     click:true,
    //     probeType:2
    //   })
    // },
    // initSrcollMenuRight(){//初始化右边内容区域的滑动
    //   let mr = this.$refs.menu_right;
    //   this.scrollMenuRight = new this.BScroll(mr, {
    //       click:true,        
    //       bounce:false,
    //       probeType:3
    //   })
      
    // },
    clickMenuLeft(index,menuId){//左边导航点击事件
        this.menuLeftCurIndex = index;
        this.$emit('menu-handler',menuId)
    },
    
  },
  // computed:{
  //   viewHeight(){//内容视口高度
  //     return this.$refs.menu_right.clientHeight;
  //   }
  // },
  watch:{
      dataList(){
        this.$nextTick(()=>{
                    // this.initSrcollMenuLeft()
                    // this.initSrcollMenuRight()
                })
      }
  }
}
</script>

<style  rel="stylesheet/less"  lang="less" scoped>
@import '../../assets/less/mixin.less';
@import '../../assets/less/theme.less';
.business {
    position: absolute;
    top:0;
    bottom: 0;
    display: flex;
    width: 100%;
    overflow: hidden;
  .menu_left {
    flex: 0 0 1.8rem;
    width: 1.8rem;
    overflow-y:scroll;
    .menu_left_item {
      position: relative;
      height: 1.2rem;
      font-size: 0.24rem;
      color: #999999;
      &.active {
        color: @theme;
        background-color: #fff;
      }
      .menu_left_item_text{
        position: absolute;
        top: 50%;
        transform: translate3d(0,-50%,0);
        display:-webkit-box;
        width: 100%;
        text-align: center; 
        overflow:hidden;
        text-overflow:ellipsis;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2; 
      }
    }
  }
  .menu_right {
    flex: 1 1 auto;
    padding: 0 0.3rem;
    background: #fff;
    overflow-y:scroll;
    .menu_right_area{
      padding-bottom: 0.34rem;
      min-height: 0;
    }
    .through_line_title {
      height: 1.2rem;
      line-height: 1.2rem;
      //因为配的图片上面很大的留白
      margin-bottom:-0.2rem;
      // margin-bottom: 0.08rem;
      text-align: center;
      font-size: 0.28rem;
      color: #666666;
      .through_line {
        display: inline-block;
        width: 0.48rem;
        height: 1px;
        vertical-align: middle;
        .border-1px-b();
      }
      .through_title {
        display: inline-block;
        padding: 0 12px;
      }
    }
    .menu_right_content {
      font-size: 0;
      .menu_right_item {
        display: inline-block;
        width: 1.5rem;
        margin-bottom: .16rem;
        &:nth-child(3n-1){
          margin:0 0.3rem;
        }
          .menu_right_item_img {
            display: block;
            width: 100%;
            height: 1.5rem;
            border: 1px solid #d2d2d2;
          }
          .menu_right_item_title {
            // margin-top: 0.08rem;
            line-height: 1;
            text-align: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #333;
            font-size: 0.24rem;
          }
        
      }
    }
  }
}
</style>
