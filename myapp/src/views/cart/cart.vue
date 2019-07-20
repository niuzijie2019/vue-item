<template>
    <div class="container">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="content">
        <!-- <div class="site">
          <button class="btn" @click="goress">+ 添加收货地址</button>
        </div> -->
        <div class="present">
          <span>合计：</span>
          <button @click="onSubmit">提交订单</button>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, SubmitBar } from 'vant'
Vue.use(NavBar)
Vue.use(SubmitBar)
export default {
  data () {
    return {
      title: '',
      img: '',
      rating: '',
      genres: '',
      direct: '',
      casts: '',
      year: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    address () {
      console.log(111)
    },
    // goress () {
    //   this.$router.replace('close')
    // },
    onSubmit () {
      console.log('提交订单')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(vm)
      const { $store: { state: { loginState } } } = vm
      console.log(loginState)
      if (loginState === 'ok') {
        next()
      } else {
        vm.$router.push('/login')
      }
    })
  }
}
</script>

<style lang="scss">
.shop {
  width: 100%;
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    img {
      width: 1.3rem;
      height: 1.5rem;
    }
    .right {
      display:  flex;
      flex-direction: column;
    }
  }
}
.content {
  background-color: #fff;
  position: relative;
  .present {
    width: 100%;
    height: 0.5rem;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    span {
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 18px;
      margin-left: 0.1rem;
    }
    button {
      border: none;
      height: 0.5rem;
      width: 1rem;
      background-color: #f66;
    }
  }
  .site {
    width: 100%;
    height: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightblue;
    border-radius: 8px;
    .btn {
      width: 1.5rem;
      height: 0.4rem;
      border: none;
      background-color: lightblue;
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>
