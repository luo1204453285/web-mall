const APPID = 10000174;
const CUSTOMER_SERVIECE_PHONE = 4008187766;
const isLocal = (location.href.indexOf('localhost') > -1 || location.href.indexOf('172.16.1.') > -1)
// const HOST_NAME = isLocal ? 'http://prod.vpclub.cn' : location.origin;
// const HOST_NAME = isLocal ? 'http://stage.vpclub.cn' : location.origin;
// const HOST_NAME = isLocal ? 'http://devcloud.vpclub.cn' : location.origin;
// const HOST_NAME = isLocal ? 'http://zuihebei.he.chinamobile.com' : location.origin;
const HOST_NAME = isLocal ? 'http://119.23.38.106' : location.origin;

export default{
  HOST_NAME,
  APPID,
  CUSTOMER_SERVIECE_PHONE
}