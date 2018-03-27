// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  message:"",
  username:"幸幸",
  list:[
    [{
			"icon":'./aboutme/me_icon_myCourses@3x.png',
      "name":"我的课程",
      "link":"../testFlex/testFlex"
    }],
    [{
			"icon": './aboutme/me_icon_orderlist@3x.png',
      "name": "课程订单",
			"link": "../orders/orders"	
			// "link": "../courseOrder/courseOrder"
    },
    {
			"icon": './aboutme/me_icon_courseFavorite@3x.png',
      "name": "课程收藏",
			"link": "../favorite/favorite"
    },
    {
			"icon": './aboutme/me_icon_commentlist@3x.png',
      "name": "课程评价",
      "link": ""
    }],
		[{
			"icon": 'aboutme/me_icon_messages@3x.png',
			"name": "消息",
			"link": ""
		},
		{
			"icon": './aboutme/me_icon_safety@3x.png',
			"name": "账户安全",
			"link": ""
		},
		{
			"icon": './aboutme/me_icon_feedback@3x.png',
			"name": "意见反馈",
			"link": ""
		}],
		[{
			"icon": './aboutme/me_icon_settings@3x.png',
			"name": "设置",
			"link": ""
		}]	
  ],

  avatarUrl:"http://pic2.ooopic.com/12/22/94/30b1OOOPIC5c.jpg",
  imageList: ["http://pic2.ooopic.com/12/22/94/30b1OOOPIC5c.jpg", "http://img07.tooopen.com/images/20170316/tooopen_sy_201956178977.jpg"],
  image:""
  },
	pushUserDetail:function(){
wx.navigateTo({
	url: '../userDetail/userDetail',
})
	},
choosePhoto:function(){
  wx.chooseImage({
    success: function(res) {
      wx.saveImageToPhotosAlbum({
        filePath: '',
      })
      console.log(res)
    },
  })
},
cellClick:function(res){

  //判断是否登录。未登录则显示登录界面
  var item = res.currentTarget.dataset.item;
  console.log("跳转",item );
wx.navigateTo({
  url: item.link,
  
});
  wx.setNavigationBarTitle({
    title: item.name,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
},
courseClick:function(res){

	console.log(res.currentTarget.dataset);

wx.navigateTo({
	url: res.currentTarget.dataset.url,
})
},
takePhote(){
  const ctx = wx.createCameraContext()
  ctx.takePhoto({
    quality: 'high',
    success: (res)=>{
      this.setData({
        src: res.tempImagePath
      })
    }
  })
},
  previewImage:function(e){
var current = e.target.dataset.src;
wx.previewImage({
  current:current,
  urls: this.data.imageList,
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },
  QRClick:function(){
    wx.scanCode({
      success:(res)=>{
        this.setData({ message: res.charSet},function(){
        //this is setData callback;
      
        })
        console.log(res.result)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示,meicu d
   */
  onShow: function () {
    var username = wx.getStorageSync("nickName");
    var avatarUrl = wx.getStorageSync("avatarUrl");
    this.setData({ 'username': username });
    this.setData({ 'avatarUrl': avatarUrl })
    console.log("this.username：", username);
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