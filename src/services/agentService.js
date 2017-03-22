import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'

class AgentService {
  getAgentList = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/agent_list',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(ERROR_CODES[err.toString()] || err)
      })
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
        return reject(ERROR_CODES[err.toString()] || err)
      })
    })
  }
}

export default new AgentService()
