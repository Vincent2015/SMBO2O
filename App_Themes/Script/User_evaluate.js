$(document).ready(function(){
window.userEvaluate = (function() {
	var orderId = "ed1973ce71b246ae9bdd5e0364b0ecb4";//getAjax.getQueryString("orderId");
	var workerId = "16bb537a70724e75986bba4ba3f1b89a";//getAjax.getQueryString("workerId");
	var order = "";
	var full_star = 0;
	var star_1 = 0;
	var star_2 = 0;
	var star_3 = 0;
	function tapstar(obj,type,num){
		$(obj).parent().prev().children().attr("src","App_Themes/images/star_light.png");
		if(num==5){
			$(obj).attr("src","App_Themes/images/star_light.png");
			$(obj).parent().prev().children().attr("src","App_Themes/images/star_light.png");
			$(obj).parent().prev().prev().children().attr("src","App_Themes/images/star_light.png");
			$(obj).parent().prev().prev().prev().children().attr("src","App_Themes/images/star_light.png");
			$(obj).parent().prev().prev().prev().prev().children().attr("src","App_Themes/images/star_light.png");
		} else if(num==4){
			$(obj).parent().next().children().attr("src","App_Themes/images/star_an.png");
			$(obj).attr("src","App_Themes/images/star_light.png");
			$(obj).parent().prev().children().attr("src","App_Themes/images/star_light.png");
			$(obj).parent().prev().prev().children().attr("src","App_Themes/images/star_light.png");
			$(obj).parent().prev().prev().prev().children().attr("src","App_Themes/images/star_light.png");
		} else if(num==3){
			$(obj).parent().next().children().attr("src","App_Themes/images/star_an.png");
			$(obj).parent().next().next().children().attr("src","App_Themes/images/star_an.png");
			$(obj).attr("src","App_Themes/images/star_light.png");
			$(obj).parent().prev().children().attr("src","App_Themes/images/star_light.png");
			$(obj).parent().prev().prev().children().attr("src","App_Themes/images/star_light.png");
		} else if(num==2){
			$(obj).parent().next().children().attr("src","App_Themes/images/star_an.png");
			$(obj).parent().next().next().children().attr("src","App_Themes/images/star_an.png");
			$(obj).parent().next().next().next().children().attr("src","App_Themes/images/star_an.png");
			$(obj).attr("src","App_Themes/images/star_light.png");
			$(obj).parent().prev().children().attr("src","App_Themes/images/star_light.png");
		} else if(num==1){
			$(obj).parent().next().children().attr("src","App_Themes/images/star_an.png");
			$(obj).parent().next().next().children().attr("src","App_Themes/images/star_an.png");
			$(obj).parent().next().next().next().children().attr("src","App_Themes/images/star_an.png");
			$(obj).parent().next().next().next().next().children().attr("src","App_Themes/images/star_an.png");
			$(obj).attr("src","App_Themes/images/star_light.png");
		}
		if(type==0){
			full_star = num;
		} else if(type==1){
			star_1 = num;
		} else if(type==2){
			star_2 = num;
		} else if(type==3){
			star_3 = num;
		} 
	}
	function evaluate(){
		if(full_star==0||star_1==0||star_2==0||star_3==0){
			alert("请打分");
			return;
		}
		var score = 0;
		if(full_star==2||full_star==3){
			score = 1;
		} else if(full_star==1){
			score = 2;
		}
		var evaluateDetail = ($("textarea").val()==""?"好评！": $("textarea").val());
		server = "";
		params = {
			url: "evaluate/userEvaluate",
			userId: JSON.parse(getAjax.getLocalStorage("user"))['id'],//用户ID
			workerId: workerId,//师傅ID
			orderId: orderId,//订单ID
			evaluateGrade: score,//总体评价，1差评 23中评 45好评
			punctuality: star_1,//守时
			amiable: star_2,//态度
			skill: star_3,//技能
			evaluatePersonName: JSON.parse(getAjax.getLocalStorage("user"))['nickName'],//用户ID
			projectId: order['projectId'],
			projectName: order['projectName'],
			// evaluateTime: getAjax.getTime('',true),//评价时间
			evaluateDetail: evaluateDetail,//评价内容
			// extraEvaluateDetail: ''//追加评价内容
			// individualityEvaluate: ''//个性化评价
			// isDelete: 0,//是否已删除
			// evaluateStatus: 'YES',//是否已评价
			isAnonymous: 0//0不匿名
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载订单详情',res);
			if(res['code']==0){
				alert("评价成功");
				window.location.href="orderlist.html";
			} else {
				alert(res['message']);
			}
		},function(error){
			alert("与服务器连接断开");
		});
	}
	function start() {
		server = "";
		params = {
			url: "order/getOrderInfoByOrderId",
			orderId: orderId
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载订单详情',res);
			if(res['code']==0){
				order = res['info'];
			} else {
				alert(res['message']);
			}
		},function(error){
			alert("与服务器连接断开");
		});
	}
	return {
		start: start,
		tapstar: tapstar,
		evaluate: evaluate
	};

})();
window.userEvaluate.start();
})