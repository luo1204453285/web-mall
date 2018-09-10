<template>
    <!--<div v-transfer-dom>-->
        <!--<popup v-model="curValue" class="customer">-->
            <div class="popup-mask" v-show="curValue" @click.self="curValue = false">
                <div class="popup0">
                    <div class="goods">
                        <div class="thumbnail-box">
                            <!--<img class="thumbnail" :src="selectedVal.image || skuArr[0] && skuArr[0].image" alt="商品缩略图" @click="$emit('thumbnailClick')">-->
                            <vp-img-default class="thumbnail" :src="selectedVal.image || (skuArr[0] && skuArr[0].image) || goodsData.coverImage" @click.native="$emit('thumbnailClick')"></vp-img-default>
        
                        </div>
                        <div class="goods-info">
                            <p class="goods-info-title row-2-ellipsis">{{goodsData.name}}</p>
                            <span class="goods-info-tips tips-price">{{selectedPrice | currency}}</span>
                            <span class="goods-info-tips">库存剩余：{{selectedVal.stock || skuArr[0] && skuArr[0].stock}}</span>
                        </div>
                    </div>
                    <div class="sku">
                        <div class="sku-box" v-for="(item1, index1) in keysObj" :key="index1">
                            <p class="title">{{index1}}</p>
                            <div class="check-box">
                                <span class="sku-item" :class="{'selected':item2.selected, 'disabled': item2.disabled }" @click="selectedHandler(index1,index2)" v-for="(item2, index2) in item1" :key="index2">
                                    {{ item2.key }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="count">
                        <p class="title">数量</p>
                        <vp-input-count v-model="count" :maxValue="selectedVal.stock && selectedVal.stock*1 || 0"></vp-input-count>
                    </div>
                    <div class="btn-wrapper" @click="submit">
                        <vp-common-button :content="btnText"></vp-common-button>
                    </div>
                </div>
            </div>
        <!--</popup>-->
    <!--</div>-->
</template>
<script type = 'text/javascript'>

import { vpCommonButton, vpInputCount } from '@/components'
import { Popup, TransferDom, Checker, CheckerItem } from 'vux';

export default {
    directives: {
        TransferDom
    },
    props: {
        btnText: {
            type: String,
            default: '提交'
        },
        goodsData: {
            type: Object,
            require: true
        },
        skuArr: {
            type: Array,
            require: true
        },
        value: {
            type: Boolean,
            require: true
        }
    },
    computed: {
        pathStr() {
            return this.path.join(';');
        },
        noSku() {//判断是否有sku。没有sku的商品后台会返回一条没有skusArray字段的sku对象
            let skus = this.skuArr;
            if (skus.length === 1 && (!skus[0].skusArray || !skus[0].skusArray.length)) {
                return true;
            }
            return false;
        },
        selectedVal() {
            const pathStr =  this.pathStr;
            if (this.noSku)  {
                return this.skuArr[0] 
            } else {
                return this.avalibleObj[pathStr] || {};
            }
            
        },
        selectedPrice() {
            if (!this.pathStr) return this.goodsData.sellPrice * 1
            let prices = this.SKUResult[this.pathStr].prices;

            let maxPrice = Math.max.apply(Math, prices);
            let minPrice = Math.min.apply(Math, prices);
            return (maxPrice > minPrice ? `${minPrice} - ${maxPrice}` : maxPrice);
        }
    },
    components: {
        Popup, Checker, CheckerItem, vpCommonButton, vpInputCount
    },
    data() {
        return {
            keysObj: {},
            avalibleObj: {},
            SKUResult: {},
            path: [],
            curValue: this.value,
            count: 0
        }
    },
    methods: {
        submit() {
            this.$emit('submit', { ...this.selectedVal, num: this.count })
        },
        formatSkus() {//格式化
            let keysObj = {};//
            let avalibleObj = {};
            let hash1 = {};//存储sku标题重复
            let hash2 = {};//存储sku是否重复
            let idObj = {};//存储id是否重复
            this.skuArr.forEach((item1, index1) => {
                let keys = [];//存在的项
                item1.skusArray.forEach((item2, index2) => {
                    const ident = `${index2+1}0${index1}`; //因为商品的id转整数太大，后面的运算会丢失精度
                    let id = item2.propertyValue;
                    let code;
                    let key = item2.propertySetKey;
                    let val = item2.propertyKey;
                    if (!idObj[id]) {
                        idObj[id] = ident;
                        code = ident;
                    }else {
                        code = idObj[id];
                    }
                    keys.push(code)
                    if (!hash2[val]) {
                        hash2[val] = true;
                        let pushObj = {
                            id: code,
                            key: val,
                            selected: false,
                            disabled: false
                        }
                        if (!hash1[key]) {
                            keysObj[key] = []
                            hash1[key] = true;
                        } 
                        keysObj[key].push(pushObj)
                    }

                })
                keys.sort((value1, value2) => parseInt(value1) - parseInt(value2));
                avalibleObj[keys.join(';')] = {
                    ...item1
                }
            });
            this.avalibleObj = { ...avalibleObj }
            this.keysObj = { ...keysObj }
        },
        selectedHandler(key, index) {//点击回调
            let newObj = { ...this.keysObj };
            let path = [];
            let curId = newObj[key][index].id;//当前点击项的id
            if (newObj[key][index].disabled) return
            //选中自己，兄弟节点取消选中
            newObj[key].forEach(item => {
                if (item.id !== curId) {
                    item.selected = false
                }
            })
            newObj[key][index].selected = !newObj[key][index].selected;

            //已经选中的项
            for (let item1 in newObj) {
                for (let item2 of newObj[item1]) {
                    if (item2.selected) path.push(item2.id)
                }
            }
            path.sort((value1, value2) => parseInt(value1) - parseInt(value2));
            const len = path.length;

            if (path.length) {
                //用已选中的节点验证待测试节点 underTestObjs
                let arr = [];
                for (let item1 in newObj) {
                    
                    newObj[item1].map(item2 => {
                        if (!item2.selected && item2.id !== curId) { //如果当前项非选中状态且不是当前点击项
                            let testAttrIds = [];//从选中节点中去掉选中的兄弟节点
                            let curId2 = item2.id;
                            let brotherSelectedId = '';//获取兄弟元素中选中项的id

                            newObj[item1].map(item => {
                                if (item.id !== curId2 && item.selected) {//获取当前的兄弟元素且被选中项的id
                                    brotherSelectedId = item.id;
                                }
                            })
                            if (brotherSelectedId) {
                                for (let i = 0; i < len; i++) {
                                    if (path[i] != brotherSelectedId) {
                                        testAttrIds.push(path[i]);
                                    }
                                }
                            } else {
                                testAttrIds = path.concat();
                            }
                            testAttrIds = testAttrIds.concat(curId2);
                            testAttrIds.sort((value1, value2) => parseInt(value1) - parseInt(value2));
                            const curSkuResult = this.SKUResult[testAttrIds.join(';')]
                            if (!curSkuResult || curSkuResult.stock < 1) {
                                item2.disabled = true;
                                item2.selected = false;
                            } else {
                                item2.disabled = false;
                            }
                        }
                    })
                }

            } else {
                //设置属性状态
                for (let item1 in newObj) {
                    newObj[item1].map(item2 => {
                        if (this.SKUResult[item2.id]) {
                            item2.disabled = false
                        } else {
                            item2.disabled = true
                        }
                    })
                }
            }
            this.keysObj = { ...newObj };
            this.path = [...path];

        },
        //初始化得到结果集
        initSKU() {
            let avalibleObj = { ...this.avalibleObj }
            let i, j, skuKeys = this.getObjKeys(avalibleObj);

            for (i = 0; i < skuKeys.length; i++) {
                let skuKey = skuKeys[i];//一条SKU信息key
                let sku = avalibleObj[skuKey];	//一条SKU信息value
                let skuKeyAttrs = skuKey.split(";"); //SKU信息key属性值数组
                let len = skuKeyAttrs.length;


                //对每个SKU信息key属性值进行拆分组合
                let combArr = this.arrayCombine(skuKeyAttrs);
                for (j = 0; j < combArr.length; j++) {
                    this.add2SKUResult(combArr[j], sku);
                }
                //结果集接放入SKUResult
                this.SKUResult = {
                    ...this.SKUResult,
                    [skuKey]: {
                        stock: sku.stock,
                        prices: [sku.price]
                    }
                }
            }
            //过滤不可选的
            let newKeysObj = { ...this.keysObj };
            for (let item in newKeysObj) {
                newKeysObj[item].map(item2 => (this.SKUResult[item2.id] && (this.SKUResult[item2.id].stock > 0)) ? item2.disabled = false : item2.disabled = true)
            }
            this.keysObj = { ...newKeysObj };

        },
        //获得对象的key
        getObjKeys(obj) {
            if (obj !== Object(obj)) throw new TypeError('Invalid object');
            let keys = [];
            for (let key in obj)
                if (Object.prototype.hasOwnProperty.call(obj, key))
                    keys[keys.length] = key;
            return keys;
        },
        //把组合的key放入结果集SKUResult
        add2SKUResult(combArrItem, sku) {
            let key = combArrItem.join(";");
            let newSKUResult = { ...this.SKUResult }
            if (newSKUResult[key]) {//SKU信息key属性·
                newSKUResult[key].stock += sku.stock;
                newSKUResult[key].prices.push(sku.price);
            } else {
                newSKUResult[key] = {
                    stock: sku.stock,
                    prices: [sku.price]
                };
            }
            this.SKUResult = { ...newSKUResult };
        },

        /**
         * 从数组中生成指定长度的组合
         */
        arrayCombine(targetArr) {
            if (!targetArr || !targetArr.length) {
                return [];
            }

            let len = targetArr.length;
            let resultArrs = [];

            // 所有组合
            for (let n = 1; n < len; n++) {
                let flagArrs = this.getFlagArrs(len, n);
                while (flagArrs.length) {
                    let flagArr = flagArrs.shift();
                    let combArr = [];
                    for (let i = 0; i < len; i++) {
                        flagArr[i] && combArr.push(targetArr[i]);
                    }
                    resultArrs.push(combArr);
                }
            }
            return resultArrs;
        },

        /**
         * 获得从m中取n的所有组合
         */
        getFlagArrs(m, n) {
            if (!n || n < 1) {
                return [];
            }

            let resultArrs = [],
                flagArr = [],
                isEnd = false,
                i, j, leftCnt;

            for (i = 0; i < m; i++) {
                flagArr[i] = i < n ? 1 : 0;
            }

            resultArrs.push(flagArr.concat());

            while (!isEnd) {
                leftCnt = 0;
                for (i = 0; i < m - 1; i++) {
                    if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
                        for (j = 0; j < i; j++) {
                            flagArr[j] = j < leftCnt ? 1 : 0;
                        }
                        flagArr[i] = 0;
                        flagArr[i + 1] = 1;
                        let aTmp = flagArr.concat();
                        resultArrs.push(aTmp);
                        if (aTmp.slice(-n).join("").indexOf('0') == -1) {
                            isEnd = true;
                        }
                        break;
                    }
                    flagArr[i] == 1 && leftCnt++;
                }
            }
            return resultArrs;
        },
        setDefault(){//设置默认选项
            const _this = this;
            
            let newObj = {...this.keysObj};
            Object.keys(newObj).forEach(function(item, index) {
                let item2 = newObj[item]
                for (let index2 = 0, len = item2.length; index2 < len; index2++) {
                    if(!item2[index2].disabled){
                        _this.count = 1;
                        return _this.selectedHandler(item, index2) 
                    }
                }
            });
        }

    },
    watch: {
        skuArr(val) {
            if (!val.length) return console.error('SKU不能为空')
            const skus = this.skuArr;
            if (skus.length === 1 && !skus[0].skusArray.length) {//默认没有sku的商品（但是后台会返回一条没有skusArray字段的sku对象）
                console.log('当前商品没有配置sku')
                return this.count = 1;
            }
            this.formatSkus();
            this.initSKU();
            this.setDefault();
            
        },
        value(val) {
            this.curValue = val;
        },
        curValue(val) {
            this.$emit('input', val)
        }
    }
}
</script>
<style lang = 'less' scoped>
@import '../../assets/less/theme.less';
@import '../../assets/less/mixin.less';
.popup-mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(0,0,0,0.6);
    .popup0{
        position: absolute;;
        bottom: 0;
        width: 100%;
    }
}
.customer {
    overflow-y: initial;
}

