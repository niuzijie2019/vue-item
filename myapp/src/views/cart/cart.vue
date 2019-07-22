<template>
    <div class="container">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="content" v-if = "totalnum > 0">
        <div class="carts">
          <li v-for="(item, index) of cartlist" :key="index">
            <!-- <input type="checkbox"> -->
            <div class="cartimg">
              <img :src="item.images" alt="">
            </div>
            <div class="cartdata">
              <span>{{ item.title }}</span>
              <span>{{ item.b }}开场 - {{ item.e }}</span>
              <span>{{ item.lang }}</span>
              <span>{{ item.room }}</span>
              <div class="prices">
                <div class="cost">
                  <span>单价：</span>
                  <span>￥{{ item.price }}</span>
                </div>
                <div class="btn">
                  <div class="subtract" @click="item.num > 2 ? item.num -= 1 : item.num = 1"> - </div>
                  <span>{{ totalnum }}</span>
                  <div class="add" @click="item.num += 1"> + </div>
                </div>
              </div>
            </div>
          </li>
        </div>
        <div class="present">
          <div class="total">
            <span>合计：</span>
            <span>{{ totalPrice }}</span>
          </div>
          <van-button type="primary" @click="showPopup">
            提交
          </van-button>
          <van-popup v-model="show">
            <img src="http://b-ssl.duitang.com/uploads/item/201510/08/20151008192345_uPC5U.jpeg" alt="">
            <span>没有女朋友看什么电影</span>
          </van-popup>
        </div>
      </div>
      <div class="content" v-else>
        <div class="car" @click="gohome">
          购物车空空如也
        </div>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, SubmitBar, Popup, Button } from 'vant'
import { mapState } from 'vuex'
Vue.use(NavBar)
Vue.use(Button)
Vue.use(SubmitBar)
Vue.use(Popup)
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    showPopup () {
      // console.log('提交订单')
      // console.log(this.$store)
      this.show = true
    },
    gohome () {
      this.$router.push('/home')
    }
  },
  computed: {
    ...mapState({
      cartlist (state) {
        return state.cartlist
      }
    }),
    totalnum () {
      return this.$store.getters.totalnum
    },
    totalPrice () {
      return this.$store.getters.totalPrice
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
.container {
  background-color: rgb(247, 244, 244);
}
.content {
  background-color: rgb(247, 244, 244);
  position: relative;
  .car {
    width: 1.5rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    background-color: #f66;
    border-radius: 8px;
    margin: 0.5rem auto;
    color: #fff;
  }
  .carts {
    margin: 0.1rem;
    background-color: #fff;
    border-radius: 8px;
    li {
      display: flex;
      padding: 0.1rem;
      .cartimg {
        width: 0.7rem;
        height: 1rem;
        img {
          width: 0.7rem;
          height: 1rem;
        }
      }
      .cartdata {
        display: flex;
        flex-direction: column;
        margin-left: 0.1rem;
        span {
          &:first-child {
            font-size: 16px;
            // font-weight: bold;
          }
          &:nth-child(2) {
            font-size: 12px;
            color: #666;
          }
          &:nth-child(3) {
            font-size: 12px;
            color: #666;
          }
          &:nth-child(4) {
            font-size: 12px;
            color: #666;
          }
        }
        .prices {
          display: flex;
          justify-content: space-between;
          .cost {
            span {
              &:first-child {
                font-size: 16px;
              }
              &:last-child {
                font-size: 14px;
                color: rgb(255, 0, 157);
              }
            }
          }
          .btn {
            display: flex;
            width: 0.6rem;
            height: 0.2rem;
            border: 1px solid #ccc;
            justify-content: space-around;
            align-items: center;
            margin-left: 0.2rem;
            .subtract {
              width: 0.15rem;
              border-right: 1px solid #ccc;
              text-align: center;
            }
            .add {
              width: 0.15rem;
              border-left: 1px solid #ccc;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .present {
    width: 100%;
    height: 0.5rem;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    .van-popup {
      display: flex;
      flex-direction: column;
      text-align: center;
      img {
        width: 1.3rem;
        height: 1.3rem;
      }
      span {
        font-size: 14px;
        color: #f66;
      }
    }

    .total {

      span {
        &:last-child {
          color: #f66;
        }
      }
    }
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
