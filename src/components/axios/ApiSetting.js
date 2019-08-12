const serviceModule = {
  // 登录
  get: {
    url: 'publish/getpublishdetails',
    method: 'get'
  },
  getPublishById: {
    url: 'publish/getbyid',
    method: 'get'
  },
  getDetailsImgs: {
    url: 'goods/getimgurls',
    method: 'get'
  },
  login: {
    url: 'manage/login',
    method: 'post'
  },
  deletepublish: {
    url: 'manage/deletepublish',
    method: 'post'
  },
  getcomments: {
    url: 'comments/get',
    method: 'get'
  },
  getreport: {
    url: 'report/get',
    method: 'get'
  },
  handleReport: {
    url: 'report/handle',
    method: 'post'
  }
}
const ApiSetting = {
  ...serviceModule
}

export default ApiSetting
