// components/Category/category.js
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	},
  /**
   * 组件的属性列表
   */
  properties: {
		// 是否显示一级分类的全部
		isShowAll:{
			type: Boolean,
			value: false
		},
		allCategory:{
			type: Object,
			value: {id: '', name: '全部' }
		}
		,

		categorys:{
			type: Array,
			value: []
		},
		selectedCategory:{
			type: Object,
			value: {}
		},
		//  现在还不知道属性和 data 之间的优先级，所以和selectFirstCategory分为不同的名字
		firstDefaultCategory: {
			type:Object,
			value:{},
			observer: '_firstCategoryChange'
		},
		secondDefaultCategory: {
			type: Object,
			value: {},
			observer: '_secondCategoryChange'
		},
		thirdDefaultCategory: {
			type: Object,
			value: {},
			observer: '_thirdCategoryChange'
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
// // 这里是一些组件内部数据
		isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
showView(){
	this.setData({
		isShow:true
	});
},
hideView(){
	this.setData({
		isShow: false
	});	
},
//  默认的第一级分类
_firstCategoryChange:function(e){

			console.log(" 默认选中的一级分类:", e);
			var children = e.children;
			if (typeof e.children != 'undefined' ) {
			let secondItem = e.children.length > 0 ? e.children[0] : { "id": e.id, "name": "全部" };//选中的二级分类

			this.setData({
				selectFirstCategory: e,
				selectSecondCategory: secondItem

			});

			}

		},
		_secondCategoryChange:function(e){
			this.setData({
				selectSecondCategory: e

			});
		},
		_thirdCategoryChange:function(e){
			this.setData({
				selectThirdCategory: e,
			});
		},
// 选择一级分类的全部
		_switchAllFirstTab:function(e){
			let item = e.target.dataset.id;//选中全部
			console.log("selected first item", item);

			this.setData({

				selectFirstCategory: item,
				selectSecondCategory: {}
			});
			this._categorySelected(item);
		},
		_categorySelected:function(e){
			this.triggerEvent('categorySelected',e)  
			// this.hideView()
		},
_switchFirstTab: function (e) {

	let item = e.target.dataset.id;//选中的一级分类
	let secondItem = item.children.length > 0 ? item.children[0]:{"id":item.id,"name":"全部"};//选中的二级分类

	console.log("selected first item", item);

	this.setData({
		selectFirstCategory: item,
		selectSecondCategory:secondItem
	})

},
_switchSecondFirstTab: function (e) {
	let item = e.target.dataset.id;
	var selectedItem = { 'id': item.id, 'name': item.name, 'children': [] }
	this.setData({
		selectSecondCategory: selectedItem,
		
	});
	this._categorySelected(selectedItem);

}
		,
_switchSecondTab: function (e) {

	let item = e.target.dataset.id;

	console.log("selected second Item", item);
	this.setData({
		selectSecondCategory: item,
		selectThirdCategory:{}
	});

},
_switchThirdFirstTab: function (e) {

	let item = e.target.dataset.id;
	console.log("selected third Item", item);
	var selectedItem = { 'id': item.id, 'name': item.name, 'children': [] }
	console.log("-----selected third Item", selectedItem);

	this.setData({
		selectThirdCategory: item
	});
	this._categorySelected(selectedItem);

}
		,
_switchThirdTab: function (e) {

	let item = e.target.dataset.id;
	console.log("selected third Item", item);

	this.setData({
		selectThirdCategory: item
	});
	this._categorySelected(item);

},
  }
})
