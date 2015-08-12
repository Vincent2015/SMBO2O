window.getAjax = (function() {
	// var sus = "http://www.shangmb.com/shangmb/",//正式www
	// 	wx_sus = "http://www.shangmb.com/shangmbwx/",//正式www
	// 	appid="wxe035939361cc0472";//正式www APPID	

	// var sus = "http://wx.shangmb.com:8888/shangmb/",//正式
	// 	wx_sus = "http://wx.shangmb.com:8888/shangmbwx/",//正式
	// 	appid="wxe035939361cc0472";//正式 APPID	

	var sus = "http://anyhow.tunnel.mobi/shangmb/",//测试
		wx_sus = "http://anyhow.tunnel.mobi/webs/",//测试
		appid="wxb2b64784fd11b2b7",//测试 APPID


	urls=sus+"smb/web/interface",
	imgurl = sus+"uploads",
	projectimg = imgurl+"/tmprojectphoto/",
	workimg=imgurl+"/wheadphone/",
	activityimg = imgurl+"/tmactivityphoto/",
	storyimg=imgurl+"/tmstorypictures/",
	lifeimg=imgurl+"/wlifephone/",
	userimg=imgurl+"/uheadphone/",
	yhqimg=imgurl+"/tmcouponphoto/",

	wxurl=wx_sus+"goPay.html",//测试 支付页面
	comwxurl=wx_sus+"comgoPay.html",//测试 企业支付页面
	wxloginurl = wx_sus+"loginwx.html",//测试 通过OPENID登录页面
	couponurl = wx_sus+"getCoupon.html";//测试 卡券兑换优惠券页面
		
	/*ajax请求：
	 *server:请求地址
	 *params:请求参数
	 *fun1:请求成功后的回调方法
	 *fun2:请求失败后的回调方法
	 */
	function getAction(server, params, fun1, fun2) {
		$.ajax({
			type: "post",
			url: urls + server,
			dataType: 'json',
			data: params,
			success: function(result) {
				if ($.isFunction(fun1)) {
					fun1(result);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 {
				if ($.isFunction(fun2)) {
					fun2(XMLHttpRequest);
				}
			}
		});
	}

	function getIsUser() {
		return true;
	}

	/*
	 *获取url参数信息
	 *name:参数名称
	 */
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}

	/*
	 *时间戳转换
	 *time:时间
	 *IsHose:是否带着时间
	 */
	function getTime(time, IsHose) {
		if (time != '') {
			
			var dt = new Date(time);
			
			var year = dt.getFullYear();
			var month = dt.getMonth() + 1;
			var day = dt.getDate();
			if (IsHose) {
				var h = dt.getHours();
				var m = dt.getMinutes();
				if(m=="0"||m==0){
					m="00";
				}
				//alert(year + "-" + month + "-" + day + " " + h + ":" + m + ":00");
				return year + "-" + month + "-" + day + " " + h + ":" + m + ":00";
			} else {
				return year + "-" + month + "-" + day;
			}


		} else {
			return "";
		}
	}

	/*获取LocalStorage的值*/
	function getLocalStorage(keys) {
		if (window.localStorage && window.localStorage.getItem(keys) != undefined) {
			return window.localStorage.getItem(keys);
		} else {
			return "";
		}
	}

	/*设置LocalStorage的值*/
	function setLocalStorage(keys, value) {
		if (window.localStorage) {
			window.localStorage.removeItem(keys);
			window.localStorage.setItem(keys,value);
		} else {
			alert("您的浏览器不支持HTML5");
		}
	}
	
	/*删除LocalStorage的值*/
	function removeLocalStorage(keys) {
		if (window.localStorage && window.localStorage.getItem(keys) != undefined) {
			window.localStorage.removeItem(keys);
		} else {
			
		}
	}

	/*清空LocalStorage*/
	function clearLocalStorage() {
		if (window.localStorage) {
			window.localStorage.clear();
		} else {
			
		}
	}

	/*获取SessionStorage的值*/
	function getSessionStorage(keys) {
		if (window.sessionStorage && window.sessionStorage.getItem(keys) != undefined) {
			return window.sessionStorage.getItem(keys);
		} else {
			return "";
		}
	}

	/*设置SessionStorage的值*/
	function setSessionStorage(keys, value) {
		if (window.sessionStorage) {
			window.sessionStorage.removeItem(keys);
			window.sessionStorage.setItem(keys,value);
		} else {
			alert("您的浏览器不支持HTML5");
		}
	}
	
	/*删除SessionStorage的值*/
	function removeSessionStorage(keys) {
		if (window.sessionStorage && window.sessionStorage.getItem(keys) != undefined) {
			window.sessionStorage.removeItem(keys);
		} else {
			
		}
	}

	/*清空SessionStorage*/
	function clearSessionStorage() {
		if (window.sessionStorage) {
			window.sessionStorage.clear();
		} else {
			
		}
	}

	/*  浮层：$("#aload").fadeIn(10)/$("#aload").fadeOut(10)  */
	function aload() {
		if ($("#aload").attr("id") == undefined) {
			var ht = '<div id="aload">';
			ht += '<div class="aloads"></div>';
			ht += '<div class="aload"></div>';
			ht += '</div>';
			
			$("body").append(ht);
		}
	}

	/*后退*/
	$(".left").click(function() {
		history.go(-1);
	});

	return {
		projectimg: projectimg,
		activityimg: activityimg,
		workimg: workimg,
		lifeimg: lifeimg,
		yhqimg: yhqimg,
		userimg: userimg,
		storyimg:storyimg,
		imgurl:imgurl,
		appid:appid,
		wxurl:wxurl,
		comwxurl:comwxurl,
		wxloginurl:wxloginurl,
		couponurl: couponurl,
		getIsUser: getIsUser,
		getAction: getAction,
		getQueryString: getQueryString,
		getLocalStorage: getLocalStorage,
		setLocalStorage: setLocalStorage,
		removeLocalStorage: removeLocalStorage,
		clearLocalStorage: clearLocalStorage,
		getSessionStorage: getSessionStorage,
		setSessionStorage: setSessionStorage,
		removeSessionStorage: removeSessionStorage,
		clearSessionStorage: clearSessionStorage,
		aload: aload,getTime	
	};
})();
window.getAjax.aload();