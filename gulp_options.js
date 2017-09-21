// tooling
const cwd = process.cwd();
const path = require('path');

// package, gulp configuration
const pkg = require(
	resolver('package.json')
);
const cfg = pkg.gulpConfig || {};

// paths for html, js, css
const pathHTML  = cfg.html  !== undefined ? cfg.html  : pkg.template;
const pathJS    = cfg.js    !== undefined ? cfg.js    : pkg.main;
const pathCSS   = cfg.css   !== undefined ? cfg.css   : pkg.style;
const pathFiles = cfg.files !== undefined ? cfg.files : 'placeholders';

const paths = {
	html:  getpath(pathHTML,  `${ pkg.name }.html`),
	js:    getpath(pathJS,    `${ pkg.name }.js`),
	css:   getpath(pathCSS,   `${ pkg.name }.css`),
	files: getpath(pathFiles, 'placeholders')
};

function getpath(pathdata, fallback) {
	if (false === pathdata) {
		return false;
	} else if (pathdata instanceof Array) {
		return pathdata.map(resolver);
	} else if (pathdata === Object(pathdata)) {
		return Object.keys(pathdata).map(
			(key) => resolver(key)
		);
	} else {
		return resolver(pathdata || fallback);
	}
}

// whether sass or css are used
const useSass    = cfg['use-sass']    === false ? false : true; // eslint-disable-line no-unneeded-ternary
const usePostCSS = cfg['use-postcss'] === false ? false : true; // eslint-disable-line no-unneeded-ternary

const uses = {
	sass:    useSass,
	postcss: usePostCSS
};

// whether or how css or js are compressed
const compressCSS = cfg['compress-css'] === false ? false : Object.assign({
	normalizeUrl: false,
	svgo: false,
	sass: {
		outputStyle: 'compressed'
	}
}, cfg['compress-css']);
const compressJS  = cfg['compress-js']  === false ? false : Object.assign({}, cfg['compress-js']);

// css direction
const cssDir = 'css-dir' in cfg ? cfg['css-dir'] : false;

// css syntax
const cssSyntax = 'css-syntax' in cfg ? cfg['css-syntax'] : 'scss';

// js module options
const jsModuleFormat = 'js-module-format' in cfg ? cfg['js-module-format'] : 'iife';
const jsModuleName   = 'js-module-name' in cfg   ? cfg['js-module-name']   : false;

// watch file paths
const watch = {
	css: pathCSS === false || cfg['watch-css'] === false ? [] : [].concat(cfg['watch-css'] || [
		pathCSS,
		'*.{css,scss}',
		'dependent-css/**',
		'dependent-scss/**'
	]),
	js: pathJS === false || cfg['watch-js'] === false ? [] : [].concat(cfg['watch-js'] || [
		pathJS,
		'*.{js,json}',
		'dependent-js/**'
	]),
	html: pathHTML === false || cfg['watch-html'] === false ? [] : [].concat(cfg['watch-html'] || [
		pathHTML,
		'*.{html,jsx}',
		'dependent-html/**'
	]),
	files: pathFiles === false ? [] : [`${ pathFiles }/**`]
};

// destinations
const htmlDest = getdest('html-dest', 'index.html', pathHTML);
const cssDest  = getdest('css-dest',  'index.css',  pathCSS);
const jsDest   = getdest('js-dest',   'index.js',   pathJS);

// more configs
const eslitConfig   = Object.assign({}, cfg.eslitConfig);
const postcssConfig = Object.assign({}, cfg.postcssConfig);
const rollupConfig  = Object.assign({}, cfg.rollupConfig);

// server options
const server = Object.assign({
	host:        'server-host' in cfg       ? cfg['server-host']       : 'localhost',
	livereload:  'server-livereload' in cfg ? cfg['server-livereload'] : true,
	name:        'server-name' in cfg       ? cfg['server-name']       : pkg.name,
	port:        'server-port' in cfg       ? cfg['server-port']       : 8080,
	openBrowser: 'server-browser' in cfg    ? cfg['server-browser']    : true,
	root:        'server-root' in cfg       ? cfg['server-root']       : 'dist'
}, cfg['server']);

// return configuration
module.exports = {
	compressCSS,
	compressJS,
	cssDir,
	cssSyntax,
	jsModuleFormat,
	jsModuleName,
	paths,
	uses,
	server,
	watch,
	htmlDest,
	cssDest,
	jsDest,
	eslitConfig,
	postcssConfig,
	rollupConfig
};

/* Get Destination (from cfg)
/* ========================================================================== */

function getdest(key, fallback, pathdata) {
	const isArray  = Array.isArray(cfg[key]);
	const isObject = !Array.isArray(pathdata) && pathdata === Object(pathdata);

	return isObject ? Object.keys(pathdata).map(
		(pathkey) => resolver(pathdata[pathkey])
	) : isArray ? cfg[key].map(resolver) : key in cfg ? cfg[key] : fallback;
}

/* Resolver (from cwd)
/* ========================================================================== */

function resolver(each) {
	return path.resolve(cwd, each);
}
