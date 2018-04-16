// pages/components/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    modalHidden: {
      type: Boolean,
      value: true
    },
    courseList: {
      type: Array,
      value: []
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
		_bindDetail:function(res){
			console.log("详情",res);
			var course = res.currentTarget.dataset.item
			wx.navigateTo({
				url: '../../pages/courseDetail/courseDetail?courseId='+course.id,
			})
		}
  }
})
