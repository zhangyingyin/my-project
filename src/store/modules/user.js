import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // TODO login 登录:这里执行真正的登录逻辑
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          //const result = response.result
          const result = response.data
          console.log(result)
          // TODO login 登录:token的作用, 只是用于判断用户是否登录, 无其它作用
          Vue.ls.set(ACCESS_TOKEN, result.username, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // TODO login 登录:登录成功之后, GetInfo获取用户基本信息
        getInfo(Vue.ls.get(ACCESS_TOKEN)).then(response => {
          commit('SET_LOADED_USER_INFO_FROM_BACKEND', true)
          //const result = response.result
          const result = response.data
          commit('SET_ROLES', result.roleList)
          // 缓存功能权限
          commit('SET_FUN_PERMISSIONS', result.funPermissionList)
          // 缓存路由权限
          commit('SET_ROUTER_PERMISSIONS', result.menuPermissionList)

          // TODO 构建动态菜单
          // 设置用户动态菜单(这是由服务器返回的动态菜单), 一般来说您的数据结构和我这肯定是不一样的. 因此可以在这里进行转换, 转换成功完成之后, 再执行下面的`SET_MENU_TREE`方法
          commit('SET_MENU_TREE', result.menuTree)

          // 设置用户信息
          commit('SET_INFO', result)
          // 用户姓名
          // TODO login tips 修改登录成功之后的提示语
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          // 用户图片
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
          // resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
