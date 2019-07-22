<template>
  <div class="container">
    <header class="header">
      <span>上海</span>
      <input type="text" name="mv" id="mv" placeholder="搜影片、影院、演出">
    </header>
    <div class="content">
      <div class="cinema">
        <router-link tag="li" :to="{name: 'cinema', params: { id: item.id, where: item.where, price: item.price, name: item.name}}" v-for="(item, index) of cinema" :key="index">
          <div class="cinemaShop">
            <span>{{ item.name }}</span>
            <span>{{ item.price }}元起</span>
          </div>
          <div class="wheres">
            {{ item.where }}
          </div>
          <div class="ticket">
            <span>改签</span>
            <span>可停车</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cinema: []
    }
  },
  mounted () {
    fetch('http://47.101.147.200:3000/cinema').then(res => res.json()).then(data => {
      console.log(data)
      this.cinema = data
    })
  }
}
</script>

<style lang="scss">
.content {
  .cinema {
    li {
      list-style: none;
      width: 100%;
      height: 1rem;
      // line-height: 0.7rem;
      padding: 0.1rem;
      border-bottom: 1px solid #ccc;
      .cinemaShop {
        display: flex;
        justify-content: space-between;
        span {
          &:first-child {
            font-size: 16px;
            font-weight: bold;
          }
          &:last-child {
            font-size: 14px;
            color: rgb(233, 207, 121);
          }
        }
      }
      .wheres {
        width: 70%;
        height: 20px;
        font-size: 14px;
        color: #666;
        overflow: hidden;
      }
      .ticket {
        margin-top: 0.05rem;
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
