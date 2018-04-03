Page({
  data:{
    menuTapCurrent:0
  },
  menuTap: function (e) {
    var current = e.currentTarget.dataset.current;
    console.log(current);
    this.setData({
      menuTapCurrent: current
    });


  },
  onLoad:function(e){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })
  }
})