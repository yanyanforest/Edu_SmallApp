// pages/chooseInterest/chooseInterest.js
Page({

  /**
   * 页面的初始数据
   */
	data: {
		selectedCategory:{},
		dataSource: []
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		var categorys = getApp().allCategorys;
		var curSelectedCategory = {"id":options.id};
	
this.setData({
	dataSource: categorys,
	selectedCategory: curSelectedCategory

})
	},
	categoryselectedClick:function(res){
		var curSelectedCategory = res.currentTarget.dataset.item;
		console.log("选中detailValue:", curSelectedCategory);		
this.setData({
	selectedCategory: curSelectedCategory
});
	},

	closeClick:function(){
wx.navigateBack({
	
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