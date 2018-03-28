// pages/favorite/favorite.js
const MAX = 250;
const MOVE_MAX = 80;

Page({



  /**
   * 页面的初始数据
   */
  data: {
    showAction: [false,false,false],
    delta: [0,0,0],
    startX: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      delta: [0, 0, 0],
    })
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
  
  },

  onTouchStart: function(e){
    this.setData({
      startX: e.touches[0].clientX
    })
  },

  onTouchMove: function(e) {
    let index = e.currentTarget.dataset.key;
    const start = this.data.delta[index]
    let delta = e.changedTouches[0].clientX - this.data.startX

   
    //如果为0 右不动
    if(start === 0 ){
      if(delta > 0){
        delta = start;
      }
      if(delta < -MAX) {
        delta = -MAX;
      }

    }
 

    if(start === -MAX){
      if(delta < 0){
        delta = start;
      }

      let temp = -MAX + delta;

      if(temp > 0){
        temp =0;
      }
      delta= temp;

      
    }
    let datas= this.data.delta;
    datas[index]=delta;
    this.setData({
      delta: datas
    })
  },

  onTouchEnd: function(e) {
    let index = e.currentTarget.dataset.key;
    let showAction = this.data.showAction[index];
    let delta = e.changedTouches[0].clientX - this.data.startX
    //
    if (showAction === false){
      if(delta < -MOVE_MAX){
        delta = -MAX;
        showAction=true
      }else{
        delta = 0;
      }
    }

    if(showAction === true){
      if(delta > MOVE_MAX){
        delta = 0;
        showAction = false
      }else{
        delta = -MAX;
      }
    }

    let actions= this.data.showAction;
    let datas = this.data.delta;

    actions[index]=showAction;
    datas[index]=delta;
    this.setData({
      delta: datas,
      showAction: actions
    })
  }
})