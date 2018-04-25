import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';
import Sortable from 'sortablejs';
import { $remove } from 'domose';

/* Apps
/* ========================================================================== */

const prefix = 'esri-header-apps';
const isRightToLeft = document.dir === "rtl";

export default () => {
	/* Apps: Content
	/* ====================================================================== */

	const $content = $('div', {
		class: `${prefix}-content`,
		id: `${prefix}-content`,
		aria: {expanded: false, labelledby: `${prefix}-control`}
	});

	/* Apps: Control
	/* ====================================================================== */

	const $appSwitcherIcon = $('span', {
		title: "App Launcher",
		"aria-label": "App Launcher Icon"
	});

	const $controlContainer = $('button', {
		class: `${prefix}-control empty-padding`, id: `${prefix}-control`
	}, $appSwitcherIcon);

	// $controlContainer.appendChild($dropdown);

	const $closeAppLauncher = (event) => {
		_removeMouseUpListener();
		_removeMouseOverListener();
		// $dispatch($control, 'header:click:apps', {event});

		// Elements with following class won't trigger/dispatch the dropdown
		// if (event.target.classList.contains(`${prefix}-prevent-dropdown`)) return;
		// Rest bottom container to origional state
		$showMoreButton.classList.remove("hide");
		$secondaryDropdownMenu.setAttribute('aria-expanded', "false");

		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'root-toggle',
			control: $control,
			content: $content,
			event
		});
	}

	const $control = $controlContainer;

	$controlContainer.addEventListener('click', (event) => {
		$closeAppLauncher(event);
	});

	/* Apps: Target
	/* ====================================================================== */

	const $target = $('div', {class: prefix},
		$control
	);

	/* Apps: Strings 
	/* ====================================================================== */

	let i18n = {
		clear: "Clear",
		confirm: "Got it.",
		dragAppsHere: "Drag apps here that you don't use very often.",
		intro: "Drag and drop your favorite apps in any order to customize your app launcher",
		removed: "This app is no longer available.",
		removedMessage: "Removed app" 
	}; 

	/* Apps: Secondary Set of Apps 
	/* ====================================================================== */

  const $showMoreChevron = $('span', {class: `${prefix} down-arrow`});
  const $showMoreButton = $('button', {
    class: `${prefix} show-more-button`
  }, "Show More", $showMoreChevron);

  const $secondaryDropdownMenu = $('div', {
    class: `${prefix} secondary-dropdown-menu`,
    aria: {expanded: false}
  }, $('hr'));

  const $dragAndDropIntroText = $('p', {
    class: `${prefix}-drag-and-drop-intro`,
  }, "Drag and drop your favorite apps in any order to customize your App Launcher");

  const $dismissIntroButton = $('button', {
    class: `${prefix} dismiss-intro-button` 
  }, "Got it!");

  const createDragAndDropIntro = () => {
     
  }

  const $dragAndDropIntro = $('div', {}, $dragAndDropIntroText, $dismissIntroButton);

  const $bottomContainer = $('div', {
    class: `${prefix} bottom-container`
  });

  $dismissIntroButton.addEventListener('click', (event) => {
    $dragAndDropIntro.classList.add("hide");     

    $dispatch($control, 'header:dismiss:apps:intro', {
      intro: false
    });
  });

  $showMoreButton.addEventListener('click', (event) => {
		expandSecondaryDropdown();
	});

	/* Apps: Parameters that Control the State of Drag & Drop
	/* ====================================================================== */

	let ddState = {
		maxDragErrorTollerance: 1
	};

	/* Apps: Key Codes used for Accessibility 
	/* ====================================================================== */

	const keys = {
		DOWN_ARROW: 40,
		UP_ARROW: 38,
		RIGHT_ARROW: 39,
		LEFT_ARROW: 37,
		SPACE: 32 
	};

	/* Apps: Helper Functions for Update
	/* ====================================================================== */

	const createDefaultAppLayout = ($topAppContainer, currentApp) => {
		const abbreviationSizes = ["0px", "32px", "24px", "20px", "18px", "16px", "14px"],
			selectNoneClass = ddState.browserIsEdge ? "user-select-none" : "",
			canAccessClass = !currentApp.canAccess ? "no-hover" : "with-hover";

		const $listItem = $("li", {
			alt: "",
			"class": `block link-off-black appLinkContainer grabbable ${canAccessClass}`,
			mousedown: _interactWithAppLi.bind(this, currentApp),
			keyup: _activateAccessibilityMode.bind(this, currentApp),
			keydown: _preventBrowserKeyboardDefaults,
			"role": "menuitem",
			"data-id": currentApp.itemId
		});

		if (!currentApp.canAccess) {
			createMissingAppIcon(currentApp, $listItem, selectNoneClass);
		} else {
			if (currentApp.isNew) {
				$listItem.appendChild($("div", {"class": "app-indicator app-indicator-new"}));
			}
			const $appLink = $("a", {
				href: currentApp.url, // + "#username=" + this._currentUser.username,
				target: "_blank",
				blur: _deactivateAccessibilityMode.bind(this, currentApp),
				class: "appLink"
			});
			$appLink.addEventListener('click', (event) => {
				$closeAppLauncher(event);
			});
			// Check if App has Icon
			if (currentApp.image) {
				const $appImageContainer = $("div", {"class": `appIconImage ${selectNoneClass}`});
				$appImageContainer.appendChild(_getAccessibleAppArrowContainer());
				$appImageContainer.appendChild($("img", {"class": "appIconPng", "alt": "", src: currentApp.image}));
				$appLink.appendChild($appImageContainer);
			} else {
				const stringWidth = Math.round(getTextWidth(currentApp.abbr || "", "avenir") / 5);
				let abbreviationSize = abbreviationSizes[stringWidth];
				if (stringWidth > 6) { // Prevent user from exceeding icon width
					currentApp.abbr = currentApp.abbr.substr(0, 4);
					abbreviationSize = abbreviationSizes[4];
				}
				const surfaceDiv = $("div", {"class": "appIconImage"});
				surfaceDiv.appendChild(_getAccessibleAppArrowContainer());
				const surfaceSpan = $("span", {
					style: `font-size: ${abbreviationSize}`,
					class: `avenir appIconSvgText ${selectNoneClass}`
				}, currentApp.abbr);
				surfaceDiv.appendChild(surfaceSpan);
				surfaceDiv.appendChild($("img", {"src": currentApp.placeHolderIcon, "alt": "", "class": selectNoneClass}))
				// surfaceDiv.appendChild($renderSvgOrImg({imgDef: currentApp.placeHolderIcon, imgWidth: 48, imgHeight: 48}));
				$appLink.appendChild(surfaceDiv);
			}
			$listItem.appendChild($appLink);
			const p = $("p", {style: "margin:0 auto; text-align:center", class: selectNoneClass}, currentApp.label);
			$appLink.appendChild(p);
		}

		$topAppContainer.appendChild($listItem);
	};

	const createMissingAppIcon = (currentApp, $listItem, selectNoneClass) => {
		const $appLink = $("div", {
			"class": "app-indicator app-indicator-removed",
			"tabindex": 0,
			onclick: _removeAppFromDropdown.bind(this, currentApp.uid, $listItem),
			keyup: _removeAppFromDropdown.bind(this, currentApp.uid, $listItem),
			keydown: _preventBrowserKeyboardDefaults
		});
		$appLink.innerHTML = _getRemoveAppX(); 

		// Displaying Warnings in association with removed apps
		// - Requires access to orgUrlKey and isAdmin like functionality 
		// - To be implemented after discussion
		let $missingIcon = $("div", {
			"class": "missing-app-icon appIconImage",
			"tabindex": 0,
			"blur": _deactivateAccessibilityMode.bind(this, currentApp),
			title: i18n.removed
			// keyup: _showRemovedAppWarning.bind(this, currentApp.uid, $listItem),
			// onclick: _showRemovedAppWarning.bind(this, currentApp.uid, $listItem)
		});
		$missingIcon.appendChild(_getAccessibleAppArrowContainer());
		$listItem.appendChild($appLink);
		$listItem.appendChild($missingIcon);
		$listItem.appendChild($("p", {style: "margin:0 auto; text-align:center", class: selectNoneClass}, currentApp.label));
	};

	const saveAppOrderToUserProperties = (primaryApps, secondaryApps, appRevisions) => {
		$dispatch($control, 'header:apps:reorder', {
			icons: {
				primaryApps: primaryApps,
				secondaryApps: secondaryApps,
				revisions: appRevisions || {}
			}
		});
	};

	const expandSecondaryDropdown = () => {
		$secondaryDropdownMenu.setAttribute('aria-expanded', "true");
		$showMoreButton.classList.add("hide"); 
	};

	const hideOrShowDropAppsHereMessage = (containerAppWasDroppedIn) => {
		if (containerAppWasDroppedIn === ddState.bottomAppContainer && ddState.secondarySortable.toArray().length === 1) {
			ddState.bottomAppContainer.classList.remove("drag-apps-here-box");
			ddState.dragAppsHereText.classList.add("hide");
		} else if (!ddState.secondarySortable.toArray().length) {
			ddState.bottomAppContainer.classList.add("drag-apps-here-box");
			ddState.dragAppsHereText.classList.remove("hide");
		}
	};

	const getTextWidth = (text, font) => { // Adds support for app abbreviations in all languages
			const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
			const context = canvas.getContext("2d");
			context.font = font;
			const metrics = context.measureText(text);
			return metrics.width;
	};

	const _getRemoveAppX  = () => {
		return '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 32 32"><path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z"/></svg>';
	};

  const populateAppIds = (idArray, icons) => {
			// return idArray.map((index) => icons[index]);
	};

	const _interactWithAppLi = (app, e) => {
		if (e.button === 0) {
			ddState.startClientX = e.clientX;
			ddState.startClientY = e.clientY;
			ddState.startApp = app;
			ddState.startElement = e.currentTarget;

			setTimeout( (e) => {
				ddState.startElement.classList.remove("sortable-drag-class");
			}, 1);

			if (app.isNew) {
				const primaryApps = ddState.primarySortable.toArray();
				// -- Bug occurs where duplicate value gets added to array when clicked
				if (ddState.duplicateValueIndex) { primaryApps.splice(ddState.duplicateValueIndex, 1); }

				saveAppOrderToUserProperties(
					primaryApps, 
					ddState.secondarySortable.toArray(), 
					{targetUid: e.currentTarget.getAttribute("data-id"), isNew: true, targetValue: null}
				);
				e.currentTarget.classList.remove("sortable-drag-class");
			} else {
				e.currentTarget.classList.remove("sortable-drag-class");
			}

			if (app.canAccess) {
				ddState.dropdownNav.addEventListener("mouseup", $closeAppLauncher);
				ddState.listenForMouseOverElement = e.currentTarget.parentNode;
				ddState.listenForMouseOverElement.addEventListener("mousemove", _simulateDragEvent);
			} else {
				var removedAppClass = "app-indicator-removed";
				if (e.target.classList.contains(removedAppClass) || 
						e.target.parentNode.classList.contains(removedAppClass) || 
						e.target.parentNode.parentNode.classList.contains(removedAppClass)
					) {
					ddState.removeStartApp = true;
				}
			}
		}
	}

  const _generateCustomLinkClick = (app, el, removeApp) => {
		if (app.canAccess) {
			$closeAppLauncher();
			window.open(app.url, "_blank");
		} else if (removeApp) {
			ddState.removeStartApp = false;
			_removeAppFromDropdown(app.itemId || app.title, el);
		} else {
			_showRemovedAppWarning(app.itemId || app.title, el);
		}
	};

	const _removeAppFromDropdown = (uid, el, e) => {
		if (!e || _verifyKeyPress(e.keyCode)) {
			$remove(el);
			setTimeout( () => {
				saveAppOrderToUserProperties(ddState.primarySortable.toArray(), ddState.secondarySortable.toArray());
			}, 0);
		}
	};

  const _showRemovedAppWarning = (uid, el, e) => {
		if (!ddState.removedAppWithFoucs && (!e || _verifyKeyPress(e.keyCode))) {
			// _displayRemovedAppWarning.classList.remove("hide");
			// _displayGoToSettingsWarning.classList.add("hide");
			// ddState.dropdownNav.scrollTop = 0;
			ddState.removedAppWithFoucs = {"uid": uid, "el": el};
		} else {
			ddState.removedAppWithFoucs = null;
			// _displayRemovedAppWarning.classList.add("hide");
		}
	};
	
	const _disableLinkHref = (e, disable) => {
			let link = (e.item.children[1] && e.item.children[1].nodeName === "A") ? e.item.children[1] : e.item.children[0];
			if (disable) {
				ddState.recentlyRemovedHref = link.href;
				link.removeAttribute("href");
			} else {
				setTimeout( () => {
					link.href = ddState.recentlyRemovedHref;
				}, 1);
			}
	};

	const _removeMouseUpListener = () => {
		if (ddState.dropdownNav && ddState.dropdownNav.removeEventListener) {
			ddState.dropdownNav.removeEventListener('mouseup', $closeAppLauncher, false);
		}
	};

	const _removeMouseOverListener = () => {
		if (ddState.listenForMouseOverElement) {
			ddState.listenForMouseOverElement.removeEventListener('mousemove', _simulateDragEvent, false);
		}
	};

	const _simulateDragEvent = (e) => {
		if (Math.abs(e.clientX - ddState.startClientX) > ddState.maxDragErrorTollerance || Math.abs(e.clientY - ddState.startClientY) > ddState.maxDragErrorTollerance) {
			ddState.simulatedDragEvent = true;
			$content.classList.add("dragging");
			_removeMouseOverListener();
		}
	};

	const _applyDragAndDropAdjustmentsForIE = (ieVersion) => {
		if (ieVersion === "edge") {
			ddState.browserIsEdge = true;
		} else if (ieVersion === "ie11") {
			defaultOptions.ghostClass = "sortable-ghost-class-with-pointer-events";
		}
	};

	const _verifyKeyPress = (keyCode) => {
		return !keyCode || (keyCode === 13);
	};

  /* Apps: Helper functions for Arrow Key Accessibility  
	/* ====================================================================== */

	const _activateAccessibilityMode = (app, e) => {
		if (!e.target.classList.contains("app-indicator-removed")) {
			e.preventDefault();
			if (e.keyCode === keys.SPACE) {
				if (ddState.activeAccessibleListElement) {
					return _deactivateAccessibilityMode(app, e);
				}
				const arrowSpan = app.canAccess ? e.target.firstChild.firstChild : e.target.firstChild,
					li = e.target.parentNode,
					ul = li.parentNode,
					liIndex = _getIndexOfListItem(li),
					numOfPrimaryApps = ddState.primarySortable.toArray().length;

				expandSecondaryDropdown();

				const combinedIndex = _getCombinedIndexOfApp(liIndex, ul, numOfPrimaryApps);
				ddState.activeAccessibleListElement = li;
				ddState.activeAccessibleListElementEvent = _moveAppWithArrowKeys.bind(
					this, app, _getArrayOfDirections(combinedIndex, ul), li, ul, liIndex
				);
				li.addEventListener("keydown", ddState.activeAccessibleListElementEvent);

				_populateAccessibleArrows(arrowSpan, liIndex, ul, numOfPrimaryApps);
			}
		}
		return false;
	};

	const _deactivateAccessibilityMode = (app, e) => {
		var target = e.target || e;
		var arrowSpan = app.canAccess ? target.firstChild.firstChild : target.firstChild;

		arrowSpan.classList.remove("arrow-keys-enabled");
		arrowSpan.classList.add("arrow-keys-disabled");

		if (ddState.activeAccessibleListElement) {
			ddState.activeAccessibleListElement.removeEventListener("keydown", ddState.activeAccessibleListElementEvent, false);
			ddState.activeAccessibleListElement = null;
		}
	};

	const _getArrowKeyDirection = (e) => {
		if (e.keyCode === keys.DOWN_ARROW)  return "bottom";
		if (e.keyCode === keys.UP_ARROW) 		return "top";
		if (e.keyCode === keys.RIGHT_ARROW) return (isRightToLeft ? "left" : "right");
		if (e.keyCode === keys.LEFT_ARROW)  return (isRightToLeft ? "right" : "left");
	};

	const _preventBrowserKeyboardDefaults = (e) => {
		if (e.keyCode === keys.SPACE || e.keyCode === keys.DOWN_ARROW || e.keyCode === keys.UP_ARROW) {
			e.preventDefault();
		}
	};

	const _moveAppWithArrowKeys = (app, directions, li, ul, liIndex, e) => {
		const direction = _getArrowKeyDirection(e);

		if (direction === "bottom" && directions.indexOf("bottom") > -1) {
			_moveAppByNumberOfSpaces(li, liIndex, ul, 3, app, e);
		}
		if (direction === "top" && directions.indexOf("top") > -1) {
			_moveAppByNumberOfSpaces(li, liIndex, ul, -3, app, e);
		}
		if (direction === "right" && directions.indexOf("right") > -1) {
			_moveAppByNumberOfSpaces(li, liIndex, ul, 1, app, e);
		}
		if (direction === "left" && directions.indexOf("left") > -1) {
			_moveAppByNumberOfSpaces(li, liIndex, ul, -1, app, e);
		}
	};

	const _moveAppByNumberOfSpaces = (li, liIndex, ul, spaces, app, e) => {
		var newPosition = liIndex + spaces,
			ulLength = ul === ddState.bottomAppContainer ? ul.children.length - 1 : ul.children.length,
			ulIsPrimaryApps = ul === ddState.topAppContainer;

		if ((ulIsPrimaryApps && newPosition < ulLength) || (!ulIsPrimaryApps && newPosition <= ulLength && newPosition > 0)) {
			var node = spaces < 0 ? ul.children[newPosition] : ul.children[newPosition].nextSibling;
			ul.insertBefore(li, node);
		} else if (ulIsPrimaryApps) {
			_moveAppToSecondaryList(li, liIndex, spaces);
			hideOrShowDropAppsHereMessage(ddState.bottomAppContainer);
		} else {
			_moveAppToPrimaryList(li, liIndex, spaces);
			hideOrShowDropAppsHereMessage(ddState.topAppContainer);
		}

		_deactivateAccessibilityMode(app, e);
		if (app.canAccess && !app.isNew) {
			li.children[0].focus();
		} else {
			li.children[1].focus();
		}

		setTimeout( () => {
			if (app.isNew) {
				saveAppOrderToUserProperties(
					ddState.primarySortable.toArray(), 
					ddState.secondarySortable.toArray(), 
					{targetUid: (app.itemId || app.title), isNew: true, targetValue: null}
				);
			} else {
				saveAppOrderToUserProperties(ddState.primarySortable.toArray(), ddState.secondarySortable.toArray());
			}
		}, 0);
	};

	const _moveAppToPrimaryList = (li, liIndex, spaces) => {
		var list = ddState.topAppContainer,
			appPositionInRow = liIndex % 3 || 3,
			numOfAppsInLastRow = numOfPrimaryApps % 3 || 3,
			numOfPrimaryApps = ddState.topAppContainer.children.length;

		if (Math.abs(spaces) === 1 || numOfAppsInLastRow === 3) return list.appendChild(li);
		if (appPositionInRow === 2 && numOfAppsInLastRow > 1) {
			return list.insertBefore(li, list.children[numOfPrimaryApps - (numOfAppsInLastRow - 1)]);
		}
		if (appPositionInRow === 1 && numOfPrimaryApps) {
			return list.insertBefore(li, list.children[numOfPrimaryApps - numOfAppsInLastRow]);
		}
		list.appendChild(li);
	};

	const _moveAppToSecondaryList = (li, liIndex, spaces) => {
		var list = ddState.bottomAppContainer,
			numOfSecondaryApps = ddState.bottomAppContainer.children.length - 1,
			appPositionInRow = (liIndex + 1) % 3 || 3;

		if (!numOfSecondaryApps) return list.appendChild(li);

		if (Math.abs(spaces) === 1) return list.insertBefore(li, list.children[1]);
		if (appPositionInRow === 2 && numOfSecondaryApps > 1) return list.insertBefore(li, list.children[2]);
		if (appPositionInRow === 3 && numOfSecondaryApps === 2) return list.insertBefore(li, list.children[3]);
		list.insertBefore(li, list.children[1]);
	};

	const _getCombinedIndexOfApp = (ind, ul, numOfPrimaryApps) => {
		return ind + (ul === ddState.bottomAppContainer ? (numOfPrimaryApps + 1): 1);
	};

	const _getIndexOfListItem = (li) => {
		var ul = li.parentNode;
		return Array.prototype.indexOf.call(ul.children, li);
	};

	const _getAccessibleAppArrowContainer = () => {
		return $("span", {"class": "arrow-keys-disabled"});
	};

	const _populateAccessibleArrows = (arrowSpan, liIndex, ul, numOfPrimaryApps) => {
		arrowSpan.classList.add("arrow-keys-enabled");
		arrowSpan.classList.remove("arrow-keys-disabled");

		var combinedIndex = _getCombinedIndexOfApp(liIndex, ul, numOfPrimaryApps);
		arrowSpan.innerHTML = _getAccessibleArrows(_getArrayOfDirections(combinedIndex, ul), ul);
	};

	const _getAccessibleArrows = (arrayOfDirections) => {
		return arrayOfDirections.reduce( (prev, direction) => {
			return prev + _getAccessibleArrow(direction);
		}, "");
	};

	const _getAccessibleArrow = (direction) => {
		return `<div class="app-arrow app-arrow-${direction}"></div>`;
	};

	const _getArrayOfDirections = (n, ul) => {
		var dirs = [],
			numOfPrimaryApps = ddState.topAppContainer.children.length,
			numOfSecondaryApps = ddState.bottomAppContainer.children.length,
			total = numOfPrimaryApps + numOfSecondaryApps;

		if (n - 1 > 0) dirs.push("left");
		if ((n + 1 <= total || !numOfSecondaryApps) && n !== numOfPrimaryApps) dirs.push("right");
		if (n - 3 > 0) dirs.push("top");
		if ((n - numOfPrimaryApps) + 2 < numOfSecondaryApps || ul === ddState.topAppContainer) dirs.push("bottom");
		return dirs;
	};

  /* Apps: Default Sorting Options
	/* ====================================================================== */

  const defaultOptions = {
      group: "Apps",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
      sort: true,  // sorting inside list
      disabled: false, // Disables the sortable if set to true.
      animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
      forceFallback: true,
      delay: 0,
      fallbackTolerance: 0,
      ghostClass: "sortable-ghost-class",
      dragClass: "sortable-drag-class"
  };

	/* Apps: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:apps', ({detail}) => {
		$renderSvgOrImg({imgDef: detail.image.path, imgWidth: detail.image.width, imgHeight: detail.image.height, imgClass: `${prefix}-image`, $targetElm: $appSwitcherIcon});

		if (detail.ieVersion) _applyDragAndDropAdjustmentsForIE(detail.ieVersion);
		if (detail.disableDragAndDrop) ddState.disabled = true;
		if (detail.text) i18n = Object.assign(i18n, detail.text);

		if (detail.primary) {
			$target.appendChild($content);
			$control.className = `${prefix}-control`;

			$($control, {aria: {label: detail.label}});

			const numberOfApps = detail.primary.length;
			const dropdownWidth = ` dropdown-width-${(numberOfApps < 3 ? numberOfApps : 3)}`;
      // Variables to Assist with Moving Apps Between Primary and Secondary Groups
      let primaryAppCount = 6;
      let primaryAppsOverflowed = false;

			// App Icons

			ddState.topAppContainer = $("ul", {
				class: `${prefix} appContainer primary`,
				role: "menu"
			});

			ddState.bottomAppContainer = $("ul", {
				class: `${prefix} appContainer secondary`,
				role: "menu"
			});

			if (!ddState.disabled) {
				ddState.dragAppsHereText = $("p", {"class": "hide"}, i18n.dragAppsHere);
				ddState.bottomAppContainer.appendChild(ddState.dragAppsHereText);

				ddState.primarySortable = Sortable.create(ddState.topAppContainer, Object.assign(defaultOptions, {
					onStart: (e) => {
						// domClass.add(this._dragAppsHereText, "hide");
						_removeMouseUpListener();
						_disableLinkHref(e, true);
					},
					onEnd: (e) => {
						e.preventDefault();
						_removeMouseOverListener();
						_disableLinkHref(e, false);
						$content.classList.remove("dragging");
						ddState.bottomAppContainer.classList.remove("on-drag-over");
						hideOrShowDropAppsHereMessage(e.to);
						return false;
					},
					onMove: (e, oe) => {
						if (e.to === ddState.bottomAppContainer) {
							ddState.bottomAppContainer.classList.add("on-drag-over");
						} else {
							ddState.bottomAppContainer.classList.remove("on-drag-over");
						}
					},
					store: {
						get: (sortable) => {
							return (sortable.options.group.name && sortable.options.group.name.split("!")) || [];
						},
						set: (sortable) => {
							if (!ddState.simulatedDragEvent) {
								_generateCustomLinkClick(ddState.startApp, ddState.startElement, ddState.removeStartApp);
							} else {
								saveAppOrderToUserProperties(sortable.toArray(), ddState.secondarySortable.toArray());
							}
							ddState.startElement.classList.remove("sortable-drag-class");
							ddState.simulatedDragEvent = false;
						}
					}
				}));

				ddState.secondarySortable = Sortable.create(ddState.bottomAppContainer, Object.assign(defaultOptions, {
					onRemove: (evt) => {
						// primaryAppCount += 1;
						// primaryAppsOverflowed = false; 
					},
					store: {
						get: (sortable) => {
							return (sortable.options.group.name && sortable.options.group.name.split('!')) || [];
						},
						set: (sortable) => {
							const topAppIds = [...ddState.topAppContainer.querySelectorAll("li")].map(l => { return l.attributes["data-id"].value; });
							saveAppOrderToUserProperties(topAppIds, sortable.toArray());
						}
					}
				}));
			}

			const maxAppsPerDialog = numberOfApps >= 100 ? 100 : numberOfApps;
      detail.primary.forEach((a, i) => { 
        createDefaultAppLayout(ddState.topAppContainer, a, i);
      });
      detail.secondary.forEach((a, i) => { 
        createDefaultAppLayout(ddState.bottomAppContainer, a, i);
      });

			// Container
      $bottomContainer.append(ddState.bottomAppContainer);
			$secondaryDropdownMenu.append($bottomContainer);

			const $dropdown = $('div', {
				class: 'dropdown'
			});

			const $dropdownWrapper = $('div', {}, ddState.topAppContainer, $showMoreButton, $secondaryDropdownMenu);

			ddState.dropdownNav = $('nav', {
				class: `${prefix} dropdown-menu dropdown-right app-switcher-dropdown-menu ${dropdownWidth}`,
				role: "menu"
			}, $dropdownWrapper);

			$dropdown.appendChild(ddState.dropdownNav);
			$content.appendChild($dropdown);
			$replaceAll($target, $control, $content);
		}
	});

	return $target;
};
