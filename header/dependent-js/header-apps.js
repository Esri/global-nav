/* Tooling
/* ========================================================================== */

import { $assign as $, $dispatch, $replaceAll } from 'esri-global-shared';

/* Apps 
/* ========================================================================== */

const prefix = 'esri-header-apps';
const dropdownClass = "appSwitcherModalContent dropdown js-dropdown padding-right-half padding-left-half";
const dropdownNavClass = "dropdown-menu dropdown-right app-switcher-dropdown-menu";
const imgDir = "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/";

export default () => {
	/* Apps: Content
	/* ====================================================================== */

	const $content = $('div', {
		class: `${prefix}-content`, id: `${prefix}-content`,
		aria: { expanded: false, labelledby: `${prefix}-control` }
	});

  const $appSwitcherButton = $('a', {
      href: "#",
      tabindex: "0",
      class: "js-dropdown-toggle top-nav-link half-opacity",
      "aria-haspopup": "true",
      "aria-expanded": "true",
      "data-modal": "appSwitcher", 
      "aria-label": "App Sitcher",
      title: "App Switcher",
  });
  $appSwitcherButton.innerHTML = '<svg height="24px" width="24px" class="app-switcher-svg" shape-rendering="crispEdges"><rect x="1" y="1" width="4" height="4"/><rect x="10" y="1" width="4" height="4"/><rect x="19" y="1" width="4" height="4"/><rect x="1" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="19" y="10" width="4" height="4"/><rect x="1" y="19" width="4" height="4"/><rect x="10" y="19" width="4" height="4"/><rect x="19" y="19" width="4" height="4"/></svg>'

	/* Apps: Control
	/* ====================================================================== */

	const $controlContainer = $('div', { 
    class: `${prefix}-container`
  });

  const $dropdown = $('div', {
    class: `${dropdownClass}`
  });

  $controlContainer.append($dropdown);

  const $control = $controlContainer;

	$appSwitcherButton.addEventListener('click', (event) => {
    $dispatch($control, 'header:click:apps', { event });

    let state = $dropdown.className === `${dropdownClass}` ? 'open' : 'close';
    $dispatch($control, 'header:menu:' + state, {
      control: $control,
      content: $content,
      state:   "menu",
      event
    });
	});

	document.addEventListener('header:menu:close', ({detail}) => {
    if (!detail || (detail.content === $content)) {
      $dropdown.className = `${dropdownClass}`;
    }
  });

	document.addEventListener('header:menu:open', ({detail}) => {
    if (detail.content === $content) {
      $dropdown.className = (`${dropdownClass}` + " is-active");
    }
  });

	/* Apps: Target
	/* ====================================================================== */

	const $target = $('div', { class: prefix },
		$control, $content
	);

  /* Apps: Helper Functions for Update
	/* ====================================================================== */

  function createBasicAppLayout ($topAppContainer, currentApp) {
    let abbreviationSizes = [0, 28, 20, 16, 14, 14, 12];

    let listItem = $("li", {
      alt: "",
      class: "block link-off-black appLinkContainer",
      role: "menuitem"
    });

    let appLink = $("a", {
      href: currentApp.url, // + "#username=" + this._currentUser.username,
      target: "_blank",
      class: "appLink"
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
    $topAppContainer.append(listItem);
  }

	/* Apps: On Update
	/* ====================================================================== */

  $target.addEventListener('header:update:apps', ({ detail }) => {

		$($control, { aria: { label: detail.label } });

    let numberOfApps = detail.icons.length;
    let dropdownWidth = `${dropdownNavClass}` + " dropdown-width-" + String(numberOfApps < 4 ? numberOfApps : 4);

    // App Icons

    const $topAppContainer = $("ul", {
      "class": "block-group appContainer js-prevent-dropdown__app-switcher",
      "role": "menu"
    });

    let maxAppsPerDialog = (numberOfApps >= 100) ? 100 : numberOfApps;
    for (let i = 0; i < maxAppsPerDialog; i++) {
      if (detail.icons[i]["webMappingApp"] && detail.icons.appTitle !== this.currentUserApps[i]["title"].toLowerCase()) {
        this._createWebMappingAppLayout($topAppContainer, i);
      } else if (detail.icons[i].label) {
        createBasicAppLayout($topAppContainer, detail.icons[i]);
      }
    }

    // Container
    const $dropdownContent = $("div", { style: "width:100%;" }, $topAppContainer);

    const $dropdownWrapper = $('div', {}, $dropdownContent);

    const $dropdownNav = $('nav', {
      class: dropdownWidth,
      role: "menu"
    }, $dropdownWrapper);

    $replaceAll($dropdown, $appSwitcherButton, $dropdownNav);
  });

	return $target;
};
