<template>
<!--    
    style：本专题样式
        1:不显示 2:显示图片 3:显示名称  4:显示图片和名称
    goodsStyle：商品/业务显示样式
        1:不显示 2:N图
        
    childStyle:子专题样式
        1:不显示 2:2图 3:3图  4:4图  5:5图
        #实际的子专区数量 < 要显示的 图数排版 =》整个专区都不显示  
                    
-->
<div class="title-wrapper">
    <div class="subject-title" v-if="data.style != 2">
        <!-- <img :src="data.icon" class="subject-title-icon" v-if="data.icon"></img> -->
        <span class="subject-title-text" :style="`color:${data.nameColor}`">{{data.name}}</span>
        <router-link :to="link" v-if="link" class="subject-title-link">更多 <i class="moreicon"></i></router-link>
    </div>
    <router-link :to="link" class="img-wrapper" v-if="data.style != 3">
        <img :src="data.cover" alt="父专题封面图"> 
    </router-link>
    <div class="title-list" v-if="data.goodsStyle == 2 && data.subjectGoodsList.length">
        <ul class="list-wrapper">
            <router-link tag="li" :to="`market/detail?id=${item.goodsId}`" class="goods-item" v-for="(item, index) in data.subjectGoodsList.slice(0,5)" :key="index">
                <img :src="item.goodsImgPoster" width="100%">
                <p class="goods-item-name">{{item.goodsName}}</p>
                <p class="goods-item-price">{{item.price | currency}}</p>
            </router-link>
            <router-link tag="li" :to="link" v-if="link && data.subjectGoodsList.length >= 5"  class="goods-item ztmore"></router-link>
        </ul>        
    </div>
</div>
</template>
<script type = 'text/javascript'>
export default {
  props: ["data"],
  // props:['icon','img','title','to','color'],
  computed: {
    link() {
      const obj = this.data; 
      return obj.childSubject == 1
        ? { path: "market/zone/child", query: { parentId: obj.id, zoneName: obj.name } }
        : { path: "market/zone/parent", query: { parentId: obj.id, zoneName: obj.name} };
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang = 'less' scoped>
@import "../../assets/less/theme.less";
@import "../../assets/less/mixin.less";
html{
    overflow-x : hidden; 
    height : 100%;
    margin : 0;
    padding : 0;
    }
.title-wrapper {
    width: 100%;
}
.img-wrapper {
  /* .img-box(43%); */
  display: block;
  height: 3.02rem;
  padding-top: 0;
  /*margin: 0.24rem 0;*/
}
.img-wrapper img{
    display: block;
    width: 100%;
    height: 3.02rem;
}
.subject-title {
  display: flex;
  height: 0.7rem;
  padding: 0 @page-space;
  align-items: center;
  .subject-title-icon {
    width: 0.48rem;
    margin-right: 0.05rem;
  }
  .subject-title-text {
    flex: 1 1 auto;
    width: 0;
    height: 0.7rem;
    line-height: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.28rem;
    /* font-weight: bold; */
    color: #333 !important;
  }
  .subject-title-link {
    width: 1.3rem;
    height: 0.7rem;
    line-height: 0.7rem;
    /* text-align: right; */
    font-size: 0.24rem;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .moreicon {
      display: inline-block;
      height: 0.4rem;
      width: 0.4rem;
      background: url("../../assets/images/moreicon@2x.png") no-repeat center;
      /* .bg-img(moreicon); */
      background-size: 100%;
    }
  }
}
.title-list {
    /* width: 100%; */
    height: 2.85rem;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    padding: 0 0.2rem;
    .list-wrapper {
        display: flex;
        align-items: center;
        /* flex-wrap: nowrap; z*/
        /* min-width: auto; z*/
        height: 100%;
        /* padding: 0 0.2rem; z */
        /* overflow-x: auto; z*/
        overflow-y: hidden;
        .goods-item {
            flex: 0 0 1.6rem;
            margin-right: 0.2rem;
            vertical-align: middle;
            font-size: 0;
            width: 1.6rem;
            height: 2.29rem;
            border: 1px solid #EDEDED;
            img {
                /* display: block;
                width: 1.56rem;
                height: 1.56rem; */
            }
            .goods-item-name {
                width: 100%;
                padding: 0 0.08rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.2rem;
                color: #333333;
            }
            .goods-item-price {
                padding: 0 0.08rem;
                font-size: 0.24rem;
                color: @theme;
            }
            &.ztmore {
                background: url('../../assets/images/ztmore.png') no-repeat center;
                background-size: 100%;
                border: none;
            }
        }
        .goods-item.ztmore {
            margin-right: 0 !important;
        }
    }
}
</style>