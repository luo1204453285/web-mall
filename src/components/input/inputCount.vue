<template>
    <div class="change-amount">
        <span class="reduce" @click.stop="reduce">-</span>
        <span class="amount">
            <input type="tel" v-model="curVal" 
                onkeyup="value=value.replace(/[^\d\.\-]/g,'');"
                disabled
            >
        </span>
        <span class="plus" @click.stop="plus">+</span>
    </div>
</template>
<script type = 'text/javascript'>
export default {
    props: {
        value:{
            require: true,
            type: Number,
            default: 1
        },
        maxValue: {
            require: true,
            type: Number
        },
        minValue: {
            require: true,
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            curVal: this.value
        }
    },
    methods:{
        reduce(){
            if (this.curVal === this.minValue) return
            this.curVal--;
        },
        plus(){
            if (this.curVal === this.maxValue) return
            this.curVal++;
        }
    },
    watch:{
        value(val){
            this.curVal = val;
        },
        curVal(val){
            this.$emit('input',val*1)
        }
    }
}
</script>
<style lang = 'less' scoped>
.change-amount {
    height: .6rem;
    width: 2.78rem;
    font-size: 0;
    border: 1px solid @theme-bd;
    display: flex;
    /* border-radius: 0.08rem; */
    background: #FFFFFF;
    .reduce,
    .plus {
        display: inline-block;
        width: .78rem;
        /* height: .6rem; */
        line-height: .6rem;
        vertical-align: middle;
        text-align: center;
        font-size: 0.4rem;
        color: #4A4A4A;
        display: flex;
        align-self: center;
        justify-content: center;
    }
    .amount {
        display: inline-block;
        /* width: 1.2rem; */
        flex: 1;
        height:100%;
        vertical-align: middle;
        text-align: center;
        border: none;
        border-left: 1px solid @theme-bd;
        border-right: 1px solid @theme-bd;
        font-size: 0.28rem;
        color: #4A4A4A;

          input{
            width: 100%;
            height: .6rem;
            text-align: center;
            font-size: 0.28rem;
            border: none;
            background: transparent;
            box-shadow: none;
            color: #4A4A4A; /*用@theme-bd ios设备不显示文字*/
          }
    }
    input:disabled, input[disabled]{ 
        color: #4A4A4A;; 
        -webkit-text-fill-color:#4A4A4A;; 
        -webkit-opacity:1; 
        opacity: 1; 
    }
}
</style>