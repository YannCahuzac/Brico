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
    replace = require('gulp-replace');

var paths = {
    scripts: 'src/main/webapp/script/js/**/*.*',
    styles: 'src/main/webapp/script/css/**/*.*',
    images: 'src/main/webapp/script/img/**/*.*',
    templates: 'src/main/webapp/script/templates/**/*.html',
    index: '/webapp/src/main/webapp/script/templates/index.html',
    bower_fonts: 'src/main/webapp/bower_components/**/*.{ttf,woff,eof,svg}',
    dist: 'src/main/webapp/dist/',
    webapproot:'src/main/webapp',
};

/**
 * Handle bower components from index
 */
gulp.task('usemin',function() {
	return gulp
		.src(paths.index)
		.pipe(
			usemin({
				js : [ minifyJs(), 'concat', ngAnnotate(), uglify({outSourceMap : true}), rev() ],
				vendorjs : [ rev() ],
				css : [ minifyCss({keepSpecialComments : 0}), 'concat', rev() ],
				vendorcss : [
					replace(/ui-grid\.(ttf|woff)/g,'/brico-war/dist/fonts/ui-grid.$1'),
					replace(/[0-9a-zA-Z\-_\s\.\/]*\/([a-zA-Z\-_\.0-9]*\.(woff|woff2|eot|ttf|svg))/g,'/brico-war/dist/fonts/$1'),
					rev() ]
		}))
		.pipe(gulp.dest(paths.dist));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest(paths.dist + 'lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.dist + 'img'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('index.min.js'))
        .pipe(gulp.dest(paths.dist + 'js'));
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

/**
 * Watch les modification sur chaque dossier décrit ci-dessous:
 */
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-less']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
});

// TODO Faire fonctionner:
gulp.task('webserver', function() {
    connect.server({
        root: paths.webapproot,
        livereload: true,
        port: 8888
    });
});

// TODO Faire fonctionner:
gulp.task('livereload', function() {
    gulp.src([paths.webapproot + '**/*.*'])
        .pipe(watch())
        .pipe(connect.reload());
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
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
gulp.task('proxy', ['connect-dev'], function() {
    prismInit('proxy');
});