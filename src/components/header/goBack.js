export default {
    methods: {
        goBack() {
            // if (this.$store.state.client.beginPath === this.$route.path) { //
            //   try {//webview
            //     console.log('返回1-1')
            //     window.LvUJsBridge.invoke('GoBack', {}, function (response) { })
            //   } catch (error) {//外部浏览器头部是没有返回按钮的
            //     alert('js桥返回失败')
            //   }
            // } else {
            //   this.$router.go(-1)
            // }
            // this.$emit('back')
            // this.$router.go(-1)

            if(window.location.href.indexOf('#/registerLogin/register') != -1){
                this.$router.replace({path:'home'})
            } else {
                this.$emit('back')
                this.$router.go(-1)
            }

            // if (window.history.length <= 1) {
            //     this.$router.replace({path:'home'})
            //     return false
            // } else {
            //     this.$emit('back')
            //     this.$router.go(-1)
            // }
        }
    }
}