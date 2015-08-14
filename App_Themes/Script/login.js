$(document).ready(function(){
window.index = (function() {
	var backUrl = getAjax.getQueryString("backUrl");
	var checkCode="";
	//短信验证码倒计时开始
	function codeRgd() {
		$(".div_right").unbind('click');
		$(".div_right").css("background-color", "#6AD99E");
		$(".div_right").html('90 s');
		var i = 90;
		var k;
		k = window.setInterval(function() {
			i = i - 1;
			$(".div_right").text(i + " s");
			if (i <= 0) {
				window.clearInterval(k);
				$(".div_right").css("background-color", "#18CB6D");
				$(".div_right").html("重发");
				$(".div_right").bind('click',codebtn_func);
			}
		}, 1000);
	}
	//发送验证码事件
	var codebtn_func = function(){
		if ($("#phoneNum").val()==null || $("#phoneNum").val() == "") {
			alert("请输入手机号");
			return;
		};
		if ($("#phoneNum").val().length!=11 || $("#phoneNum").val().indexOf("1") !=0) {
			alert("请输入正确的手机号");
			return;
		};
		// $("#aload").fadeIn(10);
		servers = '';
		save_params = {
			url: 'user/getVerifyCode',
			phoneNum: $("#phoneNum").val(),
			type:2
		};
		getAjax.getAction(servers, save_params, function(res) {
			console.log('发送短信验证码', res);
			if (res['code'] == 0) {
				checkCode = res['info'];
				// getAjax.MyAlert("验证码已发送");
				codeRgd();
				// $("#aload").fadeOut(10);
			}else{
				alert(res['message']);
				// getAjax.MyAlert(res['message'],function(){
					// $("#aload").fadeOut(10);
				// });
			}
		}, function() {
			getAjax.MyAlert("连接服务器失败,请检查网络或稍后重试");
			// $("#aload").fadeOut(10);
		});
	}

	//语音验证码
	var codeVoice = function(){
		if ($("#phoneNum").val()==null || $("#phoneNum").val() == "") {
			alert("请输入手机号");
			return;
		};
		if ($("#phoneNum").val().length!=11 || $("#phoneNum").val().indexOf("1") !=0) {
			alert("请输入正确的手机号");
			return;
		};
		servers = '';
		save_params = {
			url: 'user/getVerifyCodeByVoice',
			phoneNum: $("#phoneNum").val(),
			type:2
		};
		getAjax.getAction(servers, save_params, function(res) {
			console.log('发送语音验证码', res);
			if (res['code'] == 0) {
				checkCode = res['info'];
				alert("验证码已发送，请留意来电");
				// $("#aload").fadeOut(10);
			}else{
				alert(res['message']);
				// getAjax.MyAlert(res['message'],function(){
					// $("#aload").fadeOut(10);
				// });
			}
		}, function() {
			getAjax.MyAlert("连接服务器失败,请检查网络或稍后重试");
			// $("#aload").fadeOut(10);
		});
	}

	var login = function(){
		if ($("#phoneNum").val()==null || $("#phoneNum").val() == "") {
			alert("请输入手机号");
			return;
		};
		if ($("#phoneNum").val().length!=11 || $("#phoneNum").val().indexOf("1") !=0) {
			alert("请输入正确的手机号");
			return;
		};
		if ($("#checkCode").val()==null || $("#checkCode").val() == "") {
			alert("请输入验证码");
			return;
		};
		if ($("#checkCode").val()!=checkCode) {
			alert("验证码错误");
			return;
		};
		servers = '';
		save_params = {
			url: 'user/loginNoPassword',
			phonenum: $("#phoneNum").val(),
			phoneType:2,
			version: '2.0'
		};
		getAjax.getAction(servers, save_params, function(res) {
			console.log('登录', res);
			if (res['code'] == 0) {
				getAjax.setLocalStorage("user",JSON.stringify(res['info']));
				window.location.href = backUrl + ".html";
			}else{
				alert(res['message']);
			}
		}, function() {
			getAjax.MyAlert("连接服务器失败,请检查网络或稍后重试");
		});
	}

	function start() {
		$(".div_right").bind('click',codebtn_func);
		$(".head_right").bind('click',codeVoice);
		$(".div_login").bind('click',login);
	}
	return {
		start: start
	};

})();
window.index.start();
})