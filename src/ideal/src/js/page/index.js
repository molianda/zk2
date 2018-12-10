require(['./js/config.js'],function(){
	require(['mui'],function(mui){
		var pagenum=0,
			page_size=6,
			type=1,
			total;
		mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					up: {
						auto:true,
						contentrefresh: '正在加载...',
						callback: pullupRefresh
					}
				}
			});
		function pullupRefresh() {
			setTimeout(function() {
				pagenum++;
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(pagenum==page_size); //参数为true代表没有更多数据了。
				mui.ajax('/users',{
					success:function(res){
						console.log(res)
					}
				})
			}, 1000);
		}
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	})
})