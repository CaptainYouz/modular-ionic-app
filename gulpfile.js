var gulp        = require('gulp');
var concat      = require('gulp-concat');
var streamqueue = require('streamqueue');
var sass        = require('gulp-sass');
var htmlmin     = require('gulp-htmlmin');
var ngtemplates = require('gulp-angular-templatecache');

var app         = 'app';
var dist        = 'www';

var paths = {
	js: {
		libs: [
			'bower_components/ionic/js/ionic.bundle.js'
		],
		src: [
			app + '/app.js',
			app + '/**/*-module.js',
			app + '/**/*-service.js',
			app + '/**/*-directive.js',
			app + '/**/*-filter.js',
			app + '/**/*-controller.js'
		]
	},
	partials: [
		{ files: [ app + '/**/*.html', '!' + app + '/index.html' ] }
	],
	css: 'bower_components/ionic/css/ionic.min.css',
	sass: [ app + '/**/*.scss' ],
	images: app + '/img/**/*.{png,jpg,svg,gif}',
	fonts: app + '/fonts/**/*.{otf,ttf,woff}',
	misc: [app + '/index.html', app + '/404.html']
};

gulp.task('js', function () {
	var stream = streamqueue({ objectMode: true });

	stream.queue(
		gulp.src(paths.js.libs.concat(paths.js.src))
			.pipe(concat('src.js'))
	);

	paths.partials.forEach(function (partials) {
		stream.queue(
			gulp.src(partials.files)
				.pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
				.pipe(ngtemplates({ module: 'app', root: partials.root }))
		);
	});

	stream.done()
		.pipe(concat('app.js'))
		.pipe(gulp.dest(dist + '/js/'));
});

gulp.task('styles', function () {
	var stream = streamqueue({ objectMode: true });

	stream.queue(
		gulp.src(paths.css)
			.pipe(concat('styles.css'))
	);

	stream.queue(
		gulp.src(paths.sass)
			.pipe(concat('styles.scss'))
			.pipe(sass())
	);

	stream.done()
		.pipe(concat('app.css'))
		.pipe(gulp.dest(dist + '/css/'));
});

gulp.task('copy', function () {
	gulp.src(paths.misc)
		.pipe(gulp.dest(dist));
});

gulp.task('watch', function () {
	gulp.watch(paths.js.src, ['js']);
	gulp.watch(paths.sass, ['styles']);
	gulp.watch(paths.misc, ['copy']);
	paths.partials.forEach(function (partials) {
		gulp.watch(partials.files, ['js']);
	});
});

gulp.task('default', ['js', 'styles', 'copy']);
