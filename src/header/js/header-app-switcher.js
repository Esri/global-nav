import {
	$assign as $,
	$dispatch
} from "../../shared/js/shared";

export default () => {
	/* Apps: Target
	/* ====================================================================== */

	const prefix = 'esri-header-app-switcher';
	const $target = $("div", {class: prefix});

	$target.addEventListener('header:update:appSwitcher', ({detail}) => {
		if (!detail) {
			return;
		}

		$target.innerHMTL = "";

		const $appSwitcher = $('arcgis-app-switcher');
		$appSwitcher.portal = detail.portal;
		$appSwitcher.user = detail.user;
		$appSwitcher.api = 4;
		$target.appendChild($appSwitcher);
		$appSwitcher.addEventListener('arcgisAppSwitcherToggle', (isExpanded) => {
				$dispatch($target, `header:menu:${isExpanded ? 'open' : 'close'}`, {
					state: 'menu',
					target: $target,
					type: 'root-toggle',
					control: `${prefix}-button`,
					content: `${prefix}-content`
				});
		});

		$target.addEventListener('header:appSwitcher:close', () => {
			$appSwitcher.shouldExpand = false;
		});
	});

	return $target;
};
