export const xhrTimeout = 15000
export const LANGUAGE = 'cn'
export const CURRENCY = 'CNY'

export const errorCodes = {
  '0': 'success',
  '1': '栏位格式错误',
  '2': '发生未知的错误',
  '1001': '帐号已存在',
  '1002': '帐号含有中文或符号',
  '1003': '信箱重复',
  '1004': '电话重复',
  '1005': '请先登入',
  '1006': '请先登入',
  '1007': '停用',
  '1008': '密码错误',
  '1009': '新旧密码一样',
  '2001': '银行帐号重复',
  '2002': '会员存款受限制',
  '2003': '帐号不存在',
  '2004': '存款失败',
  '2005': '取款失败',
  '2006': '钱包锁定',
  '2007': '金额不足',
  '2008': '尚有一笔提款未完成',
  '3001': '设定档读取失败',
  //
  'v-close': '游戏关闭中',
  'v-game-group-not-open': '该游戏群尚未开放',
  'v-no-result': '查无资料',
  'v-timeout': '连线逾时',
  'v-need-withdrawPW': '请先设定取款密码',
  'v-need-profile': '请先设定个人基本信息',
  'v-no-token': '登入失败',
  //
  'http-0': 'API 服务无回应 (ERR_CONNECTION_REFUSED)',
  'http-404': 'API 服务无回应',
  'http-500': 'API 服务连线错误'
}

export const walletList = {
  '-1': '系统派发',
  '0': 'Wallet',
  '6': 'MG',
  '12': 'CQ9',
  '15': '36',
  '16': 'super',
  '17': 'GT',
  '18': 'BBin'
}
