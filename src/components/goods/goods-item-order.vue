<template>
    <div class="orders-wrapper">
         <vp-goods-item :order="order"></vp-goods-item>
         <ul class="additional-info">
             <li class="item">
                 <span class="title">快递费用：</span>
                 <span class="value">{{order.orderFreight | currency}}</span>
             </li>
             <li class="item">
                 <span class="title">买家留言：</span>
                 <input type="text" maxlength="45" v-model="val" :readonly="readonly"  placeholder="最多输入45个字" class="value row-ellipsis" v-keyBoard>
             </li>
             <!-- <li class="item" v-if="supportInvoice"> //发票暂时不要
                 <span class="title">发票信息：</span>
                 <span class="value row-ellipsis" @click="invoiceClick">{{order.orderInvoice && (order.orderInvoice.invoiceTitle || order.orderInvoice.companyName) || '不开发票'}}</span>
             </li> -->
         </ul>
         <div class="summary">
             <span class="text">
                 共{{order.orderProductQty}}件商品
             </span>
             <span>
                 小计：
                 <span class="price">{{order.orderSumAmount | currency}}</span>
             </span>
         </div>
    </div>
</template>
<script type = 'text/javascript'>
 import {vpGoodsItem} from '@/components';
    export default {
        props:{
            // supportInvoice: {
            //     type: Boolean,
            //     default: false
            // },
            order:{//订单信息
                type: Object
            },
            value:{//v-model: 用户留言
                type: String
            },
            readonly:{//用户留言和发票信息是否只读
                type: Boolean,
                default: true
            }
        },
        computed: {
            supportInvoice() {//是否支持发票  只有有一个商品支持发票就支持
               return this.order.productInfo.some(item => item.needInvoice*1 === 1)
            }
        },
        components:{
            vpGoodsItem
        },
        data() {
            return {
               val: this.value
            }
        },
        methods:{
            invoiceClick(){//选择发票
                if (this.readonly) return 
                this.$emit('on-invoice')
            }
        },
        watch:{
            value(val){
                this.val = val;
            },
            val(val){
                this.$emit('input',val);
            }
        }
    }
</script>
<style lang = 'less' scoped>
    @import '../../assets/less/theme.less';
    @import '../../assets/less/mixin.less';
    .orders-wrapper{   
        margin-bottom: 0.1rem;
        background: #fff;
        .supplier-name{
            padding: 0 @page-space;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.28rem;
            color: #353535;
            background: #fff;
            .icon-supplier-logo{ 
                background: red;
            }
        }
        .goods{
            background: #fff;
            .goods-item{
                display: flex;
                height: 2.36rem;
                .border-1px-t();
                .thumbnail{
                    width: 0.98rem;
                    height: 0.98rem;
                    padding: 0.24rem;
                    box-sizing: content-box;
                }
                .info{
                    flex: 1;
                    padding: 0.27rem @page-space 0.21rem 0;
                    .title{
                        line-height: 0.46rem;
                        font-size:0.28rem;
                        color: #353535;
                    }
                    .skus{
                        height: 0.5rem;
                            line-height: 0.50rem;
                        font-size: 0;
                        color: #999999;
                        .sku-item{
                            margin-right: 0.6rem;
                            font-size: 0.2rem;
                        }
                    }
                    .amount{
                        line-height: 0.46rem;
                        font-size:0.28rem;;
                        /* color: #FF7A00; */
                        color: @theme;
                        .count{
                            float: right;
                            font-size: 0.2rem;
                            color: #333333;
                        }
                    }
                }
            }
        }
        .additional-info{
              margin: 0 @page-space;
              .border-1px-t();
              background: #fff;
            .item{
            /* padding: 0 @page-space; */
                display: flex;
                width: 100%;
                line-height: 0.72rem;
                font-size: 0.24rem;
                color: #666666;
                background: #fff;  
                .title{
                    width: 1.3rem;
                }
                .value{
                    flex: 1;
                    width: 0;
                    border: none;
                    background: none;
                    text-align: right;
                    font-size: 0.24rem;
                    color: #666666;
                }

            }
        }
        .summary{
            height: 0.8rem;
            line-height: 0.8rem;
            margin: 0 @page-space;
            text-align: right;
            font-size: 0.2rem;
            color: #333333;
            background: #fff;
           .border-1px-t();
           /* .border-1px-b(); */
            .text{
                margin-right: 0.1rem;
            }
            .price{
                font-size: 0.32rem;
                color: #565656;
            }
        }
        
    }
</style>