var streamqueue = require('streamqueue');
var gulp        = require('gulp');
var concat      = require('gulp-concat');
var sass        = require('gulp-sass');
var htmlmin     = require('gulp-htmlmin');
var ngtemplates = require('gulp-angular-templatecache');
var plumber     = require('gulp-plumber');
var replace     = require('gulp-replace');

var app        = 'app';
var dist       = 'www';

var paths = {
	js: {
		libs: [
			'bower_components/ionic/js/ionic.bundle.js',
			'bower_components/moment/moment.js',
			'bower_components/ng-lodash/build/ng-lodash.min.js',
			'bower_components/leaflet/dist/leaflet.js',
			'bower_components/ngCordova/dist/ng-cordova.js',
			'bower_components/angular-leaflet/dist/angular-leaflet-directive.js',
			'bower_components/angular-translate/angular-translate.js',
			'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
			'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
			'bower_components/angular-native-picker/build/angular-datepicker.js'
		],
		src: [
			app 		+ '/app.js',
			app 		+ '/**/*-module.js',
			app 		+ '/**/*-service.js',
			app 		+ '/**/*-directive.js',
			app 		+ '/**/*-filter.js',
			app 		+ '/**/*-controller.js',
		]
	},
	partials: [
		{ files: [ app + '/**/*.html', '!' + app + '/index.html' ] }
	],
	css: [
		'bower_components/ionic/css/ionic.min.css'
	],
	sass: [
		app + '/**/*.scss'
	],
	images: [
		app + '/res/img/**/*.{png,jpg,svg,gif}'
	],
	fonts: [
		app + '/fonts/**/*',
		'bower_components/ionic/fonts/**/*'
	],
	misc: [
		app + '/index.html', app + '/404.html'
	]
};

gulp.task('js-html', function () {
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
		.pipe(plumber())
		.pipe(concat('app.js'))
		.pipe(gulp.dest(dist + '/js/'));
});

gulp.task('styles', function () {
	var stream = streamqueue({ objectMode: true });

	stream.queue(
		gulp.src(paths.css)
			.pipe(plumber())
			.pipe(concat('styles.css'))
	);

	stream.queue(
		gulp.src(paths.sass)
			.pipe(plumber())
			.pipe(concat('styles.scss'))
			.pipe(sass({ errLogToConsole: true }))
	);

	stream.done()
		.pipe(concat('app.css'))
		.pipe(plumber())
		.pipe(gulp.dest(dist + '/css/'));
});

gulp.task('copy', function () {
	gulp.src(paths.misc)
		.pipe(plumber())
		.pipe(gulp.dest(dist));

	gulp.src(paths.fonts)
		.pipe(plumber())
		.pipe(gulp.dest(dist + '/fonts/'));

	gulp.src(paths.images)
		.pipe(plumber())
		.pipe(gulp.dest(dist + '/img/'));
});

gulp.task('img', function () {
	gulp.src(paths.images)
		.pipe(gulp.dest(dist + '/img/'));
});

gulp.task('watch', function () {
	gulp.watch(paths.js.src, ['js-html']);
	gulp.watch(paths.sass, ['styles']);
	gulp.watch(paths.misc, ['copy']);
	paths.partials.forEach(function (partials) {
		gulp.watch(partials.files, ['js-html', 'styles']);
	});
});

gulp.task('default', [
	'js-html',
	'styles',
	'copy',
	'img'
]);