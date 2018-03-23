// pages/canvas/canvasTest.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
  x:0,
	y:0,
      strokeColor:'#ff0000',
			isClear : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
	// 画布触摸开始
start:function(e){
console.log(e)
// 获取触摸手势
var touch = e.touches[0];
//获取触摸点
var x = touch.x;
var y = touch.y;
var strokeColor = this.data.strokeColor;
    // var context = wx.createCanvasContext("myCanvas");
		var context = this.data.context;

    context.setStrokeStyle(strokeColor);
    context.setLineWidth(5);
		context.setLineCap('round');
		// context.draw();
		context.beginPath();
		this.setData({
			x: x,
			y: y,
			context:context
		});
},
// 触摸移动开始
move:function(e){
	var context = this.data.context;
	// var context = wx.createCanvasContext('myCanvas');

	var x1= e.touches[0].x;
	var y1 = e.touches[0].y;
context.moveTo(this.x,this.y);
context.lineTo(x1,y1);
context.stroke();
this.x = x1;
this.y = y1;
wx.drawCanvas({
    canvasId:'myCanvas',
		reserve:true,
		actions:context.getActions()
		})
},
//触摸结束
end:function(e){

},
cancel:function(e){

},
longtap:function(){

},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		var context = wx.createCanvasContext("myCanvas");
		context.setStrokeStyle("#00ff00");
		context.setLineWidth(3);
		context.rect(0,0,200,200);
		context.stroke();
		context.setStrokeStyle("#ff0000");
		context.setLineWidth(1);
		context.moveTo(160,100);
		context.arc(100, 100, 60, 0, 2 * Math.PI, true)
		context.moveTo(140, 100)
		context.arc(100, 100, 40, 0, Math.PI, false)
		context.moveTo(85, 80)
		context.arc(80, 80, 5, 0, 2 * Math.PI, true)
		context.moveTo(125, 80)
		context.arc(120, 80, 5, 0, 2 * Math.PI, true)
		context.stroke();
		context.draw();
      this.setData({
          context:context
      });
  },
	importImage:function(){
wx.canvasToTempFilePath({
	canvasId: 'myCanvas',
	success:function(res){
		console.log("成功：",res.tempFilePath);
	}
})
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