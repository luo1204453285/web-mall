<template>
    <div class="bottom">
        <ul>
            <li v-for="(item,index) in list" :key="index">
                <i :class="['icon',item.icon,{active: index === isTab}]" @click="tabHandle(index ,item)">
                    <badge v-if="cartCounter > 99 && index == 1" class="badge"></badge>
                    <badge v-if="cartCounter > 0 && cartCounter <= 99 && index == 1" :text="cartCounter" class="badge"></badge>
                </i>
               
            </li>
        </ul>
    </div>
</template>
<script type = 'text/javascript'>
import { mapState, mapMutations } from 'vuex';
import {Badge} from "vux";
export default {
    props: ['tabIndex','cartCounter'],
    components: {Badge},
    data() {
        return {
            
            isTab:0,
           list:[
                {name:'首页',icon:'home',path:'/home'},
                {name:'购物车',icon:'cart',path:'/market/cart'},
                {name:'我的',icon:'mine',path:'/mine/mineOrderView/mineOrderMine'}
           ],
        }
    },
     computed: {
        ...mapState({
            clientCommonData: state => state.client.commonData,
            sessionCart: state => state.market.sessionCart
        }),
     },
    methods: {
        tabHandle (index,item) {
            this.isTab = index
            // this.$router.push({path:item.path})
            // console.log(this.isTab)
            if (this.isTab != 0 && (this.clientCommonData.userId == "" || this.clientCommonData.userId == undefined)  && this.clientCommonData.inApp == 'false') {
                this.$router.push({path: "/registerLogin/login"})
            } else if(this.isTab != 0 && (this.clientCommonData.userId == "" || this.clientCommonData.userId == undefined)  && this.clientCommonData.inApp == 'true' ){ //避免在app内没有登录好会操作订单
                this.$vux.toast.text("登录异常，请重新登录！")
            }
            else {
                this.$router.push({path:item.path})
            }
        }
    },
    created(){
        this.isTab = this.tabIndex
    }
}
</script>
<style lang ="less" scoped>
@import '../../assets/less/mixin.less';
@import '../../assets/less/theme.less';
.bottom {
    width: 100%;
    background: #fff;
    .border-1px-t();
    position: fixed;
    bottom: 0;
    left: 0;
    height: 8.5%;
    ul {
        width: 100%;
        height: 100%;
        display: flex;
        li {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
           
            .icon {
                display: block;
                /* .bg-img(home_UNPRESS);
                background-size: 100%; */
                width: .73rem;
                height: 1rem;
                font-style: normal;
               
            }
            .icon.home {
                .bg-img(home_UNPRESS);
                background-size: 100%;
            }
            .icon.home.active {
                .bg-img(home_press);
                background-size: 100%;
            }
            .icon.cart {
                .bg-img(cart_unpress);
                background-size: 100%;
                position: relative;
                
            }
            .icon.cart.active {
                .bg-img(cart_press);
                background-size: 100%;
                
            }
            .icon.mine {
                .bg-img(my_unpress);
                background-size: 100%;
                
            }
            .icon.mine.active {
                .bg-img(my_press);
                background-size: 100%;
                
            }
            .badge {
                position: absolute;
                top: 0rem;
                right: 0rem;
                background: @theme;
            }
        }
    }
}

</style>
