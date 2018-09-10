<template>

    <!--<ul style="padding: 0.12rem;font-size: 0;">-->
        <li class="goods-item">
            <div>
                <vp-img-default :src="data.coverImage" class="cover"></vp-img-default>
                <!--<img :src="data.coverImage" alt="" class="cover">-->
            </div>
            <p class="name row-2-ellipsis">{{data.name}}</p>
            <p class="other">
                <span class="price">{{ data.sellPrice | currency }}</span>
                <span class="rebates" v-if="$store.state.client.commonData.origin*1 !== 3 ">已售{{ [data.virtualSales,data.sellNumber] | prosales}}件</span>
            </p>
        </li>
    <!--</ul>-->
</template>
<script type = 'text/javascript'>
//用此组件时，外层要添加 <ul style="padding: 0.12rem;font-size: 0;"></ul>

    export default {
        props: ['data'],
        data() {
            return {
                
            }
        }
    }
</script>
<style lang = 'less' scoped>
    @import '~@/assets/less/mixin.less';
    .goods-item{
            display: inline-block;
            width: 49.5%;
            /* padding: 0.12rem; */
            vertical-align: top;
            background: #fff;
            height: 5.22rem;
            position: relative;

            margin-top: 1%;
            .img-box{
                height: 3.72rem;
                width: 100%;
                .img-box(100%)
            }
            .name{
                margin: 0.14rem 0 0.24rem;
                line-height: 0.4rem;
                font-size: 0.24rem;
                color: #333333;
                box-sizing: border-box;
                padding: 0 .3rem;
            }
            .other{
                line-height: 1;
                display: flex;
                padding: 0 .3rem;
                position: absolute;
                left: 0;
                bottom: .1rem;
                width: 100%;
                justify-content: space-between;
                .price{
                    margin-right: 0.18rem;
                    font-size: 0.28rem;
                    color: @theme;
                }
                .rebates{
                    font-size: 0.2rem;
                    color: #B0B0B0;
                }
            }

            &:nth-child(odd) {
                margin-right: 1%;
               
            }
             &:nth-child(even) {
                 margin-right: none;
            }
    }
        
</style>