//npm run dev 命令
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_ROOT: 'http://prod.vpclub.cn',
    // API_ROOT: 'https://devgw.vpclub.cn',
    // API_ROOT: 'https://testgw.vpclub.cn',
    // API_ROOT: 'http://dev.apps.vpclub.io',
    // PARAMS: '?environment=1&origin=2&userId=927478210439319553&storeId=923396062524215297'
    // PARAMS: '?userId=927436988826112000&storeId=null'
    // PARAMS: '?userId=931858813531512834&storeId=null'
    PARAMS: '?userId=926330445574631424&storeId=null'
})