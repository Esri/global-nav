/* Tooling
/* ========================================================================== */

import { $assign as $, $dispatch, $replaceAll } from 'esri-global-shared';

/* Apps 
/* ========================================================================== */

const prefix = 'esri-header-apps';

export default () => {
	/* Apps: Content
	/* ====================================================================== */

	const $content = $('div', {
		class: `${prefix}-content`, 
		id: `${prefix}-content`,
		aria: { expanded: false, labelledby: `${prefix}-control` }
	});

	const $appSwitcherButton = $('a', {
			href: "#",
			tabindex: "0",
			title: "App Launcher",
			class: "top-nav-link",
			"aria-label": "App Launcher"
	});

	$appSwitcherButton.innerHTML = '<svg height="24px" width="24px" class="app-switcher-svg" shape-rendering="crispEdges"><rect x="1" y="1" width="4" height="4"/><rect x="10" y="1" width="4" height="4"/><rect x="19" y="1" width="4" height="4"/><rect x="1" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="19" y="10" width="4" height="4"/><rect x="1" y="19" width="4" height="4"/><rect x="10" y="19" width="4" height="4"/><rect x="19" y="19" width="4" height="4"/></svg>'

	/* Apps: Control
	/* ====================================================================== */

	const $controlContainer = $('div', { 
		class: `${prefix}-control`
	});

	const $dropdown = $('div', {
		class: `${prefix}-prevent-dropdown dropdown padding-right-half padding-left-half`
	});

	$controlContainer.append($dropdown);

	const $control = $controlContainer;

	$controlContainer.addEventListener('click', (event) => {
		$dispatch($control, 'header:click:apps', { event });

		// Elements with following class won't trigger/dispatch the dropdown 
		if (event.target.classList.contains(`${prefix}-prevent-dropdown`)) return;

		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'root-toggle',
			control: $control,
			content: $content,
			event
		});
	});

	/* Apps: Target
	/* ====================================================================== */

	const $target = $('div', { class: prefix },
		$control, $content
	);

	/* Apps: Helper Functions for Update
	/* ====================================================================== */

	function createDefaultAppLayout ($topAppContainer, currentApp) {
		let abbreviationSizes = [0, 28, 20, 16, 14, 14, 12];

		let listItem = $("li", {
			alt: "",
			class: `${prefix}-prevent-dropdown block link-off-black appLinkContainer`,
			role: "menuitem"
		});

		let appLink = $("a", {
			href: currentApp.url, // + "#username=" + this._currentUser.username,
			target: "_blank",
			class: "appLink"
		});
		// Check if App has Icon
		if (currentApp.image) {
			let appImageContainer = $("div", {"class": "appIconImage"});
			appImageContainer.append($("img", {"class": "appIconPng", "alt": "", src: currentApp.image}));
			appLink.append(appImageContainer);
		}
		else {
			let abbreviationSize = String(abbreviationSizes[currentApp.abbr.length]) + "px";
			let surfaceDiv = $("div", {"class": "appIconImage"});
			let surfaceSpan = $("span", {
				style: "font-size:" + abbreviationSize,
				class: "avenir appIconSvgText"
			}, currentApp.abbr)
			surfaceDiv.append(surfaceSpan);
			surfaceDiv.append($("img", {"src": currentApp.placeHolderIcon, "alt": ""}));
			appLink.append(surfaceDiv);
		}
		let p = $("p", {style: "margin:0 auto; text-align:center" }, currentApp.label);
		appLink.append(p);
		listItem.append(appLink);
		$topAppContainer.append(listItem);
	}

	/* Apps: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:apps', ({ detail }) => {

		$($control, { aria: { label: detail.label } });

		let numberOfApps = detail.icons.length;
		let dropdownWidth = " dropdown-width-" + String(numberOfApps < 4 ? numberOfApps : 4);

		// App Icons

		const $topAppContainer = $("ul", {
			class: `${prefix}-prevent-dropdown block-group appContainer`,
			role: "menu"
		});

		let maxAppsPerDialog = numberOfApps >= 100 ? 100 : numberOfApps;
		for (let i = 0; i < maxAppsPerDialog; i++) {
			if (detail.icons[i]["webMappingApp"] && detail.icons.appTitle !== this.currentUserApps[i]["title"].toLowerCase()) {
				this._createWebMappingAppLayout($topAppContainer, i);
			} else if (detail.icons[i].label) {
				createDefaultAppLayout($topAppContainer, detail.icons[i]);
			}
		}

		// Container
		const $dropdownWrapper = $('div', {class: `${prefix}-prevent-dropdown`}, $topAppContainer);

		const $dropdownNav = $('nav', {
			class: `${prefix}-prevent-dropdown dropdown-menu dropdown-right app-switcher-dropdown-menu` + dropdownWidth,
			role: "menu"
		}, $dropdownWrapper);

		$replaceAll($dropdown, $appSwitcherButton, $dropdownNav);
	});

	return $target;
};
