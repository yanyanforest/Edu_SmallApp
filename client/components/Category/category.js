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
		isShowAll: {
			type: Boolean,
			value: false
		},
		allCategory: {
			type: Object,
			value: { id: '', name: '全部' }
		}
		,

		categorys: {
			type: Array,
			// value: getApp().data.allCategorys,
			value: [],
			observer: '_categorysChange'
		},
		selectedCategory: {
			type: Object,
			value: {}
		},
		//  现在还不知道属性和 data                                   
		firstDefaultCategory: {
			type: Object,
			value: {},
			// value: { id: '', name: '全部' },

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
		isShow: false,
		selectFirstCategory: { id: '', name: '全部' }// 默认是选中【全部】。
	},

  /**
   * 组件的方法列表
   */
	methods: {
		showView() {
			this.setData({
				isShow: true
			});
		},
		hideView() {
			this.setData({
				isShow: false
			});
		},
		//  默认的第一级分类
		_firstCategoryChange: function (e) {

			console.log(" 默认选中的一级分类:", e);
			if (e == null) {
				return;
			}

			try {

				if (typeof e.children != 'undefined') {

					let secondItem = e.children.length > 0 ? e.children[0] : { "id": e.id, "name": "全部" };//选中的二级分类

					console.log(" 默认选中的一级分类children:", e.children);

					this.setData({
						selectFirstCategory: e,
						selectSecondCategory: secondItem

					});

				} else {
					console.log(" 默认选中的一级分类22222:", this.data.categorys);


					if (this.data.categorys != null) {
						for (var i = 0; i < this.data.categorys.length; i++) {
							var item = this.data.categorys[i];
									if (item.id == e.id) {
										console.log("一级分类---------", item);
										this.setData({
											selectFirstCategory: item,
											selectSecondCategory:{"id":item.id}
										})
										return;
									}
						}
					}
				}

			} catch (error) {
				console.log('try-catch', error);
			}

		},
		_secondCategoryChange: function (e) {
			if (e != null) {
				if (typeof e.children != 'undefined') {
					this.setData({
						selectSecondCategory: e,
					});
				}
			}

		},

		_thirdCategoryChange: function (e) {
			this.setData({
				selectThirdCategory: e,
			});
		},
		/**
		 *   下面的方法是按钮对应的操作
		 */
		// 选择一级分类的全部
		_switchAllFirstTab: function (e) {
			let item = e.target.dataset.id;//选中全部
			console.log("selected first item", item);

			this.setData({

				selectFirstCategory: item,
				selectSecondCategory: {}
			});
			this._categorySelected(item);
		},
		_categorySelected: function (e) {
			this.triggerEvent('categorySelected', e)
			// this.hideView()
		},

		_switchFirstTab: function (e) {

			let item = e.target.dataset.id;//选中的一级分类
			let secondItem = item.children.length > 0 ? item.children[0] : { "id": item.id, "name": "全部" };//选中的二级分类
			// let thirdItem = secondItem.children.length > 0 ? secondItem.children[0] : { "id": secondItem.id, "name": "全部" };//选中的二级分类

			console.log("selected first item", item);

			this.setData({
				selectFirstCategory: item,
				selectSecondCategory: secondItem,
				selectThirdCategory: {}
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
				selectThirdCategory: {}
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
	},
	//  全部分类赋值，那么替换一下，选中的分类状态
	_categorysChange: function (e) {
		this.setData({
			categorys: e
		});
	}

})
