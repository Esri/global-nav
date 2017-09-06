/* Tooling
/* ========================================================================== */

import { $assign as $, $dispatch, $replaceAll } from 'esri-global-shared';

import esriSearch from 'esri-global-search';

/* Search
/* ========================================================================== */

const prefix = 'esri-header-apps';
const dropdownClass = "appSwitcherModalContent dropdown js-dropdown padding-right-half padding-left-half";
const dropdownNavClass = "dropdown-menu dropdown-right app-switcher-dropdown-menu";
const imgDir = "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/";

export default () => {
	/* Apps: Control
	/* ====================================================================== */

	const $controlContainer = $('div', { 
    class: `${prefix}-container`
  });

  const $dropdown = $('div', {
    id: "appSwitcher__dropdownWrapper",
    class: `${dropdownClass}`
  });

  $controlContainer.append($dropdown);

  const $control = $controlContainer;

	$control.addEventListener('click', (event) => {
    $dispatch($control, 'header:click:apps', { event });
    (function toggleDropdown() {
      let ddWrapper = $dropdown;
        if (ddWrapper.className === `${dropdownClass}`) {
          ddWrapper.className = (`${dropdownClass}` + " is-active");
        } else {
          ddWrapper.className = `${dropdownClass}`;
        }
    })();
		// $dispatch($control, 'header:menu:toggle', {
		// 	control: $control,
		// 	content: $content,
		// 	state:   'search',
		// 	event
		// });
	});

	/* Apps: Content
	/* ====================================================================== */

	const $content = $('div', {
		class: `${prefix}-content`, id: `${prefix}-content`,
		aria: { expanded: false, labelledby: `${prefix}-control` }
	});

	/* Apps: Target
	/* ====================================================================== */

	const $target = $('div', { class: prefix },
		$control, $content
	);

  /* Apps: Helper Functions for Update
	/* ====================================================================== */

  function createBasicAppLayout (topAppContainer, currentApp) {
    let abbreviationSizes = [0, 28, 20, 16, 14, 14, 12];

    let listItem = $("li", {
      "alt": "",
      "class": "block link-off-black appLinkContainer",
      "role": "menuitem"
    });

    let appLink = $("a", {
      href: currentApp.url, // + "#username=" + this._currentUser.username,
      target: "_blank",
      "class": "appLink"
    });
    // Check if App has Icon
    if (currentApp.image) {
      let imgSrc = `${imgDir}` + currentApp.image;
      let appImageContainer = $("div", {"class": "appIconImage"});
      appImageContainer.append($("img", {"class": "appIconPng", "alt": "", src: imgSrc}));
      appLink.append(appImageContainer);
    }
    else {
      let abbreviationSize = String(abbreviationSizes[currentApp.abbr.length]) + "px";
      let surfaceDiv = $("div", {"class": "appIconImage"});
      let surfaceSpan = $("span", {
        "style": "font-size:" + abbreviationSize,
        "class": "avenir appIconSvgText"
      }, currentApp.abbr)
      surfaceDiv.append(surfaceSpan);
      surfaceDiv.append($("img", {"src": `${imgDir}` + "svg-app-icon.svg", "alt": ""}));
      appLink.append(surfaceDiv);
    }
    let p = $("p", {style: "margin:0 auto; text-align:center" }, currentApp.label);
    appLink.append(p);
    listItem.append(appLink);
    topAppContainer.append(listItem);
  }

	/* Apps: On Update
	/* ====================================================================== */

  $target.addEventListener('header:update:apps', ({ detail }) => {

		$($control, { aria: { label: detail.label } });

    // Container
    const dropdownContent = $("div", { style: "width:100%;" });

    // ::Based on number of apps
    let nOfApps = detail.apps.length;

    let dropdownClass = `${dropdownNavClass}` + " dropdown-width-" + String((nOfApps < 4 ? (nOfApps) : 4));
    $dropdown.innerHTML = '<a href="#" id="appSwitcher__appSwitcherBtn" tabIndex="0" class="js-dropdown-toggle top-nav-link half-opacity" tabindex="-1" aria-haspopup="true" aria-expanded="false" data-modal="appSwitcher" title="App Switcher" aria-label="App Switcher"><svg height="24px" width="24px" class="app-switcher-svg" shape-rendering="crispEdges"><rect x="1" y="1" width="4" height="4"/><rect x="10" y="1" width="4" height="4"/><rect x="19" y="1" width="4" height="4"/><rect x="1" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="19" y="10" width="4" height="4"/><rect x="1" y="19" width="4" height="4"/><rect x="10" y="19" width="4" height="4"/><rect x="19" y="19" width="4" height="4"/></svg></a><nav id="appSwitcher__dropdownAppNav" class="' + dropdownClass + '" role="menu"><div id="appSwitcher__dropdownAppWrapper"></div></nav>';

    // App Icons
    let topAppContainer = $("ul", {
      "class": "block-group appContainer js-prevent-dropdown__app-switcher",
      id: "dropdownAppContainer",
      "role": "menu"
    });
    // Custom event listeners
    //this._assignEventListeners();
    // this._moveIfRightToLeft(topAppContainer); -- need to add future support for right to left

    let maxAppsPerDialog = (nOfApps >= 100) ? 100 : nOfApps;
    for (let i = 0; i < maxAppsPerDialog; i++) {
      if (detail.apps[i]["webMappingApp"] && detail.apps.appTitle !== this.currentUserApps[i]["title"].toLowerCase()) {
        this._createWebMappingAppLayout(topAppContainer, i);
      } else if (detail.apps[i].label) {
        createBasicAppLayout(topAppContainer, detail.apps[i]);
      }
    }
    dropdownContent.append(topAppContainer);
    document.getElementById("appSwitcher__dropdownAppWrapper").append(dropdownContent);
  });

	return $target;
};
