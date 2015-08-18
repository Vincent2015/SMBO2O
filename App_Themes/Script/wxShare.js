// var lineLink    = '';    				// 要分享的页面的URL
// var imgUrl      = '';    				// 显示在微信里的缩略图
// var shareTitle  = '';          			// 页面标题
// var descContent = '';      				// 内容简介

var timestamp = "",
	nonceStr = "",
	signature = "";
function share(){
	servers = '';
	params = {
		url: 'wx/wxShare',
		url_share: location.href
	};
	getAjax.getAction(servers, params, function(res) {
		console.log('微信分享', res);
		if (res['code'] == 0) {
			timestamp = res['info']['timestamp'];
			nonceStr = res['info']['noncestr'];
			signature = res['info']['sign'];
			config();
		}
	}, function() {});
}

function config() {
	wx.config({
	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: getAjax.appid, // 必填，公众号的唯一标识
	    timestamp: timestamp, // 必填，生成签名的时间戳
	    nonceStr: nonceStr, // 必填，生成签名的随机串
	    signature: signature,// 必填，签名，见附录1
	    jsApiList: ['onMenuShareTimeline',
	    			'onMenuShareAppMessage',
	    			'onMenuShareQQ',
	    			'onMenuShareWeibo',
	    			'onMenuShareQZone',
	    			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
}
wx.ready(function(){
	// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	wx.onMenuShareTimeline({
	    title: window.share_shareTitle, // 分享标题
	    link: window.share_lineLink,
	    imgUrl: window.share_imgUrl, // 分享图标
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
	wx.onMenuShareAppMessage({
	    title: window.share_shareTitle, // 分享标题
	    desc: window.share_descContent, // 分享描述
	    link: window.share_lineLink,
	    imgUrl: window.share_imgUrl, // 分享图标
	    type: 'link', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	//获取“分享到QQ”按钮点击状态及自定义分享内容接口
	wx.onMenuShareQQ({
	    title: window.share_shareTitle, // 分享标题
	    desc: window.share_descContent, // 分享描述
	    link: window.share_lineLink, // 分享链接
	    imgUrl: window.share_imgUrl, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	       // 用户取消分享后执行的回调函数
	    }
	});
	//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
	wx.onMenuShareWeibo({
	    title: window.share_shareTitle, // 分享标题
	    desc: window.share_descContent, // 分享描述
	    link: window.share_lineLink, // 分享链接
	    imgUrl: window.share_imgUrl, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
	//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
	wx.onMenuShareQZone({
	    title: window.share_shareTitle, // 分享标题
	    desc: window.share_descContent, // 分享描述
	    link: window.share_lineLink, // 分享链接
	    imgUrl: window.share_imgUrl, // 分享图标
	    success: function () { 
	       // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
});
