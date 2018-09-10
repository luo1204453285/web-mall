<template>
  <div>
    <iframe :src="pageUrl" frameborder="0" class="out-link"></iframe>
  </div>
</template>
<script type = 'text/javascript'>
import config from "@/config";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "page",
  components: {},
  data() {
    return {
      pageUrl: ""
    };
  },
  methods: {
    async getUrl(changeUrl) {
      axios.get("video/appPlayWeb/" + changeUrl).then(res => {
        console.log(res);
        if(res.returnCode == '1000'){
          this.pageUrl = 'http://yun.baiyug.cn/vip/index.php?url=' + res.dataInfo.vvurl;
        }
      });
    },
    getParams(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
      let results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  },
  filters: {},
  computed: {},
  created() {
    let urlParams = this.getParams("id");
    this.getUrl(urlParams);
  },
  beforeDestroy() {}
};
</script>
<style lang ="less" scoped>
@import "../../assets/less/mixin.less";
@import "../../assets/less/theme.less";
.out-link {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>
