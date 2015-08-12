$(document).ready(function(){
window.payment = (function() {
	var order = {};
	var payType="";
	var couponId="";
	var couponMoney=10;
	var final_pay=0;
	function initPage(){
		$("#contact").html(order['contact']);
		$("#contactPhone").html(order['contactPhone']);
		$("#orderAddress").html(order['orderAddress']);
		$("#startOrderTime").html(order['startOrderTime']);
		$("#headPhoto").attr("src",getAjax.workimg+order['headPhoto']);
		$("#nickName").html(order['nickName']);
		$("#count").html("数量:"+order['count']+"份");
		$("#projectName").html(order['projectName']);
		var orderGrade = "";
		if(order['orderGrade']==1000000021){
			orderGrade="星级";
		} else if(order['orderGrade']==1000000022){
			orderGrade="高级";
		} else if(order['orderGrade']==1000000023){
			orderGrade="特级";
		} else if(order['orderGrade']==1000000024){
			orderGrade="明星级";
		}
		$("#projectNameGrade").html(order['projectName']+"("+orderGrade+")");
		$("#projectPrice").html("￥"+order['projectPrice']);
		$("#carMoney").html("￥"+order['carMoney']);
		if(couponMoney!=0){
			$(".smaller").html('抵<font style="color:#18CB6D;">'+couponMoney+'</font>');
		}
		final_pay = order['orderPrice']-couponMoney;
		$("#final_pay").html("合计："+final_pay+"元");
	}
	function checkPay(type){
		if(type=="wx"&&payType!="wx"){
			if(payType=='cash'){
				$(".text_box_coupon:first").animate({height:"50px"});
				$(".text_box_coupon:first").animate({opacity:1});
				final_pay = order['orderPrice']-couponMoney;
				$("#final_pay").html("合计："+final_pay+"元");
			}
			payType="wx";
			$("#wxPay").attr("src","App_Themes/images/s_xuanz.png");
			$("#aliPay").attr("src","App_Themes/images/s_wxuan.png");
			$("#cardPay").attr("src","App_Themes/images/s_wxuan.png");
			$("#cashPay").attr("src","App_Themes/images/s_wxuan.png");
		} else if(type=="ali"&&payType!="ali"){
			if(payType=='cash'){
				$(".text_box_coupon:first").animate({height:"50px"});
				$(".text_box_coupon:first").animate({opacity:1});
				final_pay = order['orderPrice']-couponMoney;
				$("#final_pay").html("合计："+final_pay+"元");
			}
			payType="ali";
			$("#wxPay").attr("src","App_Themes/images/s_wxuan.png");
			$("#aliPay").attr("src","App_Themes/images/s_xuanz.png");
			$("#cardPay").attr("src","App_Themes/images/s_wxuan.png");
			$("#cashPay").attr("src","App_Themes/images/s_wxuan.png");
		} else if(type=="card"&&payType!="card"){
			if(payType=='cash'){
				$(".text_box_coupon:first").animate({height:"50px"});
				$(".text_box_coupon:first").animate({opacity:1});
				final_pay = order['orderPrice']-couponMoney;
				$("#final_pay").html("合计："+final_pay+"元");
			}
			payType="card";
			$("#wxPay").attr("src","App_Themes/images/s_wxuan.png");
			$("#aliPay").attr("src","App_Themes/images/s_wxuan.png");
			$("#cardPay").attr("src","App_Themes/images/s_xuanz.png");
			$("#cashPay").attr("src","App_Themes/images/s_wxuan.png");
		} else if(type=="cash"&&payType!="cash"){
			payType="cash";
			$("#wxPay").attr("src","App_Themes/images/s_wxuan.png");
			$("#aliPay").attr("src","App_Themes/images/s_wxuan.png");
			$("#cardPay").attr("src","App_Themes/images/s_wxuan.png");
			$("#cashPay").attr("src","App_Themes/images/s_xuanz.png");
			if(payType=='cash'){
				$(".text_box_coupon:first").animate({opacity:0});
				$(".text_box_coupon:first").animate({height:"0px"});
				final_pay = order['orderPrice'];
				$("#final_pay").html("合计："+final_pay+"元");
			}
		}
	}
	$("#goPay").bind("click",function(){
		if(payType=="wxPay"){
			
		} else if(payType=="aliPay"){

		} else if(payType=="cardPay"){

		} else if(payType=="cashPay"){

		}
	});
	function start() {
		var order = JSON.parse(getAjax.getSessionStorage('order'));
	
		server = "";
		params = {
			url: "order/getOrderInfoByOrderId",
			orderId: order.id
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载订单详情',res);
			order = res['info'];
			initPage();
		},function(error){});
	}
	return {
		start: start,
		checkPay: checkPay
	};

})();
window.payment.start();
})