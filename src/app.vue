<template>
    <router-view></router-view>
</template>
<script>
import urlParse from '@/utils/urlParse.js'
import { isWechat, isQQ, isAndroid, isiOS } from '@/utils/userAgent.js';
import config from '@/config'
export default {
  name: 'App',
  created () {
    // let isweixin = isWechat()
    // let isqqenv = isQQ()
    // let isandroid = isAndroid()
    // let isios = isiOS()
    // console.log('isweixin',isweixin)
    // console.log('isqqenv',isqqenv)
    // console.log('isandroid', isandroid)
    // console.log('isios', isios)
    // console.log('session-created',sessionStorage)
    // if (isweixin) {
    //   // 判断是不是qq浏览器是为了防止在qq浏览器里被误判为微信环境（iOS才有这个问题）
    //   if (isqqenv && isios) return
    //   this.getUserInfo()
    // }
  },
  methods: {
    // async getUserInfo () { // 获取用户信息
    //   let hashdata = urlParse('hash')
    //   let searchdata = urlParse()
    //   let urlData = { ...hashdata, ...searchdata }
    //   console.log('urlData',urlData)
    //   console.log('location.href', location.href)
    //   if (urlData.code) {
    //     let res = await this.$post('wechat/login',{wechatCode: urlData.code})
    //     if(res.returnCode === '1003') return
    //     if (res.returnCode === '1002') { // openid未与手机号关联，需要登录关联
    //       this.$store.dispatch("setCommonData", { //用户 部分信息存入本地
    //         openid: res.dataInfo.ext3User
    //       })
    //     } else if (res.returnCode === '1000') {
    //       this.$store.dispatch("setCommonData", { //用户 部分信息存入本地
    //         loginPhone : res.dataInfo.loginPhone,
    //         userId: res.dataInfo.id,
    //         openid: res.dataInfo.ext3User
    //       })
    //     }
    //     console.log('session-getCoded', sessionStorage)
    //   } else {
    //     // code不存在就发起获取code的请求
    //     let url = encodeURIComponent(`${config.HOST_NAME}/zuihebei/web/app/#/home`)
    //     let res = await this.$get(`wechat/getCode?redirectUri=${url}`)
    //     window.location.href = res.dataInfo.codePath
    //   }
    // }
  }
}
</script>
<style lang = 'less'>

</style>
