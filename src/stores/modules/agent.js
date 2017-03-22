import AgentService from 'services/agentService'
import MemberService from 'services/memberService'
import MAIN from '../'
import helper from 'helper'

const state = {
  list: [],
  memberList: [],
  gameCompanyList: []
}

const mutations = {
  AGENT_DEFAULT (state) {
    state.list = []
    state.memberList = []
    state.gameCompanyList = []
  },
  SET_AGENT_AGENTLIST (state, payload) {
    state.list = payload
  },
  SET_AGENT_MEMBERLIST (state, payload) {
    state.memberList = payload
  },
  SET_AGENT_GAMECOMPANYLIST (state, payload) {
    state.gameCompanyList = payload
  }
}

const actions = {
  getMemberList (store, param) {
    return new Promise((resolve, reject) => {
      const { context } = param
      MemberService.getMemberList({ context }).then((res) => {
        MAIN.commit('SET_AGENT_MEMBERLIST', res)
        return resolve(res)
      }).catch((err) => {
        return reject(err)
      })
    })
  },
  getAgentList (store, param) {
    return new Promise((resolve, reject) => {
      const { context } = param
      AgentService.getAgentList({ context }).then((res) => {
        MAIN.commit('SET_AGENT_AGENTLIST', res)
        return resolve(res)
      }).catch((err) => {
        return reject(err)
      })
    })
  },
  getGameCompanyList (store, param) {
    return new Promise((resolve, reject) => {
      const { context } = param
      AgentService.getGameCompanyList({ context }).then((res) => {
        MAIN.commit('SET_AGENT_GAMECOMPANYLIST', res)
        return resolve(res)
      }).catch((err) => {
        return reject(err)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
