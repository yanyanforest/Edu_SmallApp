// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "",
    username: "幸幸",
    avatarUrl: "",
    imageList: ["http://pic2.ooopic.com/12/22/94/30b1OOOPIC5c.jpg", "http://img07.tooopen.com/images/20170316/tooopen_sy_201956178977.jpg"],
    image: ""
  },
  choosePhoto: function () {
    wx.chooseImage({
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: '',
        })
        console.log(res)
      },
    })
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var username = wx.getStorageSync("nickName");
    this.setData({ 'username': username });
    this.setData({ 'avatarUrl': username });

    console.log("this.username：", username);
  },
  QRClick: function () {
    wx.scanCode({
      success: (res) => {
        this.setData({ message: res.charSet }, function () {
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