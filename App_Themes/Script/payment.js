$(document).ready(function(){
window.payment = (function() {
	var orderId = "bd4c735438f64702916f975c4951a8b0";//getAjax.getQueryString("orderId");
	var cityId = JSON.parse(getAjax.getLocalStorage("city"))['code'];
	var userId = JSON.parse(getAjax.getLocalStorage("user"))['id'];
	var order = {};
	var cardMoney = 0;
	var payType="";
	var couponId="";
	var couponMoney=0;
	if(getAjax.getQueryString("couponId")!=null){
		couponId=getAjax.getQueryString("couponId");
		couponMoney=getAjax.getQueryString("couponMoney");
	}
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
		}else{
			$(".smaller").html('<font style="color:#18CB6D;">无可用优惠券</font>');
		}
		$("#cardMoney").html("(余额:"+cardMoney+"元)");
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
		// alert("aldskfja");
		if(payType=="wx"){
			
		} else if(payType=="ali"){

		} else if(payType=="card"){
			if(cardMoney<final_pay){
				alert("会员卡余额不足");
				return;
			}
			server = "";
			params = {
				url: "order/cardPayOrder",
				ticketid: couponId,
				orderId: orderId
			};
			getAjax.getAction(server,params,function(res){
				console.log('加载订单详情',res);
				if(res['code']==0){
					alert("支付成功");
					window.location.href="order_list.html";
				} else {
					alert(res['message']);
				}
			},function(error){
				alert("与服务器连接断开");
			});
		} else if(payType=="cash"){
			server = "";
			params = {
				url: "order/payOrderByCash",
				orderId: orderId
			};
			getAjax.getAction(server,params,function(res){
				console.log('加载订单详情',res);
				if(res['code']==0){
					alert("支付成功");
					window.location.href="order_list.html";
				} else {
					alert(res['message']);
				}
			},function(error){
				alert("与服务器连接断开");
			});
		} else {
			alert("请选择支付方式");
		}
	});
	function start() {

		server = "";
		params = {
			url: "order/getOrderInfoByOrderId",
			orderId: orderId
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载订单详情',res);
			order = res['info'];
			server = "";
			params = {
				url: "card/getMemoryCardByUserId",
				userId: userId
			};
			getAjax.getAction(server,params,function(res){
				console.log('获取我的储值卡余额信息',res);
				if(res['code']==0){
					cardMoney = res['info']['cardMoney'];
				}
				if(couponId==""){
					server = "";
					params = {
						url: "coupon/findUseDiscountCoupon1",
						userId: userId,
						startOrdertime: getAjax.getTime(order['startOrderTime'],true),
						money: order['orderPrice'],
						cityId:cityId
					};
					getAjax.getAction(server,params,function(res){
						console.log('获取我可用的优惠券',res);
						if(res['code']==0){
							if(res['info'].length!=0){
								couponId = res['info'][0]['id'];
								couponMoney = res['info'][0]['discountMoney'];
							}
						}
						initPage();
					},function(error){});
				} else {
					initPage();
				}
				
			},function(error){});
		},function(error){});
	}
	return {
		start: start,
		checkPay: checkPay
	};

})();
window.payment.start();
})