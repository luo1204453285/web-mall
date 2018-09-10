const phone = {
        methods: {
            valiPhone(phone) {
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[5678]|18[0-9]|14[57])[0-9]{8}$/;
                if (!reg.test(phone)) { //如果格式不对
                    this.$vux.alert.show('输入的手机号格式有误');
                    return false;
                }
                return true;
            }
        }
    }
    //验证提交参数不能为空，例如：
    // if(!this.valiSubData({test:1},{test:'test不能为空'})) return;
const sub_data = {
    methods: {
        valiSubData(data, valiRule) {
            let vdata = data;
            let rule = valiRule;
            let keys = Object.keys(valiRule);
            for (let index = 0, len = keys.length; index < len; index++) {
                let key = keys[index];
                if (!vdata[key]) {
                    valiRule[key] && this.$vux.alert.show(valiRule[key])
                    return false;
                };
            }
            return true;
        }
    }
}


export {
    phone,
    sub_data
}