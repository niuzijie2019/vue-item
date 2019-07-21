<template>
  <div class="nologin">
    <div class="nologin_top">
      <div class="head_photo">
        <span class="iconfont icon-weibiaoti2fuzhi12"></span>
      </div>
      <van-button type="default" @click="gologin">立即登录</van-button>
    </div>
    <div class="kind">
      <li>
        <span class="iconfont icon-dianying"></span>
        <p>电影</p>
      </li>
      <li>
        <span class="iconfont icon-yanchupiao"></span>
        <p>演出票</p>
      </li>
      <li>
        <span class="iconfont icon-youhuiquan"></span>
        <p>小食券</p>
      </li>
    </div>
    <!-- <div class="discounts">
      <div class="discounts_top">
        我的订单
      </div>
      <ul>
        <li>
          <span class="iconfont icon-shouye"></span>
          <p>待付款</p>
        </li>
        <li>
          <span class="iconfont icon-shouye"></span>
          <p>已付款</p>
        </li>
        <li>
          <span class="iconfont icon-shouye"></span>
          <p>历史记录</p>
        </li>
      </ul>
    </div> -->
    <div class="indent">
      <div class="discounts_top">
        我的订单
      </div>
      <ul>
        <li>
          <span class="iconfont icon-qian"></span>
          <p>待付款</p>
        </li>
        <li>
          <span class="iconfont icon-yifukuan"></span>
          <p>已付款</p>
        </li>
        <li>
          <span class="iconfont icon-lishijilu"></span>
          <p>历史记录</p>
        </li>
      </ul>
    </div>
    <div class="discounts">
      <div class="discounts_top">
        我的优惠
      </div>
      <ul>
        <li>
        <span class="iconfont icon-youhuiquan"></span>
        <p>优惠券</p>
      </li>
      <li>
        <span class="iconfont icon-quanyiqia"></span>
        <p>权益卡</p>
      </li>
      <li>
        <span class="iconfont icon-quanyiqia"></span>
        <p>乐影卡</p>
      </li>
      </ul>
      <div class="discounts_card">
        <span>88VIP 吃/玩/听/看/买 一卡通</span>
        <p>尊享购物权益 多重会员身份</p>
      </div>
    </div>
    <div class="list">
      <li>
        <span>我的收藏</span>
        <span>></span>
      </li>
      <li>
        <span>帮助与反馈</span>
        <span>></span>
      </li>
      <li>
        <span>关于淘票票</span>
        <span>></span>
      </li>
      <li>
        <span>版本</span>
        <span>></span>
      </li>
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
    },
    gologin () {
      this.$router.push('/login')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(vm)
      const { $store: { state: { loginState } } } = vm
      if (loginState === 'ok') {
        next('/user/login')
      } else {
        next()
      }
    })
  }
}
</script>

<style lang="scss">
.nologin {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #f4eff1;
  .list {
      background-color: #fff;
      // padding: 0 0.3rem 0 0.1rem;
      padding-left: 0.2rem;
      margin-top: 0.1rem;
      li {
        width: 100%;
        padding: 0 0.3rem 0 0.1rem;
        height: 0.3rem;
        border-bottom: 1px solid #ccc;
        line-height: 0.3rem;
        display: flex;
        justify-content: space-between;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  .nologin_top {
    width: 100%;
    height: 1.3rem;
    align-items: center;
    // background-color: #ff3577;
    background-image: url('http://img4.imgtn.bdimg.com/it/u=1011025542,1440730234&fm=26&gp=0.jpg');
    display: flex;

    .head_photo {
      width: 0.8rem;
      height: 0.8rem;
      background-color: #fff;
      border-radius: 50%;
      margin-left: 0.3rem;
      span {
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        text-align: center;
        line-height: 0.8rem;
        font-size: 40px;
        // font-weight: bold;
      }
    }
    .van-button {
      margin-left: 0.2rem;
    }
  }
  .kind {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    margin-bottom: 0.1rem;
    li {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 22px;
        font-weight: bold;
      }
      p {
        font-size: 14px;
      }
      .icon-dianying {
        color: #ff3577;
      }
      .icon-yanchupiao {
        color: blue;
      }
      .icon-youhuiquan {
        color: lightgreen;
      }
    }
  }
  .indent {
    background-color: #fff;
    margin-bottom: 0.1rem;
    .discounts_top {
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      padding-left: 0.3rem;
      border-bottom: 1px solid #f4eff1;
      font-size: 16px;
      font-weight: bold;
    }
    ul {
      display: flex;
      justify-content: space-around;
      background-color: #fff;
      li {
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          font-size: 22px;
          font-weight: bold;
        }
        p {
          font-size: 14px;
        }
        .icon-yifukuan {
          color: greenyellow;
        }
        .icon-qian {
          color: #f40;
        }
        .icon-lishijilu {
          color: lightseagreen;
        }
      }
    }
  }
  .discounts {
    background-color: #fff;
    height: 1.7rem;
    .discounts_top {
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      padding-left: 0.3rem;
      // border-bottom: 1px solid #f4eff1;
      font-size: 16px;
      font-weight: bold;
    }
    ul {
      display: flex;
      justify-content: space-around;
      background-color: #fff;
      li {
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          font-size: 22px;
          font-weight: bold;
        }
        p {
          font-size: 14px;
        }
        .icon-youhuiquan {
          color: gold;
        }
        .icon-quanyiqia {
          color: pink;
        }
      }
    }
    .discounts_card {
      width: 85%;
      height: 0.5rem;
      border-radius: 5px;
      background-color: #fcecd5;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 0.15rem;
      margin-left: 0.25rem;
      margin-top: 0.1rem;
      span {
        font-size: 14px;
        color: #cab799;
      }
      p {
        font-size: 12px;
        color: #a8906c;
      }
    }
  }
}
</style>
