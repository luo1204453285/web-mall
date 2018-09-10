<template>
  <div class="payType">
    <div class="title">
      选择支付方式
    </div>
    <!-- <div class="item" v-if="this.clientCommonData.inApp == 'true'" :class="{active:currentVal === hebaoPay}" @click="currentVal = hebaoPay">
        <i class="icon_hepay icon"></i>
        <span class="item_text">和包支付<em class="item_text_explain">（可用电子券抵扣）</em></span>
        <i class="icon_radio icon"></i>
    </div> -->
     <div v-if="this.clientCommonData.inApp == 'false' && isWechat" class="item" :class="{active:currentVal === wePay}" @click="currentVal = wePay">
        <i class="icon_wechat icon"></i>
        <span class="item_text">微信支付</span>
        <i class="icon_radio icon"></i>
    </div>
     <div class="item" v-if="!isWechat" :class="{active: currentVal === alipay}" @click="currentVal = alipay" >
        <i class="icon_alipay icon"></i>
        <span class="item_text">支付宝</span>
        <i class="icon_radio icon"></i>
    </div>
    
    <!-- <div class="item" v-if="this.clientCommonData.inApp == 'true'" :class="{active:currentVal === UnionPay}" @click="currentVal = UnionPay">
        <i class="icon_union icon"></i>
        <span class="item_text">银联</span>
        <i class="icon_radio icon"></i>
    </div> -->
   
  </div>
</template>

<script type="text/javascript">
// import { isWechat } from '@/utils/userAgent'
import { mapState, mapMutations } from 'vuex';
export default {
  props:['value'],
  data() {
    return {
    //  isWechat: isWechat(),
      alipay: {
        payType: 14,//超支付的支付类型（支付宝、微信）
        payPlatform:3,//支付方式（扫码、h5、原生）
        CmobileType:0//移动的支付类型
      },
      UnionPay:{
        payType: 97,
        payPlatform:3,
        CmobileType:0
      },
       hebaoPay:{
        payType: 105,
        payPlatform:3,
        CmobileType:0
      },
      wePay:{
        payType: 16,
        payPlatform:3,
        CmobileType:0
      },
      currentVal: {}
    }
  },
  computed: {
    isWechat () {
      const ua = navigator.userAgent.toLowerCase(); 
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    ...mapState({
      clientData: state => state.client,
    }),
    clientCommonData() {
      return this.clientData.commonData;
    },
  },
  watch:{
    currentVal(val){
      this.$emit('input', val);
    },
    value(val){
      this.currentVal = val;
    }
  },
  created(){
    // console.log(isWechat)
    if (this.clientCommonData.inApp == 'false') {
      if (this.isWechat) {
         this.currentVal = this.wePay;
      } else {
       this.currentVal = this.alipay;
      }
    } else {
      this.currentVal = this.alipay;
    }
    // this.currentVal = this.wePay;
    this.$emit('input', this.currentVal);
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/less/mixin.less';
  .payType{
    background-color: #fff;
    .title{
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.28rem;
      color: #666666;
      .border-1px-b();
    }
    .item{
      height: 0.98rem;
      .border-1px-b();
      font-size: 0;
      .icon{
        display: inline-block;
        width: 0.48rem;
        height: 100%;
        vertical-align: top;
        &.icon_alipay{
          .bg-img('pay_pay_treasure');
          background-size: 100% auto;
        }
        &.icon_wechat{
          .bg-img('pay_wechat');
          background-size: 100% auto;
        }
        &.icon_union{
          .bg-img('pay_yl');
          background-size: 100% auto;
        }
         &.icon_hepay{
          .bg-img('pay_hb');
          background-size: 100% auto;
        }
      }

      .item_text{
        display: inline-block;
        height: 0.98rem;
        margin-left: 0.24rem;
        line-height: 0.98rem;
        font-size: 0.28rem;
        color: #353535;
        &_explain {
          font-size: .26rem; 
          font-style: normal;
          color: @theme-secondary;
        }
      }
      .icon_radio{
        float: right;
        .bg-img('goodsdetail_take1');
        background-size: 100% auto;
      }
      &.active .icon_radio{
        // .bg-img('goodsdetail_take');
        .bg-img(goodsdetail_chioe_press);  
        background-size: 100% auto;
      }
      &:last-child{
        .border-none();
      }

    }
  }
</style>
