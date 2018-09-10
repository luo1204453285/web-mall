<template>
    <div class="sucess">
            <div class="sucess-header">
                <img :src="imgSrc" alt="背景图">
            </div>
            <div class="sucess-cont">
                <h3 class="cont-title">{{ifSuccess ? '业务信息':'温馨提示'}}</h3>
                <div class="cont-info" v-if="ifSuccess">
                    <slot name="content_item"></slot>
                    <!--<div>
                        <span>充值号码</span>
                        <span>13972333765</span>
                    </div>-->
                </div>
                <div class="cont-fail" v-else>
                    <p class="content">您可返回重新办理或致电官方客服咨询失败原因</p>
                    <p class="title">详询请咨询官方客服：</p>
                    <a :href="`tel: ${serviece}`" class="tel">{{serviece}}</a>
                </div>
            </div>
            <div class="sucess-btns clearfix">
                <slot name="btn"></slot>
                <!--<a href="" slot="btn">返回店铺</a>
                <a href="" slot="btn" class="active">继续办理</a>-->
            </div>
            <div class="tips" v-if="ifSuccess">
                <h4 class="title">温馨提示：</h4>
                <p class="text">实际办理结果以中国移动官方通知为准。如有疑问请咨询官方客服</p>
                <p class="text">官方客服：<a :href="`tel: ${serviece}`" class="tel">{{serviece}}</a></p>
            </div>
            <div class="adver">
                <swiper :auto="true" :loop="true" :aspect-ratio="320/798" v-if="clientCommonData.environment != 0">
                    <swiper-item v-for="(item, index) in swiperList" :key="index">
                        <router-link :to="item | linkFilter">
                            <img :src="item.advertImage || require('../../assets/images/default_banner@2x.png')" width="100%">
                        </router-link>
                    </swiper-item>
                </swiper>
            </div>
            
    </div>
</template>
<script type = 'text/javascript'>
/**
 * 业务办理成功组件
 *  要显示的信息以如下格式（如果有颜色加class="color"）：<div>
 *                          <span>充值号码</span>
 *                           <span>13972333765</span>
 *                      </div>
 * 
 *   按钮以如下格式(如果有颜色加class="active")：    <a href="" slot="btn">返回店铺</a>
 *                     <a href="" slot="btn" class="active">继续办理</a>
 * */
import { Swiper, SwiperItem } from 'vux';
import { mapState,mapMutations } from 'vuex';
import config from '@/config';
import filterLink from '@/mixin/filterLink.js';

export default {
    mixins: [filterLink],
    data() {
        return {
            swiperList: [],
            serviece: config.CUSTOMER_SERVIECE_PHONE
        }
    },

    components: {
        Swiper,
        SwiperItem
    },
    computed: {
        ...mapState({
            clientCommonData: state => state.client.commonData
        }),
         payStatus() { //支付状态 成功(1)/失败(0)
            let status = this.$route.query.status*1;
            if (!status && status !== 0) return this.$vux.alert.show('支付状态标识异常')
            return status
        },
        ifSuccess(){
            return this.payStatus === 1;
        },
        imgSrc() {
            return this.ifSuccess ? require('../../assets/images/right@2x.png') : require('../../assets/images/failure@2x.png')
        }
    },
    methods: {
        ...mapMutations(['toggleHeader']),
        async getAdvertPage() {//获取banner和菜单
            let res = await this.$post('advert/page', {
                pageNumber: 1,
                pageSize: 10,
                userId: this.clientCommonData.userId,
                advertType: 1 //1.首页Banner 2.列表Banner 3.导航管理 4.专题管理 5.H5底部菜单 6.IOS底部菜单 7.ANDROID底部菜单 8.闪屏页管理 9.图文广告 10.工作台
            })

            this.swiperList = res.records;
        },
    },
    beforeDestroy(){
        this.toggleHeader();
    },
    created() {
        this.toggleHeader();
        if(this.clientCommonData.environment != 0){
            this.getAdvertPage();
        }
    }

}
</script>
<style lang = 'less' scoped>
@import '../../assets/less/mixin.less';
@import '../../assets/less/theme.less';
.sucess {
    background: #fff;
}

.sucess-header {
    position: relative;
    width: 100%;
    padding-top: 66.666%;
    overflow: hidden;
    
    img {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
    }
}

.sucess-cont {
    padding: 0 0.24rem;
    overflow:hidden;
    background-color: #fff;
    .cont-title {
        height: 0.88rem;
        line-height: 0.88rem;
        margin-top: 0.02rem;
        text-align: center;
        font-size: 0.28rem;
        color: #666666;
        .border-1px-b();
    }
    .cont-info {
        padding: 0.25rem 0.3rem 0.7rem;
        &>div {
            display: flex;
            height: 0.78rem;
            line-height: 0.78rem;
            span:last-child {
                flex: 1 1 auto;
                width: 0;
                margin-left: 15px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &.color {
                    color: @theme-secondary;
                }
            }
        }
    }
    .cont-fail{
        .content{
            padding: 0.41rem .96rem;;
            font-size: 0.28rem;
            color: #4A4A4A;
            line-height: 0.44rem;
            .border-1px-b();
        }
        .title{
            margin: 0.5rem 0 .16rem;
            text-align: center;
            line-height: 1;
            font-size: 0.24rem;
            color: #666666;
        }
        .tel{
            display: block;
            padding-bottom: 0.7rem;
            line-height: 1;
            text-align: center;
            font-size: 0.32rem;;
            color: @theme;
        }
    }
}

.sucess-btns {
    background-color: #fff;
    padding: 0 0.54rem 0.8rem;
    text-align: center;
    a {
        display: inline-block;
        width: 2.94rem;
        height: 0.74rem;
        line-height: 0.7rem;
        text-align: center;
        font-size: 0.28rem;
        color: #666666;
        border: 1px solid #999999;
        /* border-radius: 0.08rem; */
        &:nth-child(2) {
            margin-left: 0.4rem;
        }
        &.active {
            color: #4A89DC;
            border: 1px solid #4A89DC;
        }
    }
}
.tips{
    margin-top: 0.1rem;
    padding: .23rem @page-space .27rem;
    background: #fff;
    .title{
        font-size: .28rem;
        color: #333333;
        line-height: 0.42rem;
    }
    .text{
        font-size: 0.24rem;
        color: #999999;
        line-height: 0.44rem;
        .text-tel{
            font-size: 0.24rem;
            color: @theme;
        }
    }
}
.adver {
    display: block;
    width: 100%;
    padding: 2%;
    background: @theme-bg;
}
</style>