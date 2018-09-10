
const ua = navigator.userAgent.toLowerCase(); 
console.log(ua)
const isWechat = () => ua.match(/MicroMessenger/i) == "micromessenger" //是否微信
const isQQ = () => !!ua.match(/mqqbrowser|qzone|qqbrowser/i)
const u = navigator.userAgent, app = navigator.appVersion
const isAndroid = () => u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
const isiOS = () => !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
export {
  isWechat,
  isQQ,
  isAndroid,
  isiOS
}