// pages/settings/settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {	
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
  var checked = wx.getStorageSync("isEnable4G");
	if (typeof checked == 'undefined')
	{
		checked = false;
	}
	var isLogin = wx.getStorageSync("isLogin");
	if (typeof isLogin == 'undefined')
	{
		isLogin = false;
	}
	wx.setStorageSync("isEnable4G", checked);
	this.setData({
		isChecked : checked,
		isLogined : true
	})
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
  
  },
	changePlayNetWork: function(e){
		console.log("允许2G/3G/4G网络观看视频-----",e)
		var checked = wx.getStorageSync("isEnable4G");

		checked == !checked;
		wx.setStorageSync("isEnable4G", checked);
		this.setData({
			isChecked: check,
		})
	},
	logout:function(e){
		var isLogin = false;
	 wx.setStorageSync("isLogin", isLogin);
	 this.setData({
		 isLogined: isLogin
	 });

	wx.showToast({
		title: '退出成功',
		duration:3000
	})
	}
})