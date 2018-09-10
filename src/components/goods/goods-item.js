export default {
  props: {
        orderIndex:{//当前订单的index
            type: Number,
        },
        order: {//当前订单信息
            type: Object
        },
        edit: {//是否启用编辑
            type: Boolean
        },
        isCart: {//是否为购物车模式
            type: Boolean
        },
    },
    data() {
        return {
            orderData: this.order
        }
    },
    watch: {
        order(val){
          
            this.orderData = val;
        }
    }
}