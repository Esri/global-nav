import gnav from '..';
import data from './demo.json';

document.addEventListener(
	'DOMContentLoaded',
	() => gnav.render(data)
);

// document.addEventListener('DOMContentLoaded', () => {
// 	GlobNav.importFrom.siteCDN().then(
// 		({ navigation }) => GlobNav.constructMenu(navigation)
// 	).then(
// 		(div) => document.body.append(div)
// 	);
// });