.goods {
    display: flex;
    align-items: center;
    height: 1.62rem;
    padding: 0 @page-space;
    .border-1px-b();
    .thumbnail-box {
        position: relative;
        width: 2.1rem;
        height: 100%;
        .thumbnail {
            position: absolute;
            top: -0.68rem;
            width: 2.1rem;
            height: 2.1rem;
            border: 2px solid #fff;
            background: #fff;
        }
    }
    .goods-info {
        flex: 1;
        padding: 0.27rem 0 0.09rem 0.2rem;
        .goods-info-title {
            line-height: 0.42rem;
            font-size: 0.28rem;
            color: #353535;
        }
        .goods-info-tips {
            display: inline-block;
            line-height: 0.42rem;
            font-size: 0.2rem;
            color: #999999;
            margin-right: 0.4rem;
            &.tips-price {
                font-size: .32rem;
                color: @theme;
                letter-spacing: 0;
                line-height: .6rem;
            }

        }
    }
}

.count {
    padding: 0.3rem 0.24rem 0.1rem;
    color:#4A4A4A;
    .title {
        padding-bottom: 0.1rem;
        font-size: 0.24rem;
        color: #333333;
    }
}

.sku {

    .sku-box {
        padding: 0.3rem 0.12rem 0.1rem;
        .title {
            padding: 0 0.12rem;
            font-size: 0.24rem;
            color: #333333;
        }
        .sku-item {
            display: inline-block;
            height: 0.56rem;
            line-height: 0.5rem;
            margin: 0.2rem 0.12rem 0;
            /* padding: 0 0.37rem; */
             padding: 0 0.5rem;
            text-align: center;
            font-size: 0.28rem;
            color: #353535;
            background: #F8F8F8;
            border: 1px solid #F8F8F8;
            &.selected {
                background: #FFFFFF;
                border: 1px solid @theme;
                color: @theme;
            }
            &.disabled {
                /*border: 1px solid @theme;*/
                color: #bdbdbd;
            }
        }
    }
}

.btn-wrapper {
    margin-top: 0.49rem;
}
</style>