<template>
  <div class="container">
    <van-nav-bar
      title="影院"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <div class="cinemainfo">
        <div class="cinemas">
          <span class="s1">{{ name }}</span>
          <span class="s2">{{ where }}</span>
          <div class="ticket">
            <span>改签</span>
            <span>可停车</span>
          </div>
        </div>
        <i class="iconfont icon-tubiaozhizuomoban"></i>
        <i class="iconfont icon-shoucang1"></i>
      </div>
      <div class="mvs">
        <ul>
          <router-link tag="li" :to="{name: 'ticket', params: { id: itm.id, title: itm.title, price: itm.price, actor: itm.actor, b: itm.b, director: itm.director, grade: itm.grade, images: itm.images, type: itm.type, room: itm.room, lang: itm.lang, e: itm.e } }" v-for="(itm, index) of prolist" :key="index">
            <img :src="itm.images" alt="">
            <div class="dtai">
              <span>{{ itm.title }}</span>
              <span>淘票票评分：{{ itm.grade }}</span>
              <span>导演：{{ itm.director }}</span>
              <span>演员：{{ itm.actor }}</span>
            </div>
            <div class="buyTicket">
              <button>购票</button>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import Prolist from '@/components/conmen/proList'
import { NavBar, Tab, Tabs } from 'vant'
Vue.use(NavBar)
Vue.use(Tab).use(Tabs)
export default {
  data () {
    return {
      where: '',
      name: '',
      price: '',
      prolist: []
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  },
  mounted () {
    const { $route: { params: { where } } } = this
    const { $route: { params: { name } } } = this
    const { $route: { params: { price } } } = this
    console.log(where, name, price)
    this.where = where
    this.name = name
    this.price = price
    fetch('http://47.101.147.200:3000/movie').then(res => res.json()).then(data => {
      console.log(data)
      this.prolist = data
    })
  }
}
</script>

<style lang="scss">
.content {

  .mvs {
    ul {
      padding: 0.1rem;
      li {
        display: flex;
        width: 100%;
        height: 1.4rem;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        margin-top: 0.05rem;
        &:last-child {
          border: none;
        }
        img {
          width: 0.9rem;
          height: 1.2rem;
        }

        .dtai {
          display: flex;
          flex-direction: column;
          width: 50%;
          height: 100%;
          span {
            &:first-child {
              font-size: 16px;
            }
            &:nth-child(2) {
              color: #666;
            }
            &:nth-child(2) {
              color: #666;
            }
            &:nth-child(2) {
              color: #666;
            }
          }
        }

        .buyTicket {
          width: 0.5rem;
          height: 100%;
          display: flex;
          align-items: center;
          button {
            width: 0.5rem;
            height: 0.3rem;
            border: none;
            background-color: #f66;
            border-radius: 8px;
            color: #fff;
          }
        }
      }
    }
  }
  .cinemainfo {
    display: flex;
    width: 100%;
    height: 0.9rem;
    justify-content: space-between;
    align-items: center;
    padding-right: 0.1rem;
    border-bottom: 1px solid #ccc;
    i {
      font-size: 20px;
      color: #f40;
    }
    .cinemas {
      width: 75%;
      display: flex;
      flex-direction: column;
      padding: 0.05rem 0.1rem;
      justify-content: space-between;
      border-right: 1px solid #ccc;
      .s1 {
        height: 0.2rem;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
      }
      .s2 {
        font-size: 14px;
        height: 0.2rem;
        overflow: hidden;
        color: #999;
      }
      .ticket {
        span {
          display: inline-block;
          // width: 0.5rem;
          // height: 0.3rem;
          border: 1px solid #349cec;
          color: #349cec;
          border-radius: 2px;
          // margin-left: 0.05rem;
          &:last-child {
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
}
</style>
