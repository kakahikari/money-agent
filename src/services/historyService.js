import xhr from './xhr/'
import { ERROR_CODES } from './xhr/config'

class HistoryService {
  getDeposit = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/history/deposit',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(ERROR_CODES[err.toString()] || err)
      })
    })
  }

  getWithdraw = ({context}) => {
    return new Promise((resolve, reject) => {
      return xhr({
        url: 'agent/history/withdraw',
        method: 'get',
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(ERROR_CODES[err.toString()] || err)
      })
    })
  }

  getRateMoney = ({context, body}) => {
    return new Promise((resolve, reject) => {
      let data = new FormData()
      data.append('page_size', body.pageSize)
      data.append('page_num', body.pageNum)

      return xhr({
        url: 'agent/rate_money',
        method: 'post',
        data,
        context
      }).then((res) => {
        return resolve(res)
      }).catch((err) => {
        return reject(ERROR_CODES[err.toString()] || err)
      })
    })
  }
}

export default new HistoryService()
