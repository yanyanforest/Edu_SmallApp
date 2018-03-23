// pages/home/home.js
var baseUrl = getApp().data.url_server_base;

Page({

  /**
   * 页面的初始数据
   */
	data: {
		currentTab: 0,/** 感兴趣的下标 index 不是 id*/
		interestCategory: {},/*感兴趣的分类*/
		slides: [],/* 轮播图**/
		categoryData: [],/** 首页一直显示的一级分类*/
		listData: [],
		allCategorys: []
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var that = this;

		//获取当前的地理信息
		wx.getLocation({
			success: function (res) {
				console.log(res);
			},
		});
		wx.request({
			url: baseUrl + 'mobileschools/home',
			method: 'GET',
			data: {},
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
					console.log("brief =", brief);

					var dataItem = { "id": item.id, "name": item.name, "brief": brief };
					rootcategories.push(dataItem);
				}
				getApp().allCategorys = data.categories;
				rootcategories.push(localdata[4]);
				that.setData({
					slides: data.carousel,
					interestCategory: data.category,
					categoryData: rootcategories,
					listData: data.courses,

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
		console.log("interestSelected:", index);
		this.setData({
			currentTab: index
		});
	},
	//  展示分类。一级和二级
	chooseInterest: function (res) {
		console.log("首页传递分类数据", this.data.allCategorys);
		var that = this;
		var selectedCategory = that.data.interestCategory;
		wx.navigateTo({
			url: '../chooseInterest/chooseInterest?id=' + selectedCategory.id,
		});
	},
	tapSwiperItem: function (res) {
		console.log("点击轮播图---", res);
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