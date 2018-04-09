var utils = require('../../utils/util.js');
var WxParse = require('../commons/wxParse/wxParse.js');
// var lineOffsetX = 50; 初始选中tab状态下，下面的线的偏移量
Page({
	// "disableScroll": true

  /**
   * 页面的初始数据
   */
	data: {
		titleBtns: ["详情", "目录","评价"],
		scrollTop: 0,
		scrollHeight: 0, //tab下面的划动区域高度 
		selectedIndex: 0,// 当前所在的 tab index
		commentsTotal:0,// 评论的总条数
		stv: {
			windowWidth: 0,
			windowHeight:0,
			lineWidth: 0,
			offset: 0,//selectedIndex
			tStart: false
		},
		
	},
	changeTab:function(res){
		console.log("更换tab",res);
		var index = res.currentTarget.dataset.index;
		let { tabs, stv, selectedIndex } = this.data;
		selectedIndex = index;
		stv.offset = stv.windowWidth * selectedIndex;
		this.setData({
			selectedIndex: index,
			stv: this.data.stv
		});
		
	},

  /**
   * 生命周期函数--监听页面加载
   */
	onLoad: function (options) {
		console.log("页面加载",options);
		var info = wx.getSystemInfoSync();	
		this.data.stv.lineWidth = info.windowWidth / this.data.titleBtns.length;
		this.data.stv.windowWidth = info.windowWidth;
		this.data.stv.windowHeight = info.windowHeight;

		var that = this;
		that.setData({
						stv: this.data.stv 
		});
		var query = wx.createSelectorQuery();

		//获得视频区的高度
		query.select('#video_h').boundingClientRect()

		//通过Query的api，划动区域（课程详情，目录，课程评价），视频区的高度，然后然屏幕的高度
		query.exec(function (res) {
			console.log("res",res);

			that.setData({
				// scrollHeight: wx.getSystemInfoSync().windowHeight - res[0].height
				options:options,
				scrollHeight: wx.getSystemInfoSync().windowHeight
			})
		});
		// courseId
		this.getCourseDetail(options);
		this.getCourseCatalog(options);
		this.getCourseComments(options);
	},
getCourseDetail:function(res){
	var that = this;
	var briefUrl = 'courses/' + res.courseId;
	var header = {};
var token =	wx.getStorageInfoSync("token")
if(token != 'undefined'){
	header['X-AUTH-TOKEN'] = token;
}
wx.request({
	url:utils.getRequestUrl(briefUrl),
	header:header,
	success:function(res){
console.log("详情:",res);
		if (res.statusCode == 200){
		
		var data = res.data.data;
		var course = data.course;
		if (course.about && course.about != 'null'){
		WxParse.wxParse('about', 'html', course.about, that, 0);
		}	
		if (course.audiences && course.audiences != 'null') {
			WxParse.wxParse('audiences', 'html', course.audiences, that, 0);	
		}	
		if (course.goals && course.goals != 'null') {
			WxParse.wxParse('goals', 'html', course.goals, that, 0);	
		}	
		if (course.teacherInfo && course.teacherInfo != 'null') {
			WxParse.wxParse('teacherInfo', 'html', course.teacherInfo, that, 0);	
		}	
		course['collectCount'] = data.collectCount;
		course['deadline'] = data.deadline;
		course['hasFavorited'] = data.hasFavorited;
		course['member'] = data.member;

		that.setData({
			course:course,

		});

		}	
	},
	fail:function(error){

	}
});
},
// 获取课程目录
getCourseCatalog:function(options){

	var that = this;
	var briefUrl = 'courses/' + options.courseId+'/units';
	var header = {};
	var token = wx.getStorageInfoSync("token")
	if (token != 'undefined') {
		header['X-AUTH-TOKEN'] = token;
	}
	wx.request({
		url: utils.getRequestUrl(briefUrl),
		header: header,
		success: function (res) {
			console.log("目录：", res);
			// 目录数组
			var data = res.data.data;
that.setData({
	catalogList: data
});

		},
		fail: function (error) {

		}
	});

},
// 获取课程评价
getCourseComments: function (options) {
	var that = this;
	var briefUrl = 'courses/' + options.courseId + '/review';
	var header = {};
	var token = wx.getStorageInfoSync("token")
	if (token != 'undefined') {
		header['X-AUTH-TOKEN'] = token;
	}
	var params = {};
	if(options.start != 'undefined'){
		params['start'] = options.start;
	}
	wx.request({
		url: utils.getRequestUrl(briefUrl),
		header: header,
		data:params,
		success: function (res) {
			// 目录数组
			var data = res.data.data;
			console.log("评价列表：", data.resources,res);

			that.setData({
				commentList: data.resources,
				commentsTotal : data.total
			});

		},
		fail: function (error) {

		}
	});

},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
	onReady: function () {
		console.log("初次渲染");
	},

  /**
   * 生命周期函数--监听页面显示
   */
	onShow: function () {

		console.log("监听页面显示");
	},

  /**
   * 生命周期函数--监听页面隐藏
   */
	onHide: function () {
		console.log("监听页面隐藏");
	},

  /**
   * 生命周期函数--监听页面卸载
   */
	onUnload: function () {
		console.log('监听页面缷载');
	},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
	onPullDownRefresh: function () {
		console.log("下拉动作");
	},

  /**
   * 页面上拉触底事件的处理函数
   */
	onReachBottom: function () {
		console.log("上拉触底");
		if (this.data.selectedIndex == 2){
			//  评价列表
			if (this.data.commentsTotal <= this.data.commentList.length){
				return;
			}
			var options = this.data.options;
			options['start'] = this.data.commentList.length;
			this.setData({
				options:options
			});
			this.getCourseComments(options);
		}
	},

  /**
   * 用户点击右上角分享
   */
	onShareAppMessage: function () {
		console.log("右上角");
	},
	handlerStart(e) {
		console.log("开始滑动",e);
		let { clientX, clientY } = e.touches[0];
		this.startX = clientX;
		this.tapStartX = clientX;
		this.tapStartY = clientY;
		this.data.stv.tStart = true;
		this.tapStartTime = e.timeStamp;
		this.setData({ stv: this.data.stv })
	},
	handlerMove(e) {
		console.log("滑动", e);

		let { clientX, clientY } = e.touches[0];
		let { stv } = this.data;
		let offsetX = this.startX - clientX;
		this.startX = clientX;
		stv.offset += offsetX;
		if (stv.offset <= 0) {
			stv.offset = 0;
		} else if (stv.offset >= stv.windowWidth * (this.data.titleBtns.length - 1)) {
			stv.offset = stv.windowWidth * (this.data.titleBtns.length - 1);
		}
		this.setData({ stv: stv });
	},
	handlerCancel(e) {

	},
	handlerEnd(e) {
		console.log("滑动结束", e.changedTouches[0]);

		let { clientX, clientY } = e.changedTouches[0];
		let endTime = e.timeStamp;
		let { tabs, stv, selectedIndex } = this.data;
		let { offset, windowWidth } = stv;
		//快速滑动
		console.log("快速滑动", endTime - this.tapStartTime);
	
		if (endTime - this.tapStartTime <= 100) {
			//向左
			if (Math.abs(this.tapStartY - clientY) < 50) {
				console.log("快速滑动 yyy", this.tapStartY - clientY);

				if (this.tapStartX - clientX > 5) {
					console.log("快速滑动 xxxxx", this.tapStartX - clientX);

					if (selectedIndex < this.data.titleBtns.length - 1) {
						this.setData({ selectedIndex: ++selectedIndex })
					}
				} else {
					if (selectedIndex > 0) {
						this.setData({ selectedIndex: --selectedIndex })
					} else {
						this.setData({ selectedIndex: ++selectedIndex })

					}
				}
				stv.offset = stv.windowWidth * selectedIndex;
			} else {
				//快速滑动 但是Y距离大于50 所以用户是左右滚动
				let page = Math.round(offset / windowWidth);
				if (selectedIndex != page) {
					this.setData({ selectedIndex: page })
				}
				stv.offset = stv.windowWidth * page;
			}
		} else {
			let page = Math.round(offset / windowWidth);
			
			if (page >= 0 && page < this.data.titleBtns.length) {

			if (selectedIndex != page) {
				this.setData({ selectedIndex: page })
				console.log("滑动selectedIndex", this.data.selectedIndex);

			}
			stv.offset = stv.windowWidth * this.data.selectedIndex;
		}
		stv.tStart = false;
		this.setData({ stv: this.data.stv });
		}
	},
	//  加入学习
	bindMember:function(){

	},
	//  立即购买
		bindBuy:function(){

	},
		//  立即学习
		bindStudy: function () {

		},
	
})