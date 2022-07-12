import {
	$assign as $
} from "../../shared/js/shared";

export default () => {
	/* Apps: Target
	/* ====================================================================== */

	const $target = $("div", {class: "esri-header-app-switcher"});

	$target.addEventListener("header:update:appSwitcher", ({detail}) => {
		if (!detail) {
			return;
		}

		const $appSwitcher = $('arcgis-app-switcher');
		$appSwitcher.portal = detail.portal;
		$appSwitcher.user = detail.user;
		$appSwitcher.api = 4;
		$target.appendChild($appSwitcher);
	});

	return $target;
};
