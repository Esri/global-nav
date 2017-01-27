// tooling
const child_process = require('child_process');
const fs            = require('rapid/lib/fs');
const log           = require('rapid/lib/log');

// ...
const component = 'esri-gnav';
const dist = 'dist';
const temp = 'temp';
const url  = 'git@github.com:ArcGIS/esri-global-nav.git';

// messaging
const isUpdating   = 'is updating gh-pages';
const isPushing    = 'is pushing gh-pages';
const isUpdated    = 'is updated';
const isNotUpdated = 'could not update';

if (!component) {
	log.fail('component', isNotUpdated, `Could not use "${ component }"`);

	process.exit(1);
}

// ...
const componentDir = fs.join(process.env.PWD);

// ...
const tempDir = fs.join(componentDir, temp);
const fromDir = fs.join(componentDir, dist);
const toDir   = fs.join(componentDir, temp);

const exec = (command) => new Promise(
	(resolve, reject) => child_process.exec(
		command,
		{
			cwd: tempDir
		},
		(error, stdout, stderr) => error ? reject(stderr) : resolve(stdout)
	)
);

fs.rmdir(tempDir).catch(
	(error) => error.code === 'ENOENT' ? Promise.resolve() : Promise.reject(error)
).then(
	() => log.wait(component, isUpdating) && fs.mkdir(tempDir)
).then(
	() => exec('git init')
).then(
	() => exec(`git remote add origin ${ url }`)
).then(
	() => exec('git fetch origin')
).then(
	() => exec('git show-ref --quiet --verify -- "refs/remotes/origin/gh-pages"').then(
		() => exec('git fetch origin gh-pages').then(
			() => exec('git checkout -b gh-pages origin/gh-pages')
		),
		() => exec('git checkout -b gh-pages')
	)
).then(
	() => fs.copydir(fromDir, toDir)
).then(
	() => exec(`git add .`)
).then(
	() => exec('git diff-index --quiet HEAD --').catch(
		() => exec(`git add .`).then(
			() => exec(`git commit --message="update ${ component }"`)
		).then(
			() => log.stop().wait(component, isPushing) && exec('git push origin gh-pages')
		)
	)
).then(
	() => fs.rmdir(tempDir)
).then(
	() => log.pass(component, isUpdated) && process.exit(0),
	(error) => log.fail(component, isNotUpdated, error) && process.exit(1)
);
