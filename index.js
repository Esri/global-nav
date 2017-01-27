import gnav from './js/gnav';

document.addEventListener(
	'DOMContentLoaded',
	() => gnav()
);

// import GlobNav from './GlobNav';

// document.addEventListener('DOMContentLoaded', () => {
// 	GlobNav.importFrom.siteCDN().then(
// 		({ navigation }) => GlobNav.constructMenu(navigation)
// 	).then(
// 		(div) => document.body.append(div)
// 	);
// });
