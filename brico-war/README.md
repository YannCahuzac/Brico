################## NodesJS NPM ##################

Installation: http://nodejs.org/
Vérification: en ligne de commande écrire "node --version", nodeJS devrait afficher la version et terminer.

##################### Bower #####################

Bower est un gestionnaire de dépendences web (framework web client). 
C'est une application node.js qui s'installe globalement: 
npm install -g bower
Puis bower --version
bower install pour installer les composants JS du bower.json

################## Grunt / Gulp #################

Grunt s'install localement dans le projet néanmoins gulp-cli (command line) doit s'installer globalement.
npm install -g gulp-cli
Ensuite dans le répertoire de chaque projet projet web JavaScript (optinnel car ça peut se faire via npm install):
cd d:\work\sources\xy\xy-web
npm install gulp
Puis gulp --version
"npm install" pour installer les composants du package.json.
C'est équivalent pour Grunt.

#################################################

NPM: Faire un npm install pour installer les composant du package.json.
Le package.jon possède entre autre les version du bower et du gulp.
Attention: ça installera donc aussi les bower et gulp, à la différence du npm install -g bower/gulp sui doit s'installer globalement.
Une fois cela fait: faire un gulp {task} pour lancer la tache définie dans le gulpfile.js.
Le fichier LICENSE coorespond à la license libre MIT.

#################################################

*: 				0.0.0 <= V
1.2.3 - 2.3.4: 	1.2.3 <= V <= 2.3.4
1.2.3 - 2: 		1.2.3 <= V < 3.0.0
1.*: 			1.0.0<= V < 2.0.0
1.2.*: 			1.2.0 <= V < 1.3.0
~1.2.3: 		1.2.3 <= V < 1.3.0
^1.2.3:			1.2.3 <= V < 2.0.0