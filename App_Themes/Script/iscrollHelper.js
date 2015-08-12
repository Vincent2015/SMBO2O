//滚动
var myScroll;
function loaded (render) {
	myScroll = new IScroll('#wrapper', {minScrollY: 6});
	myScroll.on("scrollEnd",function(){
		//判断是否下拉刷新
		// if(this.y==40){
		// 	//此处执行下拉刷新部分的代码，目前采用
		// 	myScroll.scrollTo(0, 0, 600);
		// 	// setTimeout(function(){
		// 	// 	myScroll.scrollTo(0, 0, 600);
		// 	// }, 0);
		// }
		//判断是否上拉加载分页数据
		if(Math.abs(this.y) == (document.querySelector('#scroller').clientHeight - document.querySelector('#wrapper').clientHeight)){
			// document.querySelector('#loading').style.display = 'block';
			render();
			myScroll.refresh();
			// document.querySelector('#loading').style.display = 'none';
			// document.querySelector('#loading').style.display = 'block';
			// setTimeout(function(){
			// 	document.querySelector('#loading').style.display = 'none';
			// },1500);
		}
	});
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);