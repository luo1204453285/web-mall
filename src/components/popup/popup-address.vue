<template>
  <div>
      <popup-picker 
            :show="showPopupPicker" 
            :show-cell="false" 
            :data="addressData" 
            :columns="3" 
            v-model="addressValue" 
            @on-hide ="showPopupPicker = false"
            @on-change = "onChange"
        ref="pickerAddress"></popup-picker>
  </div>
</template>
<script type = 'text/javascript'>
import { PopupPicker } from 'vux';
  export default {
    props:{
      value: {
        type: Boolean,
        require: true
      }
    },
    components: {
      PopupPicker
    },
    created() {
      this.getAddress();
    },
    data() {
      return {
        showPopupPicker: this.value,
        addressData: [],
        addressValue: [],
      }
    },
    methods: {
        onChange(val) {
          let names = this.$refs.pickerAddress && this.$refs.pickerAddress.getNameValues();
          let nameArr = names.split(' ');
          let valueArr = val;
          let obj = {
              province: nameArr[0],
              provinceCode: valueArr[0],
              city: nameArr[1],
              cityCode: valueArr[1], 
              district: nameArr[2],
              districtCode: valueArr[2]
          }
          this.$emit('on-change',obj)
        },
        async getAddress() {
            if (this.addressData.length) return 
            let res = await this.$post('admin/disctricts', {
                districtType: '',//地区类型1：区域 2：省 3：市
                districtCode: '',//地区编码
                parentCode: ''//父级编码
            })
            res = res && res.pageData || []
            if (!res.length) return
            //以下步骤处理数据在 40ms内，没什么问题
            let parentHash = new Set();
            let arr1 = res.filter(item => {
                let type = item.districtType*1;
                if (type === 2 || type === 3 || type === 4) {//剔除区域项
                   if (type === 4) 
                        parentHash.add(item.districtCode)  // 因为type:4的时候会有乡镇信息。所以存一个hash数组，后面如果有item的parent值在数组中就不取
                    return item;
                } 
            })
            let arr2 = [];
            for(let item of arr1) {
                 if(parentHash.has(item.parentCode)) continue
                 arr2.push({
                    type: item.districtType, //组件不需要这个字段，用来自己用
                    name: item.districtName,
                    value: item.districtCode,
                    parent: (item.districtType*1 === 2 ? 0 : item.parentCode)//将省的parent置为0（组件需要）
                })
            }
            this.addressData = arr2;
            
        },
      },
      watch: {
        showPopupPicker(val){
          this.$emit('input',val)
        },
        value(val){
          this.showPopupPicker = val;
        }
      }
  }
</script>
<style lang = 'less' scoped>
  
</style>