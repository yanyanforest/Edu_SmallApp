// pages/courseOrder/courseOrder.js
Page({

  /**
   * 页面的初始数据
   */
	data: {
		selectedIndex: 0,
		isHideLoadMore: false,
		page: 0,
		btns: [
			{
				id: 0,
				name: "全部"
			},
			{
				id: 1,
				name: "待支付"
			},
			{
				id: 2,
				name: "待评价"
			}
		],
		orderList: [],

	},
	loadMore: function (res) {
		this.onReachBottom();
	},
	refesh: function (res) {
		this.onPullDownRefresh();
	},
	pullDownChange: function (res) {

	},
	btnclick: function (res) {
		var index = parseInt(res.currentTarget.dataset.id);
		this.setData({
			selectedIndex: index
		});
	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var token = wx.getStorageSync('token');
		var that = this;
		var url_base = getApp().data.url_server_base;
		wx.request({
			url: url_base + 'me/orders',
			header: {
				'content-type': 'application/json',
				'X-AUTH-TOKEN': token
			},
			success: function (res) {
				var data = res.data.data;
				console.log("data:",data);
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
					total:total,
			
				})
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
	swiperChanged:function(res){
console.log('---',res);
var selectIndex = res.detail.current;
var that = this;
that.setData({
	selectedIndex:selectIndex,
})
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
		var page = 0;
		var curList = this.data.recommends_page;
		// 停止当前页面的下拉刷新、
		// wx.showNavigationBarLoading() //在标题栏中显示加载

		//模拟加载
		// setTimeout(function () {
		// 	// complete
		// 	wx.hideNavigationBarLoading() //完成停止加载
		// 	wx.stopPullDownRefresh() //停止下拉刷新
		// 	this.setData({
		// 		isHideLoadMore: false,
		// 		page: 0,
		// 		recommends: curList

		// 	})
		// }, 1500);
	},

  /**
   * 页面上拉触底事件的处理函数
   */
	onReachBottom: function () {
		console.log('--- 加载更多---');
		var page = this.data.page;
		console.log('--- 加载更多---',page);
		var url_base = getApp().data.url_server_base;
		var isHideLoadMore = false;
			if (page < this.data.total) {
			var token = wx.getStorageSync('token');
		var that = this;
		wx.request({
			url: url_base + 'me/orders',
			header: {
				'content-type': 'application/json',
				'X-AUTH-TOKEN': token
			},
			success: function (res) {
				var data = res.data.data;
				console.log("=========", data);
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
					total:total,
			
				})
			},
			fail: function (error) {
				console.log("error:",error);
			}
		})
	}
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
	swiperChanged:function(res){
console.log('---',res);
var selectIndex = res.detail.current;
var that = this;
that.setData({
	selectedIndex:selectIndex,
})
			},

  /**
   * 用户点击右上角分享
   */
	onShareAppMessage: function () {

	},
	scroll: function (res) {
		console.log("-------", res);
	},
	showOrderDetail: function(res){
		console.log("选中的订单：", res.currentTarget.dataset.id);
		var item = res.currentTarget.dataset.id;
		wx.navigateTo({
			url: '../order/order?detail='+JSON.stringify(item),
		})
	},
	toComment: function (res){
		console.log(res);
		wx.navigateTo({
			url: '../orderComment/comment?item='+JSON.stringify(res.currentTarget.dataset.id),
		});
	}

})