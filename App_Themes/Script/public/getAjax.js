window.getAjax = (function() {
	var sus = "http://123.57.13.135/home/";
	/*ajax请求：
	 *server:请求地址
	 *params:请求参数
	 *fun1:请求成功后的回调方法
	 *fun2:请求失败后的回调方法
	 */
	function getAction(server, params, fun1,fun2) {
		$.ajax({
			type: "get",
			url: sus + server,
			dataType: 'jsonp',
			jsonp: "jsonpCallback",
			data: params,
			success: function(result) {
				if ($.isFunction(fun1)) {
					if(result['status']==-2){
						setlocalStorage("userid","");
						setlocalStorage("username","");
						state();
					}else{
						fun1(result);
					}
					
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if ($.isFunction(fun2)) {
					fun2(XMLHttpRequest);
				}
			}
		});
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

	/*设置储存的值*/
	function setlocalStorage(keys, value) {
			if (localStorage) {
				localStorage[keys] = value;
				if(keys=="userid"||keys=="ticket"){
					state();
				}
			} else {
				/*不支持localStorage*/
			}
		}
		/*获取储存的值*/

	function getlocalStorage(keys) {
		if (localStorage && localStorage[keys] != undefined) {
			return localStorage[keys];
		} else {
			return "";
		}
	}
	
	function MyAlert(msg) {
		console.log('msg', msg);
		//alert(msg);
		mytool.alt.start(msg);
	}

	function MyAlert(msg, fun) {
		console.log('msg', msg);
		//alert(msg);
		mytool.alt.start(msg,fun);
	}

	function state() {
	var dsds='<script src="App_Themes/Script/public/MyTools.js"></script><link href="App_Themes/Style/public/mytool.css" rel="stylesheet"/>';
	document.write(dsds);
		//getCityNumber();
		if (getlocalStorage("userid") != ""&&getlocalStorage("userid")!=undefined) {
			$("#loginin>a").text("你好!" + getlocalStorage("username"));
			$("#loginin").click(function() {
				window.location.href ="userindex.html";
			});
		} else {
			$("#loginin>a").text("登录/注册");
			$("#loginin").click(function() {
				window.location.href = 'login.html';
			});
		}
	}
	return {
		state: state,
		MyAlert: MyAlert,
		getAction: getAction,
		getQueryString: getQueryString,
		setlocalStorage: setlocalStorage,
		getlocalStorage: getlocalStorage
	};
})();
window.getAjax.state();