const base_url = 'https://www.sdkhcm.com/api/';
var getRequestUrl = function(briefUrl){
	return base_url + briefUrl;
}
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

var showCourseExpiryDay = (num) =>
{
 if( num <= 0){
	 return "永久有效";
 } else {
	 return num + '天';
 }
}
// get 方法请求
var getRequest = (briefUrl,header,params,succcess,failure)=>{
	var headerTmp = {'content-type': 'application/json'};
	// 'X-AUTH-TOKEN': wx.getStorageSync('token'),
	if(header){
headerTmp.push(header);
	}
	wx.request({
		url: base_url+briefUrl,
		header:headerTmp,
		method: 'GET',
		data: params,
		success : succcess,
		fail:failure
	});

}
var postRequest = (briefUrl, header, params, succcess, failure) => {
	var headerTmp = { 'content-type': 'application/json' };
	// 'X-AUTH-TOKEN': wx.getStorageSync('token'),
	if (header) {
		headerTmp.push(header);
	}
	wx.request({
		url: base_url + briefUrl,
		header: headerTmp,
		method: 'POST',
		data: params,
		success: succcess,
		fail: failure
	});
}

module.exports = { formatTime, showBusy, showSuccess, showModel, showCourseExpiryDay, getRequestUrl};
//,getRequest, postRequest

//, getRequest, postRequest
// var getRequest = module.exports = {
//     briefUrl:  briefUrl,
//     header: header,
//     // method: 'GET',
//     params: params,
//     success: succcess,
//     failure: failure
// };
