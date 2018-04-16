// pages/search/search.js
var utils = require('../../utils/util.js');
const MAX_LAST_COUNT = 10;//限制最大最近搜索数目
Page({

  /**
   * 页面的初始数据
   */
	data: {
		inputValue:''
	},
	bindInput:function(e){
		console.log("要搜索的", e.detail.value);
		this.setData({
			inputValue: e.detail.value
		});
	},
  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		// tags
		var that = this;
		wx.request({
			url: utils.getRequestUrl('tags'),
			header: {
				'Accept': 'application/json'
			},
			success: function (res) {
				console.log(" 热门搜索", res);
				var list = res.data.data;
				that.setData({
					hotList: list
				})
			}
		});
		// 
// 		var last_list = wx.getStorageSync('last_search');
// 		console.log(" 最近搜索", last_list);
// if (last_list == 'undefined' || last_list.length == 0) {
// 			last_list = new Array();
// 		}
// 		console.log(" 最近搜索", last_list);

// 		that.setData({
// 			last_list: last_list
// 		});
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
		var that = this;
		var last_list = wx.getStorageSync('last_search');
		console.log(" 最近搜索", last_list);
if (last_list == 'undefined' || last_list.length == 0) {
			last_list = new Array();
		}
		console.log(" 最近搜索", last_list);

		that.setData({
			last_list: last_list
		});
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
	//     Array.prototype.in_array = function (element) {
	//
	//     for (var i = 0; i < this.length; i++) {
	//
	//         if (this[i] == element) {
	//
	//             return true;
	//
	//         }
	//
	//     } return false;
	//
	// }
	bindSearch: function (e) {
		console.log("要搜索的是", e.currentTarget.dataset.item);
		var strings = e.currentTarget.dataset.item;
		var isnull = utils.testNull(strings);

		if (isnull) {
			wx.showToast({
				title: '请输入关键字',
				icon:'none'
			})
			return;
		}
		this.setData({
			inputValue: strings
		});
		var contains = false;
		var list = this.data.last_list;
		console.log("数组是", list);

		for (var i = 0; i < list.length; i++) {
			var strItem = list[i];
			if (strItem == strings) {
				contains = true;

				if (i != 0) {
					list.splice(i, 1);
					list.splice(0, 0, strItem);
				}
			}
		}
		if (list.length <= 0) {
			contains = true;
			list[0] = strings;
		}
		if (!contains) {
			list.splice(0, 0, strings);
		}
		wx.setStorageSync('last_search', list);
		this.setData({
			last_list: list
		});
		wx.navigateTo({
			url: '../searchList/searchList?id=' + "" + '&name=' + "全部"+'&value='+strings,
		})
	},
	bindClearItem:function(e){
		console.log('清除item', e);
	var index =	e.currentTarget.dataset.index;
	var list = this.data.last_list;//wx.getStorageSync('last_search');
	list.splice(index,1);
		this.setData({
			last_list: list
		});
		wx.setStorageSync('last_search', list);
	},
	bindClearHistory:function(e){
		console.log('清除全部',e);
		var list = [];
		this.setData({
			last_list:list
		})
	  wx.setStorageSync('last_search', list);

	}
})