import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './muations'
Vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    cartList: []
  },
  mutations,
  actions
})

export default store
