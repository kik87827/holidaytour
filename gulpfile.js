
var gulp = require("gulp"),
	fileinclude = require('gulp-file-include'),
	webserver = require('gulp-webserver'),
	htmlbeautify = require('gulp-html-beautify'),
	removeEmptyLines = require('gulp-remove-empty-lines');

gulp.task('default', ['fileinclude', 'watch','webserver']);

gulp.task('htmlbeautify', function () {
	var options = { indent_with_tabs : true }
	gulp.src('./src/**.html')
	.pipe(htmlbeautify(options))
	.pipe(gulp.dest('./dist/'))
});


gulp.task('fileinclude',function(){
	gulp.src(['./src/**.html'],{base : "./src/"})
	.pipe(fileinclude({
		prefix : '@@',
		basepath : '@file'
	}).on('error', function(){ console.log('path error')}))
	// .pipe(removeEmptyLines())
	.pipe(htmlbeautify({indent_with_tabs : true}))
	.pipe(gulp.dest('./dist/'))
});

gulp.task('webserver',function(){
	gulp.src('./dist/')
	.pipe(webserver({
		livereload : true,
		open : true,
		port : 7474
	}));
});

gulp.task('watch', function () {
	gulp.watch(['./src/**.html'], ["fileinclude"],function(cb){
		cb();
	});
});