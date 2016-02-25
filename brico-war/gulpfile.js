var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    prism = require('connect-prism'),
    minifyHTML = require('gulp-minify-html'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    rev= require('gulp-rev'),
    del= require('del'),
    html2js = require('gulp-html2js'),
    replace = require('gulp-replace'),
	htmlreplace = require('gulp-html-replace');

var paths = {
	srcAppJs: 'src/main/webapp/script/js/**/*.js',
    srcUtilsJs: 'src/main/webapp/script/js/utils/*.js',
    styles: 'src/main/webapp/script/css/**/*.*',
    images: 'src/main/webapp/script/img/**/*.*',
    index: 'src/main/webapp/script/templates/index.html',
    templates: 'src/main/webapp/script/templates/*.*',
    bower_fonts: 'src/main/webapp/bower_components/**/*.{ttf,woff,eof,svg}',
    dist: 'src/main/webapp/dist/',
    app: 'src/main/webapp/script/',
    webapproot:'src/main/webapp',
};

/**
 * Nettoie la dist
 */
gulp.task('clean', function(cb) {
    del([paths.dist],cb);
});

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
	return gulp
		.src(paths.index)
		.pipe(
			usemin({
				appJs : [ minifyJs(), 'concat', ngAnnotate(), uglify({outSourceMap : true}), rev() ],
				vendorjs : [ rev() ]
		}))
		.pipe(gulp.dest(paths.dist));
});

/**
 * Minify tous les JS App pour les mettre dans index.min.js
 */
gulp.task('custom-appJs', function() {
    return gulp.src(['!' + paths.srcUtilsJs, paths.srcAppJs])
        .pipe(minifyJs())
        .pipe(concat('index.min.js'))
        .pipe(gulp.dest(paths.dist + 'js'));
});

/**
 * Minify tous les JS Utils pour les mettre dans utils.min.js
 */
gulp.task('custom-utilsJs', function() {
	return gulp.src(paths.srcUtilsJs)
	.pipe(minifyJs())
	.pipe(concat('utils.min.js'))
	.pipe(gulp.dest(paths.dist + 'js'));
});

/**
 * Remplace les blocs HTML par la src js
 */
gulp.task('html-replace', function() {
	  return gulp.src(paths.index)
	    .pipe(htmlreplace({
	        'appJs': paths.dist + 'js/index.min.js',
	        'utilsJs': paths.dist + 'js/utils.min.js'
	    }))
	    .pipe(gulp.dest(paths.dist + 'templates'));
});

// ###########################################################
// ###########################################################

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest(paths.dist + 'lib'));
});

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.dist + 'img'));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
    	// Pb sur less(), voir les versions dans le package.json
        // .pipe(less())
        .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest(paths.dist + 'templates'));
});

// ###########################################################
// ###########################################################

/**
 * Watch les modification sur chaque dossier décrit ci-dessous:
 */
gulp.task('watch', function() {
	gulp.watch([paths.srcAppJs], ['custom-appJs', 'html-replace']);
	gulp.watch([paths.srcUtilsJs], ['custom-utilsJs', 'html-replace']);

	// A voir:
	gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-less']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
});

/**
 * Créé le proxy qui se fait passer pour un serveur static qui pointe vers les page HTML/CSS/JS.. 
 */
gulp.task('connect-dev', ['watch'], function() {
    connect.server({
        port:8000,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                prism.middleware,
                connect().use('/brico-war', connect.static(paths.webapproot))
            ];
        }
    });
});

/**
 * Créé le proxy qui va chercher les services Json sur le vrai serveur d'application: 
 */
function prismInit(prismMode) {
    prism.create({
        name: 'server',
        mode: prismMode,
        context: '/brico-war/action',
        mocksPath: './mocks',
        host: 'localhost',
        port: 8080,
        delay: 300
    });
}

gulp.task('default', ['webserver', 'livereload', 'watch']);
gulp.task('build', ['usemin', 'html-replace', 'build-assets', 'build-custom']);

// Executer les tasks 'clean' puis 'buildBrico'
gulp.task('buildBrico', ['custom-appJs', 'custom-utilsJs', 'html-replace']);

gulp.task('proxy', ['connect-dev'], function() {
    prismInit('proxy');
});