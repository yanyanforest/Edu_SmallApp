// pages/video/testVideo.js
 function getRandomColor(){
  var rgb = [];
  for (var i = 0; i < 3; i++) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length == 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
}

Page({

  /**
   * 页面的初始数据
   */
  inputValue: '',

  data: {
    isRandomColor: true,//随机 颜色
    numberColor: '#FF0000',
    danmuList: [
      {
        text: '第一秒出现的弹幕',
        color: "#ff0000",
        time: 1
      },
      {
        text: '第3秒出现的弹幕',
        color: "#ffff00",
        time: 3
      },
      {
        text: '第5秒出现的弹幕',
        color: "#ff00ff",
        time: 5
      },
      {
        text: '第n秒出现的弹幕',
        color: "#ff66ff",
      }

    ]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth;
        var videoHeight = (225 / 300) * windowWidth;
        that.setData({
          videoWidth: windowWidth,
          videoHeight: videoHeight
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.videoCtx = wx.createVideoContext('myVideo')

  },
  bindSend:function(){
    console.log("发送弹幕");
    var color = this.data.numberColor;
    console.log(color);

    if (this.data.isRandomColor) {
      color = getRandomColor();
    }

    this.videoCtx.sendDanmu({
      text: this.inputValue,
      color: color
    });
  },
  sendDanmu: function () {
    console.log("发送弹幕");
    var color = '#FF0000';
    if (this.data.isRandomColor) {
      color = getRandomColor();
    }

    this.videoCtx.sendDanmu({
      text: this.inputValue,
      color: '#FF0000'
    });
  },
  bindSendDanmu:function(){
    console.log("发送弹幕");
    var color = '#FF0000';
    if (this.data.isRandomColor) {
      color = getRandomColor();
    }

    this.videoCtx.sendDanmu({
      text: this.inputValue,
      color: '#FF0000'
    });
  },
  /**
   * switch 随机颜色切换
   */
  switchChange: function (e) {
    console.log("----------change");
    this.setData({
      isRandomColor: e.detail.value
    })
  },

  bindInputBlur: function (e) {
    console.log("----blur", e.detail);
    this.inputValue = e.detail.value
  },
  play: function () {
    this.videoCtx.play()
  },
  pause: function () {
    this.videoCtx.pause()
  },
  updateTime: function (info) {
    var detail = info.detail;
    // console.log("detail:",detail);
    var second = detail.currentTime;

    var minute = (second / 60) < 1 ? "00" : parseInt(second / 60);
    // console.log("minute:", minute);

    second = parseInt(second % 60);
    // console.log("second:", second);

    var textStr = minute.toString() + ":" + second.toString(10);

    this.setData({
      time: textStr
    })
  },
  fullScreenChange: function (videoInfo) {
    console.log("全屏显示：", videoInfo);
  },
  selectColor:function(){
    wx.navigateTo({
      url: '../color/selectColor',
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
      wx.getStorage({
          key: 'numberColor',
          success: function (res) {
              console.log(res.data + "numberColor----")
              that.setData({
                  numberColor: res.data,
              })
          }
      })
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