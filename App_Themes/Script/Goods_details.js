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
	function start() {
		project = JSON.parse(getAjax.getSessionStorage('project'));
		$(".g_banner img").attr("src",getAjax.projectimg+project['projectPhoto']);
		$("#projectName").html(project['projectName']+'<i>'+project['projectGesture']+'</i>');
		$("#projectPrice").html(project['projectPrices'][1]['projectPrice']+'元起');
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