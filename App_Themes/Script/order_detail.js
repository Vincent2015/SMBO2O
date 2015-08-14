$(document).ready(function(){
window.orderdetail = (function() {
	var orderId = getAjax.getQueryString("orderId");
	var userEvaluateStatus = getAjax.getQueryString("userEvaluateStatus");
	var cancel_reason = "";
	function initPage(){
		server = "";
		params = {
			url: "order/getOrderInfoByOrderId",
			orderId: orderId
		};
		getAjax.getAction(server,params,function(res){
			console.log('获取订单',res);
			if(res['code']==0){
				$("#orderId").html("订单编号:"+res['info']['orderId']);
				if(res['info']['orderPayStatus']==1){
					if(res['info']['orderStatus']==1){
						$("#orderId").after('<div class="bottom_right_div" onclick="window.orderdetail.popCancelOrder">取消</div>');
					} else if(res['info']['orderStatus']==2){
						$("#orderId").after('<div class="bottom_right_div" style="border:none;margin-top:15px;">已完成</div>');
					} else if(res['info']['orderStatus']==3){
						$("#orderId").after('<div class="bottom_right_div" style="border:none;margin-top:15px;">已取消</div>');
					} else if(res['info']['orderStatus']==4){
						$("#orderId").after('<div class="bottom_right_div" style="border:none;margin-top:15px;">已取消</div>');
					} else if(res['info']['orderStatus']==5){
						$("#orderId").after('<div class="bottom_right_div" style="border:none;margin-top:15px;">已取消</div>');
					} else if(res['info']['orderStatus']==6){
						$("#orderId").after('<div class="bottom_right_div" style="border:none;margin-top:15px;">已取消</div>');
					}
				} else if(res['info']['orderPayStatus']==2){
					$("#orderId").after('<div class="bottom_right_div" style="border:none;margin-top:15px;">退款中</div>');
				} else if(res['info']['orderPayStatus']==3){
					$("#orderId").after('<div class="bottom_right_div" style="border:none;margin-top:15px;">已退款</div>');
				} else if(res['info']['orderPayStatus']==4){
					$("#orderId").after('<div class="bottom_right_div" style="border:none;margin-top:15px;">已退款</div>');
				}
				
				var logistics = "";
				for(var i=0;i<res['info']['orderLogistics'].length;i++){
					logistics = logistics + res['info']['orderLogistics'][i]['operateDetail'];
				}
				if(logistics.indexOf("已评价")>0){
					$("#status_4").attr("src","App_Themes/images/orderdetail_4.png");
					$("#status_3").attr("src","App_Themes/images/orderdetail_3.png");
					$("#status_2").attr("src","App_Themes/images/orderdetail_2.png");
					$("#status_1").attr("src","App_Themes/images/orderdetail_1.png");
				} else if(logistics.indexOf("已完成")>0){
					$("#status_3").attr("src","App_Themes/images/orderdetail_3.png");
					$("#status_2").attr("src","App_Themes/images/orderdetail_2.png");
					$("#status_1").attr("src","App_Themes/images/orderdetail_1.png");
				} else if(logistics.indexOf("已到达")>0){
					$("#status_2").attr("src","App_Themes/images/orderdetail_2.png");
					$("#status_1").attr("src","App_Themes/images/orderdetail_1.png");
				} else if(logistics.indexOf("已出发")>0){
					$("#status_1").attr("src","App_Themes/images/orderdetail_1.png");
				}
				$("#worker").html(res['info']['nickName']);
				$("#workerNum").html('工号:'+res['info']['jobNum']);
				var orderGrade = "";
				if(res['info']['orderGrade']==1000000021){
					orderGrade="星级";
				} else if(res['info']['orderGrade']==1000000022){
					orderGrade="高级";
				} else if(res['info']['orderGrade']==1000000023){
					orderGrade="特级";
				} else if(res['info']['orderGrade']==1000000024){
					orderGrade="明星级";
				}
				$("#projectName").html(res['info']['projectName']+'('+orderGrade+')'+res['info']['projectTime']+'分钟');
				$("#orderTime").html(getAjax.getTime(res['info']['startOrderTime'],true));
				$("#project").html(res['info']['projectName']+'('+orderGrade+')');
				$("#price").html('￥'+res['info']['orderPrice']);
				$("#title_div").html('实付金额(共'+res['info']['count']+"份)");
				$("#orderPrice").html('￥'+res['info']['orderPrice']);
				$("#carMoney").html('￥'+res['info']['carMoney']);
				if(res['info']['couponPrice']!=0&&res['info']['couponPrice']!=null){
					$("#price_info_li").css("height","100px");
					$("#carMoney_info_li").after('<li>'
						+'<div class="text_left" id="text_coupon">优惠券</div>'
						+'<div class="right_money" id="money_coupon">￥'+res['info']['giveMoney']+'</div>'
						+'</li>');
				}
				$("#contact").html(res['info']['contact']);
				$("#contactPhone").html(res['info']['contactPhone']);
				$("#orderAddress").html(res['info']['orderAddress']);
				if(res['info']['payOrderType']==0){
					$("#payOrderType").html("现金支付");
				} else if(res['info']['payOrderType']==1){
					$("#payOrderType").html("线上支付");
				} else if(res['info']['payOrderType']==2){
					$("#payOrderType").html("支付宝");
				} else if(res['info']['payOrderType']==3){
					$("#payOrderType").html("微信");
				} else if(res['info']['payOrderType']==4){
					$("#payOrderType").html("会员卡");
				} else if(res['info']['payOrderType']==5){
					$("#payOrderType").html("大众点评");
				} else if(res['info']['payOrderType']==6){
					$("#payOrderType").html("美团");
				}
				
				$("#initiateOrederTime").html(getAjax.getTime(res['info']['initiateOrederTime'],true));
				if(res['info']['orderStatus']==1&&res['info']['orderPayStatus']==0){
					$("#box_ul").append('<div style="height:65px;background-color:#e9ecf1;"></div>');
					$("footer").css("display","block");
					$("#goPay").html("去支付");
					$("#goPay").bind("click",function(){
						window.location.href="payment.html";
					});
				} else if(res['info']['orderStatus']==2&&userEvaluateStatus==0){
					$("#box_ul").append('<div style="height:65px;background-color:#e9ecf1;"></div>');
					$("footer").css("display","block");
					$("#goPay").html("去评价");
					$("#goPay").bind("click",function(){
						window.location.href="evaluate.html";
					});
				}
			}else{
				alert(res['message']);
			}
		},function(error){
			alert("与服务器连接断开");
		});
	}
	function popCancelOrder(orderid){
		$(".city").css("display","block");
		$("#_yes").unbind("click");

		$("#_yes").bind("click",function(){
			cancelOrder(orderid);
		});
	}
	function cancelOrder(orderid){
		server = "";
		params = {
			url: "order/userCancelOrder",
			userid: '31a4a60eea5149c3ad4aeb35f967dd02',//测试北京
			orderid: orderid,
			exceptionOrderReason: cancel_reason
		};
		getAjax.getAction(server,params,function(res){
			console.log('取消订单',res);
			if(res['code']==0){
				alert("取消成功");
				$(".city").css("display","none");
				$("#orderId").next().remove();
				$("#orderId").after('<div class="bottom_right_div" style="border:none;margin-top:15px;">已取消</div>');
			}else{
				alert(res['message']);
			}
		},function(error){
			alert("与服务器连接断开");
		});
	}
	function start() {
		initPage();
	}
	return {
		start: start,
		popCancelOrder: popCancelOrder
	};

})();
window.orderdetail.start();
})