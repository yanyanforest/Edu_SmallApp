// pages/orderComment/comment.js
const App = getApp()
// import comment_star from '../../template/comment_star'
var url_base = App.data.url_server_base;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  order:{},
 starData:{
	 		one_star: 5,
			two_star: 0,
			max:5,
			selected:5
 }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var item = JSON.parse(options.item);
	console.log(item);

var that = this;
that.setData({
		order:item,

	});
  },
    comment_submit:function (e) {
console.log("评论提交的内容：",e);
var content = e.detail.value.content;
var starLevel = e.detail.value.starLevel;
var courseId = this.data.order.courses.id;
var comment_url = url_base + "courses/"+courseId+"/review";
var token = wx.getStorageSync("token");
wx.request({
	url: comment_url,
	data:{
		"rating":starLevel,
		"content":content
	},
	method: "POST",
	header:{
		"X-AUTH-TOKEN":token,
		'Accept': 'application/json'

	},
	success:function(res){
console.log("评价成功",res);
wx.showToast({
	title: '评价成功',
	icon: "success",
	mask:true,
	duration:3000,
	success: function(success){

	},
	complete:function(finished){
		console.log("---- finished",finished);
		// wx.navigateBack({
		// 	delta:1
		// })
	}
});
		setTimeout(function () {
	wx.navigateBack({
			delta:1
		})		}, 3000);
	},
	fail:function(error){
		console.log("评价失败", error);

	}
})
    },
	starComment: function (e) {
		console.log("----- 选择星级",e);
		var imgItem = e.currentTarget.dataset.imgitem;
		var starId = e.currentTarget.dataset.id;
		console.log("----- 选择星级", e);
		var starData = this.data.starData;
starData.selected = starId + 1;
	this.setData({
				starData: starData
			})
		// if (imgItem == "starActive") {
		// 	console.log("active----- 选择星级", starId);

		// 	starData.two_star = Number(starId);

		// 	starData.one_star = 5 - starData.two_star;

		// 	this.setData({
		// 		starData: starData
		// 	})
		// } else {
		// 	console.log("normal----- 选择星级", starId);

		// 	starData.two_star = Number(starId) ;//+ starData.two_star;
		// 	starData.one_star = 5 - starData.two_star;
		// 	console.log("normal----- 选择星级", starData);

		// 	this.setData({
		// 		starData: starData
		// 	})

		// }
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