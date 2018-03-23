// canvas 全局配置
var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;//是否开始触摸
var arrx = [];
var arry = [];
var arrz = [];
var arrColor = [];
var canvasw = 0;
var canvash = 0;
var isClear = true;
//获取系统信息
// wx.getSystemInfo({
// 	success: function (res) {
// 		canvasw = res.windowWidth;//设备宽度
// 		canvash = res.windowHeight;
// 		this.setData({
// 			canvasw: canvasw,
// 			canvash: canvash,
// 		})
// 	}
// });

Page({
	data: {
		selectColor: "#ffff00"
	},
	canvasIdErrorCallback: function (e) {
		console.error(e.detail.errMsg)
	},
	canvasStart: function (event) {
		console.log("触摸开始");

		context.save();
		context.setStrokeStyle(this.data.selectColor);
		context.setLineWidth(5);
		context.moveTo(event.touches[0].x, event.touches[0].y);

	},
	canvasMove: function (event) {
this.isClear =  false;
		let x = event.touches[0].x;
		let y = event.touches[0].y;
		context.lineTo(x, y)
		context.stroke();
		context.draw(true);
		context.moveTo(x, y)
		console.log("触摸ing");

	},
	canvasEnd: function (event) {
		context.stroke();

// 		isButtonDown = false;
// 		// 		//storke() 描绘的路径是从beginPath()开始计算，但是不会将fillRect()包含进去
// // context.closePath();
// // 		context.stroke();
		wx.drawCanvas({
			canvasId: 'canvas',
			actions: context.getActions(),//绘图的数组
			reserve: true
		});
		console.log("触摸结束");

console.log("触摸结束保存");
// context.save();

	},
	cancelDraw: function () {
		//清除画布
		console.log("开始撤销");
		context.restore();
		console.log("撤销");
	},
	cleardraw: function () {
		this.isClear = true;
		//清除画布
		context.clearRect(0, 0, canvasw, canvash);
		context.draw(true);
	},
	getimg: function () {
		if (this.isClear) {
			wx.showModal({
				title: '提示',
				content: '签名内容不能为空！',
				showCancel: false
			});
			return false;
		};
		//生成图片
		wx.saveImageToPhotosAlbum({
			filePath: '',
		})
		wx.canvasToTempFilePath({
			canvasId: 'canvas',
			success: function (res) {
				console.log(res.tempFilePath);
				//存入服务器
				// wx.uploadFile({
				// 	url: 'a.php', //接口地址
				// 	filePath: res.tempFilePath,
				// 	name: 'file',
				// 	formData: { //HTTP 请求中其他额外的 form data 
				// 		'user': 'test'
				// 	},
				// 	success: function (res) {
				// 		console.log(res);
				// 	},
				// 	fail: function (res) {
				// 		console.log(res);
				// 	},
				// 	complete: function (res) {
				// 	}
				// });
			}
		})
	},
	colorSelect: function () {
		wx.navigateTo({
			url: '../color/selectColor',
		})
	},


  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		// 使用 wx.createContext 获取绘图上下文 context
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				canvasw = res.windowWidth;//设备宽度
				canvash = res.windowHeight - 70;
				console.log(canvasw, canvash);
				that.setData({

					canvasw: canvasw,
					canvash: canvash,
					selectColor: "#ffff00"
				})
			}
		});
		context = wx.createCanvasContext('canvas');
		context.beginPath()
		context.setStrokeStyle(this.data.selectColor);

		context.setLineWidth(10);
		context.setLineCap('round');
		context.setLineJoin('round');
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
		// 获取保存的颜色
		var color = wx.getStorageSync('numberColor');
		if (color) {
			console.log("选中的颜色：", color);

			this.setData({
				selectColor: color
			});
			context.setStrokeStyle(this.data.selectColor)
		}



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