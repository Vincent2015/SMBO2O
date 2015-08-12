$(document).ready(function(){
window.index = (function() {
	var ZULIAO = '40c4b32dd87b4e588e37dc0e907982ad';
	var LILIAO = 'e5fc930f0dad48d1bab288e31b2970b8';
	var projectListForStorage = {};
	var cur_city_code = "";
	//处理当前城市问题
	if(getAjax.getLocalStorage('city')==null||getAjax.getLocalStorage('city')==""){//如果没有缓存城市，使用北京
		var l_city={};
		l_city['code']=cur_city_code = '60abe656675a44dfb160cd159938e0b1';
		l_city['name']='北京';
		getAjax.setLocalStorage("city",JSON.stringify(l_city));
	} else {
		var l_city=JSON.parse(getAjax.getLocalStorage('city'));
		cur_city_code = l_city['code'];
	}
	//banner广告页
	$(function(){
		server = "";
		params = {
			url: "banner/getProjectDetail",
			advertisingAttr: 1,
			advertisingType: 2
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载banner',res);
			var bannerList = res['info'];
			var htm = '';
			for(var i=0;i<bannerList.length;i++){
				htm =  htm + '<li><a';
				if(bannerList[i]['url']!=""&&bannerList[i]['url']!=null){
					htm = htm + ' href="'+ bannerList[i]['url'] +'"';
				}
				htm = htm + '><img src="'+getAjax.activityimg+bannerList[i]['advertisingPhoto']+'"></a></li>';
			}
		$('.slider ul').empty().append(htm);
		$(".slider").yxMobileSlider({width:640,height:300,during:2000})
		},function(error){});
	});
	//切换城市
	$("header .head_left").click(function(){
		if($(".city").css("display")=="block"){
			$(".city").css("display","none");
			return;
		}
		if($(".city").css("display")=="none"){
			$(".city").css("display","block");
			return;
		}
	});
	$(".city_list ul li").live('click',function(){
		$(".city").css("display","none");
		$(".head_left p > em").html($(this).text());
		var l_city={};
		l_city['code']=cur_city_code=$(this).attr('cityCode');
		l_city['name']=$(this).text();
		getAjax.setLocalStorage("city",JSON.stringify(l_city));
		initPage();
	});
	//获取城市列表
	function getCityList(){
		server = "";
		params = {
			url: "city/getCityList"
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载城市列表',res);
			if(res['code']==0){
				var cityList = res['info'];
				var htm = "";
				for(var i=0;i<cityList.length;i++){
					htm = htm + '<li cityCode=\''+ cityList[i]['code'] +'\'>'+ cityList[i]['name'] +'</li>';
				}
				$('.city_list ul').empty().append(htm);

			}
			
		},function(error){});
	}
	//项目类别切换
	$("nav ul li").click(function(){
		var index = $(this).index();
		var aside = $(".aside_list aside");
		$("nav ul i").animate({"left":index * 25 + "%"});
		aside.eq(index).fadeIn().siblings("aside").fadeOut();
	});
	//预约按钮
	function appointment(projectId,url){
		//遍历所有项目，将选择的项目、订单存到sessionStorage
		for(var i=0;i<projectListForStorage.length;i++){
			if(projectId==projectListForStorage[i]['id']){
				getAjax.removeSessionStorage('project');
				getAjax.setSessionStorage("project",JSON.stringify(projectListForStorage[i]));
				var s_order={};
				s_order['projectId']=projectListForStorage[i]['id'];
				s_order['projectName']=projectListForStorage[i]['projectName'];
				getAjax.setSessionStorage("order",JSON.stringify(s_order));
			}
		}
		window.location.href=url+'.html';
		console.log(projectId);
		console.log(projectName);
	}
	//默认加载全部项目  当前测试加载足疗
	function initPage(){
		//加载全部项目
		server = "";
		params = {
			url: "project/getProjectListByTypeId",
			page: 1,
			rows: 99,
			cityId: cur_city_code,//测试北京
			sale: 1
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载全部项目',res);
			var projectList = res['info']['rows'];
			projectListForStorage = projectList;
			var htm = '';
			for(var i=0;i<projectList.length;i++){
				htm =  htm + '<div class="list" onclick="window.index.appointment(\''+projectList[i]['id']+'\',\'Goods_details\')">'+
								// '<img src="'+ getAjax.projectimg + projectList[i]['projectPhoto'] +'"/>'+
								'<img src="App_Themes/images/i_img01.png"/>'+
								'<div class="explain">'+
									'<p>'+
										'<span>'+ projectList[i]['projectName'] +'</span>'+
										'<em>'+ projectList[i]['projectPrices'][0]['projectPrice'] +'元起</em>'+
									'</p>'+
									'<p>'+
										'<i>'+
										   '<span>销量：'+ projectList[i]['projectSale'] +'</span>'+
										   '<span><img src="App_Themes/images/time.png"/>'+ projectList[i]['projectTime'] +'分钟</span>'+
										'</i>'+
										'<button onclick="window.index.appointment(\''+projectList[i]['id']+'\',\'placeorder\')">预约</button>'+
									'</p>'+
								'</div>'+
							'</div>';
			}
		$('aside:first').empty().append(htm);
		},function(error){});
	
		//加载足疗项目
		server = "";
		params = {
			url: "project/getProjectListByTypeId",
			page: 1,
			rows: 99,
			projectTypeId: ZULIAO,
			cityId: cur_city_code,//测试北京
			sale: 1
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载足疗项目',res);
			var projectList = res['info']['rows'];
			var htm = '';
			for(var i=0;i<projectList.length;i++){
				htm =  htm + '<div class="list" onclick="window.index.appointment(\''+projectList[i]['id']+'\',\'Goods_details\')">'+
								// '<img src="'+ getAjax.projectimg + projectList[i]['projectPhoto'] +'"/>'+
								'<img src="App_Themes/images/i_img01.png"/>'+
								'<div class="explain">'+
									'<p>'+
										'<span>'+ projectList[i]['projectName'] +'</span>'+
										'<em>'+ projectList[i]['projectPrices'][0]['projectPrice'] +'元起</em>'+
									'</p>'+
									'<p>'+
										'<i>'+
										   '<span>销量：'+ projectList[i]['projectSale'] +'</span>'+
										   '<span><img src="App_Themes/images/time.png"/>'+ projectList[i]['projectTime'] +'分钟</span>'+
										'</i>'+
										'<button onclick="window.index.appointment(\''+projectList[i]['id']+'\',\'placeorder\')">预约</button>'+
									'</p>'+
								'</div>'+
							'</div>';
			}
		$('aside:first').next().empty().append(htm);
		},function(error){});

		//加载理疗项目
		server = "";
		params = {
			url: "project/getProjectListByTypeId",
			page: 1,
			rows: 99,
			projectTypeId: LILIAO,
			cityId: cur_city_code,//测试北京
			sale: 1
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载理疗项目',res);
			var projectList = res['info']['rows'];
			var htm = '';
			for(var i=0;i<projectList.length;i++){
				htm =  htm + '<div class="list" onclick="window.index.appointment(\''+projectList[i]['id']+'\',\'Goods_details\')">'+
								// '<img src="'+ getAjax.projectimg + projectList[i]['projectPhoto'] +'"/>'+
								'<img src="App_Themes/images/i_img01.png"/>'+
								'<div class="explain">'+
									'<p>'+
										'<span>'+ projectList[i]['projectName'] +'</span>'+
										'<em>'+ projectList[i]['projectPrices'][0]['projectPrice'] +'元起</em>'+
									'</p>'+
									'<p>'+
										'<i>'+
										   '<span>销量：'+ projectList[i]['projectSale'] +'</span>'+
										   '<span><img src="App_Themes/images/time.png"/>'+ projectList[i]['projectTime'] +'分钟</span>'+
										'</i>'+
										'<button onclick="window.index.appointment(\''+projectList[i]['id']+'\',\'placeorder\')">预约</button>'+
									'</p>'+
								'</div>'+
							'</div>';
			}
		$('aside:first').next().next().empty().append(htm);
		},function(error){});

		//加载舒缓项目
		server = "";
		params = {
			url: "project/findProjectByOtherType",
			page: 1,
			rows: 99,
			cityId: cur_city_code,//测试北京
			sale: 1
		};
		getAjax.getAction(server,params,function(res){
			console.log('加载舒缓项目',res);
			var projectList = res['info']['rows'];
			var htm = '';
			for(var i=0;i<projectList.length;i++){
				htm =  htm + '<div class="list" onclick="window.index.appointment(\''+projectList[i]['id']+'\',\'Goods_details\')">'+
								// '<img src="'+ getAjax.projectimg + projectList[i]['projectPhoto'] +'"/>'+
								'<img src="App_Themes/images/i_img01.png"/>'+
								'<div class="explain">'+
									'<p>'+
										'<span>'+ projectList[i]['projectName'] +'</span>'+
										'<em>'+ projectList[i]['projectPrices'][0]['projectPrice'] +'元起</em>'+
									'</p>'+
									'<p>'+
										'<i>'+
										   '<span>销量：'+ projectList[i]['projectSale'] +'</span>'+
										   '<span><img src="App_Themes/images/time.png"/>'+ projectList[i]['projectTime'] +'分钟</span>'+
										'</i>'+
										'<button onclick="window.index.appointment(\''+projectList[i]['id']+'\',\'placeorder\')">预约</button>'+
									'</p>'+
								'</div>'+
							'</div>';
			}
		$('aside:first').next().next().next().empty().append(htm);
		},function(error){});
	}
	function start() {
		getCityList();
		initPage();
	}
	return {
		start: start,
		appointment: appointment
	};

})();
window.index.start();
})