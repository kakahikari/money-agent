import xhr from './xhr/'
import helper from 'helper'
import store from 'stores'
import { ERROR_CODES } from './xhr/config'

// const LANGUAGE = store.state.AUTH.language

class AgentService {
  getAgentList = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/agent_list',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      })
      // .catch((err) => {
      //   return reject(helper.i18n(ERROR_CODES[err.toString()] || err, LANGUAGE))
      // })
    })
  }

  getGameCompanyList = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/game_company',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(context.$root.i18n(ERROR_CODES[err.toString()] || err))
      })
    })
  }
}

export default new AgentService()
