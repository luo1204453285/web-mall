//用于存储与客户端传输的数据

//关于标题：1.外部浏览器全程显示店铺首页的标题
//         2.内部浏览器 ：
//                      1）店铺环境：“返回”、“标题”、“分享”
//                      2）工作台环境：“返回”、“标题”
/**
 *        1）环境：environment {工作台：0   店铺：1   分享链接办理：2   二维码办理：3   海报办理：4   其它：5}
 *       2）平台： origin {IOS：1   Android：2   H5:3}
 *      3）用户id：userId
 *     4）店铺id：storeId
 * 
 */
// let SESSION
// let client = sessionStorage.getItem('client')
// if(client != ''){
//   SESSION = JSON.parse(client)
// }else{
//   SESSION = {}
// }
const SESSION = sessionStorage.getItem('client') && JSON.parse(sessionStorage.getItem('client')) || {};
const state = {
    commonData: SESSION.commonData || {
        environment: "1", //默认是店铺
        origin: "2", //默认是安卓
        userId: "",
        storeId: '',
        authorization: '', //授权token，加在请求头就不用传用户信息之类的了
        inApp: 'false',
        openid: '', // 微信登录后的openid
        loginPhone : '',
    },
    shareData: SESSION.shareData || null,
    title: SESSION.title || '',
    headerShow: SESSION.headerShow || true, //控制是否显示公共头部
    beginPath: SESSION.beginPath || '', //第一个页面的path
    shopData: SESSION.shopData || {}, //店铺信息
    userInfo: SESSION.userInfo || {}, //用户信息
    goodsId: SESSION.goodsId || '', //商品id，用于登录跳转回原来的商品详情页
    // tipsFoo : SESSION.tipsFoo || true, //首页弹窗Foo
    shareText: {
        title: "新人大礼包",
        desc: "注册最河北，优惠享不停，最高获得100元话费奖励",
        link: location.origin + '/zuihebei/web/app/#/home',
        // 这里的图片路径需要后台给绝对路径的图片地址
        imgUrl: "http://zuihebei.he.chinamobile.com/group1/M00/02/81/CgoUJltw8JyARsYvAADLdweupYk209.jpg"
    }
}
const getters = {
    handleChannel(state) {
        return state.commonData.environment == '0' ? '1' : state.commonData.environment
    }
}
const mutations = {
    setUserInfo(state, data) {
        state.userInfo = {...data}
    },
    setShopData(state, data) {
        state.shopData = {...data };
    },
    setTitle(state, title) { //设置标题
        state.title = title;
    },
    resetTitle(state) { //重置标题（route.meta里设置的）
        state.title = '';
    },
    toggleHeader(state) { //隐藏与显示头部
        state.headerShow = !state.headerShow;
    },
    
    setCommonData(state, data) {
        let ev = data.environment;
        if (ev && ev != 0 && ev != 1) {
            data.origin = '3';
        }
        state.commonData = {...state.commonData, ...data };
    },
    setBeginPath(state, data) {
        state.beginPath = data;
    },
    setGoodsId(state, data) {
      state.goodsId = data;
    },
    // changeTipsFoo(state , data){
    // //   首页弹窗只出现一次
    //   state.tipsFoo = data;
    // },
    setShareData(state, data) {
        let sub = {
            ...data,
            shareLink: location.origin + location.pathname + location.hash,
            price: ""
        };
        state.shareData = sub;
    },
    delShareData(state) {
        state.shareData = null;
    }
}
const actions = {
    setUserInfo({ commit }, data) {
        commit('setUserInfo', data)
    },
    setCommonData({ commit }, data) {
      commit('setCommonData', data)
    },
    setShopData({ commit }, data) {
        commit('setShopData', data)
    },
    toggleHeader({ commit }) {
        commit('toggleHeader')
    },
    setTitle({ commit }, data) {
        commit('setTitle', data)
    },
    resetTitle({ commit }) {
        commit('resetTitle')
    },
    setShareData({ commit }, data) {
        commit('setShareData', data)
    },
    delShareData({ commit }) {
        commit('delShareData')
    },
    setBeginPath({ commit }, data) {
        commit('setBeginPath', data)
    },
    setGoodsId({ commit }, data) {
      commit('setGoodsId', data)
    },
    // changeTipsFoo({ commit } , data) {
    //     commit('changeTipsFoo',data)
    // }
}

export default {
    state,
    getters,
    mutations,
    actions
}