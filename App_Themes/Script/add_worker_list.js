$(document).ready(function(){
window.addworker = (function() {
	var workerForProject = JSON.parse(getAjax.getSessionStorage("WorkerForProject"));
	function initPage(){
		var htm = "";
		console.log("可用师傅列表",workerForProject);
		for(var i=0;i<workerForProject.length;i++){
			htm = htm + '<li class="box-li" onclick="window.addworker.goto('+i+')">'+
				'<div style="width:25%;float:left;text-align:center;">'+
					'<img class="img" id="projectImg" src="'+getAjax.workimg+workerForProject[i]['headPhoto']+'">'+
				'</div>'+
				'<ul class="text-box">'+
					'<li>'+
						'<div class="left-div" id="projectName" style="margin-top:15px;">'+workerForProject[i]['nickName']+'</div>'+
						'<div class="left-div" id="projectName" style="margin-top:15px;font-size:1px;color: #6D6D6D;">'+(workerForProject[i]['sex']==0?"男":"女")+'</div>'+
						'<div class="right-div" id="projectPrice" style="margin-top:15px;width: 42px;color:#18CB6D">'+Math.round((workerForProject[i]['distance']/1000)*100)/100+'km</div>'+
						'<div class="right-div" id="projectPrice" style="margin-top:15px;width: 13px;" >'+
						'<img src="App_Themes/images/gps.png" style="width: 13px;margin-top:4px;margin-right:4px;">'+
						'</div>'+
					'</li>'+
					'<li>'+
						'<div class="left-div" id="projectNum" style="width: 50%;">接单量:'+workerForProject[i]['orderCount']+'</div>'+
					'</li>'+
					'<li>'+
						'<div class="last-div" id="projectDesc">擅长:'+
						// (workerForProject[i]['adept'].length>8)?(workerForProject[i]['adept'].substring(0,6)+'...'):workerForProject[i]['adept']
						workerForProject[i]['adept']
						+'</div>'+
					'</li>'+
				'</ul>'+
			'</li>';
		}
		$("#box").append(htm);
	}
	function goto(index){
		getAjax.setSessionStorage("Worker",JSON.stringify(workerForProject[index]));
		window.location.href="Goods_order.html";
	}
	function start() {
		initPage();
	}
	return {
		start: start,
		goto: goto
	};

})();
window.addworker.start();
})