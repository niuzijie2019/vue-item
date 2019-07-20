<template>
  <div class="container">
    <van-nav-bar
      title="注册"
      right-text="登录"
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
        <van-field
          v-model="sms"
          center
          required
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button slot="button" size="small" id="code" @click="sendCode" :disabled="flag" type="primary">发送验证码</van-button>
          <!-- <button>发送验证码</button> -->
        </van-field>
        <van-button type="primary" size="large" @click="register">注册</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Button, Field, Cell, CellGroup, Toast, Dialog } from 'vant'
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue.use(Toast)
Vue.use(Dialog)
export default {
  data () {
    return {
      username: '',
      password: '',
      sms: '',
      code: '',
      flag: false
    }
  },
  computed: {
    usernameState () {
      if (this.username === '') {
        return ''
      } else if (!(/^1[3456789]\d{9}$/.test(this.username))) {
        return '用户名格式错误，必须是11位的手机号码'
      } else {
        return ''
      }
    },
    passwordState () {
      if (this.password === '') {
        return ''
      } else if (!(/^(\w){6,20}$/.test(this.password))) {
        return '密码必须是6--20位的数字、字母、下划线'
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
      if (this.password === '') {
        return ''
      } else if (!(/^(\w){6,20}$/.test(this.password))) {
        return ''
      } else {
        return 'checked'
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.$router.replace('/login')
    },
    sendCode () {
      // let code = document.querySelector('#code')
      // let txt = document.getElementsByClassName('van-button__text')
      // let s = ''
      // this.flag = true
      // let time = 3
      // code = ''
      // clearInterval(s)
      // s = setInterval(function () {
      //   if (time > 0) {
      //     time--
      //     txt.innerhtml = '倒计时' + time + '秒'
      //   } else {
      //     this.flag = false
      //     txt.innerhtml = '点击重新获取验证码'
      //   }
      // }, 1000)
      fetch('https://www.daxunxun.com/users/sendCode?tel=' + this.username).then(res => res.json()).then(data => {
        console.log(data)
        this.code = data.code
      })
    },
    register () {
      if (this.usernameIcon !== 'checked') {
        Toast('用户名格式错误')
        return
      }
      if (this.passwordIcon !== 'checked') {
        Toast('密码格式错误')
        return
      }
      if (this.sms !== this.code) {
        Toast('验证码错误')
      }
      fetch('https://www.daxunxun.com/users/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'username=' + this.username + '&password=' + this.password
      }).then(res => res.json()).then(data => {
        console.log(data)
        if (data === 1) {
          Dialog.confirm({
            title: '提示',
            message: '注册成功，是否跳转到登录页面'
          }).then(() => {
            // on confirm
            this.$router.replace('/login')
          }).catch(() => {
            // on cancel
          })
        }
        if (data === 2) {
          Dialog.confirm({
            title: '提示',
            message: '该用户已注册，是否跳转到登录页面'
          }).then(() => {
            // on confirm
            this.$router.replace('/login')
          }).catch(() => {
            // on cancel
          })
        } else {
          Toast('注册失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
