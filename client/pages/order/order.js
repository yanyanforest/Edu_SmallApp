// pages/order/order.js
var url_base = getApp().data.url_server_base;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  order:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	var item = JSON.parse(options.detail);
	console.log("接收：",item);
		var id = item.id;
		console.log("接收：", id);
  var that = this;
	// that.setData({
	// 	order:item.id
	// });
	wx.request({
		url: url_base + "orders/"+id,
		header:{
			'X-AUTH-TOKEN': wx.getStorageSync('token'),
			'content-type': 'application/json'

		},
		method:'GET',
		success:function(res){
			var data = res.data.data;
			data.statusDesc = item.statusDesc;
			data.statusWxss = item.statusWxss;
			that.setData({
				order: data
			});

}	});
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

	bindBuy: function(){
		console.log("购买");

    wx.navigateTo({
			url: '/pages/payOrder/payOrder?item='+JSON.stringify(this.data.order),
    })
  },
	bindComment:function(res){
		console.log("评价", res);

		var order = res.currentTarget.dataset.id;
		console.log("评价",		order);
		wx.navigateTo({
			url: '/pages/orderComment/comment?item='+JSON.stringify(order),
		})
	}
})