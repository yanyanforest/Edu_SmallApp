// pages/location/locateMe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  regionType:"",
  },
  /** 地址发生改变 */
  regionchange:function(e){
    console.log("regionchange:-------",e)
   this.setData({
  regionType:e.type
})
  },
  getLocation:function(){
    var that = this;
  wx.getLocation({
    type: '',
    success: function(res) {
      console.log(res)
      that.setData({
        location:{
          longitude:res.longitude,
          latitude:res.latitude
        
        }
      })
      },
    fail: function(res) {},
    complete: function(res) {},
  })
  },
  lookLocation:function(e){
var location = this.data.location;
console.log(this.data);


wx.openLocation({
  // latitude: Number(e.detail.value.latitude),
  // longitude: Number(e.detail.value.longitude),
  latitude: location.latitude,
  longitude:location.longitude
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})