
import axios from 'axios';

export default function (shareContent, successFunc) { //微信分享
  
  axios.post('http://zuihebei.he.chinamobile.com/raffle/share/share/findShareConfig', {
      pageUrl : window.location.href
  }).then(
    function (response) {
      console.log(response)
      let shareData = response.dataInfo;
      console.log("分享配置",shareData);
      if (!shareData) return console.warn('分享配置信息为空')
      var shareInfo = {
        title: shareContent.title,
        desc: shareContent.desc,
        link: shareContent.link,
        imgUrl: shareContent.imgUrl,
        // 分享成功回调
        success: function () {
          successFunc && successFunc();
        }
      }
      wx.config({
        debug: false,
        appId: shareData.appId,
        timestamp: shareData.timestamp,
        nonceStr: shareData.nonceStr,
        signature: shareData.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
      });
      console.log(shareInfo);
      wx.ready(function () {
        wx.onMenuShareTimeline(shareInfo);
        wx.onMenuShareAppMessage(shareInfo);
        wx.onMenuShareQQ(shareInfo);
        wx.onMenuShareWeibo(shareInfo);
        wx.onMenuShareQZone(shareInfo);
      });
      wx.error(function (res) {
        console.log(res);
      });

    }
  ).catch(
    function (error) {
      console.log(error);
    }
  );


};
