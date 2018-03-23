// pages/courseOrder/courseOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
selectedIndex:0,
		isHideLoadMore:false,
		page:0,
		btns:[
			{
			id:0,
			name:"全部"
			},
			{
				id: 1,
				name: "待支付"
			},
			{
				id: 2,
				name: "待评价"
			}
		],
		recommends: [
			{
				goodId: 7,
				name: '初中课程-语文1',
				url: 'bill',
				imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161213/148162245074.jpg',
				newprice: "￥36.60",
				oldprice: "￥40.00",
			},
			{
				goodId: 10,
				name: '初中课程-语文2',
				url: 'bill',
				imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057937593.jpg',
				newprice: "￥30.00",
				oldprice: "￥80.00",
			},
			{
				goodId: 11,
				name: '初中课程-语文3',
				url: 'bill',
				imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057953326.jpg',
				newprice: "￥30.00",
				oldprice: "￥80.00",
			},
			{
				goodId: 7,
				name: '初中课程-语文1',
				url: 'bill',
				imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161213/148162245074.jpg',
				newprice: "￥36.60",
				oldprice: "￥40.00",
			},
			{
				goodId: 10,
				name: '初中课程-语文2',
				url: 'bill',
				imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057937593.jpg',
				newprice: "￥30.00",
				oldprice: "￥80.00",
			}, 
			{
				goodId: 11,
				name: '初中课程-语文3',
				url: 'bill',
				imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057953326.jpg',
				newprice: "￥30.00",
				oldprice: "￥80.00",
			},
			{
				goodId: 12,
				name: '初中课程-语文4',
				url: 'bill',
				imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/14805828016.jpg',
				newprice: "￥239.00",
				oldprice: "￥320.00",
			},
			{
				goodId: 13,
				name: '初中课程-语文5',
				url: 'bill',
				imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058014894.jpg',
				newprice: "￥130.00",
				oldprice: "￥180.00",
			}],
     recommends_page: [
    {
        goodId: 7,
        name: '初中课程-数学1',
        url: 'bill',
        imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161213/148162245074.jpg',
        newprice: "￥36.60",
        oldprice: "￥40.00",
    },
    {
        goodId: 10,
        name: '初中课程-数学2',
        url: 'bill',
        imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057937593.jpg',
        newprice: "￥30.00",
        oldprice: "￥80.00",
    }, {
        goodId: 11,
        name: '初中课程-数学3',
        url: 'bill',
        imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148057953326.jpg',
        newprice: "￥30.00",
        oldprice: "￥80.00",
    },
    {
        goodId: 12,
        name: '初中课程-数学4',
        url: 'bill',
        imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/14805828016.jpg',
        newprice: "￥239.00",
        oldprice: "￥320.00",
    },
    {
        goodId: 13,
        name: '初中课程-数学5',
        url: 'bill',
        imageurl: 'http://mz.djmall.xmisp.cn/files/product/20161201/148058014894.jpg',
        newprice: "￥130.00",
        oldprice: "￥180.00",
    }]

  },
	loadMore:function(res){
		this.onReachBottom();
	},
    refesh:function(res){
		this.onPullDownRefresh();
	},
    pullDownChange:function (res) {

    },
    btnclick:function (res) {
		var index = parseInt(res.currentTarget.dataset.id);
		this.setData({
			selectedIndex:index
		});
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
		console.log('刷新')
	var page = 0;
	var curList = this.data.recommends_page;
		// 停止当前页面的下拉刷新、
		wx.showNavigationBarLoading() //在标题栏中显示加载

		//模拟加载
		setTimeout(function () {
			// complete
			wx.hideNavigationBarLoading() //完成停止加载
			wx.stopPullDownRefresh() //停止下拉刷新
			this.setData({
				isHideLoadMore: false,
				page:0,
				recommends:curList
				
			})
		}, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
		console.log('--- 加载更多---');
	var page = this.data.page;
  var	isHideLoadMore = false;
	
		setTimeout(() => {
			if (page < 5) {
		
			var curList = this.data.recommends_page;
			var recommends = this.data.recommends;
			for(var i = 0;i<curList.length;i++){
          recommends.push(curList[i]);
			}
			this.setData({
				recommends:recommends
			});
			page++;
		if(page >= 5){
			isHideLoadMore = true;
		}
			this.setData({
				isHideLoadMore: isHideLoadMore,
				recommends: recommends,
				page:page
			});
			} else {
				isHideLoadMore = true;
				this.setData({
					isHideLoadMore: isHideLoadMore,
					page: page
				});
			}
			
		}, 1000);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
	scroll:function(res){
		console.log("-------", res);	
	}

})