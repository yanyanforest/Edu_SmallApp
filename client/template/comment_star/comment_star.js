
var course_comment_star = {
	// datatmp: {
		// starData: {
		// 	// starUrl: 'star_normal.png',
		// 	// starActiveUrl: 'star_selected.png',
		// 	one_star: 5,
		// 	two_star: 0
		// },
	// },
	starComment:function(e) {
		var imgItem = e.currentTarget.dataset.imgitem;
		var starId = e.currentTarget.dataset.id;
		var starData = this.data.starData;
		if (imgItem == "starActive") {
			starData.two_star = Number(starId);
			starData.one_star = 5 - starData.two_star;
			this.setData({
				starData: starData
			})
		} else {
			starData.two_star = Number(starId) + starData.two_star;
			starData.one_star = 5 - starData.two_star;
			this.setData({
				starData: starData
			})

		}
	}

	
}
export default comment_star;
// module.exports = {
// 	comment_star	
// }