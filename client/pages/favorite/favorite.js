// pages/favorite/favorite.js
var utils = require('../../utils/util.js');
const MAX = 250;
const MOVE_MAX = 80;
var url_base = getApp().data.url_server_base;
Page({



  /**
   * 页面的初始数据
   */
	data: {
		showAction: false,
		startX: 0,
		total: 0,//总的收藏个数
		courseList: [] // 收藏的列表
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var token = wx.getStorageSync('token');
		// utils.getRequest({
		// 	briefUrl: 'me/courses',
		// 	header: { 'X-AUTH-TOKEN': token },
		// 	params: {
		// 		'relation': "favorited",
		// 		'start': 0
		// 	},
		// 	succcess: function (res) {
		// 		console.log("success", res);
		// 	},
		// 	failure: function (error) {
		// 		console.log("failure", error);

		// 	}

		// });
		console.log("-------", utils.getRequestUrl('me/courses'));
		var that = this;
		wx.request({
			url: utils.getRequestUrl('me/courses'),
			data: {
				'relation': "favorited",
				'start': 0
			},
			header: {
				'X-AUTH-TOKEN': token
			},
			success: function (res) {
				console.log('我的收藏的数据：', res);
				that.setData({
					courseList: res.data.data.resources,
					total: res.data.data.total
				});

			},
			fail: function (error) {

			}
		});
		this.setData({
			delta: [0, 0, 0],
		})
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

	onTouchStart: function (e) {
		console.log('onTouchStart :e.touches[0].clientX', e.touches[0].clientX);
		this.setData({
			startX: e.touches[0].clientX
		});
	},

	onTouchMove: function (e) {
		var index = e.currentTarget.dataset.key;
		console.log('onTouchMove', index);
		const start = this.data.delta[index];
		var delta = e.changedTouches[0].clientX - this.data.startX;

		//如果为0 右不动
		if (start === 0) {
			if (delta > 0) {
				delta = start;
			}
			if (delta < -MAX) {
				delta = -MAX;
			}
		}
		if (start === -MAX) {
			if (delta < 0) {
				delta = start;
			}
			var temp = -MAX + delta;
			if (temp > 0) {
				temp = 0;
			}
			delta = temp;
		}
		var datas = this.data.delta;
		datas[index] = delta;
		this.setData({
			delta: datas
		});
	},

	onTouchEnd: function (e) {
		var index = e.currentTarget.dataset.key;
		var showAction = this.data.showAction[index];
		var delta = e.changedTouches[0].clientX - this.data.startX;
		//
		if (showAction === false) {
			if (delta < -MOVE_MAX) {
				delta = -MAX;
				showAction = true;
			} else {
				delta = 0;
			}
		}

		if (showAction === true) {
			if (delta > MOVE_MAX) {
				delta = 0;
				showAction = false;
			} else {
				delta = -MAX;
			}
		}

		var actions = this.data.showAction;
		var datas = this.data.delta;
		actions[index] = showAction;
		datas[index] = delta;
		this.setData({
			delta: datas,
			showAction: actions
		});
	},
	cancelFavorite: function (res) {
		console.log("取消收藏-----", res);
	}
})