<template>
    <li class="goods-item">
        <div class="checker child-vertical-middle" @click.stop="$emit('select-goods')">
            <i class="icon icon-checker" :class="{'checked': goodsData.checked}"></i>
        </div>
        <div class="thumbnail">
            <vp-img-default :src="goodsData[keys.coverImage]" width="100%" height="100%"></vp-img-default>
            <img class="thumbnail-statusImg" v-if="goodsData[keys.productStatus] == 2" src="../../assets/images/yixiajia@3x.png">
        </div>
        <div class="info">
            <p class="title row-2-ellipsis">{{goodsData[keys.productName]}}</p>
            <p class="skus">
                <span class="sku-item">{{goodsData[keys.skus]}}</span>
            </p>
            <div class="amountwrap">
                <span class="price">{{goodsData[keys.price] | currency}}</span>
                <span class="count" v-show="!edit">×{{goodsData[keys.num]}}</span>
                <div class="change-amount" v-show="edit">
                    <span class="reduce" @click.stop="change('reduce')">-</span>
                    <input type="number" class="amount" readonly :value="goodsData[keys.num]">
                    <span class="plus" @click.stop="change('plus')">+</span>
                </div>
            </div>
        </div>
    </li>
    
</template>
<script type = 'text/javascript'>
import goodsItem from "./goods-item.js";
import goodsItemCartKeys from "./goods-item-cart-keys.js";
export default {
  props: ["data", "edit"],
  data() {
    return {
      keys: goodsItemCartKeys,
      goodsData: this.data,
    };
  },
  computed: {
    clientData() {
        return this.$store.state.client.commonData;
    },
  },
  methods: {
    async change(type) {
        let num;
        switch (type) {
            case 'plus':
                num = 1
                break;
            case 'reduce':
                num = -1
                break;
            default:
                num = type
                break;
        }
      //添加
      if (this.goodsData.productStatus == 2)
        return this.$vux.toast.text("该商品已下架");
      if (num < 0 && this.goodsData.num * 1 < 2)
        return this.$vux.toast.text("不能再减啦");
      let params = {
        ownerId: this.clientData.userId,
        productId: this.goodsData.productId,
        skuId: this.goodsData.skuId,
        num: num
      };

      let res = await this.$post('cart/editNum', params);
      if (res) {
        const Code = res.returnCode;
        if (Code == 1000) {
            if (num*num === 1) {
                this.goodsData.num = this.goodsData.num * 1 + num
            }else{
                this.goodsData.num = num
            }
            
        }
      }
    },
  },
  watch: {
    data(val) {
      this.goodsData = val;
    }
  }
};
</script>
<style lang = 'less' scoped>
@import "~@/assets/less/theme.less";
@import "~@/assets/less/mixin.less";
.goods-item {
  display: flex;
  .border-1px-t();
  margin: 0 .24rem;
  height: 2.3rem;
  .checker {
    height: 1.19rem;
    padding: 0.15rem 0 0.15rem 0rem;
    box-sizing: content-box;
  }
  .thumbnail {
    flex: 0 0 1.19rem;
    height: 1.19rem;
    width: 1.19rem;
    padding: 0.15rem;
    box-sizing: content-box;
    position: relative;
    .thumbnail-statusImg {
      position: absolute;
      top: 0.15rem;
      width: 1.19rem;
      height: 1.19rem;
    }
  }
  .info {
    flex: 1;
    width: 0;
    padding: 0.36rem 0rem 0.24rem 0;
    .title {
      height: 0.8rem;
      line-height: 0.4rem;
      font-size: 0.28rem;
      color: #353535;
      width: 4.3rem;
    }
    .skus {
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0;
      color: #999999;
      .sku-item {
        margin-right: 0.6rem;
        font-size: 0.2rem;
      }
    }
    .amountwrap {
      line-height: 0.6rem;
      font-size: 0.28rem;
      color: #4A4A4A;
      .count {
        float: right;
        font-size: 0.2rem;
        color: #333333;
      }
      .change-amount {
        float: right;
        height: 0.6rem;
        font-size: 0;
        border: 1px solid @theme-bd;
        /* display: flex; */
        background: #ffffff;
        .reduce,
        .plus {
          display: inline-block;
          width: 0.78rem;
          height: 100%;
          line-height: 0.6rem;
          vertical-align: top;
          text-align: center;
          font-size: 0.28rem;
          color: #4A4A4A;
        }
        .amount {
          display: inline-block;
          width: 1.2rem;
          /* flex: 1; */
          height: 100%;
          vertical-align: top;
          text-align: center;
          border: none;
          background: transparent;
          box-shadow: none;
          border-left: 1px solid @theme-bd;
          border-right: 1px solid @theme-bd;
          font-size: 0.28rem;
          color: #4A4A4A;
          border-radius: 0;
        }
      }
    }
  }
}
</style>