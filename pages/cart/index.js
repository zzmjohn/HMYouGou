import {getSetting,openSetting,chooseAddress} from "../../utils/asyncWx.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    siteMessages:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function() {
    // 页面出现在前台时执行
    const siteMessages = wx.getStorageSync("siteMessage");
    this.setData({
      siteMessages:siteMessages
    })
  },

  // 点击获取收货地址 try catch 方法可以把报错处理掉
  async getSite() {
    try {
      const res = await getSetting()
      const scopeAddress = res.authSetting["scope.address"]
      if (scopeAddress === false) await openSetting()
      let res2 = await chooseAddress()
      // 拼接地址
      res2.all = res2.provinceName+res2.cityName+res2.countyName+res2.detailInfo
      // 把获取到的地址本地存储
      wx.setStorageSync("siteMessage", res2);
    } catch (error) {
    }
  }
})