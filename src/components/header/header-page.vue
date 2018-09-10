<template>
    <div class="header">
        <a href="javascript:" @click="goBack" class="back"></a>
        <span class="title">{{title}}</span>
        <span class="menu" v-if="menu.show" @click="$emit('menu-handler')">
            <img :src="menu.content" v-if="menu.type === 'img'" alt="菜单">
            <span v-if="menu.type === 'text'">{{menu.content}}</span>
        </span>
    </div>
</template>
<script type = 'text/javascript'>
import { mapState, mapMutations } from 'vuex';
import goBack from './goBack.js';
export default {
    mixins: [goBack],
    props: {
        title: {
            type: String,
            require: true,
        },
        menu: {
            type: Object,
            default: () => {
               return {
                    show: false,
                    type: 'text',
                    content: '编辑'
               }
            }
        }
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            clientData: state => state.client,
        }),
        clientCommonData() {
            return this.clientData.commonData;
        },
        clientShareData() {
            return this.clientData.shareData;
        },
        clientShopData() {
            return this.clientData.shopData;
        },
    },
}
</script>
<style lang ="less" scoped>
@import '../../assets/less/mixin.less';
@import '../../assets/less/theme.less';

.header {
    position: relative;
    z-index: 1;
    width: 100%;
    height: @header-height;
    padding: 0 0.14rem;
    background: #fff;
    box-shadow: inset 0 -1px 0 0 rgba(219,219,219,0.50);
    .back,
    .menu {
        position: absolute;
        display: block;
        width: 0.78rem;
        height: @header-height;
    }
    .back {
        left: 0;
        .bg-img(arrow_back, right, center);
        background-size: 0.56rem;
    }
    .menu {
        right: 0;
        img {
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            width: 0.56rem;
        }
        span {
            display: inline-block;
            height: @header-height;
            font-size: 0.28rem;
            line-height: @header-height;
        }
    }
    .title {
        position: absolute;
        left: 0.8rem;
        right: 0.8rem;
        height: @header-height;
        line-height: @header-height;
        text-align: center;
        font-size: 0.32rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
