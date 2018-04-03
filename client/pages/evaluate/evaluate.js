var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
	data: {
		list: new Array(),
		total:0
	},
	
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		// me/course/reviews
      var token = wx.getStorageSync('token');
			var listNum = this.data.list.length;
			console.log("个数-----", listNum);
var that = this;
	wx.request({
		url: utils.getRequestUrl('me/course/reviews'),
		data: {
		  "start":listNum
        },
		header: {
		  'X-AUTH-TOKEN':token
        },
		method: 'GET',
		dataType: 'json',
		responseType: 'text',
		success: function(res) {
			console.log("课程评价数据--------------", res);

			var list = res.data.data.resources;
			var total = res.data.data.total;
			var listTmp = that.data.list;
			listTmp.push.apply(listTmp,list);
			console.log("--------------", listTmp);

that.setData({
    list:listTmp,
    total:total
})
		},
		fail: function(res) {

		},
		complete: function(res) {

		},
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

	}
})