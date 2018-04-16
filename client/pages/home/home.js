// pages/home/home.js
var baseUrl = getApp().data.url_server_base;

Page({

  /**
   * 页面的初始数据
   */
	data: {
		currentInterestId: 0,/** 感兴趣的分类 id  三级 or 二级*/
		interestCategory: {},/*感兴趣的分类*/
		slides: [],/* 轮播图**/
		categoryData: [],/** 首页一直显示的一级分类*/
		listData: [],
		allCategorys: [],
		actionSheetHidden: true,
		actionSheetItems: [],
		total: 0,//当前分类下课程的总条数   
		currentPage: 0
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var that = this;
		var data = {};
		var selectedCategoryId = wx.getStorageSync("selectedCategoryId");
		if (typeof selectedCategoryId != 'undefined') {
			data = { "categoryId": selectedCategoryId };
		}
		//获取当前的地理信息
		wx.getLocation({
			success: function (res) {
				console.log(res);
			},
		});
		wx.request({
			url: baseUrl + 'mobileschools/home',
			method: 'GET',
			data: data,
			header: {
				'Accept': 'application/json'
			},
			success: function (res) {
				let data = res.data.data;
				console.log("res =", res);
				var localdata = [
					{ "name": "小学教育", "brief": "../../images/chomeTag_primary.png" },
					{ "name": "初中教育", "brief": "../../images/chomeTag_junior.png" },
					{ "name": "高中教育", "brief": "../../images/chomeTag_high.png" },
					{ "name": "大学教育", "brief": "../../images/chomeTag_university.png" },
					{ "name": "全部分类", "brief": "../../images/chomeTag_all.png" }
				];
				var rootcategories = [];
				for (var i = 0; i < data.rootcategories.length; i++) {
					var item = data.rootcategories[i];
					var brief = item.icon.length > 0 ? item.icon : localdata[i].brief;

					var dataItem = { "id": item.id, "name": item.name, "brief": brief };
					rootcategories.push(dataItem);
				}
				//data.category  选中的 category
				getApp().data.allCategorys = data.categories;
				rootcategories.push(localdata[4]);
				console.log("---分类：", rootcategories);

				var total = data.total;

				that.setData({
					slides: data.carousel,
					interestCategory: data.category,
					currentInterestId: data.category.id,
					categoryData: rootcategories,
					listData: data.courses,
					actionSheetItems: data.categories,
					total: total,
					currentPage: 0
				});

			}
		});

	},
	swiperChanged: function (res) {
		console.log("changed:", res);
	},
	// 选择三级分类
	interestSelected: function (res) {
		var index = parseInt(res.currentTarget.dataset.id);
		console.log("interestSelected:", res);
		this.setData({
			currentInterestId: index,
			currentPage: 0,
			listData:[]
		});
			this.requestHomeList();
	},
	showCategorys:function(res){
		this.setData({
			actionSheetHidden: !this.data.actionSheetHidden
		})
	},
	//  展示分类。一级和二级
	chooseInterest: function (res) {

		this.setData({
			actionSheetHidden: !this.data.actionSheetHidden
		});
	},
	chooseCategory: function (e) {
		var that = this;
		console.log(e.currentTarget.dataset)
		var selectInterestCategory = e.currentTarget.dataset.item;
		that.setData({//把选中值放入判断值
			interestCategory: selectInterestCategory,
			currentInterestId: selectInterestCategory.id,
			actionSheetHidden: !that.data.actionSheetHidden,
			currentPage:0,
			listData:[]
		});
		this.requestHomeList();

	},
	tapSwiperItem: function (res) {
		console.log("点击轮播图---", res);
	},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function () {
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					appHeight: res.windowHeight
				});
			},
		})
	},
	// 这是
	bindList:function(e){
	 console.log('bindList点击一级分类',e.currentTarget.dataset.item);
	 var item = e.currentTarget.dataset.item
	 var selectFirstCategory = { "id": item.id, "name": item.name};
		var selectSecondCategory = { "id": item.id };
wx.navigateTo({
	url: '../courseList/courseList?id=' + item.id + '&name=' + item.name + '&first=' + JSON.stringify(selectFirstCategory) + '&second=' + JSON.stringify(selectSecondCategory)
});
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
		console.log("------------");
		console.log("还未加载完成", this.data.currentPage);
		var that = this;
		var list = that.data.listData;
		var total = that.data.total;
		var curPage = that.data.currentPage;
		if (total > list.length) {
			//还未加载完成
			console.log("还未加载完成", total);

			wx.request({
				url: baseUrl + 'courses',
				data: {
					'categoryId': this.data.currentInterestId,
					'start': curPage
				},
				header: {
					'Accept': 'application/json'
				},
				success: function (res) {
					console.log("还未加载完成", res);
					var data = res.data.data.resources;
					curPage = curPage + 1;
					for (var i = 0; i < data.length; i++) {
						list.push(data[i]);
					}
					that.setData({
						listData: list,
						currentPage: curPage
					});

				},
				fail: function (error) {
					wx.showToast({
						title: '加载失败',
						icon: 'failure',
						duration: 3000,
						mask: true,
					});
				}
			})
		}
	},

  /**
   * 用户点击右上角分享
   */
	onShareAppMessage: function () {

	},
	requestHomeList: function (params) {
		var that = this;
		var list = that.data.listData;
		var total = that.data.total;
		var curPage = that.data.currentPage;
		wx.request({
			url: baseUrl + 'courses',
			data: {
				'categoryId': this.data.currentInterestId,
				'start': curPage
			},
			header: {
				'Accept': 'application/json'
			},
			success: function (res) {
				console.log("-----加载完成", res);
				var data = res.data.data;
				curPage = curPage + 1;
				for (var i = 0; i < data.resources.length; i++) {
					list.push(data.resources[i]);
				}
				that.setData({
					listData: list,
					currentPage: curPage,
					total: data.total
				});

			},
			fail: function (error) {
				wx.showToast({
					title: '加载失败',
					icon: 'failure',
					duration: 3000,
					mask: true,
				});
			}
		})
	},

	bindSearch:function(){
		console.log('去搜索');
		wx.navigateTo({
			url: '../search/search',
		});
	}
})