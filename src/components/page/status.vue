<template>
    <div class="page-status">
        <div class="wrapper">
            <div class="bg">
                <img :src="imgsrc" width="100%">
            </div>
            <p class="tip">{{tips}}</p>
            <!-- <p class="option" v-if="options" @click="clickHandler">{{options}}</p> -->
        </div>
    </div>
</template>

<script type = 'text/javascript'>
import goBack from '../header/goBack';
export default {
    props: {
        type: { // 1 加载失败   2 程序猿努力开发中 3 暂无内容  4 购物车空空如也 5 暂无订单信息 6 您还没有领取优惠券
            type: String,
            default: '3'
        }
    },
    mixins: [goBack],
    data() {
        return {
        }
    },
    computed: {
        imgsrc() {
            return require(`../../assets/images/page_status/loading${this.type}.png`);
        },
        tips() { //tips
            let arr = ['', '加载失败', '程序猿努力开发中...', '暂无内容', '购物车空空如也~', '还没有相关订单信息', '您还没有领取优惠券']
            return arr[this.type - 0]
        },
        options() { //btn
            let arr = ['', '重新尝试', '返回上级', '返回上级', '去选购', '', '']
            return arr[this.type - 0]
        }
    },
    methods: {
        clickHandler() {
            switch (this.type * 1) {
                case 1:
                    location.reload();
                    break;
                case 2:
                case 3:
                    this.goBack();
                    break;
                case 4:
                    this.$router.replace('/home')
                    break;
                default:
                    break;
            }
        }
    }
}
</script>

<style lang = 'less' scoped>
@import '../../assets/less/theme.less';
.page-status {
    position: absolute;
    top: 0.1rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: #fff;
    /*pointer-events: none;*/
    .wrapper {
        margin-top: 30%;
        .bg {
            width: 3.5rem;
            height: 3.5rem;
            margin: 0 auto;
        }
        .tip {
            text-align: center;
            font-size: 0.32rem;
            ;
            color: #414141;
        }
        .option {
            display: block;
            width: 100%;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
            font-size: 0.20rem;
            color: @theme;
        }
    }
}
</style>