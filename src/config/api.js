export default {

  /**
   * 七牛管理接口
   */
  Qiniu: {
    AccessToken: 'App.Qiniu.GetAccessToken'
  },

  Merchant: {
    Add: 'App.Merchant.Create',
    List: 'App.Merchant.ListQuery',
    GetAll: 'App.Merchant.GetAll',
    ApplyList: 'App.Merchant.ApplyList'
  },

  Shop: {
    Add: 'App.Shop.Create',
    List: 'App.Shop.GetCardCommissionList',
    GetAll: 'App.Shop.GetAll',
    GetDetail: 'App.Shop.GetDetail',
    Update: 'App.Shop.UpdateShop'
  },

  Reward: {
    Add: 'App.Reward.Create',
    List: 'App.Reward.LoanCommisionList',
    GetDetail: 'App.Reward.GetDetail',
    Update: 'App.Reward.Edit'
  },

  Member: {
    List: 'App.Member.ListQuery',
    Register: 'App.Member.Register',
    Login: 'App.Member.LoginViaPassword',
    WechatLogin: 'App.Member.WechatPubLogin',
    CheckToken: 'App.Member.CheckToken',
    GetQrcode: 'App.Member.GetQrcode',
    GetReferenceList: 'App.Partner.GetReferenceList',
    GetReferenceCards: 'App.Partner.GetReferenceCards',
    GetReferenceLoans: 'App.Partner.GetReferenceLoans',
    CheckPartner: 'App.Member.CheckPartner',
    ResetPassword: 'App.Member.ResetPassword',
    CheckAccount: 'App.Member.ExistAccount',
    AddFeedback: 'App.Feedback.AddFeedback',
    GetFeedbackList: 'App.Feedback.GetList'
  },

  MemberReward: {
    List: 'App.MemberReward.GetList'
  },

  ShareAction: {
    ListQuery: 'App.ShareAction.ListQuery'
  },

  MemberAdvise: {
    List: 'App.MemberAdvise.ListQuery'
  },

  Bank: {
    List: 'App.Bank.GetList',
    All: 'App.Bank.GetAll'
  },

  Message: {
    SendMessage: 'App.Message.SendVerifyMessage',
    CheckCode: 'App.Message.CheckVerifyCode'
  },

  Apply: {
    Credit: 'App.BusinessApply.Create'
  },

  Wechat: {
    RegisterJsApi: 'App.Wechat.JsapiRegister',
    GetPubTmpQrcode: 'App.Wechat.GetPubTmpQrcode'
  },

  MemberTurn: {
    List: 'App.MemberTurnover.GetList',
    Apply: 'App.MemberTurnover.ApplyCash'
  },

  Agent: {
    Apply: 'App.AgentApply.Create',
    GetApplied: 'App.AgentApply.GetDetail'
  },

  Account: {
    ApplyWithdraw: 'App.Withdraw.Create',
    GetDetail: 'App.Account.GetDetail',
    GetLogList: 'App.Account.GetList',
    SaveAliAccount: 'App.MemberAlipayAccount.Create',
    GetAliAccountDetail: 'App.MemberAlipayAccount.GetDetail',
    CashApply: 'App.Account.CashApply'
  }

}
