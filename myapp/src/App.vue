<template>
  <div id="app">
    <!-- <div class="container">
      <header class="header">头部</header>
      <div class="content">中部</div>
    </div> -->
    <keep-alive>
      <!-- 如果路由设置了meta，并且keepAlive为true,避免组件的重新渲染 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if = "!$route.meta.keepAlive"></router-view>
    <router-view name="footer"></router-view>
    <!-- <router-view></router-view>
    <router-view name="footer"></router-view> -->
    <!-- <footer class="footer">
      <ul>
        <router-link to="/home" tag="li">
          <span class="iconfont icon-shouye"></span>
          <p>首页</p>
        </router-link>
        <router-link to="/movie" tag="li">
          <span class="iconfont icon-shouye"></span>
          <p>电影</p>
        </router-link>
        <router-link to="/cart" tag="li">
          <span class="iconfont icon-gouwuche"></span>
          <p>购物车</p>
        </router-link>
        <router-link to="/user" tag="li">
          <span class="iconfont icon-weibiaoti2fuzhi12"></span>
          <p>我的</p>
        </router-link>
      </ul>
    </footer> -->
  </div>
</template>

<style lang="scss">
@import "@/lib/reset.scss";
html, body, #app {
  @include rect(100%, 100%);
}
#app {
  @include flexbox();
  @include flex-direction(column);
  .container {
    @include flex();
    @include flexbox();
    @include rect(100%, auto);
    @include flex-direction(column);
    .header {
      @include rect(100%, 0.4rem);
      @include background-color(#fff);
      @include margin(0.1rem 0 0 0);
    }
    .van-swipe {
      margin-top: 0.1rem;
      width: 100%;
      height: 1.5rem;
    }
    .content {
      overflow: auto;
      flex: 1;
      .content_top {
        margin: 0 auto;
        width: 94%;
        height: 0.3rem;
        line-height: 0.3rem;
        display: flex;
        justify-content: space-between;
        margin-top: 0.2rem;
        span {
          font-size: 20px;
          font-weight: bold;
        }
        i {
          font-size: 14px;
          font-weight: bold;
        }
      }
      .hot {
        .mvs {
          display: flex;
          flex-wrap: wrap;
          .proList {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin-bottom: 0.2rem;
            .proItem {
              width: 48%;
              height: 2rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              margin-bottom: 0.2rem;
              .itemImg {
                width: 1.2rem;
                height: 1.5rem;
                padding: 0;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    @include rect(100%, 0.5rem);
    @include background-color(#fff);
    border-top: 1px solid #ccc;
    ul {
      @include rect(100%, 100%);
      @include flexbox();
      @include justify-content(space-around);
      li {
        @include flex();
        @include rect(auto, 100%);
        @include flexbox();
        @include flex-direction(column);
        @include justify-content();
        @include align-items();
        span {
          @include font-size(24px);
          &.span :nth-child(2) {
            color: #f66;
          }
        }
        p {
          @include font-size(12px);
        }
        &.router-link-active {
          @include color(#f66);
        }
      }
    }
  }
}
.header {
  line-height: 0.4rem;
  span {
    margin: 0 0.1rem;
    font-size: 14px;
  }
  input {
    width: 2.1rem;
    height: 0.3rem;
    background-color: #f7f7f7;
    border-radius: 0.15rem;
    border: none;
    padding-left: 0.2rem;
  }
}
</style>
