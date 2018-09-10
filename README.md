
# 项目名

最河北

# 项目地址

[阿里云(测试机用户)](https://stage.vpclub.cn/youxuan/web/app/?userId=931858813531512834&storeId=null#/home)
[内网(测试机用户)](http://stage.vpclub.cn/youxuan/web/app/?userId=931858813531512834&storeId=null#/home)

# 项目资源

[原型地址](https://pro.modao.cc/app/38971a232b413a216e8e0a3a89823b9f13669c89#screen=sc18201a28269c49b27ae7c)
[接口文档](git@gitlab.vpclub:youxuan/documents.git)

# 项目描述

这是一个接入新平台接口的商城webapp。ui库选用[vux](https://vux.li/#/zh-CN/README)

# 运行

## 本地服务

  npm run dev

## 打包

  npm run build

# 项目目录

## src/config/index.js

  项目数据配置：APPID，客服电话，本地开发接口请求地址

## src/assets/images

  项目用到的图片

### src/assets/images/default

项目的不同尺寸的默认图片

### src/assets/less/base.less

    全局样式，在页面中直接添加class即可

### src/assets/less/mixin.less

    全局的mixin

### src/assets/less/reset-vux.less

    重置ui库vux的一些样式

### src/assets/less/reset.css

    重置默认样式

### src/assets/less/theme.less

主题属性。包括[vux暴露出来的属性](https://github.com/airyland/vux/blob/v2/src/styles/variable.less)