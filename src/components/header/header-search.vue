<template>
    <div class="header-search" :class="{
          'iphone':clientCommonData.origin == '1',
        }">
            <i class="back" @click="goBack"></i>
        <div class="search-btn" @click="$emit('doSearch')">
            <span class="text">{{placeholder || '输入关键词搜索'}}</span>
            <i class="icon-search white right"></i>
        </div>
    </div>
</template>
<script type = 'text/javascript'>
import { mapState } from 'vuex';
import goBack from './goBack.js';
export default {
    mixins: [goBack],
    props:{
        placeholder: {
            type: String
        }
    },
    computed:{
        ...mapState({
         clientCommonData: state =>state.client.commonData,
        }),
    }
}
</script>
<style lang = 'less' scoped>
@import '../../assets/less/theme.less';
@import '../../assets/less/mixin.less';
.header-search {
    display: flex;
    height: 1.08rem;
    padding: 0.37rem @page-space 0.07rem;
    background: @theme;
    &.iphone {
        height: 1.28rem;
        padding: 0.57rem @page-space 0.07rem;
    }
    .back {
        display: inline-block;
        width: 0.56rem;
            .bg-img(back_white, right, center);
            background-size: 0.56rem;
        }
    .search-btn{
        flex: 1;
        height: 0.64rem;
        padding: 0 @page-space;
        line-height: 0.64rem;
        /* border-radius: 0.32rem; */
        background: rgba(255,255,255,0.2);
        .text{
            font-size: 0.28rem;
            color: @theme-bg;
        }
        .right{
            float: right;
        }
    }
}
</style>