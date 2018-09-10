import getClass from 'utils/getClass.js'
import goodsItemCartKeys from 'components/goods/goods-item-cart-keys.js'
const productList = [goodsItemCartKeys.productList];
const merchantId = [goodsItemCartKeys.merchantId];
const merchantName = [goodsItemCartKeys.merchantName];
const productId = [goodsItemCartKeys.productId];
const skuId = [goodsItemCartKeys.skuId];
const num = [goodsItemCartKeys.num];

//用于存储与客户端传输的数据
const SESSION = sessionStorage.getItem('market') && JSON.parse(sessionStorage.getItem('market')) || {};
const state = {
    orderCheckResponse: SESSION.orderCheckResponse || {}, //下单接口返回的数据
    orderCheckRequest: SESSION.orderCheckRequest || {}, //下单接口入参
    currentAddress: SESSION.currentAddress || {}, //当前操作的地址信息
    sessionCart: SESSION.sessionCart || [], // 本地购物车
    orderInvoice: SESSION.orderInvoice || {}, //发票信息
    disableSub: SESSION.disableSub || false, //是否可提交
}
const getters = {
    sessionCartGoodsCount: state => {
        let counter = 0;
        for (let item1 of state.sessionCart) {
            for (let item2 of item1.products) {
                counter += item2.num;
            }
        }
        return counter;
    },
    sessionCartInfo() {
        let obj = {
            totalPrice: undefined,

        };

    }

}

const mutations = {
    setOrderCheckResponse(state, data) {
        state.orderCheckResponse = {...data};
    },
    setOrderCheckRequest(state, data) {
        state.orderCheckRequest = {
            ...data
        };
    },
    setCurrentAddress(state, data) {
        state.currentAddress = {
            ...data
        };
    },
    delCurrentAddress(state) {
        state.currentAddress = {};
    },
    addSessionCart(state, data) {
        const addData = data;
        
        if (getClass(addData) !== 'Object')
            throw new Error('添加购物车必须为商品对象');

        // 商家id是否相等： 相等 ==》 商品id是否相等： 相等 ==》 skuId是否相等 ==》 相等： 在当前项商品项数量相加
        //                                   ==》  不等：在当前商家添加一项商品
        //         不等 ==》 在当前商家添加一项商品                不等 ==》新增一个商家记录

        if (state.sessionCart && !state.sessionCart.length) {
            let formatData = format(addData);
            return state.sessionCart.push(formatData);
        }
        for (let i = 0, len = state.sessionCart.length; i < len; i++) {
            let curStore = state.sessionCart[i];

            if (curStore[merchantId] === addData[merchantId]) { //同一个供应商
                for (let j = 0, len = curStore[productList].length; j < len; j++) { //遍历供应商下面的商品
                    let curProd = curStore[productList][j] //当前商品
                    if (curProd[productId] === addData[productId]) { //且同一个商品
                        if (curProd[skuId] === addData[skuId]) { //且同一个sku
                            return curProd[num] += addData[num]
                        }
                    }
                    return curStore.products.unshift(addData); //不同商品或者同一商品不同sku
                }
            }
            //不同商家
            let formatData = format(addData);
            state.sessionCart.unshift(formatData);
        }

    },
    delSessionCart(state, data) { //删除购物车商品要传 productId，merchantId，skuId。如果不传就是清空
        const delData = data;
        console.log('删除的商品信息',delData)
        console.log(delData[productId],skuId)
        if (!delData) return state.sessionCart = [];
        if (!delData[merchantId]) throw new Error('merchantId是必须的')
        if (!delData[productId]) throw new Error('productId是必须的')
        if (!delData[skuId]) throw new Error('skuId是必须的')
        
        for (let i = 0, len1 = state.sessionCart.length; i < len1; i++) {
            let curStore = state.sessionCart[i];
            if (curStore[merchantId] === delData[merchantId]) { //同一个供应商
                for (let j = 0, len2 = curStore[productList].length; j < len2; j++) { //遍历供应商下面的商品
                    let curProd = curStore[productList][j] //当前商品
                    if (curProd[productId] === delData[productId] && curProd[skuId] === delData[skuId]) { //且同一个商品
                        // if (curProd[num] === 1) {
                            state.sessionCart[i][productList].splice(j, 1)
                            if (!curStore[productList].length) state.sessionCart.splice(i, 1)
                            return;
                        // }
                        // return curProd[num]--
                    }
                    if (j === len2 - 1) throw new Error('要删除的商品不存在');
                }
                return state.sessionCart.splice(i, 1)
            }
            if (i === len1 - 1) throw new Error('供应商不存在');

        }
    },
    setOrderInvoice(state, data) {
        if(data.invoiceType !== state.orderInvoice.invoiceType) return state.orderInvoice = {...data}; //类型有变直接赋值
        state.orderInvoice = {...state.orderInvoice,...data}
    },
    delOrderInvoice(state, data) {
        state.orderInvoice = {}
    },
    toggleDisableSub(state, data) {
        if (data === false || data) return state.disableSub = data;
        state.disableSub = !state.disableSub
    }

}
const actions = {
    setOrderCheckResponse({commit}, data) {
        commit('setOrderCheckResponse', data)
    },
    setOrderCheckRequest({commit}, data) {
        commit('setOrderCheckRequest', data)
    },
    setCurrentAddress({commit}, data) {
        commit('setCurrentAddress', data)
    },
    delCurrentAddress({ commit }) {
        commit('delCurrentAddress')
    },
    addSessionCart({commit}, data) {
        commit('addSessionCart', data)
    },
    delSessionCart({commit}, data) {
        commit('delSessionCart', data)
    },
    setOrderInvoice({commit}, data) {
        commit('setOrderInvoice', data)
    },
    delOrderInvoice({commit}, data) {
        commit('delOrderInvoice', data)
    },
    toggleDisableSub({commit}, data) {
        commit('toggleDisableSub', data)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
function format(addData) {
    return {
        [merchantId]: addData[merchantId],
        [merchantName]: addData[merchantName],
        products: [
            {
                ...addData
            }
        ]
    }
}