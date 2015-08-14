$(document).ready(function(){
window.goodsdetails = (function() {
	var project = {};
	//切换
	$(".g_nav ul li").click(function(){
		var index = $(this).index();
		var aside = $(".g_count");
		$(".g_nav ul i").animate({"left":index * 33.3 + "%"});
		aside.eq(index).fadeIn().siblings(".g_count").fadeOut();
	});
	$(".head_left").bind("click",function(){
		window.location.href = "index.html";
	});
	function start() {
		project = JSON.parse(getAjax.getSessionStorage('project'));
		$(".g_banner img").attr("src",getAjax.projectimg+project['projectPhoto']);
		if(project['projectGesture']!==null){
			$("#projectName").html(project['projectName']+'<i>'+project['projectGesture']+'</i>');
		} else {
			$("#projectName").html(project['projectName']);
		}
		
		$("#projectPrice").html(project['projectPrices'][0]['projectPrice']+'元起');
		$("#projectSale").html('销量：'+project['projectSale']);
		$("#projectTime").html(project['projectTime']+'分钟');
		$("#projectProcedure").html(project['serviceProcedure']);
		$("#projectEfficiency").html(project['projectEfficiency']);
		$("#tabooSymptom").html(project['tabooSymptom']);
	}
	return {
		start: start
	};
})();
window.goodsdetails.start();
});