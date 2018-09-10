<template>
    <div>
      <slot></slot>
       <div class="content">
            <div class="content-item">
                <router-link :to="[(childList[0]), zoneName]| link" class="img-wrapper">
                    <img :src="childList[0] && childList[0].cover" alt="专题图片">
                </router-link>
            </div>
            <div class="content-item">
                <router-link :to="[(childList[1]),zoneName ] | link" class="img-wrapper-block">
                    <img :src="childList[1] && childList[1].cover" alt="专题图片">
                </router-link>
                <router-link :to="[(childList[2]),zoneName] | link" class="img-wrapper-block">
                    <img :src="childList[2] && childList[2].cover" alt="专题图片">
                </router-link>
            </div>
       </div>
       
    </div>
</template>
<script type = 'text/javascript'>
    import link from './mixin.vue';
    export default {
        props:['childList','zoneName'],
        mixins:[link],
        data() {
            return {
                
            }
        }
    }
</script>
<style lang = 'less' scoped>
@import '../../assets/less/mixin.less';
    
    .content{
        display: flex;
        .content-item{
            flex: 1;
            width: 0;
            .img-wrapper {
                .img-box(112%);
            }
            .img-wrapper-block{
                display: block;
                .img-box(56%);
            }
        }
    }
</style>