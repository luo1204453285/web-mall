<template>
    <div class="inputInfo_div">
        <input type="number" class="input_style"  name="" ref="input" :placeholder="inputPlaceHolder" v-bind:value="value" v-on:input="updateValue($event.target.value)" @focus="focus" @blur="blur">
    </div>
</template>
<script>
    export default {
        name: 'inputPhone',
        data() {
            return {
                if_first: false,
                isFocus: false,
            };
        },
        props: ["inputPlaceHolder", "value"],
        create() {
        },
        methods: {
            focus(e) { //获取焦点
                this.placeholder = e.target.placeholder ? e.target.placeholder : this.placeholder;
                e.target.placeholder = '';
                if (this.value == '') {
                    this.placeholder = "请输入手机号码";
                    e.target.placeholder = this.placeholder;
                }
                this.$emit('toParent');
            },
            blur(e) { //失去焦点
                // if (this.value == '') {
                //     setTimeout(() => {
                //         this.placeholder="请输入手机号码";
                //         e.target.placeholder = this.placeholder;
                //     },300);
                // } else {
                //     this.if_first = false;
                // }
                this.$emit('toParentBlur');
            },
            updateValue(value) {
                let formattedValue = value
                    .trim()
                    .split('.')[0]
                    .substr(0, 11);
                if (formattedValue !== value) {
                    this.$refs.input.value = formattedValue;
                }
                this.$emit('input', formattedValue);
            }
        }
    }
</script>


<style lang="less" scoped>
    .inputInfo_div {
        height: 0.8rem;
        position: relative;
    }
    .input_style {
        height: 0.7rem;
        width: 70%;
        border: none;
        width: 100%;
        position: absolute;
        top: 50%;
        margin-top: -0.35rem;
    }
</style>