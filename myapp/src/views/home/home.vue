<template>
  <div class="container">
    <header class="header">
      <div class="seek">
        <span>上海</span>
        <!-- <input type="text" id="cardsNum2" v-model="searchVal"  value="1" v-on:input ="inputFunc"> -->
        <input type="text" id="cardsNum2" placeholder="电影、影院">
        <i class="iconfont icon-Category" type="primary" @click="showPopup">
        </i>
        <van-popup
          v-model="show"
          position="left"
          :style="{ width: '70%', height: '100%' }"
        >
          <div class="users">
            <div class="title">
              <div class="head_photo">
                <img src="http://b-ssl.duitang.com/uploads/item/201510/08/20151008192345_uPC5U.jpeg" alt="">
              </div>
            </div>
            <div class="list">
              <!-- <span></span> -->
              <li>
                <span>编辑签名</span>
                <span>></span>
              </li>
              <li>
                <span>通用</span>
                <span>></span>
              </li>
              <li>
                <span>设置</span>
                <span>></span>
              </li>
              <li>
                <span @click="quitLogin">退出登录</span>
                <span>></span>
              </li>
            </div>
          </div>
        </van-popup>
        <!-- <van-button type="primary" @click="showPopup">
          展示弹出层
        </van-button>
        <van-popup v-model="show">内容</van-popup> -->
      </div>
      <ul ref="list"></ul>
    </header>
    <div class="content" ref="content" id="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) of bannerList" :key="index">
            <img :src="item" alt="">
          </van-swipe-item>
        </van-swipe>
        <div class="hot_showing">
          <div class="content_top">
            <span>即将上映 ></span>
            <i>想看榜</i>
          </div>
          <div class="slider" ref="slider">
            <div class="slider-group" ref="sliderGroup">
              <Prolist :prolist = "prolist"/>
            </div>
          </div>
        </div>
        <div class="hot">
          <div class="content_top">
            <span>热门影片 ></span>
            <i>周票房榜</i>
          </div>
          <div class="mvs">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <Prolist :prolist = "prolist"/>
            </van-list>
          </div>
        </div>
      </van-pull-refresh>
      <div class="goTop">
        <van-icon name="upgrade" size="30px" v-show="flag" @click="goTop"/>
      </div>
    </div>
  </div>
</template>

<script>
import Prolist from '@/components/conmen/proList'
import Vue from 'vue'
import { Swipe, SwipeItem, List, PullRefresh, Icon, Sidebar, Popup } from 'vant'
Vue.use(Swipe).use(SwipeItem)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Icon)
Vue.use(Sidebar)
Vue.use(Popup)
export default {
  data () {
    return {
      bannerList: [],
      prolist: [],
      loading: false,
      finished: false,
      isLoading: false,
      pageNum: 1,
      flag: false,
      searchVal: '',
      show: false
    }
  },
  methods: {
    quitLogin () {
      console.log('退出登录')
    },
    showPopup () {
      this.show = true
    },
    onRefresh () {
      this.isLoading = true
      fetch('http://47.101.147.200:3000/movie').then(res => res.json()).then(data => {
        this.isLoading = false
        this.prolist = data
        this.pageNum = 1
        this.finished = false
      })
    },
    onLoad () {
      this.loading = true
      fetch('http://47.101.147.200:3000/movie?count=10&start=' + this.pageNum * 10).then(res => res.json()).then(data => {
        this.loading = false
        this.pageNum++
        if (data.length === 0) {
          this.finished = true
        } else {
          this.prolist = [...this.prolist, ...data]
        }
      })
    },
    scrollFn () {
      // console.log(event.target.scrollTop)
      if (event.target.scrollTop > 200) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    goTop () {
      this.$refs.content.scrollTop = 0
    }
  },
  mounted () {
    fetch('http://47.101.147.200:3000/banner').then(res => res.json()).then(data => {
      // console.log(data)
      let arr = []
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].image)
      }
      // console.log(arr)
      this.bannerList = arr
    })
    fetch('http://47.101.147.200:3000/movie').then(res => res.json()).then(data => {
      console.log(data)
      this.prolist = data
      // console.log(this.prolist.images.small)
    })
    // fetch('https://www.daxunxun.com/douban').then(res => res.json()).then(data => {
    //   console.log(data)
    //   // this.prolist = data
    //   // console.log(this.prolist.images.small)
    // })
    this.$refs.content.addEventListener('scroll', this.scrollFn)
  },
  components: {
    Prolist
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.content.removeEventListener('scroll', this.scrollFn)
    let position = this.$refs.content.scrollTop
    console.log(position)
    localStorage.setItem('position', position)
    next()
  },
  watch: {
    $route (newVal, oldVal) {
      console.log(newVal)
      if (newVal.name === 'home') {
        this.$refs.content.scrollTop = localStorage.getItem('position')
      }
    }
  }
}
</script>

<style lang="scss">
.users {
  .list {
    li:hover {
      background-color: #ccc;
    }
    li {
      list-style: none;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      background-color: #fff;
    }
  }
  .title {
    display: flex;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #ccc;
    // align-items: center;
    // justify-content: space-between;
    .head_photo {
      width: 0.6rem;
      height: 0.6rem;
      background-color: #fff;
      border-radius: 50%;
      margin-left: 0.3rem;
      // margin-top: 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .van-span {
        margin-top: 0.5rem;
      }
    }
  }
}
.seek {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.1rem;
  i {
    font-size: 18px;
    font-weight: bold;
  }
}
.van-swipe {
  img {
    width: 100%;
    height: 100%;
  }
}
.goTop {
  .van-icon {
    position: fixed;
    bottom: 0.6rem;
    right: 0.15rem;
    background-color: #fff;
    border-radius: 50%;
  }
}
.slider {
  overflow: hidden;
  .slider-group {
    overflow: auto;
    ul {
      width: 40rem;
      li {
        height: 2.3rem;
      }
    }
  }
}
</style>
