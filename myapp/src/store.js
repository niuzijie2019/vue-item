import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: '',
    cartlist: []
  },
  mutations: {
    changeLoginState (state, data) {
      state.loginState = data.result
    },
    changeCartList (state, data) {
      state.cartlist = data.result
    }
  },
  getters: {
    totalnum (state) {
      let totalnum = 0
      state.cartlist.map(item => {
        totalnum += item.num
      })
      return totalnum
    },
    totalPrice (state) {
      let totalPrice = 0
      state.cartlist.map(item => {
        totalPrice += item.num * item.price
      })
      return totalPrice
    }
  },
  actions: {

  }
})
