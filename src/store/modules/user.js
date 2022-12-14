import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
  },
  mutations: {
    settoken(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REOMVE_USER_INFO(state) {
      state.userInfo = {}
    },
    REOMVE_TOKEN(state) {
      state.token = null
    },
    SET_HRSAASTIME(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    }
  },
  actions: { // 执行异步
    // 定义login action  也需要参数 调用action时 传递过来的参数
    async loginAction(context, data1) { // 哪里想用 哪掉
      // 发送请求获取用户token
      const data = await login(data1)
      console.log(data)
      context.commit('settoken', data)
      context.commit('SET_HRSAASTIME', new Date().getTime())
    },
    async getUserInfos({ commit }) { // 哪里想用 哪掉
      // 发送请求获取用户token
      const res = await getUserInfo() // 获取返回值
      const res1 = await getUserDetailById(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USER_INFO', result) // 将整个的个人信息设置到用户的vuex数据中

      // return result // 这里为什么要返回 为后面埋下伏笔
    },
    logout({ commit }) {
      commit('REOMVE_USER_INFO')
      commit('REOMVE_TOKEN')
    }
  }
}
