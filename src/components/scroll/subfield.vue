<template>
  <div class="business">
    <div class="menu_left" ref="menu_left">
      <ul>
        <li v-for="(item,index) in dataList" 
        class="menu_left_item" 
        :class="{'active':index===menuLeftCurIndex}" 
        @click="clickMenuLeft(index)"><span class="menu_left_item_text">{{item.menuName}}</span></li>
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
      heightMap: [],
      menuLeftCurIndex: 0,
      flag: true //解决跨导航点击造成的导航变化
    }
  },
  methods: {
    initSrcollMenuLeft(){//初始化左边内容区域的滑动
      let ml = this.$refs.menu_left;
      this.scrollMenuLeft = new this.BScroll(ml, {
        click:true,
        probeType:2
      })
    },
    initSrcollMenuRight(){//初始化右边内容区域的滑动
      let that = this;
      let mr = this.$refs.menu_right;
      this.scrollMenuRight = new this.BScroll(mr, {
          click:true,        
          bounce:false,
          probeType:3
      })
      
      this.scrollMenuRight.on('scroll',(pos) => {
          if (!that.flag) return;
          // for (let index = that.heightMap.length - 1 ;index > -1;index--) {
          //     if (Math.abs(Math.round(pos.y)) >= that.heightMap[index]) {//
          //        return that.menuLeftCurIndex = index;
          //     }
          // }
          that.heightMap.forEach(function(item,index) {
             if (Math.abs(Math.round(pos.y)) >= item  && item !== that.heightMap[index-1]) {//
                 that.menuLeftCurIndex = index;
              }
          });
        
      }) 
      that.scrollMenuRight.on('scrollStart',() => {
        //这里没有用scrollEnd是因为当probeType:3时，用scrollTo方法滚动会触发scrollEnd，并且滚动结束后还会触发scroll事件。
        //而scrollStart是只有当手指去滚动才会触发（用scrollTo方法是不会触发的）
        //当点击左边的nav时（也就是通过scrollTo滚动时）可以让flag一直为false
        that.flag = true;
      })
      
    },
    clickMenuLeft(index){//左边导航点击事件
        this.flag = false;
        this.menuLeftCurIndex = index;
        if (this.scrollMenuRight.scrollerHeight <= this.scrollMenuRight.wrapperHeight) {
          return;
        }
        this.scrollMenuRight.scrollTo(0,-this.heightMap[index],300);
        
    },
    getInitMenuLeft(){//初始化页面的定位
      this.dataList.some((item,index)=>{
         if(item.menuId === this.getChildId){
           this.clickMenuLeft(index);
         }
      })  
    },
    getHeightMap(){//获取右边内容坐标地图   1.获取最后一屏的scroll坐标。2.如果要移动的区域不够一屏就scroll到最后一屏的坐标
        let list = Array.from(this.$refs.menu_right.children[0].children);
        let last = list[list.length - 1].offsetTop + list[list.length - 1].clientHeight; // 最后一块内容的（后一块内容的）y坐标，所以要加上最后一个元素自身的高度
        let lastScreenY = last - this.viewHeight; //最后一屏的y坐标
        let heightMap = [];//最终的坐标地图

        for (let i = list.length-1 ; i > -1; i--) {
          let cur = list[i].offsetTop;
           if ( last - cur < this.viewHeight ) {
              heightMap.unshift(lastScreenY);
           }else{
              heightMap.unshift(cur);
           }
        }
        this.heightMap = heightMap;
    }
  },
  computed:{
    viewHeight(){//内容视口高度
      return this.$refs.menu_right.clientHeight;
    },
    getChildId(){//需要激活的菜单id
      return this.$route.query.childId || null;
    }

  },
  watch:{
      dataList(){
        this.$nextTick(()=>{
                    this.getHeightMap()
                    this.initSrcollMenuLeft()
                    this.initSrcollMenuRight()
                    this.getInitMenuLeft()
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
    height: 100%;
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
    height: 100%;
    padding: 0 0.3rem;
    background: #fff;
    .menu_right_area{
      padding-bottom: 0.34rem;
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
          }
          .menu_right_item_title {
            // margin-top: -0.24rem;
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
