<template>
    <div>
        
        <router-link :to="to || ''"  class="shipping-address" v-if="data && JSON.stringify(data) !== '{}'"> 
            <div class="content">
                <h5 class="title">收货人信息：</h5>
                <div class="user">
                    <span class="name">{{ data.shipName }}</span>
                    <span class="phone" :class="{'color':phoneColor}">{{ data.shipPhone }}</span>
                </div>
                <div class="address">
                    {{ data.province + data.city + data.district + data.detailAddress }}
                </div>
            </div>
            <i class="icon icon-arrow-right" v-if="isLink"></i>
        </router-link>
        <router-link :to="addressList | pushAddr"  class="shipping-address" v-else> 
            <div class="content">
                <div class="address">
                    添加收货地址
                </div>
            </div>
            <i class="icon icon-arrow-right" v-if="isLink"></i>
        </router-link>
    </div>
</template>
<script type = 'text/javascript'>
export default {
    props:['isLink','to','data','phoneColor'],
    data() {
        return {

        }
    },
    computed: {
        addressList () {
            return window.sessionStorage.getItem('addressList') && JSON.parse(sessionStorage.getItem('addressList')) || []
        }
    },
    filters: {
        pushAddr (item) {
            let link = ''
            if (item instanceof Array && !item.length){
                 link = `shipping-add`
            } else {
                 link = `shipping`
            }
            return link
        }
    },
    created () {
        // console.log(this.addressList)
    }
}
</script>
<style lang = 'less' scoped>
.shipping-address {
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    margin-bottom: 0.1rem;
    /* padding: 0.09rem @page-space; */
    padding-bottom: 0.09rem;
    
    background: #fff;
    min-height: 1.2rem;
    .content {
        flex: 1;
        padding: 0 @page-space;
        .title {
            line-height: 0.54rem;
            font-size: 0.24rem;
            color: #333333;
        }
        .user {
            line-height: 0.56rem;
            font-size: 0;
            color: #353535;
            .name {
                margin-right: 0.38rem;
                font-size: 0.28rem;
                vertical-align: middle;
            }
            .phone {
                font-size: 0.28rem;
                vertical-align: middle;
            }
        }
        .address {
            line-height: 0.46rem;
            font-size: 0.26rem;
            word-break: break-all;
            color: #999999;
        }
    }
}
/* .colorLine {
    width: 100%;
    height: .08rem;
    background:url('../../assets/images/colorLine.png') no-repeat center;
    background-size: 100%;
} */
</style>