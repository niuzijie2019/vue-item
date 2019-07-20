<template>
  <div class="container">
      <van-nav-bar
        title="个人中心"
        left-text="返回"
        right-text="注册"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    <div class="content">
      <router-view></router-view>
      <div></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Button } from 'vant'
Vue.use(NavBar)
Vue.use(Button)
export default {
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.$router.replace('/register')
    }
  },
  watch: {
    $route (newVal, oldVal) {
      console.log(newVal)
      if (newVal.name === 'user') {
        if (this.$store.state.loginState === 'ok') {
          this.$router.replace('/user/login')
        } else {
          this.$router.replace('/user/nologin')
        }
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (to.name === 'user') {
        const { $store: { state: { loginState } } } = vm
        if (loginState === 'ok') {
          next('/user/login')
        } else {
          next('/user/nologin')
        }
      } else {
        next()
      }
    })
  }
}
</script>

<style lang="scss">

</style>
