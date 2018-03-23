//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
// function count_down(that) {
// that.setData({
// 	time_high:'2018-06-07'
// });
// 	var date = that.data.time_high;
// 	var time_high = getDate(date);
// 	var days = date - (new Date());
// 	console.log("剩余天数：", days);

// } 
Page({
	data: {
		phone:'18601282547',
		time_high: '2018-06-06',
		userInfo: {},
		logged: false,
		takeSession: false,
		requestResult: '',
		message: 'Hello Mina!',
		array: [1, 2, 3, 4, 5, 6],
		staffA: { firstName: 'Hulk', lastName: 'Hu' },
		staffB: { firstName: 'Shang', lastName: 'You' },
		staffC: { firstName: 'Gideon', lastName: 'Lin' },
		percentage: 0,
		years: [2014, 2015, 2016, 2017, 2018],
		months: [1, 2, 3, 4, 5,6,9],
		dates: [1, 2, 4, 6, 7],


	},
	onLoad: function () {
		var appInstance = getApp()
		console.log("app文件中的全局变量---------:", getApp().globalData)
		// this.count_down();
	},
	//拨打电话
	makeCall:function(res){
		var phoneNumber = this.data.phone;
		wx.makePhoneCall({
			phoneNumber: phoneNumber,
		})
	},
	pickerChanged:function(){

	},
	canvasPush:function(){
wx.navigateTo({
	url: '../canvas/canvasTest',
})
	},
	canvasTest:function(){
		wx.navigateTo({
			url: '../canvasTest/canvasTest',
		})	
	},
	canvasDemo:function(){
		wx.navigateTo({
			url: '../canvasDemo/canvasDemo',
		})


	},
	// 倒计时
	count_down: function () {
		var that = this;
		setInterval(function () {
			var curDate = util.formatTime(new Date);
			console.log("curDate-----------", curDate);
			var time_high = util.formatTime(new Date(that.data.time_high));
			console.log(time_high);
			//  两个时间相差的秒数
			var seconds = (Date.parse(time_high) - Date.parse(curDate)) / 1000;
			var days = seconds / (3600 * 24);

			var hours = parseInt((seconds - parseInt(days) * 3600 * 24) / 3600);

			var minutes = parseInt((seconds - parseInt(days) * 3600 * 24 - parseInt(hours) * 3600) / 60);

			var secs = parseInt((seconds - parseInt(days) * 3600 * 24 - parseInt(hours) * 3600 - parseInt(minutes) * 60))
			console.log("secs:", secs);

			if (hours.toString().length <= 1) {
				hours = '0' + hours;
			}
			if (minutes.toString().length <= 1) {
				minutes = '0' + minutes;
			}
			if (secs.toString().length <= 1) {
				secs = '0' + secs;
			}

			var timeString = hours + '小时' + minutes + '分' + secs + '秒'

			days = parseInt(days);
			that.setData({
				days: days,
				timeString: timeString
			});
		}.bind(this), 1000);
	},
	onReady:function(){

	},

	//基本 运算符
	optionClick: function () {
		var a = 10, b = 20;
		console.log(30 === a + b);
		console.log(-10 === a - b);

		console.log(200 === a * b);
		console.log(0.5 === a / b);
		console.log(10 === a % b);
		a = '.w', b = 'xs'
		console.log('.wxs' === a + b);

	},
	flexPush: function (res) {
		wx.navigateTo({
			url: '../flex/flexDemo',
		})
	},
	playVideo() {
		wx.navigateTo({
			url: '../video/testVideo',
		})
	},
	push: function () {
		wx.navigateTo({
			url: '../userInfo/userInfo',
		})
	},
	pushLogin: function () {
		wx.navigateTo({
			url: '../login/login',
		})
	},
	locateMe: function () {
		util.showBusy(' 正在定位中....')
		wx.navigateTo({
			url: '../location/locateMe',
		})
	},
	pushHomeRequestPage: function () {

	},
	// 用户登录示例
	login: function () {
		if (this.data.logged) return

		util.showBusy('正在登录')
		var that = this

		// 调用登录接口
		qcloud.login({
			success(result) {
				if (result) {
					util.showSuccess('登录成功')
					that.setData({
						userInfo: result,
						logged: true
					})
				} else {
					// 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
					qcloud.request({
						url: config.service.requestUrl,
						login: true,
						success(result) {
							util.showSuccess('登录成功')
							that.setData({
								userInfo: result.data.data,
								logged: true
							})
						},

						fail(error) {
							util.showModel('请求失败', error)
							console.log('request fail', error)
						}
					})
				}
			},

			fail(error) {
				util.showModel('登录失败', error)
				console.log('登录失败', error)
			}
		})
	},

	// 切换是否带有登录态
	switchRequestMode: function (e) {
		this.setData({
			takeSession: e.detail.value
		})
		this.doRequest()
	},

	doRequest: function () {
		util.showBusy('请求中...')
		var that = this
		var options = {
			url: config.service.requestUrl,
			login: true,
			success(result) {
				util.showSuccess('请求成功完成')
				console.log('request success', result)
				that.setData({
					requestResult: JSON.stringify(result.data)
				})
			},
			fail(error) {
				util.showModel('请求失败', error);
				console.log('request fail', error);
			}
		}
		if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
			qcloud.request(options)
		} else {    // 使用 wx.request 则不带登录态
			wx.request(options)
		}
	},

	// 上传图片接口
	doUpload: function () {
		var that = this

		// 选择图片
		wx.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: function (res) {
				util.showBusy('正在上传')
				var filePath = res.tempFilePaths[0]

				// 上传图片
				wx.uploadFile({
					url: config.service.uploadUrl,
					filePath: filePath,
					name: 'file',

					success: function (res) {
						util.showSuccess('上传图片成功')
						console.log(res)
						res = JSON.parse(res.data)
						console.log(res)
						that.setData({
							imgUrl: res.data.imgUrl
						})
					},

					fail: function (e) {
						util.showModel('上传图片失败')
					}
				})

			},
			fail: function (e) {
				console.error(e)
			}
		})
	},

	// 预览图片
	previewImg: function () {
		wx.previewImage({
			current: this.data.imgUrl,
			urls: [this.data.imgUrl]
		})
	},

	// 切换信道的按钮
	switchChange: function (e) {
		var checked = e.detail.value

		if (checked) {
			this.openTunnel()
		} else {
			this.closeTunnel()
		}
	},

	openTunnel: function () {
		util.showBusy('信道连接中...')
		// 创建信道，需要给定后台服务地址
		var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)

		// 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
		//     tunnel.on('connect', () = > {
		//         util.showSuccess('信道已连接')
		//     console.log('WebSocket 信道已连接')
		//     this.setData({tunnelStatus: 'connected'})
		// })
		//
		//     tunnel.on('close', () = > {
		//         util.showSuccess('信道已断开')
		//     console.log('WebSocket 信道已断开')
		//     this.setData({tunnelStatus: 'closed'})
		// })
		//
		//     tunnel.on('reconnecting', () = > {
		//         console.log('WebSocket 信道正在重连...')
		//     util.showBusy('正在重连')
		// })
		//
		//     tunnel.on('reconnect', () = > {
		//         console.log('WebSocket 信道重连成功')
		//     util.showSuccess('重连成功')
		// })
		//
		//     tunnel.on('error', error = > {
		//         util.showModel('信道发生错误', error)
		//     console.error('信道发生错误：', error)
		// })
		//
		//     // 监听自定义消息（服务器进行推送）
		//     tunnel.on('speak', speak = > {
		//         util.showModel('信道消息', speak)
		//     console.log('收到说话消息：', speak)
		// })

		// 打开信道
		tunnel.open()

		this.setData({ tunnelStatus: 'connecting' })
	},

	/**
	 * 点击「发送消息」按钮，测试使用信道发送消息
	 */
	sendMessage() {
		if (!this.data.tunnelStatus || !this.data.tunnelStatus === 'connected') return
		// 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
		if (this.tunnel && this.tunnel.isActive()) {
			// 使用信道给服务器推送「speak」消息
			this.tunnel.emit('speak', {
				'word': 'I say something at ' + new Date(),
			});
		}
	},

	/**
	 * 点击「关闭信道」按钮，关闭已经打开的信道
	 */
	closeTunnel() {
		if (this.tunnel) {
			this.tunnel.close();
		}
		util.showBusy('信道连接中...')
		this.setData({ tunnelStatus: 'closed' })
	}
})
