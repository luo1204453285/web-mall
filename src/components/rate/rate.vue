<template>
  <div class="rate">
    <template v-if="disabled">
      <!-- <span class="rate-item rate-item-active" v-for="(item, index) in actives" :key='index'>
        <i class="rate-icon icon-active"></i>
      </span> -->
      <span class="rate-item" v-for="(item, index) in max" :key='index'>
        <i class="rate-icon" :class="[classes[item-1]]"></i>
      </span>
    </template>
    <template v-else>
      <span class="rate-item" v-for="(item, index) in max" @click="selectValue(item)" :key='index'>
        <i class="rate-icon" :class="[classes[item-1]]"></i>
      </span>
    </template>
  </div>
</template>
<script>
export default {
  name: 'rate',
  props: {
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  computed: {
    activeClass () {
      return 'icon-active'
    },
    voidClass () {
      return 'icon-default'
    },
    actives () {
      if (this.value > 5) return 5
      if (this.value < 0) return 0
      return Number.parseInt(this.value)
    },
    classes () {
      let result = []
      let i = 0
      const threshold = this.currentValue
      for (; i < threshold; i++) {
        result.push(this.activeClass)
      }
      for (; i < this.max; i++) {
        result.push(this.voidClass)
      }
      return result
    }
  },
  methods: {
    selectValue (value) {
      this.currentValue = value
      this.$emit('result', this.currentValue)
    }
  }
}
</script>
<style>

.rate {
  display: inline-block;
  vertical-align: middle;
}
.rate-item {
  display: block;
  float: left;
  width: .28rem;
  height: .28rem;
  margin-left: .04rem;
}

.rate-item-active {
  width: .28rem;
  height: .28rem;
}

.rate-icon {
  display: block;
  width: 100%;
  height: 100%;
  background: url('../../assets/images/pingjiatest.png') no-repeat center;
  background-size: 100%;
}

.icon-active {
  background: url('../../assets/images/pingjiatest_active.png') no-repeat center;
  background-size: 100%;
}

</style>
