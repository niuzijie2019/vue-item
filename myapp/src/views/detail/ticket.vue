<template>
    <div class="container">
      <van-nav-bar
          title="商品详情"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
        <div class="detail">
          <div class="detail_top">
            <img :src="img" alt="">
          </div>
          <div class="detail_content">
            <div class="dtls">
              <img :src="img" alt="">
              <div class="right">
                <span>{{ title }}</span>
                <span>{{ type }}</span>
                <span>导演：{{ director }}</span>
                <span>演员：{{ actor }}</span>
                <!-- <span>电影开场时间：{{ b }}</span> -->
              </div>
            </div>
            <div class="grade">
              <div class="ratings">
                <Rating :rating="(grade / 2).toFixed(1)"/>
                <div class="num">
                  <span>淘票票评分</span>
                  <a href="javascript:;">19.7万人评 ></a>
                </div>
              </div>
              <div class="price">
                ￥{{ price }}
              </div>
            </div>
          </div>
          <van-tabs v-model="activeName">
            <van-tab title="简介" name="a">
              翻拍自1994年迪士尼经典动画《狮子王》，后者被认为是迪士尼动画电影以及整个动画电影史的顶峰之一。故事讲述小狮子王辛巴在众多热情的朋友的陪伴下，不但经历了生命中最光荣的时刻，也遭遇了最艰难的挑战，最后终于成为了森林之王。
              翻拍自1994年迪士尼经典动画《狮子王》，后者被认为是迪士尼动画电影以及整个动画电影史的顶峰之一。故事讲述小狮子王辛巴在众多热情的朋友的陪伴下，不但经历了生命中最光荣的时刻，也遭遇了最艰难的挑战，最后终于成为了森林之王。
            </van-tab>
            <van-tab title="影评" name="b">暂无数据</van-tab>
            <van-tab title="讨论" name="c">暂无数据</van-tab>
            <van-tab title="更多 >" name="d">更多</van-tab>
          </van-tabs>
        </div>
        <div class="select_theaters" @click="buyTicket">
          购票
        </div>
    </div>
</template>

<script>
import Rating from '@/components/conmen/Rating'
import Vue from 'vue'
import { NavBar, GoodsAction, GoodsActionIcon, GoodsActionButton, Tab, Tabs } from 'vant'
Vue.use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton)
Vue.use(NavBar)
Vue.use(Tab).use(Tabs)
export default {
  data () {
    return {
      activeName: 'a',
      title: '',
      type: '',
      director: '',
      actor: '',
      img: '',
      grade: '',
      b: '',
      price: '',
      arr: ''
    }
  },
  components: {
    Rating
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    buyTicket () {
      this.$router.push('/cart')
    }
  },
  mounted () {
    // console.log(this.$route)
    // const { $route: { params: { id } } } = this
    const { $route: { params: { title } } } = this
    const { $route: { params: { director } } } = this
    const { $route: { params: { type } } } = this
    const { $route: { params: { actor } } } = this
    const { $route: { params: { images } } } = this
    const { $route: { params: { grade } } } = this
    const { $route: { params: { b } } } = this
    const { $route: { params: { price } } } = this
    const { $route: { params: { e } } } = this
    const { $route: { params: { room } } } = this
    const { $route: { params: { lang } } } = this
    // console.log(id)
    // console.log(title)
    // console.log(director)
    const num = 1
    this.title = title
    this.type = type
    this.director = director
    this.actor = actor
    this.img = images
    this.grade = grade
    this.b = b
    this.price = price
    let arr = [ { 'title': title, 'type': type, 'images': images, 'b': b, 'price': price, 'e': e, 'room': room, 'lang': lang, 'num': num } ]
    console.log(arr)
    this.$store.commit('changeCartList', {
      result: arr
    })
  }
}
</script>

<style lang="scss">
li {
  list-style: none;
}
// .box {
//   display: flex;
//   overflow: auto;
//   flex: 1;
  .container {
    .select_theaters {
      width: 100%;
      height: 0.5rem;
      background-color: #f66;
      line-height: 0.5rem;
      text-align: center;
      color: #fff;
      font-size: 16px;
    }
    // display: flex;
    .content {
      // display: flex;
      // overflow: auto;
      // flex: 1;
    }
    .detail {
      background-color: #f5f5f5;
      display: flex;
      flex-direction: column;
      overflow: auto;
      flex: 1;
      .detail_top {
        width: 100%;
        height: 1.8rem;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .detail_content {
        margin-bottom: 0.15rem;
        width: 100%;
        height: 2.1rem;
        padding: 0.1rem 0.1rem 0 0.1rem;
        background-color: #fff;
        .dtls {
          display: flex;
          img {
            width: 1rem;
            height: 1.3rem;
          }
          .right {
            display: flex;
            flex-direction: column;
            margin-left: 0.1rem;
            span {
              &:nth-child(1) {
                font-size: 16px;
                font-weight: bold;
              }
              &:nth-child(2) {
                font-size: 14px;
                color: #9b9b9b;
              }
              &:nth-child(3) {
                font-size: 14px;
                color: #9b9b9b;
              }
              &:nth-child(4) {
                font-size: 14px;
                color: #9b9b9b;
              }
              &:nth-child(5) {
                font-size: 14px;
                color: #9b9b9b;
              }
            }
          }
        }
        .grade {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .rating {
            font-size: 22px;
            font-weight: bold;
          }
          .num {
            span {
              font-size: 14px;
              font-weight: bold;
            }
            a {
              font-size: 12px;
              color: #9a9a9a;
            }
          }
          .price {
            font-size: 18px;
            font-weight: bold;
            color: #f66;
            margin-right: 0.2rem;
          }
        }
      }
      .van-tabs {
        width: 100%;
        .van-tabs__content {
          padding: 0.15rem;
        }
      }
    }
  }
// }
</style>
