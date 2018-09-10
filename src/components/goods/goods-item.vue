<template>
  <div class="goods-item-wrapper">
            <h4 class="supplier-name">
                <i class="icon icon-checker" :class="{'checked': orderData.checked}" v-show="isCart" @click.stop="$emit('check-supplier',orderIndex)"></i>
                <i class="icon icon-supplier-logo"></i>
                <span class="text">{{orderData.merchantName}}</span>
            </h4>
            <ul class="goods">
                <li class="goods-item" v-for="(goodsItem,goodsIndex) in orderData.productInfo" :key="goodsIndex">
                    <div class="checker child-vertical-middle" v-show="isCart" @click.stop="$emit('check-goods',orderIndex,goodsIndex)">
                        <i class="icon icon-checker" :class="{'checked': goodsItem.checked}"></i>
                    </div>
                    <div class="thumbnail">
                         <vp-img-default :src="goodsItem.coverImage" width="100%" height="100%"></vp-img-default>

                        <!--<img :src="goodsItem.coverImage" alt="缩略图" width="100%" height="100%">-->
                    </div>
                    <div class="info">
                        <p class="title row-2-ellipsis">{{goodsItem.name}}</p>
                        <span class="count" v-show="!edit">×{{goodsItem.productQty}}</span>
                        <p class="skus">
                            <span class="sku-item">{{goodsItem.skusArray}}</span>
                        </p>
                        <div class="amount">
                            <span class="price">{{goodsItem.sellPrice | currency}}</span>
                           
                            <div class="change-amount" v-show="edit">
                                <span class="reduce" @click.stop="$emit('calc-reduce',orderIndex,goodsIndex)">-</span>
                                <input type="number" class="amount" :value="goodsItem.productQty">
                                <span class="plus" @click.stop="$emit('calc-plus',orderIndex,goodsIndex)">+</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
    </div>
    
</template>
<script type = 'text/javascript'>
import goodsItem from './goods-item.js'
export default {
    mixins:[goodsItem]
}
</script>
<style lang = 'less' scoped>
@import './goods-item.less';
</style>