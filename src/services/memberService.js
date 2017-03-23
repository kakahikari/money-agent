import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'
import { createCookie, readCookie, eraseCookie } from './'

class MemberService {
  getMemberList = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/member/list',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(ERROR_CODES[err.toString()] || err)
      })
    })
  }

  getMemberWallet = ({context, username}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('user', username)

      return xhr({
        url: 'agent/member/wallet_info',
        method: 'post',
        data,
        context
      }).then((res) => {
        return resolve(res.wallet)
      }).catch((err) => {
        return reject(ERROR_CODES[err.toString()] || err)
      })
    })
  }

}

export default new MemberService()
