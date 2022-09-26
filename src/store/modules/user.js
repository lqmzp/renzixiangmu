import { login } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null,
    name1: 111
  },
  mutations: {
    settoken(state, token) {
      state.token = token
    }
  },
  actions: { // 执行异步
    // 定义login action  也需要参数 调用action时 传递过来的参数
    async loginAction(context, data1) { // 哪里想用 哪掉
      // 发送请求获取用户token
      const data = await login(data1)
      console.log(data)
      context.commit('settoken', data)
    }
  }
}
