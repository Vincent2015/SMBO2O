$(document).ready(function(){
	//切换
	$(".g_nav ul li").click(function(){
		var index = $(this).index();
		var aside = $(".g_count");
		$(".g_nav ul i").animate({"left":index * 33.3 + "%"});
		aside.eq(index).fadeIn().siblings(".g_count").fadeOut();
	});
});