<template>
  <div class="container">
    <van-nav-bar
      title="登录"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          :right-icon="usernameIcon"
          label="用户名"
          placeholder="请输入手机号"
          :error-message="usernameState"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :right-icon="passwordIcon"
          :error-message="passwordState"
          required
        />
        <van-button type="primary" :disabled = "flag" :loading ="flag" loading-text = "登录中..." size="large" @click="login">登录</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Cell, CellGroup, Button, Toast, Dialog } from 'vant'
import { mapState } from 'vuex'

Vue.use(NavBar)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
export default {
  data () {
    return {
      username: '18752021112',
      password: '123456',
      flag: false
    }
  },
  computed: {
    ...mapState({
      loginState (state) {
        return state.loginState
      }
    }),
    usernameState () {
      if (this.username === '') {
        return ''
      } else if (!(/^1[3456789]\d{9}$/.test(this.username))) {
        return '用户名错误'
      } else {
        return ''
      }
    },
    passwordState () {
      if (this.password === '') {
        return ''
      } else if (this.password.length < 6) {
        return '密码错误'
      } else {
        return ''
      }
    },
    usernameIcon () {
      if (this.username === '') {
        return ''
      } else if (!(/^1[3456789]\d{9}$/.test(this.username))) {
        return ''
      } else {
        return 'checked'
      }
    },
    passwordIcon () {
      if (this.password.length >= 6) {
        return 'checked'
      } else {
        return ''
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.$router.replace('/register')
    },
    login () {
      this.flag = true
      if (this.usernameIcon !== 'checked') {
        Toast('用户名格式错误')
        return
      }
      if (this.passwordIcon !== 'checked') {
        Toast('密码格式错误')
      }
      fetch('https://www.daxunxun.com/users/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'username=' + this.username + '&password=' + this.password
      }).then(res => res.json()).then(data => {
        console.log(data)
        if (data === 1) {
          this.flag = false
          Toast('登录成功')
          console.log(this.$store)
          this.$store.commit('changeLoginState', {
            result: 'ok'
          })
          this.$router.back()
        } else if (data === 2) {
          Dialog.confirm({
            title: '提示',
            message: '该用户未注册，是否跳转到注册页面'
          }).then(() => {
            // on confirm
            this.$router.replace('/login')
          }).catch(() => {
            // on cancel
          })
        } else if (data === -1) {
          Toast('密码错误')
        } else {
          Toast('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
