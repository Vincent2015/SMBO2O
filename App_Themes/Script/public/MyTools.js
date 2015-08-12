window.mytool=(function(){
	var htm='';
	
	 var alt={
		creat:function(txt){
			htm ='';
			htm +='<div class="mytools"></div>';
			htm +='<div class="mytool">';
			htm +='<ul>';
			htm +='<li class="li1"><span id="close">X</span></li>';
			htm +='<li class="li2">';
			htm +='<div class="altxtbdr">';
			htm +='<div id="altcontext" class="altcontext">'+txt+'</div>';
			htm +='</div>';
			htm +='</li>';
			htm +='<li class="li3"><span class="btnOK" >确定</span><span class="btnNO">取消</span></li>';
			htm +='</ul>';
			htm +='</div>';
			$(document.body).append(htm);
			this.btn();
		},
		start:function(context,fun){
			if($(".mytools")==undefined){
				this.creat(context);
			}else{
				$("#altcontext").text(context);
				$(".mytools").fadeIn(500);
				$(".mytool").fadeIn(500);
			}
		},
		btn:function(){
			$(".btnOK").click(function(){
				$(".mytools").fadeOut(500);
				$(".mytool").fadeOut(500);
			});
			$(".btnNO").click(function(){
				$(".mytools").fadeOut(500);
				$(".mytool").fadeOut(500);
			});
			$("#close").click(function(){
				$(".mytools").fadeOut(500);
				$(".mytool").fadeOut(500);
			});
		}
	};
	
	function state(){
		alt.creat('');
	}
	
	return{
		state:state,
		alt:alt
	};
})();
window.mytool.state();
