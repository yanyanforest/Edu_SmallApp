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
	categorys: app.data.allCategorys,
	priceAsc :  0,// 0标识 未选中，1标识升序，2 标识降序,
	total:1,//总的条数
	start:0,// 请求完 start 的开始页数
	requestParams:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		console.log("onLoad---", options);
		var categorys = app.data.allCategorys;
		var secondSelectedCategory = {};
		var thirdSelectedCategory = {};
		var firstSelectedCategory = JSON.parse(options.first);
		if (options.second != 'undefined'){
		 secondSelectedCategory = JSON.parse(options.second);
		}
		if (options.third != 'undefined') {
			var thirdSelectedCategory = JSON.parse(options.third);
		}
		var that = this;
		that.setData({
			selectedCategory: {"id": options.id, "name": options.name, "children": options.children},
			categoryBtn: { "id": options.id, "title": options.name, "isSelected": true },
			categorys: categorys,
			firstSelectedCategory: firstSelectedCategory,
			secondSelectedCategory: secondSelectedCategory,
			thirdSelectedCategory: thirdSelectedCategory
		});
		this.setData({
			requestParams: { "categoryId": options.id,"start":0}
		});
		this.requestListData(this.data.requestParams);
  },
requestListData:function(params){
	var that = this;	
	var start = this.data.courseList.length;
	var list = this.data.courseList;
	wx.request({
		url: app.data.url_server_base + 'courses',
		method: 'GET',
		data: params,
		header: {
			'Accept': 'application/json',
			'content-type': 'application/json'

		},
		success: function (res) {
			console.log("success---", res);
			var curList = res.data.data.resources;
			list.push.apply(list, curList);
			that.setData({
				courseList: list,
				hasRefresh: false,
				total: res.data.data.total,
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
  onReachBottom: function () {
		var total = this.data.total;
		console.log("onReachBottom:", this.data.total);
		var that = this;
		if (total > this.data.courseList.length){
			var data = this.data.requestParams;
			data['start'] = this.data.courseList.length;
			that.setData({
				requestParams : data
			});
			this.requestListData(this.data.requestParams)
		}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

	// 左边三个按钮的点击事件
	leftbtnClick:function(res){
		console.log("左边三个按钮的点击事件",res);
		var priceAsc = 0;
		var dataset = res.currentTarget.dataset;
		var curSelectedIndex = dataset.index;
		var data = {};
		var that = this;
		if (curSelectedIndex == 2){
// 如果当前选中的是价格，那么开始判断 是否升序或者降序
			 if(this.data.priceAsc == 1){
				priceAsc = 2;
				data = { "sort": "priceDesc" }

			} else {
				priceAsc = 1;
			data = { "sort": "priceAsc" }
			} 
		

		} else if (this.data.selectedIndex != curSelectedIndex && curSelectedIndex != 2){
if (curSelectedIndex == 0){
	//综合排序
	data = {}
} else {
	// 人气 升序
	data = { 'sort': "popular"};
}

		} else{
			return;
		}
		if (this.data.selectedCategory.id.length  > 0){
			data['categoryId'] = this.data.selectedCategory.id;
		}
			that.setData({
				priceAsc: priceAsc,
				selectedIndex:curSelectedIndex
			});
			data['start'] = 0;
			that.setData({
				requestParams : data,
					courseList :[]
			})
			this.requestListData(this.data.requestParams);
	}
	,
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
		console.log("分类---", item);

		this.category.showView();
		that.setData({
			categoryBtn:item
		});

	},
	_categorySelected:function(e){
		var that = this;
var selectedCategory = e.detail;

var categoryBtn = { 'id': selectedCategory.id, 'title': selectedCategory.name, 'isSelected': true };
		var params = this.data.requestParams;

if(selectedCategory.id.length > 0){
	params['categoryId'] = selectedCategory.id;	
	
}else{
	delete params['categoryId'];
}
params['start'] = 0;
		
		that.setData({
			selectedCategory:selectedCategory,
			categoryBtn: categoryBtn,
			requestParams: params,
			courseList:[]
		});
		that.requestListData(this.data.requestParams);

		this.category.hideView()
	}

})