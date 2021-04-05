import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{
      type: '',message: '',name: '' ,room:''
    },
    users:[]
  },
  mutations: {
    M_USER(state,payload){
      let {name= state.user.name,message="",type="",room=""} =payload
      state.user.type = type
      state.user.name = name
      state.user.message = message
      state.user.room = room
    },
    M_USERS(state,payload){
      state.users = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
