// pages/category/category.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
	data: {
		categorys: [],
		selectFirstCategory: {},
		selectSecondCategory: {},
		selectThirdCategory: {},
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var that = this;
		wx.showLoading({
			title: '',
		});
		wx.request({
			url: 'https://www.sdkhcm.com/api/category',
			method: 'GET',
			data: {},
			header: {
				'Accept': 'application/json',
				'content-type': 'application/json'

			},
			success: function (res) {
				wx.hideLoading();
				var result = res.data.data;
				console.log("success--", result);
				var secondItem = {};
				console.log("success--result[0]", result[0].children);

				if (result[0].children) {
					secondItem = result[0].children[0];
				}
				console.log("success--secondItem", secondItem);

				that.setData({
					selectFirstCategory: result[0],
					selectSecondCategory: secondItem,

					categorys: result,

				});
			},
			fail: function (error) {
				wx.hideLoading();
				wx.showToast({
					title: JSON.stringify(error),
				});
			}
		})
	},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function () {
		this.category = this.selectComponent("#category");
		this.category.showView();

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
	_categorySelected: function (e) {
		console.log("分类界面接收 选中的分类", e);
		var selectFirstCategory = this.category.data.selectFirstCategory;
		var selectSecondCategory = this.category.data.selectSecondCategory;
		var selectThirdCategory = this.category.data.selectThirdCategory;
		var item = e.detail;
		wx.navigateTo({
			url: '../courseList/courseList?id=' + item.id + '&name=' + item.name + '&children=' + item.children + '&first=' + JSON.stringify(selectFirstCategory) + '&second=' + JSON.stringify(selectSecondCategory) + '&third=' + JSON.stringify(selectThirdCategory)
		})
	},
	// switchFirstTab: function (e) {

	// 	let item = e.target.dataset.id;
	// 	console.log("selected first item", item);
	// 	console.log("selected first item", item.children);

	// 	this.setData({
	// 		selectFirstCategory: item,
	// 	})
	// },
	// switchSecondFirstTab:function(e){
	// 	let item = e.target.dataset.id;
	// 	var selectedItem = { 'id': item.id, 'name': item.name, 'children': [] } 
	// 	this.setData({
	// 		selectSecondCategory: selectedItem
	// 	});
	// 	wx.navigateTo({
	// 		// url: '../courseList/courseList?item=' + this.data.selectThirdCategory,
	// 		url: '../courseList/courseList?id=' + selectedItem.id + '&name=' + selectedItem.name + '&children=' + selectedItem.children,
	// 	})
	// }
	// ,
	// switchSecondTab: function (e) {

	// 	let item = e.target.dataset.id;

	// 	console.log("selected second Item", item);
	// 	this.setData({
	// 		selectSecondCategory: item
	// 	});

	// },
	// switchThirdFirstTab: function(e){

	// 	let item = e.target.dataset.id;
	// 	console.log("selected third Item", item);
	// 	var selectedItem = { 'id': item.id, 'name': item.name, 'children': [] } 

	// 	this.setData({
	// 		selectThirdCategory	: item
	// 	});
	// 	wx.navigateTo({
	// 		url: '../courseList/courseList?id=' + selectedItem.id + '&name=' + selectedItem.name + '&children=' + selectedItem.children,
	// 	})
	// }
	// ,
	// switchThirdTab: function (e) {

	// 	let item = e.target.dataset.id;
	// 	console.log("selected third Item", item);

	// 	this.setData({
	// 		selectThirdCategory: item
	// 	});
	// 	wx.navigateTo({
	// 		url: '../courseList/courseList?id=' + item.id +'&name='+item.name+'&children='+item.children,
	// 	})
	// },
})