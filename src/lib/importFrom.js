// tooling
import defaults from './defaults';

function siteCDN() {
	return siteURL(defaults.siteCDN);
}

function siteURL(url = defaults.siteURL) {
	return fetch(url).then(
		(response) => response.json()
	).then(siteObject);
}

function siteObject({
	branding   = defaults.siteObject.branding,
	navigation = defaults.siteObject.navigation,
	labels     = defaults.siteObject.labels
}) {
	return {
		branding,
		navigation,
		labels
	};
}

export { siteCDN, siteURL, siteObject }
