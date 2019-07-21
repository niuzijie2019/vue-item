<template>
  <div class="container">
    <van-nav-bar
        title="地址"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="content">
        <ul>
          <li v-for="(item, index) of cartlist" :key="index">
            {{ item.title }}
          </li>
        </ul>
        <!-- <van-address-edit
          :area-list="areaList"
          show-postal
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          @save="onSave"
          @delete="onDelete"
          @change-detail="onChangeDetail"
        /> -->
      </div>
      <!-- <van-area :area-list="areaList" @click="region" v-show="flag"/> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, AddressEdit, Area, Toast } from 'vant'
// import { mapState } from '_vuex@3.1.1@vuex'
import { mapState } from 'vuex'
Vue.use(NavBar)
Vue.use(AddressEdit)
Vue.use(Area)
Vue.use(Toast)
export default {
  data () {
    return {
      areaList:
        {
          province_list: {
            110000: '北京市',
            120000: '天津市'
          },
          city_list: {
            110100: '北京市',
            110200: '县',
            120100: '天津市',
            120200: '县'
          },
          county_list: {
            110101: '东城区',
            110102: '西城区',
            110105: '朝阳区',
            110106: '丰台区',
            120101: '和平区',
            120102: '河东区',
            120103: '河西区',
            120104: '南开区',
            120105: '河北区'
            // ....
          }
        },
      searchResult: [],
      flag: false
    }
  },
  computed: {
    ...mapState({
      cartlist (state) {
        return state.cartlist
      }
    })
  },
  methods: {
    region () {
      this.flag = true
    },
    onSave () {
      Toast('save')
    },
    onDelete () {
      Toast('删除成功')
      this.$router.replace('/close')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }]
      } else {
        this.searchResult = []
      }
    },
    onClickLeft () {
      this.$router.replace('/close')
    }
  }
}
</script>
