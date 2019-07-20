<template>
  <ul class="proList">
    <router-link tag="li" :to="{ name: 'detail', params: { id: item.id, title: item.title, price: item.price, actor: item.actor, b: item.b, director: item.director, grade: item.grade, images: item.images, type: item.type } }" class="proItem" v-for="(item, index) of prolist" :key="index">
      <div class="itemImg">
        <img :src="item.images" alt="">
        <p>{{ item.title }}</p>
        <span>淘票票评分：</span>
        <!-- <Rating /> -->
        <Rating :rating="(item.grade / 2).toFixed(1)"/>
      </div>
    </router-link>
    <!-- <ul>
      <li v-for="(item, index) of prolist" :key="index">
        {{ item.title }}
      </li>
    </ul> -->
  </ul>
</template>

<script>
import Rating from '@/components/conmen/Rating'
export default {
  props: {
    prolist: Array
  },
  methods: {
    goDtail () {
      this.$router.push('/detail')
    }
  },
  components: {
    Rating
  }
}
</script>

<style lang="scss">
.proList {
  width: 100%;
  display: flex;
  // flex-wrap: wrap;
  // overflow: hidden;
  .proItem {
    // width: 48%;
    height: 2rem;
    .itemImg {
      width: 1.2rem;
      height: 1.6rem;
      margin: 0.1rem;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      // overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      p {
        font-size: 12px;
        font-weight: bold;
      }
      span {
        font-size: 12px;
        margin-top: -0.2rem;
      }
    }
  }
}
</style>
