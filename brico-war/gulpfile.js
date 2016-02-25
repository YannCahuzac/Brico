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

/**
 * Ne pas mettre les chemin absolus sinon gulp ne trouve plus les répertoires.
 * Sauf pour le distJsAbsolu où sinon c'est le navigateur qui ne trouvera plus les *.min.js. 
 */
var paths = {
	srcAppJs: 'src/main/webapp/script/js/**/*.js',
	srcApp: 'src/main/webapp/script/js/**/',
	srcAppSrv: 'src/main/webapp/script/js/services/',
	srcAppCtrl: 'src/main/webapp/script/js/controllers/',
	srcAppDir: 'src/main/webapp/script/js/directives/',
    srcUtilsJs: 'src/main/webapp/script/js/utils/*.js',
    srcUtils: 'src/main/webapp/script/js/utils/',
    srcStyles: 'src/main/webapp/script/css/**/*.*',
    srcImages: 'src/main/webapp/script/img/**/*.*',
    index: 'src/main/webapp/script/templates/index.html',
    srcTemplates: 'src/main/webapp/script/templates/*.*',
    dist: 'src/main/webapp/dist/',
    distJs: 'src/main/webapp/dist/js/',
    distJsAbsolu: '/brico-war/dist/js/',
    webapproot:'src/main/webapp',
    appJsFinal: 'app.min.js',
    utilsJsFinal: 'utils.min.js',
};

/**
 * Nettoie la dist
 */
gulp.task('clean', function(cb) {
    del([paths.dist],cb);
});

/**
 * Minify tous les Js App pour les mettre dans paths.appJsFinal
 * Respecter l'ordre des Js!
 */
gulp.task('custom-appJs', function() {
    return gulp.src(
		[
		 //'!' + paths.srcUtilsJs, 
		 paths.srcAppCtrl + 'app.js',
		 paths.srcAppSrv + 'postSrv.js',
		 paths.srcAppSrv + 'utilSrv.js',
		 paths.srcAppSrv + 'themesSrv.js',
		 paths.srcAppSrv + 'authSrv.js',
		 paths.srcAppSrv + 'newAccountSrv.js',
		 paths.srcAppCtrl + 'master-ctrl.js',
		 paths.srcAppCtrl + 'homeCtrl.js',
		 paths.srcAppCtrl + 'newPostCtrl.js',
		 paths.srcAppCtrl + 'themeCtrl.js',
		 paths.srcAppCtrl + 'postCtrl.js',
		 paths.srcAppCtrl + 'newAccountCtrl.js',
		 paths.srcAppDir + 'widget.js',
		 paths.srcAppDir + 'widget-body.js',
		 paths.srcAppDir + 'widget-footer.js',
		 paths.srcAppDir + 'widget-header.js',
		 paths.srcAppDir + 'loading.js',
		 paths.srcAppDir + 'login.js',
		 ]
    	)
    	//.pipe(minifyJs())
    	//.pipe(uglify())
    	.pipe(concat(paths.appJsFinal))
        .pipe(gulp.dest(paths.distJs));
});

/**
 * Minify tous les Js Utils pour les mettre dans paths.utilsJsFinal
 * NB: les 2 select2.*js qu'on voit ci-dessous ne sont pas issus du même package (select2 et angular-ui-select2).
 * NB: il faut indiquer l'ordre à gulp pour qu'il concat dans l'ordre souhaité.
 */
gulp.task('custom-utilsJs', function() {
	return gulp.src(
			[
				paths.srcUtils + 'jquery.min.js',
				paths.srcUtils + 'angular.min.js',
				paths.srcUtils + 'bootstrap.min.js',
				paths.srcUtils + 'ui-bootstrap-tpls.min.js',
				paths.srcUtils + 'angular-cookies.min.js',
				paths.srcUtils + 'angular-animate.min.js',
				paths.srcUtils + 'angular-ui-router.min.js',
				paths.srcUtils + 'select2.min.js',
				paths.srcUtils + 'select2.js',
				paths.srcUtils + 'angular-table.min.js'
			]
			)
			// .pipe(minifyJs())
			.pipe(concat(paths.utilsJsFinal))
			.pipe(gulp.dest(paths.distJs));
});

/**
 * Remplace les blocs HTML par la src js
 */
gulp.task('html-replace', function() {
	  return gulp.src(paths.index)
	    .pipe(htmlreplace({
	    	'utilsJs': paths.distJsAbsolu + paths.utilsJsFinal,
	        'appJs': paths.distJsAbsolu + paths.appJsFinal
	    }))
	    .pipe(gulp.dest(paths.dist + 'templates'));
});

// ##########################################################
// ########################## TODO ##########################

gulp.task('custom-images', function() {
    return gulp.src(paths.srcImages)
        .pipe(gulp.dest(paths.dist + 'img'));
});

gulp.task('custom-css', function() {
    return gulp.src(paths.srcStyles)
        .pipe(gulp.dest(paths.dist + 'css'));
});

/**
 * NB: on ne mets pas l'index.html car on le traite déjà ailleurs.
 */
gulp.task('custom-templates', function() {
    return gulp.src([paths.srcTemplates, '!' + paths.index])
        .pipe(minifyHTML())
        .pipe(gulp.dest(paths.dist + 'templates'));
});

// ########################## FIN ##########################
// #########################################################

/**
 * Watch les modification sur chaque dossier décrit ci-dessous:
 */
gulp.task('watch', function() {
	gulp.watch([paths.srcAppJs], ['custom-appJs', 'html-replace']);
	gulp.watch([paths.srcUtilsJs], ['custom-utilsJs', 'html-replace']);
	gulp.watch([paths.srcImages], ['custom-images']);
    gulp.watch([paths.srcStyles], ['custom-css']);
    gulp.watch([paths.srcTemplates], ['custom-templates']);
});

/**
 * Créé le proxy qui se fait passer pour un serveur static qui pointe vers les page HTML/CSS/Js.. 
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

gulp.task('buildStatic', ['custom-templates', 'custom-css', 'custom-images']);
// Executer les tasks 'clean' puis 'buildBrico'
gulp.task('build', ['custom-appJs', 'custom-utilsJs', 'html-replace', 'buildStatic']);

gulp.task('proxy', ['connect-dev'], function() {
    prismInit('proxy');
});