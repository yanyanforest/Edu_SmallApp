// pages/searchList/searchList.js
var utils = require('../../utils/util.js')
Page({
	data: {
		category: [],
		selectedIndex: 5,
		categoryBtn: {},
		courseList: [],
		selectedCategory: {},
		menuTapCurrent: 0,
		showModal: false,
		requestParams: { 'start': 0 },
		inputValue: '',
		total: 0
	},
	onLoad: function (e) {
		var that = this;
		var inputValue = '';
		that.setData({
			categoryBtn: { "id": e.id, "title": e.name, "isSelected": true },
			selectedCategory: { "id": e.id, "name": e.name, },
		});
		var requestParams = this.data.requestParams;

		if (e.value != null) {
			console.log('e', e.value);

			if (e.value != 'undefined') {
				inputValue = e.value;

				requestParams['q'] = inputValue;
				requestParams['start'] = 0;

			}
		}

		that.setData({
			requestParams: requestParams,
			inputValue: inputValue,
			categorys: getApp().data.allCategorys
		});
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					height: res.windowHeight
				})
			}
		});
		this.requestData(that.data.requestParams);
	},
	onReady: function () {
		this.category = this.selectComponent("#category");

	},
	requestData: function (param) {
		console.log('请求参数', param);
		let that = this;
		var start = param.start;
		wx.request({
			url: utils.getRequestUrl('courses'),
			method: 'GET',
			data: param,
			header: {
				'Accept': 'application/json',
				'content-type': 'application/json'

			},
			success: function (res) {
				console.log(res.data.data);
				var courses = that.data.courseList;
				console.log("初始长度", courses.length);

				if (start == 0) {
					courses = [];
				}
				var data = res.data.data;
				let courseData = res.data.data.resources;
				for (var i = 0; i < courseData.length; i++) {
					courses.push(courseData[i]);

				}
				console.log("最终长度", courses.length);

				that.setData({
					courseList: courses,
					total: data.total
				})
			}
		})
	},
	menuTap: function (e) {
		var current = e.currentTarget.dataset.current;
		let priceAsc = 0;
		let data = this.data.requestParams;
		if (current == 2) {
			if (this.data.priceAsc == 1) {
				priceAsc = 2;
				data['sort'] = 'priceDesc';

			} else {
				priceAsc = 1;
				data['sort'] = 'priceDesc';

			}
		} else {
			if (current == 1) {
				data['sort'] = 'popular';

			} else {
				delete data['sort'];
			}
		}

		if (typeof this.data.selectedCategory.id != 'undefined') {

			if (this.data.selectedCategory.id.length > 0) {
				data['categoryId'] = this.data.selectedCategory.id;
			}
		}
		this.setData({
			priceAsc: priceAsc,
			requestParam: data,
			menuTapCurrent: current
		});
		this.requestData(this.data.requestParam)
		console.log(current);
	},
	courseDetail: function (e) {
		// wx.redirectTo({
		//   url: '../index/index',
		// })
	},
	showDialogBtn: function () {
		this.setData({
			showModal: true
		})

	},
	category_choose: function (res) {
		var that = this;
		var item = this.data.categoryBtn;
		item.isSelected = true;
		this.category = this.selectComponent("#category");

		this.category.showView();
		that.setData({
			categoryBtn: item
		});

	},
	_categorySelected: function (e) {
		var that = this;
		var selectedCategory = e.detail;

		var categoryBtn = { 'id': selectedCategory.id, 'title': selectedCategory.name, 'isSelected': true };
		var params = this.data.requestParams;

		if (selectedCategory.id.length > 0) {
			params['categoryId'] = selectedCategory.id;

		} else {
			delete params['categoryId'];
		}
		params['start'] = 0;

		that.setData({
			selectedCategory: selectedCategory,
			categoryBtn: categoryBtn,
			requestParams: params,
			courseList: []
		});
		that.requestData(this.data.requestParams);

		this.category.hideView()
	},
	bindInput: function (e) {
		console.log("输入的是",e.detail.value);
		this.setData({
			inputValue: e.detail.value
		});
	},
	bindSearch: function () {
		var inputValue = this.data.inputValue;
		var requestParams = this.data.requestParams;
		console.log('搜索', inputValue);

		if (utils.testNull(inputValue)) {
			console.log('不能输入空字符');
			return;
		}
		console.log('搜索q', inputValue);

		requestParams['q'] = inputValue;
		requestParams['start'] = 0;

		utils.storeSearchKey(inputValue);
		this.setData({
			requestParams: requestParams
		});
		this.requestData(requestParams);

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
		var total = this.data.total;
		var curStart = this.data.courseList.length;
		var requestParams = this.data.requestParams;
		console.log('到达底部', total,'起始',curStart);

		if (curStart < total) {
			requestParams['start'] = curStart;
			this.setData({
				requestParams: requestParams
			});
			this.requestData(requestParams);
		}
	},

  /**
   * 用户点击右上角分享
   */
	onShareAppMessage: function () {

	}
})