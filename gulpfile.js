var gulp = require('gulp'),
compass = require('gulp-compass');
minifycss = require('gulp-minify-css'), // CSS压缩
    uglify = require('gulp-uglify'),        // js压缩
    concat = require('gulp-concat'),        // 合并文件
    rename = require('gulp-rename'),
    clean = require('gulp-clean');

var path = {
	css: './app/src/assets/css',
	scss: './app/src/assets/scss',
	js: '',
	font: './app/src/assets/fonts',
	img: './app/src/assets/images'
};

gulp.task('compass', function() {
  return gulp.src(path.scss + '/*.scss')
    .pipe(compass({
        comments: false,
        css: path.css,
        sass: path.scss,
        image: path.img,
        font: path.font
    }));
});


// 合并、压缩、重命名css
gulp.task('mincss', function() {
    // 注意这里通过数组的方式写入两个地址,仔细看第一个地址是css目录下的全部css文件,第二个地址是css目录下的areaMap.css文件,但是它前面加了!,这个和.gitignore的写法类似,就是排除掉这个文件.
  return gulp.src(path.css + '/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./app/dist/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./app/dist/css'));
});

// 合并，压缩js文件
gulp.task('javascripts', function() {
  gulp.src(path.js + '/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./app/dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('js', function() {
    return gulp.src([path.js + '/*.js', './spec/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function(){
	return gulp.src('./app/dist/*', {read: false})
    .pipe(clean());
});

gulp.task('copy', ['clean'],function(){

	gulp.src(path.img + '/*')
   .pipe(gulp.dest('./app/dist/images/'));

	gulp.src(path.font + '/*')
   .pipe(gulp.dest('./app/dist/fonts/'));
});

gulp.task('build', ['clean', 'copy', 'css']);

gulp.task('default', ['compass', 'mincss']);

gulp.task('css',['compass','mincss']);

gulp.task('watch', function () {

	gulp.watch(path.scss + '/*.scss', ['compass']);
	gulp.watch(path.css + '/*.css', ['mincss']);
		
	//gulp.watch(['app/assets/scss/*.scss','app/assets/css/*.css'], ['mincss']);
	
});
