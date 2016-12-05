import GlobNav from './GlobNav';

export default GlobNav;

document.addEventListener('DOMContentLoaded', () => {
	GlobNav.importSiteFromCDN().then(
		({ navigation }) => GlobNav.constructNavigationDOM(navigation)
	).then(
		(div) => document.body.append(div)
	)
});
