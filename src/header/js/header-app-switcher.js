import {
	$assign as $,
	$dispatch
} from "../../shared/js/shared";

function assignAppSwitcherProps($appSwitcher, detail) {
	const props = ['api', 'portal', 'user', 'showInAppLauncher', 'newMapViewerEnabled', 'notebookServerEnabled', 'trackViewerEnabled'];
	props.forEach((prop) => {
		if (detail.hasOwnProperty(prop)) {
			$appSwitcher[prop] = detail[prop];
		}
	});
}

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
		assignAppSwitcherProps($appSwitcher, detail);
		$target.appendChild($appSwitcher);
		$appSwitcher.addEventListener('arcgisAppSwitcherToggle', ({detail}) => {
			const isExpanded = detail;
			$appSwitcher.shouldExpand = isExpanded;
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
