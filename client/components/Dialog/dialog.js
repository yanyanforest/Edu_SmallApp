// components/Dialog/dialog.js
// https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html
Component({
	options:{
		multipleSlots: true //在组件定义时启用多 slot 支持

	},
  /**
   * 组件的属性列表
   */
  properties: {
		title:{
			type: String,//   类型必填，
			value: '' //标题 初始值，可选，如果未指定，则会根据类型选择一个，

		},
		confirmText:{
			type: String,
			value: '确定'
		},
		cancelText: {
			type: String,
			value: '取消'
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
/**
 * 公有方法
 */
showDialog(){
	this.setData({
		isShow: !this.data.isShow
	});
},
hideDialog(){
	this.setData({
		isShow: !this.data.isShow
	});
},
//  私有方法 建议和公有方法区分
_cancelEvent(){
	this.triggerEvent('cancelEvent');
},
_confirmEvent(){
	this.triggerEvent('confirmEvent');
}
  }
})
