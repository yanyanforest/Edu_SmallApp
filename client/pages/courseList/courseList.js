// pages/courseList/courseList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		btns:[
			{ "id": 0, "title": "综合","value":{} },
			{ "id": 1, "title": "人气", "value": { "sort":"popular"}},
			{ "id": 2, "title": "价格", "value": {"sort": "priceAsc"}},
		],
		selectedIndex:5,
		categoryBtn:{"id":"","title":"全部分类","isSelected":false},
  courseList:[],
	hasRefresh:true,//正在刷新
  hideLoadMore:true,
	selectedCategory:{},
	firstSelectedCategory:{},
	categorys: app.data.allCategorys
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log(options);
		var categorys = app.data.allCategorys;
		var firstSelectedCategory = JSON.parse(options.first);
		var secondSelectedCategory = JSON.parse(options.second);

		var thirdSelectedCategory = JSON.parse(options.third);

		console.log("firstSelectedCategory---",firstSelectedCategory);
		var that = this;
		that.setData({
			selectedCategory: {"id": options.id, "name": options.name, "children": options.children},
			categoryBtn: { "id": options.id, "title": options.name, "isSelected": true },
			categorys: categorys,
			firstSelectedCategory: firstSelectedCategory,
			secondSelectedCategory: secondSelectedCategory,
			thirdSelectedCategory: thirdSelectedCategory
		});
		this.requestListData({});
  },
requestListData:function(params){
	var that = this;
	wx.request({
		url: app.data.url_server_base + 'courses',
		method: 'GET',
		data: {},
		header: {
			'Accept': 'application/json',
			'content-type': 'application/json'

		},
		success: function (res) {
			console.log("success---", res);
			that.setData({
				courseList: res.data.data.resources,
				hasRefresh: false
			})
		},
		fail: function (error) {
			that.setData({
				hasRefresh: false
			})
		}
	})
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		this.category = this.selectComponent("#category");

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
  // onPullDownRefresh: function () {
  
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
	loadMore:function(e){
		console.log("loadMore");

	},
	// 刷新列表
	refreshList:function(e){
		console.log("refreshList");

		var that = this;
		if (that.data.hasRefresh)
		return;

		that.setData({
			hasRefresh: true,
			curPage: 0
		});
		that.requestListData({});
	},
	category_changed:function(res){
		console.log("category_changed----",res);
		let category = res.target.dataset.id;
		var that = this;
		that.setData({
			selectedIndex:res.target.dataset.id.id
		});
		if(res){

		}
	},
	category_choose:function(res){
		var that = this;
		var item = this.data.categoryBtn;
		item.isSelected = true;
		console.log("分类",this.data.categorys);
		this.category.showView();
		that.setData({
			categoryBtn:item
		});
		// 展开分类 显示
// wx.navigateTo({
// 	url: '',
// });

	},
	_categorySelected:function(e){
		console.log("选中的分类",e);
		this.category.hideView()
	}

})