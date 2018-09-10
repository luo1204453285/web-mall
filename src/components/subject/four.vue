<template>
    <div>
        <slot></slot>
       <div class="content">
            <router-link :to="[childList[index], zoneName ] | link" class="img-wrapper"  v-for="(item,index) in 4" :key="item">
                <img :src="childList[index] && childList[index].cover" alt="专题图片">
            </router-link>
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
        flex-wrap: wrap;
        .img-wrapper{
             flex: 1 1 50%;
            .img-box(40%);
        }
       
    }
</style>