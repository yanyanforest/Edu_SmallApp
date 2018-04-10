// pages/settleOrder/settleOrder.js
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
  var info = wx.getSystemInfoSync();
	var windowWidth = info.windowWidth;
	this.setData({ 
		windowWidth: windowWidth,
		headerHeight:windowWidth*0.224
	});
	var course = JSON.parse(options.item);
	this.setData({
		course : course
	})
	console.log("结算中心获取的课程信息",course);
	console.log(windowWidth, this.data.headerHeight);
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
	 *  提交订单
	 */
	bindPay:function(){
		console.log("生成订单", this.data.course.id);
// courses /%@/order
var briefUrl = utils.getRequestUrl('courses/'+this.data.course.id+'/order');
console.log("生成订单", briefUrl);

var token = wx.getStorageSync('token');
		console.log('支付价格：', this.data.course.price);
		var price = this.data.course.price;
		console.log('支付价格：', price);

wx.request({
	url: briefUrl,
    header:{
			'X-AUTH-TOKEN': token,
			'content-type': 'application/x-www-form-urlencoded',
    },
		method:'POST',
		data:{
			'shouldPayMoney': price
	},
success:function(res){
console.log(" 生成订单成功",res);
	var code = res.data.code;
	
	if (code == 200){
		var data = res.data.data;
		var id = data.id;
		var sn = data.sn;
	wx.redirectTo({
		url: '../payOrder/payOrder?id='+id+'&sn='+sn+'&price='+price,
	});
	} else {
		wx.showToast({
			title: '生成订单失败',
		});
	}
},fail:function(error){
	console.log(" 生成订单失败", error);
wx.showToast({
	title: '生成订单失败',
});
}
	
})
	}
})