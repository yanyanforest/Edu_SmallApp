//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var mainColor = "#ff6700";
// var url_server_base = "http://app.xueyuanwang.com/api/";
//  App() 函数用来注册一个小程序，，接收一个 object 参数，，其指定小程序的生命周期函数等
//https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/app.html
App({
	data:{
		url_server_base:"https://www.sdkhcm.com/api/",
		mainSelectedColor: "#ff6700",
		allCategorys: [],
		appHeight:0
	},
	
  //wxa735808d227bcd7a
  //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    onLaunch: function () {

			wx.setStorageSync('token', 'l9bn9mp4joggo0ogsckc0owgo8c8488')
      wx.getUserInfo({
        success:function(res){
          console.log("userinfo:",res.rawData)
          let info = res.userInfo;
          var nickName = info.nickName;
          wx.setStorageSync("nickName", nickName);
          wx.setStorageSync("avatarUrl", info.avatarUrl);
          wx.setStorageSync("gender", info.gender);

        },fail:function(error){
          console.log("userinfo fail:", error)
        }
      });
      wx.checkSession({
success:function(){
  //session未过期
  console.log("session未过期success:");

},
fail:function(){
  //session 失效重新登录
  wx.login({
    success: function (res) {
      console.log("success:", res);
      if (res.code) {

      }

    },
    fail: function (error) {
      console.log("error:", error);

    }, complete: function (res) {
      console.log(res);
    }
  })
}
      })
     
        qcloud.setLoginUrl(config.service.loginUrl)
    },
    onShow:function(options){
      console.log("------------------------------------")
      console.log("onShow:",options)
    },
    onHide:function(options){
      console.log("onHide:",options)
    },
    onError:function(msg){
      console.log("onError:",msg)
    },
    globalData:'全局变量'
})