var workerId =getAjax.getQueryString("workerId");
$(document).ready(function(){
window.addproject = (function() {
	var orderId = getAjax.getQueryString("orderId");
	var workerId =getAjax.getQueryString("workerId");
	var fun_flag = getAjax.getQueryString("flag");

	// alert(orderId+'---'+workerId+'---'+fun_flag);
	function initPage(){
		server = "";		
		params = {
			url: "worker/getMyProjects",
			workerId: workerId
		};
		getAjax.getAction(server,params,function(res){
			console.log('再次预约和加钟',res);
			if(res['code']==0){
				var htm = "";
				for(var i=0;i<res['info'].length;i++){
					var projectEfficiency = "";
					if(res['info'][i]['projectEfficiency']!=null){
						if(res['info'][i]['projectEfficiency'].length>6){
							projectEfficiency = res['info'][i]['projectEfficiency'].substring(0,6)+"...";
						}
					}
					htm = htm + '<li class="box-li" onclick="window.addproject.goto(\''+res['info'][i]['id']+'\')">'+
								'<img class="img" id="projectImg" src="'+getAjax.projectimg+res['info'][i]['projectPhoto']+'">'+
								'<ul class="text-box">'+
									'<li>'+
										'<div class="left-div" id="projectName" style="margin-top:15px;">'+res['info'][i]['projectName']+'</div>'+
										'<div class="right-div" id="projectPrice" style="margin-top:15px;">'+res['info'][i]['projectPrices'][0]['projectPrice']+'元起</div>'+
									'</li>'+
									'<li>'+
										'<div class="left-div" id="projectNum">销量:'+res['info'][i]['projectSale']+'</div>'+
										'<div class="right-div" id="projectTime">'+res['info'][i]['projectTime']+'分钟</div>'+
									'</li>'+
									'<li>'+
										'<div class="last-div" id="projectDesc">功效:'+(res['info'][i]['projectEfficiency']==null?"暂无":projectEfficiency)+'</div>'+
									'</li>'+
								'</ul>'+
							'</li>';
				}
				$("#box").append(htm);
			}else{
				alert(res['message']);
			}
		},function(error){
			alert("与服务器连接断开");
		});
	}
	function goto(id){
		if(fun_flag=='add'){
			window.location.href="MasterWorker_order.html?flag=add&orderId="+orderId+"&projectId="+id;
		} else if(fun_flag=='again'){
			window.location.href="MasterWorker_order.html?flag=again&orderId="+orderId+"&projectId="+id;
		}
	}
	function start() {
		initPage();
	}
	return {
		start: start,
		goto: goto
	};

})();
window.addproject.start();
})