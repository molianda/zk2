var gulp=require('gulp');
var server=require('gulp-webserver');
gulp.task('server',function(){
	return gulp.src('src')
		.pipe(server({
			port:9090,
			proxies:[{
				source:'/users/api/get/list',
				target:'http://172.23.46.51:3000//users/api/get/list'
			}]
		}))
})