// pages/payOrder/payOrder.js
var utils = require('../../utils/util.js');
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
		console.log("订单支付：", options);
		var item = JSON.parse(options.item);

		var info = wx.getSystemInfoSync();
		console.log(info);
		this.setData({
			windowWidth: info.windowWidth,
			windowHeight: info.windowHeight,
			bgImageHeight: info.windowWidth * 0.4173,
			order: item
		});
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

	},
	/** 
	 * 调起 微信支付
	 */
	bindWxPay: function () {
		var token = wx.getStorageSync('token');

		console.log("微信支付", this.data.order);
		var order = this.data.order;
		console.log("微信支付", this.data.order);

		var briefUrl = utils.getRequestUrl('orders/' + order.id);
		wx.request({
			url: briefUrl,
			data: { "payment": "wxpay" },
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-AUTH-TOKEN': token
			},
			method:'POST',
			success:function(res){
				console.log("支付结果",res);
			},
			fail:function(error){
				console.log('支付失败',error);
			}
		});
		// wx.requestPayment({
		// 	timeStamp: '',
		// 	nonceStr: '',
		// 	package: '',
		// 	signType: '',
		// 	paySign: '',
		// })
	}

})