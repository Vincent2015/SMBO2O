$(document).ready(function(){
window.orderlist = (function() {
	var cur_page = 1;
	var cancel_reason = "";
	//项目类别切换
	$("nav ul li").click(function(){
		var index = $(this).index();
		var aside = $(".aside_list aside");
		$("nav ul i").animate({"left":index * 50 + "%"});
		aside.eq(index).fadeIn().siblings("aside").fadeOut();
	});
	//未完成订单列表 全部加载
	function initUnfinished(){
		server = "";
		params = {
			url: "order/getMyOrdersToUserToNew",
			userid: '31a4a60eea5149c3ad4aeb35f967dd02',//测试北京
			type: 1,
			page: 1,
			rows: 99
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载未完成订单',res);
			if(res['code']==0){
				var unfinishedOrderList = res['info']['rows'];

				// var template=$('#template_1').innerHTML;
				// var obj=[{name:'d1'},{name:'d2'},{name:'d3'}];
				// //传递一个有数据的数组进去
				// $('.list').innerHTML=doT.template( template )( unfinishedOrderList );
				// //传入的数据为空
				// // document.getElementById('showInfo2').innerHTML=doT.template( template )( [] );


				var htm = '';
				for(var i=0;i<unfinishedOrderList.length;i++){
					htm =  htm + '<div class="up_div" onclick="window.location.href=\'order_detail.html?orderId='+unfinishedOrderList[i]['id']+'\'">'+
										'<img class="headphoto" src="'+getAjax.workimg+unfinishedOrderList[i]['headPhoto']+'">'+
										'<div class="left_div">'+
											'<div class="name">'+unfinishedOrderList[i]['workerName']+'</div>'+
											'<div class="projectNameGrade">'+unfinishedOrderList[i]['projectName']+'('+unfinishedOrderList[i]['gradeName']+')</div>'+
											'<div class="projectNameGrade">'+unfinishedOrderList[i]['startOrderTime']+'</div>'+
										'</div>'+
										'<div class="right_div">'+
											'<div class="orderPrice">￥'+unfinishedOrderList[i]['orderPrice']+'</div>';
											if(unfinishedOrderList[i]['orderPayStatus']==0){
												htm = htm + '<div class="projectNameGrade">未支付</div>';
											} else {
												htm = htm + '<div class="projectNameGrade">已支付</div>';
											}
							htm =  htm + '</div>'+
									'</div>'+
									'<div class="bottom_div">';
										if(unfinishedOrderList[i]['orderPayStatus']==0){
											htm = htm +	'<div class="bottom_left_div">订单只保留30分钟</div>'+ 
														'<div class="bottom_right_div" onclick="window.orderlist.popCancelOrder(\''+unfinishedOrderList[i]['id']+'\')">删除</div>'+
														'<div class="bottom_right_div"  onclick="window.location.href=\'payment.html?orderId='+unfinishedOrderList[i]['id']+'\'">支付</div>';
										} else {
											htm = htm + '<div class="bottom_right_div" onclick="window.location.href=\'add_clock.html?orderId='+unfinishedOrderList[i]['id']+'\'">加钟</div>'+
														'<div class="bottom_right_div" onclick="window.orderlist.popCancelOrder(\''+unfinishedOrderList[i]['id']+'\')">取消</div>';
										}
							htm =  htm +'</div>'+
								'<div class="orderBr"></div>';
				}
			}else{
				alert(res['message']);
			}
			$('.list:first').empty().append(htm);
		},function(error){
			alert("与服务器连接断开");
		});
	}



	//已完成订单列表 分页
	var initFinished = function(){
		server = "";
		params = {
			url: "order/getMyOrdersToUserToNew",
			userid: '31a4a60eea5149c3ad4aeb35f967dd02',//测试用户
			type: 2,
			page: cur_page,
			rows: 10
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载已完成订单',res);
			cur_page++;
			if(res['code']==0){
				var unfinishedOrderList = res['info']['rows'];

				// var template=$('#template_1').innerHTML;
				// var obj=[{name:'d1'},{name:'d2'},{name:'d3'}];
				// //传递一个有数据的数组进去
				// $('.list').innerHTML=doT.template( template )( unfinishedOrderList );
				// //传入的数据为空
				// // document.getElementById('showInfo2').innerHTML=doT.template( template )( [] );


				var htm = '';
				for(var i=0;i<unfinishedOrderList.length;i++){
					htm =  htm + '<div class="up_div" onclick="window.location.href=\'order_detail.html?orderId='+unfinishedOrderList[i]['id']+'\'">'+
										'<img class="headphoto" src="'+getAjax.workimg+unfinishedOrderList[i]['headPhoto']+'">'+
										'<div class="left_div">'+
											'<div class="name">'+unfinishedOrderList[i]['workerName']+'</div>'+
											'<div class="projectNameGrade">'+unfinishedOrderList[i]['projectName']+'('+unfinishedOrderList[i]['gradeName']+')</div>'+
											'<div class="projectNameGrade">'+unfinishedOrderList[i]['startOrderTime']+'</div>'+
										'</div>'+
										'<div class="right_div">'+
											'<div class="orderPrice">￥'+unfinishedOrderList[i]['orderPrice']+'</div>'+
											'<div class="projectNameGrade">已完成</div>'+
										'</div>'+
									'</div>'+
									'<div class="bottom_div">';
									if(unfinishedOrderList[i]['userEvaluateStatus']==0){
							htm =  htm + '<div class="bottom_right_evaluate_div" onclick="window.location.href=\'order_evaluate.html?orderId='+unfinishedOrderList[i]['id']+'\'">评价</div>';
									}
							htm =  htm + '<div class="bottom_right_div" onclick="window.location.href=\'index.html?orderId='+unfinishedOrderList[i]['id']+'\'">再次预约</div>'+
										'<div class="bottom_right_div" onclick="window.orderlist.popCancelOrder(\''+unfinishedOrderList[i]['id']+'\')">删除</div>'+
									'</div>'+
								'<div class="orderBr"></div>';
				}
			}else{
				alert(res['message']);
			}
			$('.list:last').append(htm);
			loaded(initFinished);
		},function(error){
			alert("与服务器连接断开");
		});
	}
	function start() {
		initUnfinished();
		initFinished();
		
		// getCityList();
		// initPage();
	}
	$("#_no").bind("click",function(){
		$(".city").css("display","none");
	});
	$(".lis").bind("click",function(){
		cancel_reason = $(this).html();
	});
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
				initUnfinished();
			}else{
				alert(res['message']);
			}
		},function(error){
			alert("与服务器连接断开");
		});
	}
	function delOrder(){
		alert("adsf");
		// if(confirm("确认删除该订单吗?")){
		// 	server = "";
		// 	params = {
		// 		url: "order/deleteOrderByOrderId",
		// 		orderid: orderid
		// 	};
		// 	getAjax.getAction(server,params,function(res){
		// 		console.log('删除订单',res);
		// 		if(res['code']==0){
		// 			alert("删除成功");
		// 			initFinished();
		// 		}else{
		// 			alert(res['message']);
		// 		}
		// 	},function(error){
		// 		alert("与服务器连接断开");
		// 	});
		// }
	}
	return {
		start: start,
		popCancelOrder: popCancelOrder,
		delOrder: delOrder
	};

})();
window.orderlist.start();
})