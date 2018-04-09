// pages/courseOrder/courseOrder.js
var url_base = getApp().data.url_server_base;

Page({
  /**
   * 页面的初始数据
   */
	data: {
		selectedIndex: 0,
		isHideLoadMore: false,
		btns: [
			{
				id: 0,
				name: "全部",
				params:{}
			},
			{
				id: 1,
				name: "待支付",
				params: { status:"created"}
			},
			{
				id: 2,
				name: "已支付",
				params: { status: "paid" }
			}
		],
		orderList: [],
		total:0,
appHeight:0
	},
	loadMore: function (res) {
		this.onReachBottom();
	},
	pullDownChange: function (res) {

	},
	bindTab: function (res) {
		var index = parseInt(res.currentTarget.dataset.id);
		this.setData({
			selectedIndex: index,
			orderList:[]
		});
		var params = this.data.btns[index].params;
		params['start'] = 0;
		this.requestOrderList(params);

	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		this.requestOrderList();
	},
	requestOrderList:function(params){
var data = params;
console.log("请求订单列表参数：",params);
console.log("请求订单列表参数typeof", typeof params);

if(typeof params == 'undefined'){
	// data['start'] = 0;
	data = { start: 0};
} else if(typeof params.start == 'undefined'){
	data['start'] = 0;
}

var token = wx.getStorageSync('token');
var that = this;
wx.request({
	url: url_base + 'me/orders',
	header: {
		'content-type': 'application/json',
		'X-AUTH-TOKEN': token
	},
	data:data,
	success: function (res) {
		var data = res.data.data;
		console.log("data:", data);
		var total = data.total;
		var list = data.resources;
		var listTemp = that.data.orderList;
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			item.statusDesc = that.showOrderItemStatus(item);
			item.statusWxss = that.showOrderStatusWxss(item);
			listTemp.push(item);

		}
		that.setData({
			orderList: listTemp,
			total: total,
		});
	},
	fail: function (error) {
		console.log(error);
	}
})

	},
	showOrderItemStatus: function (item) {
		console.log(item.status);
		if (item.status == "cancelled") {
			return "已取消";
		}
		if (item.status == "created") {
			return "待支付";
		}
		if (item.status == "paid") {
			if (item.reviewed) {
				return "已完成";
			}
			return "待评价";
		}
		return "已关闭";
	},
	showOrderStatusWxss: function (item) {
		if (item.status == "cancelled") {
			return "orders-list__item-status__cancelled";
		}
		if (item.status == "created") {
			return "orders-list__item-status__paying";
		}
		if (item.status == "paid") {
			if (item.reviewed) {
				return "orders-list__item-status__payed";
			}
			return "orders-list__item-status__reviewing";
		}
		return "orders-list__item-status__payed";
	},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function () {
var appHeight = this.data.appHeight;

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
		console.log('刷新')
	},

  /**
   * 页面上拉触底事件的处理函数
   */
	onReachBottom: function () {
		console.log('--- 加载更多---');
		var params = this.data.btns[this.data.selectedIndex].params;
		params['start'] = this.data.orderList.length;
		this.requestOrderList(params);

	},
	showOrderItemStatus: function (item) {
		console.log(item.status);
		if (item.status == "cancelled") {
			return "已取消";
		}
		if (item.status == "created") {
			return "待支付";
		}
		if (item.status == "paid") {
			if (item.reviewed) {
				return "已完成";
			}
			return "待评价";
		}
		return "已关闭";
	},

  /**
   * 用户点击右上角分享
   */
	onShareAppMessage: function () {

	},
	showOrderDetail: function (res) {
		console.log("选中的订单：", res.currentTarget.dataset.id);
		var item = res.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../order/order?detail=' + JSON.stringify(item),
		})
	},
	toComment: function (res) {
		console.log(res);
		wx.navigateTo({
			url: '../orderComment/comment?item=' + JSON.stringify(res.currentTarget.dataset.id),
		});
	}

})