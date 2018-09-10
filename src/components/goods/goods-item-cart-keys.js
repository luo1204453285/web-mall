//操作本地购物车相关一定要引入此文件。关于购物车各字段的key，主要是为了让本地购物车和接口购物车字段保持一致
//以获取购物车列表接口出参为准
export default {
    'productList': 'products',
    'productName': 'name', //商品名
    'productId': 'productId',
    'merchantId': 'merchantId',
    'merchantName': 'storeName',
    'price': 'sellPrice',
    'num': 'num',
    'skus': 'skus',
    'skuId': 'skuId',
    'coverImage': 'coverImage',
    'productStatus': 'productStatus' //商品状态  1 可以购买  ，2 不能购买
}