import { createCookie, readCookie } from 'services/'
import UserService from 'services/userService'
import MAIN from '../'
import { LANGUAGE, CURRENCY } from 'src/xhrConfig'

const state = {
  token: '',
  status: 0,
  username: '',
  language: '',
  currency: ''
}

const mutations = {
  AUTH_DEFAULT (state) {
    state.token = ''
    state.status = 0
    state.username = ''
    state.language = LANGUAGE
    state.currency = CURRENCY
  },
  SET_AUTH_TOKEN (state, payload) {
    state.token = payload
  },
  SET_AUTH_STATUS (state, payload) {
    state.status = payload
  },
  SET_AUTH_USERNAME (state, payload) {
    state.username = payload
  },
  SET_AUTH_LANGUAGE (state, payload) {
    state.language = payload
  }
}

const actions = {
  login (store, param) {
    return new Promise((resolve, reject) => {
      const { context, body } = param
      UserService.login({ context, body }).then((res) => {
        MAIN.dispatch('setUser', param)
        MAIN.dispatch('setAuthToken', res.token)
        MAIN.commit('SET_AUTH_STATUS', 1)

        return resolve(res)
      }).catch((err) => {
        return reject(err)
      })
    })
  },
  logout (store, param) {
    MAIN.dispatch('ERASE_COOKIES')
  },
  async checkStatus (store, param) {
    const apiToken = await readCookie('apiToken')
    if (apiToken) {
      MAIN.commit('SET_AUTH_TOKEN', apiToken)
      MAIN.commit('SET_AUTH_STATUS', 1)
    }
    const username = await readCookie('username')
    if (username) MAIN.commit('SET_AUTH_USERNAME', username)
    const language = await readCookie('language')
    if (username) MAIN.commit('SET_AUTH_LANGUAGE', language)
  },
  async setUser (store, param) {
    const apiToken = await readCookie('apiToken')
    const apiNotAllowed = await Boolean(apiToken == null)
    const { body } = param

    console.log(`@{setUser}`, apiToken)

    if (apiNotAllowed) throw Error('v-no-token')
    MAIN.dispatch('setAuthUsername', body.username)
  },
  setAuthToken (store, param) {
    store.commit('SET_AUTH_TOKEN', param)
  },
  setAuthUsername (store, param) {
    store.commit('SET_AUTH_USERNAME', param)
  },
  setLanguage (store, param) {
    createCookie('language', param, 1)
    store.commit('SET_AUTH_LANGUAGE', param)
  }
}

export default {
  state,
  mutations,
  actions
}
