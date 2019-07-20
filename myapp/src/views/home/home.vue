<template>
  <div class="container">
    <header class="header">
      <div class="seek">
        <span>上海</span>
        <!-- <input type="text" id="cardsNum2" v-model="searchVal"  value="1" v-on:input ="inputFunc"> -->
        <input type="text" id="cardsNum2" placeholder="电影、影院">
        <span class="iconfont icon-sousuo"></span>
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
import { Swipe, SwipeItem, List, PullRefresh, Icon, Sidebar } from 'vant'
Vue.use(Swipe).use(SwipeItem)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Icon)
Vue.use(Sidebar)
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
      searchVal: ''
    }
  },
  methods: {
    onRefresh () {
      this.isLoading = true
      fetch('https://www.daxunxun.com/douban').then(res => res.json()).then(data => {
        this.isLoading = false
        this.prolist = data
        this.pageNum = 1
        this.finished = false
      })
    },
    onLoad () {
      this.loading = true
      fetch('/api/movie?count=10&start=' + this.pageNum * 10).then(res => res.json()).then(data => {
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
    fetch('https://www.daxunxun.com/banner').then(res => res.json()).then(data => {
      // console.log(data)
      let arr = []
      data.map(item => {
        item = 'https://www.daxunxun.com' + item
        arr.push(item)
      })
      // console.log(arr)
      this.bannerList = arr
    })
    fetch('/api/movie').then(res => res.json()).then(data => {
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
