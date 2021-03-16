
/**
 * Global Nav - A centralized component for Esri's global navigation
 * @version v1.4.2
 * @link https://github.com/Esri/global-nav
 * @copyright 2021 Esri
 * @license
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *
 * This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 * You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *
 * See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.esriGlobalNav = factory());
}(this, (function () { 'use strict';

/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}
	Element.prototype.closest = function (s) {
		var el = this;
		var ancestor = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (ancestor.matches(s)) return ancestor;
			ancestor = ancestor.parentElement;
		} while (ancestor !== null);
		return null;
	};
}

//  Taken from: https://raw.githubusercontent.com/jonathantneal/domose/master/domose.js

/* Speculative DOM Functionality
/* ========================================================================== */

function assignSource(element, source, prefix) {
    for (var key in source) {
        if ('function' === typeof source[key]) {
            // add functions as event listeners
            element.addEventListener(prefix + key, source[key]);
        } else if (Object(source[key]) === source[key]) {
            // assign objects as source
            assignSource(element, source[key], prefix + key + '-');
        } else {
            // otherwise, set attributes
            element.setAttribute(prefix + key, source[key]);
        }
    }
}

/* Assign an element with attributes, events, and children
/* ========================================================================== */

function $assign(id) {
    // $assign(element, { class: 'btn', click: () => { /* listener */ } });
    // $assign('button', { aria: { label: 'title' } }, child);
    // $assign('div', child1, child2, 'a new text node');
    // $assign(document.createElementNS('https://www.w3.org/2000/svg', 'svg'));

    var element = id instanceof Node ? id : document.createElement(id);

    [].slice.call(arguments, 1).forEach(function (source) {
        if (source instanceof Node) {
            // append sources that are nodes
            element.appendChild(source);
        } else if ('string' === typeof source) {
            // append strings as text nodes
            element.innerHTML = source;
        } else {
            assignSource(element, source, '');
        }
    });

    return element;
}

/* Replace all the children of a parent node with new children
/* ========================================================================== */

function $replaceAll(parentNode) {
    // $replaceAll(element);
    // $replaceAll(element, child1, child2);

    while (parentNode.lastChild) {
        parentNode.removeChild(parentNode.lastChild);
    }

    parentNode.appendChild(asFragment(arguments));

    return parentNode;
}

/* Emerging DOM Functionality
/* ========================================================================== */

function asFragment(nodes) {
    var fragment = document.createDocumentFragment();

    [].slice.call(nodes, 1).forEach(function (node) {
        if (node instanceof Node) {
            fragment.appendChild(node);
        } else {
            fragment.appendChild(document.createTextNode(node));
        }
    });

    return fragment;
}

/* Remove a child node from its parent
/* ========================================================================== */

function $remove(childNode) {
    // $remove(element);

    if (childNode.parentNode) {
        childNode.parentNode.removeChild(childNode);
    }

    return childNode;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

















































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* Dispatch an Custom Event with a detail
/* ========================================================================== */

function $dispatch(target, type, detail) {
	// an event
	var event = document.createEvent('CustomEvent');

	event.initCustomEvent(type, true, true, detail);

	target.dispatchEvent(event);
}

function $enableFocusRing(target) {
	// retooled from https://github.com/jonathantneal/js-focus-ring
	var keyboardThrottleTimeoutID = void 0;

	target.addEventListener('blur', function (event) {
		if (event.target instanceof Element) {
			event.target.removeAttribute('js-focus');
			event.target.removeAttribute('js-focus-ring');
		}
	}, true);

	target.addEventListener('focus', function (event) {
		var activeElement = document.activeElement;

		if (activeElement instanceof Element && 'BODY' !== activeElement.tagName) {
			activeElement.setAttribute('js-focus', '');

			if (keyboardThrottleTimeoutID) {
				activeElement.setAttribute('js-focus-ring', '');
			}
		}
	}, true);

	window.addEventListener('keydown', function () {
		keyboardThrottleTimeoutID = clearTimeout(keyboardThrottleTimeoutID) || setTimeout(function () {
			keyboardThrottleTimeoutID = 0;
		}, 100);
	}, true);
}

function $fetch(url, callback) {
	var onError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	var xhr = new XMLHttpRequest();

	xhr.addEventListener('readystatechange', function () {
		if (4 === xhr.readyState) {
			if (200 === xhr.status) {
				callback(xhr.responseText); // eslint-disable-line callback-return
			} else {
				onError();
			}
		}
	});

	xhr.open('GET', url);
	xhr.send();

	return xhr;
}

function $renderSvgOrImg(_ref) {
	var _ref$imgDef = _ref.imgDef,
	    imgDef = _ref$imgDef === undefined ? "" : _ref$imgDef,
	    _ref$imgClass = _ref.imgClass,
	    imgClass = _ref$imgClass === undefined ? "" : _ref$imgClass,
	    _ref$wrapperClass = _ref.wrapperClass,
	    wrapperClass = _ref$wrapperClass === undefined ? "" : _ref$wrapperClass,
	    _ref$inlineImg = _ref.inlineImg,
	    inlineImg = _ref$inlineImg === undefined ? false : _ref$inlineImg,
	    id = _ref.id,
	    alt = _ref.alt,
	    imgWidth = _ref.imgWidth,
	    imgHeight = _ref.imgHeight,
	    viewBox = _ref.viewBox,
	    $targetElm = _ref.$targetElm;

	var $imgWrapper = $assign('span', { class: wrapperClass });

	if (typeof imgDef === 'string') {
		if (imgDef.indexOf('.svg') === imgDef.length - 4 && !inlineImg) {
			$fetch(imgDef, function (svgContents) {
				$imgWrapper.innerHTML = svgContents;
				var $img = $imgWrapper.firstElementChild;
				$assign($img, svgProps());
			}, function () {
				renderImgTag();
			});
		} else {
			renderImgTag();
		}
	} else {
		var $img = $assign(document.createElementNS('http://www.w3.org/2000/svg', 'svg'), svgProps(), $assign.apply(undefined, [document.createDocumentFragment()].concat(toConsumableArray(imgDef.map(function (d) {
			return $assign(document.createElementNS('http://www.w3.org/2000/svg', 'path'), { d: d });
		})))));
		$imgWrapper.appendChild($img);
	}

	if ($targetElm) {
		$targetElm.innerHTML = '';
		$targetElm.appendChild($imgWrapper);
	}

	return $imgWrapper;

	function imgProps(props, mixins) {
		for (var mixin in mixins) {
			if (mixins[mixin] !== undefined && mixins[mixin] !== null) props[mixin] = mixins[mixin];
		}
		return props;
	}

	function svgProps() {
		return imgProps({ class: '' + imgClass, style: 'transform: rotate(360deg);' }, { id: id, alt: alt, viewBox: viewBox, width: imgWidth, height: imgHeight });
	}

	function renderImgTag() {
		$imgWrapper.appendChild($assign('img', imgProps({ style: (imgWidth ? 'width:' + imgWidth + 'px' : '') + '; ' + (imgHeight ? 'height:' + imgHeight + 'px' : '') }, { id: id, alt: alt, src: imgDef, class: imgClass })));
	}
}

var prefix = 'esri-header-account';

var createAccount = (function () {
	var $target = $assign('div', { class: prefix });

	/* Account: Control: Signin
 /* ====================================================================== */

	var $controlSigninText = document.createTextNode('');
	var $controlSignin = $assign('button', { class: prefix + '-control ' + prefix + '-control--signin' }, $controlSigninText);

	// On Click
	$controlSignin.addEventListener('click', function (event) {
		$dispatch($controlSignin, 'header:click:signin', { event: event });
	});

	/* Account: Control
 /* ====================================================================== */

	var $controlImage = $assign('span');

	var $controlNameText = document.createTextNode('');
	var $controlName = $assign('span', { class: prefix + '-name' }, $controlNameText);

	var $controlIdText = document.createTextNode('');
	var $controlId = $assign('span', { class: prefix + '-id' }, $controlIdText);

	var $control = $assign('button', {
		class: prefix + '-control ' + prefix + '-control--signedin', id: prefix + '-control',
		aria: { controls: prefix + '-menu', expanded: false, haspopup: true }
	}, $controlImage, $controlName, $controlId);

	// On Click
	$control.addEventListener('click', function (event) {
		$dispatch($control, 'header:click:account', { event: event });

		$dispatch($control, 'header:menu:toggle', {
			account: true,
			control: $control,
			content: $content,
			state: 'menu',
			target: $target,
			type: 'account-toggle'
		});
	});

	/* Account: Content
 /* ====================================================================== */

	// Toggle
	var $contentToggleText = document.createTextNode('');
	var $contentToggle = $assign('button', { class: prefix + '-content-toggle' }, $contentToggleText);

	$contentToggle.addEventListener('click', function () {
		$dispatch($contentToggle, 'header:menu:close', {
			control: $control,
			content: $content,
			type: 'account-close'
		});
	});

	// Image
	var $contentImage = $assign('span');

	// Info
	var $contentInfoNameText = document.createTextNode('');
	var $contentInfoIdText = document.createTextNode('');
	var $contentInfoGroupText = document.createTextNode('');
	var $contentInfo = $assign('div', { class: prefix + '-content-info' }, $contentImage, $assign('span', { class: prefix + '-content-name' }, $contentInfoNameText), $assign('span', { class: prefix + '-content-id' }, $contentInfoIdText), $assign('span', { class: prefix + '-content-group' }, $contentInfoGroupText));

	// Menu
	var $contentMenu = $assign('ul', {
		class: prefix + '-content-menu',
		aria: { labelledby: prefix + '-control' }
	});

	// Switch Control
	var $contentSigninSwitchText = document.createTextNode('');
	var $contentSigninSwitch = $assign('button', { class: prefix + '-signin-control -switch' }, $contentSigninSwitchText);

	// Switch Control: On Click
	$contentSigninSwitch.addEventListener('click', function (event) {
		$dispatch($contentSigninSwitch, 'header:click:switch', { event: event });
	});

	// Signout Control
	var $contentSigninSignoutText = document.createTextNode('');
	var $contentSigninSignout = $assign('button', { class: prefix + '-signin-control -logout' }, $contentSigninSignoutText);

	// Signout Control: On Click
	$contentSigninSignout.addEventListener('click', function (event) {
		$dispatch($contentSigninSignout, 'header:click:signout', { event: event });
	});

	// Signout Control: On Keydown with a tab, send the focus to the account control
	// Using keydown because that's what tab does with other steps in control
	$contentSigninSignout.addEventListener('keydown', function (event) {
		if (event.key === "Tab") {
			$control.focus();
		}
	});

	// Signin Menu
	var $contentSigninMenu = $assign('ul', {
		class: prefix + '-signin-menu'
	}, $assign('li', { class: prefix + '-signin-item' }, $contentSigninSwitch), $assign('li', { class: prefix + '-signin-item' }, $contentSigninSignout));

	// Content
	var $content = $assign('div', {
		class: prefix + '-menu', id: prefix + '-menu',
		role: 'group', aria: { expanded: false, hidden: true }
	}, $contentToggle, $contentInfo, $contentMenu, $contentSigninMenu);

	/* Account: On Update
 /* ====================================================================== */

	$target.addEventListener('header:update:account', function (_ref) {
		var detail = _ref.detail;

		if (detail) {
			$target.classList.remove('hidden');
		} else {
			$target.classList.add('hidden');
			return;
		}

		$assign($control, { aria: { label: detail.label } });

		// Update the control text
		$contentToggleText.nodeValue = detail.label;
		$controlSigninText.nodeValue = detail.controls.signin;
		$contentSigninSwitchText.nodeValue = detail.controls.switch;
		$contentSigninSignoutText.nodeValue = detail.controls.signout;

		// If there is a user object
		if (detail.user) {
			// Update the account text + image
			$controlNameText.nodeValue = $contentInfoNameText.nodeValue = detail.user.name;
			$controlIdText.nodeValue = $contentInfoIdText.nodeValue = detail.user.id;
			$contentInfoGroupText.nodeValue = detail.user.group;

			$renderSvgOrImg({ imgDef: detail.user.image, alt: "", imgClass: prefix + '-image', $targetElm: $controlImage });
			$renderSvgOrImg({ imgDef: detail.user.image, alt: "", imgClass: prefix + '-content-image', $targetElm: $contentImage });

			// Update the content menu
			$replaceAll.apply(undefined, [$contentMenu].concat(toConsumableArray(detail.menus.map(function (item) {
				return $assign('li', { class: prefix + '-content-item' }, item.newContext ? $assign('a', { class: prefix + '-content-link', href: item.href, target: "_blank", rel: 'noopener' }, item.label) : $assign('a', { class: prefix + '-content-link', href: item.href }, item.label));
			}))));

			// Use the control and content
			$replaceAll($target, $control, $content);
		} else {
			// Otherwise, use the signin control
			$replaceAll($target, $controlSignin);
		}
	});

	return $target;
});

var prefix$1 = 'esri-header-brand';

var createBrand = (function () {
	var $target = $assign('div', { class: prefix$1 });

	// On Click
	$target.addEventListener('click', function (event) {
		$dispatch($target, 'header:click:brand', { event: event });
	});

	/* Brand: On Update
 /* ====================================================================== */
	$target.addEventListener('header:update:brand', function (_ref) {
		var detail = _ref.detail;

		if (detail && !detail.editTitle) {
			$target.classList.remove('hidden');
		} else {
			$target.classList.add('hidden');
			return;
		}
		var $targetLink = $assign('span', { class: prefix$1, id: prefix$1 });
		if (detail.href) {
			$targetLink = $assign('a', { class: prefix$1 + '-link', id: prefix$1, href: detail.href });
		}
		$assign($target, $targetLink);

		if (detail.distributorImage) {
			var $distributorImage = $assign('span', { class: 'distributor-image' });
			$renderSvgOrImg({ imgDef: detail.distributorImage, imgClass: prefix$1 + '-image', alt: '', imgWidth: detail.distributorImageWidth, imgHeight: detail.distributorImageHeight, $targetElm: $distributorImage });
			$assign($targetLink, $distributorImage, $assign('span', { class: 'distributor-image-border' }));
		}
		if (detail.image) {
			var $brandImage = $assign('span', { class: 'brand-image' });
			$assign($targetLink, { aria: { label: detail.label } });
			$renderSvgOrImg({ imgDef: detail.image, imgClass: prefix$1 + '-image', alt: '', imgWidth: detail.width, imgHeight: detail.height, $targetElm: $brandImage });
			$assign($targetLink, $brandImage);
		}
		if (detail.brandText) {
			var textClass = detail.image ? prefix$1 + '-text -has-image' : prefix$1 + '-text';
			var textLinkClass = detail.brandTextLink ? prefix$1 + '-text -has-textLink' : prefix$1 + '-text';
			var $brandText = detail.brandTextLink ? $assign('a', { href: detail.brandTextLink, class: textLinkClass }, detail.brandText) : $assign('span', { class: textClass }, detail.brandText);
			$assign($targetLink, $brandText);
		}
	});

	return $target;
});

/* Standard Set of Icons from Calicte Web - https://esri.github.io/calcite-ui-icons
/* ========================================================================== */
var $bell = {
  md: ["M18 16v-5.087A5.91 5.91 0 0 0 13.59 5.2a2 2 0 1 0-3.18 0A5.91 5.91 0 0 0 6 10.913V16a3 3 0 0 1-3 3v1h18v-1a3 3 0 0 1-3-3zM12 3a1 1 0 1 1-1 1 1.001 1.001 0 0 1 1-1zM5.643 19A3.992 3.992 0 0 0 7 16v-5.087A4.919 4.919 0 0 1 11.913 6h.174A4.919 4.919 0 0 1 17 10.913V16a3.992 3.992 0 0 0 1.357 3zM13 21h1a2 2 0 0 1-4 0h1a1 1 0 0 0 2 0z"]
};

var $close = {
  sm: ["M8.718 8l5.303 5.303-.707.707L8.01 8.707 2.707 14.01 2 13.303 7.303 8 2 2.697l.707-.707L8.01 7.293l5.304-5.303.707.707z"],
  md: ["M13.207 12.5l7.778 7.778-.707.707-7.778-7.778-7.778 7.778-.707-.707 7.778-7.778-7.778-7.778.707-.707 7.778 7.778 7.778-7.778.707.707z"],
  lg: ["M16.707 16l10.607 10.606-.708.707L16 16.707 5.394 27.313l-.708-.707L15.293 16 4.686 5.394l.708-.707L16 15.293 26.606 4.687l.708.707z"]
};

var $check = {
  sm: ["M2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637L5.5 12z"],
  md: ["M4.581 13.276l.637-.636 3.288 3.098 10.073-9.92.637.637L8.506 17.01z"],
  lg: ["M24 4.685l-16.327 17.315-7.673-9.054.761-.648 6.95 8.203 15.561-16.501.728.685z"]
};

var $grid = {
  md: ["M11.5 18.05a1.45 1.45 0 1 0 1.45 1.45 1.45 1.45 0 0 0-1.45-1.45zM12 20h-1v-1h1zM3.5 2.05A1.45 1.45 0 1 0 4.95 3.5 1.45 1.45 0 0 0 3.5 2.05zM4 4H3V3h1zm7.5 6.05a1.45 1.45 0 1 0 1.45 1.45 1.45 1.45 0 0 0-1.45-1.45zM12 12h-1v-1h1zm-8.5-1.95a1.45 1.45 0 1 0 1.45 1.45 1.45 1.45 0 0 0-1.45-1.45zM4 12H3v-1h1zm-.5 6.05a1.45 1.45 0 1 0 1.45 1.45 1.45 1.45 0 0 0-1.45-1.45zM4 20H3v-1h1zM19.5 4.95a1.45 1.45 0 1 0-1.45-1.45 1.45 1.45 0 0 0 1.45 1.45zM19 3h1v1h-1zm.5 7.05a1.45 1.45 0 1 0 1.45 1.45 1.45 1.45 0 0 0-1.45-1.45zM20 12h-1v-1h1zm-8.5-9.95a1.45 1.45 0 1 0 1.45 1.45 1.45 1.45 0 0 0-1.45-1.45zM12 4h-1V3h1zm7.5 14.05a1.45 1.45 0 1 0 1.45 1.45 1.45 1.45 0 0 0-1.45-1.45zM20 20h-1v-1h1z"]
};

var $hamburger = {
  md: ["M21 6H3V5h18zm0 6H3v1h18zm0 7H3v1h18z"]
};

var $pencil = {
  sm: ["M15.721 4.007a.965.965 0 0 0-.03-1.385l-1.413-1.414a.965.965 0 0 0-1.385-.03L2.841 11.23l-1.756 4.097a.371.371 0 0 0 .488.487L5.67 14.06l8.607-8.609zM2.624 14.276l.554-1.294.74.74zm2.338-.924L3.55 11.937l8.007-8.008 1.414 1.415zm8.716-8.716l-1.414-1.414 1.09-1.09a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .434z"]
};

var $search = {
  sm: ["M9.85 9.153a5 5 0 1 0-.69.69l4.631 4.631.69-.69zm-1.02-.326A3.973 3.973 0 0 1 6 10a4.002 4.002 0 1 1 2.83-1.172z"],
  md: ["M21.995 21.288l-6.855-6.855a7.517 7.517 0 1 0-.707.707l6.855 6.855zm-17.092-7.19a6.501 6.501 0 1 1 9.6-.45l-.854.855a6.501 6.501 0 0 1-8.746-.405z"]
};

var $cart = {
  sm: ["M5.35 14.5a.85.85 0 1 1-.85-.85.851.851 0 0 1 .85.85zm7.15-.85a.85.85 0 1 0 .85.85.851.851 0 0 0-.85-.85zM15.109 4l-1.19 5.99-9.213 1.024-.727.643a.197.197 0 0 0-.054.217.195.195 0 0 0 .183.126H13v1H4.108a1.196 1.196 0 0 1-.792-2.092l.65-.574-.916-7.126a.249.249 0 0 0-.244-.217L.177 2.966l.046-.898 2.609.02a1.167 1.167 0 0 1 1.1 1L4.065 4zM13.89 5H4.208l.718 4.982 8.155-.905z"],
  md: ["M19.93 19.07A1.497 1.497 0 0 0 18.5 18H6.416a.5.5 0 0 1-.422-.768l.793-1.25 14.11-1.01L23.141 6H5.345L5.06 4.37a1.51 1.51 0 0 0-1.307-1.23L2.543 3H1.24l-.097.847 2.497.286a.502.502 0 0 1 .435.41l1.9 10.853-.826 1.301A1.497 1.497 0 0 0 6 18.94v.153a1.5 1.5 0 1 0 1 0V19h11.5a.497.497 0 0 1 .356.15 1.502 1.502 0 1 0 1.074-.08zM5.52 7h16.34l-1.757 7.027-13.188.942zM7.1 20.2v.6a.3.3 0 0 1-.3.3h-.6a.3.3 0 0 1-.3-.3v-.6a.3.3 0 0 1 .3-.3h.6a.3.3 0 0 1 .3.3zm13 .6a.3.3 0 0 1-.3.3h-.6a.3.3 0 0 1-.3-.3v-.6a.3.3 0 0 1 .3-.3h.6a.3.3 0 0 1 .3.3z"],
  lg: ["M27.964 25.259a1.591 1.591 0 0 0-.428-.794A1.574 1.574 0 0 0 26.415 24H6.54a.625.625 0 0 1-.476-1.032 142.875 142.875 0 0 0 1.692-1.992l19.161-2.017L29.11 8H6.72l-.14-1.375a2.56 2.56 0 0 0-2.186-2.277L4 4.29h-.001L1.979 4H1v1h.904l2.347.338a1.56 1.56 0 0 1 1.333 1.389l1.398 13.62c-.171.205-.598.71-1.677 1.97A1.626 1.626 0 0 0 6.541 25h19.874a.58.58 0 0 1 .198.04 2.015 2.015 0 1 0 1.351.219zM27.89 9l-1.808 9.041-18.136 1.91L6.823 9zm.21 18.3a.8.8 0 0 1-.8.8h-.6a.8.8 0 0 1-.8-.8v-.6a.8.8 0 0 1 .8-.8h.6a.8.8 0 0 1 .8.8zM6 27a2 2 0 1 0 2-2 2.002 2.002 0 0 0-2 2zm.9-.3a.8.8 0 0 1 .8-.8h.6a.8.8 0 0 1 .8.8v.6a.8.8 0 0 1-.8.8h-.6a.8.8 0 0 1-.8-.8z"]
};

var prefix$2 = 'esri-header-inline-title';
var titleState = {};

var createInlineTitle = (function () {
	/* Title: Control
 /* ====================================================================== */
	var $control = $assign('button', {
		class: prefix$2 + '-control', id: prefix$2 + '-control',
		tabindex: "-1",
		aria: { expanded: false, controls: prefix$2 + '-content' }
	});

	$control.addEventListener('header:menu:open', function (event) {
		$dispatch($control, 'header:inlineTitle:activated', { event: event });
	});

	$control.addEventListener('click', function (event) {
		$dispatch($control, 'header:click:inlineTitle', { event: event });
		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'inlineTitle',
			control: $control,
			content: $content,
			event: event
		});
	});

	/* Title: Deactivates and Closes input
 /* ====================================================================== */

	var deactivateInput = function deactivateInput() {
		$dispatch($control, 'header:inlineTitle:deactivated', { event: event });

		setTimeout(function () {
			$control.focus();
		}, 0);

		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'inlineTitle',
			control: $control,
			content: $content,
			event: event
		});
	};

	/* Title: Save New Title and Emit Submit Event
 /* ====================================================================== */

	var saveNewTitle = function saveNewTitle(e) {
		titleState.newValue = $input.value;

		if (!e.keyCode || e.keyCode === 13) {
			if (titleState.newValue && titleState.newValue !== " " && titleState.newValue !== titleState.text) {
				$dispatch($control, 'header:title:submit', {
					title: titleState.newValue
				});
			}
			deactivateInput();
		}
	};

	/* Title: Input
 /* ====================================================================== */

	var $input = $assign('input', {
		class: prefix$2 + '-input', id: prefix$2 + '-input',
		aria: { labelledby: prefix$2 + '-input' }
	});

	$input.addEventListener("keyup", saveNewTitle);

	/* Title: Close Button
 /* ====================================================================== */

	var $closeBtn = $assign('button', {
		class: prefix$2 + '-action-button ' + prefix$2 + '-dismiss-button',
		aria: { labelledby: prefix$2 + '-action-button' }
	}, $renderSvgOrImg({ imgDef: $close.md, imgClass: prefix$2 + '-dismiss-icon' }));

	$closeBtn.addEventListener('click', deactivateInput);

	/* Title: Submit Button
 /* ====================================================================== */

	var $submitBtn = $assign('button', {
		class: prefix$2 + '-action-button ' + prefix$2 + '-submit-button',
		aria: { labelledby: prefix$2 + '-action-button' }
	}, $renderSvgOrImg({ imgDef: $check.lg, imgClass: prefix$2 + '-submit-icon' }));

	$submitBtn.addEventListener('click', saveNewTitle);

	/* Title: Content
 /* ====================================================================== */

	var $lineBreak = $assign('div', { class: 'esri-header-lineBreak ' + prefix$2 + '-lineBreak' });
	var $lineBreakRight = $assign('div', { class: 'esri-header-lineBreak ' + prefix$2 + '-lineBreak lineBreak-right' });
	var $actionButtons = $assign("span", { class: prefix$2 + '-actionButton-container' }, $closeBtn, $submitBtn);

	var $content = $assign('div', {
		class: prefix$2 + '-content', id: prefix$2 + '-content',
		aria: { expanded: false, labelledby: prefix$2 + '-control' }
	}, $lineBreak, $input, $actionButtons, $lineBreakRight);

	/* Title: Target
 /* ====================================================================== */

	var $target = $assign('span', {
		class: prefix$2,
		id: prefix$2,
		aria: { expanded: false }
	}, $control, $content);

	/* Title: On Active Edit
 /* ====================================================================== */

	$target.addEventListener('header:inlineTitle:activated', function (_ref) {
		$input.value = titleState.text;
		$target.setAttribute('aria-expanded', "true");
		setTimeout(function () {
			$input.selectionStart = titleState.text.length;
			$input.focus();
		}, 100);
	});

	/* Title: On Deactive Edit
 /* ====================================================================== */

	$target.addEventListener('header:inlineTitle:deactivated', function (_ref2) {
		$target.setAttribute('aria-expanded', "false");
		$input.value = '';
	});

	/* Title: Reset Title State
 /* ====================================================================== */
	var resetState = function resetState() {
		if (titleState.brandText && titleState.pencilIcon) {
			titleState.brandText.parentNode.removeChild(titleState.brandText);
			titleState.pencilIcon.parentNode.removeChild(titleState.pencilIcon);
		} else {
			$control.setAttribute("tabindex", "0");
		}
	};

	/* Title: On Update
 /* ====================================================================== */
	$target.addEventListener('header:update:inlineTitle', function (_ref3) {
		var detail = _ref3.detail;

		if (!detail || detail.root && !detail.editTitle) {
			$target.classList.add('hidden');
			return;
		} else {
			$target.classList.remove('hidden');
		}

		if (detail.brandText) {
			resetState();

			var maxTitleWidth = detail.maxViewWidth || 30;
			titleState.text = detail.brandText;
			titleState.pencilIcon = $renderSvgOrImg({ imgDef: $pencil.sm, imgClass: prefix$2 + '-edit-icon' });
			titleState.brandText = $assign('span', { class: prefix$2 + '-text', style: 'max-width: ' + maxTitleWidth + 'vw;' }, detail.brandText);
			if (detail.titleFontSize) titleState.brandText.style.fontSize = detail.titleFontSize + 'px';

			$assign($control, titleState.brandText, titleState.pencilIcon);

			// brand cannot exist with an editable title, so empty the brand component
			// this allows editable header to be activated after initial load (#253)
			var $brand = document.getElementById('esri-header-brand');
			if ($brand) {
				if ($brand.classList.contains('-fit-burger')) {
					$target.classList.add('-fit-burger');
				}
				$brand.parentElement.removeChild($brand);
			}
		}
	});

	return $target;
});

var prefix$3 = 'esri-header-branding-stripe';

var createBrandStripe = (function () {
	var $target = $assign('div', { class: prefix$3, id: prefix$3 });

	/* Brand: On Update
 /* ====================================================================== */
	$target.addEventListener('header:update:brand', function (_ref) {
		var detail = _ref.detail;

		if (detail) {
			$target.classList.remove('hidden');
		} else {
			$target.classList.add('hidden');
			return;
		}
		$target.style.backgroundColor = detail.topStripe;
		$target.classList.add('-visible');
	});

	return $target;
});

var prefix$4 = 'esri-header-menus';

var createMenus = (function (_ref) {
	var _ref$variant = _ref.variant,
	    variant = _ref$variant === undefined ? 'desktop' : _ref$variant;

	var $target = $assign('div', { class: prefix$4, id: prefix$4 + '-' + variant });
	$target.classList.add('-' + variant);
	var isMobile = variant === 'mobile';

	if (isMobile) {
		var $toggle = $assign('button', {
			class: prefix$4 + '-toggle', id: prefix$4 + '-' + variant + '-toggle',
			aria: { controls: prefix$4 + '-content-' + variant, expanded: false, haspopup: true, labelledby: 'esri-header-brand' }
		});
		$renderSvgOrImg({ imgDef: $hamburger.md, imgClass: prefix$4 + '-image', id: prefix$4 + '-image', $targetElm: $toggle });

		$toggle.addEventListener('click', function (event) {
			$dispatch($toggle, 'header:menu:toggle', {
				control: $toggle,
				content: $content,
				root: true,
				state: 'menu',
				target: $target,
				type: 'root-toggle',
				event: event
			});
		});

		$assign($target, $toggle);
	}

	/* Menus: Content
 /* ====================================================================== */
	var aria = isMobile ? { hidden: true, expanded: false } : {};
	var $content = $assign('div', {
		class: prefix$4 + '-content',
		id: prefix$4 + '-content-' + variant,
		aria: aria
	});

	$assign($target, $content);

	/* Menus: Link
 /* ====================================================================== */

	var createNavLink = function createNavLink(link) {
		var $link = void 0;
		var target = setUrlTarget(link.props.href);
		var rel = target === "_blank" ? 'noopener' : null;
		if (link.props.href) {
			$link = $assign('a', {
				class: prefix$4 + '-' + link.class,
				href: link.props.href,
				target: target,
				rel: rel
			}, link.icon || "", link.label);
		} else {
			$link = $assign('button', { class: prefix$4 + '-' + link.class }, link.icon || "", link.label);
		}

		if (link.id) {
			$link.setAttribute("id", prefix$4 + '-' + link.id);
		}

		if (link.props.data) {
			for (var key in link.props.data) {
				$link.setAttribute('data-' + key, link.props.data[key]);
			}
		}

		if (link.props.newContext) {
			$assign($link, {
				target: '_blank',
				rel: 'noopener'
			});
		}

		return $link;
	};

	/* Menus: Column
 /* ====================================================================== */

	var createColumn = function createColumn(childitem) {
		var headingClass = childitem.heading ? prefix$4 + '-subitem--heading' : "";

		return $assign('li', { class: prefix$4 + '-subitem ' + headingClass }, childitem.heading ? $assign('p', { class: prefix$4 + '-heading--label' }, childitem.heading) : '', createNavLink({ class: "sublink", props: childitem, label: childitem.label }));
	};

	var createMenuColumns = function createMenuColumns(items) {
		if (!items.length) return null;
		return $assign.apply(undefined, ['div', { class: prefix$4 + '-sublist--col' }].concat(toConsumableArray(items.map(createColumn))));
	};

	/* Menus: Tile
 /* ====================================================================== */

	var createTile = function createTile(tile) {
		var icon = $renderSvgOrImg({ imgDef: tile.icon, imgClass: prefix$4 + '-sublink-image', imgWidth: tile.width, imgHeight: tile.height });
		return $assign('li', { class: prefix$4 + '-subitem--featured' }, createNavLink({
			class: "sublink--featured",
			props: tile,
			icon: icon,
			label: $assign('span', { class: prefix$4 + '-sublink-text' }, tile.label)
		}));
	};

	var createMenuTiles = function createMenuTiles(tiles, uuid, suuid) {
		if (!tiles.length) return null;
		return $assign.apply(undefined, ['ul', {
			class: prefix$4 + '-sublist--featured',
			aria: { labelledby: prefix$4 + '-link-' + variant + '-' + uuid + '-' + suuid },
			data: { filled: '' + tiles.slice(0, 4).length }
		}].concat(toConsumableArray(tiles.slice(0, 4).map(createTile))));
	};

	/* Menus: On Update
 /* ====================================================================== */

	$target.addEventListener('header:update:menus', function (_ref2) {
		var detail = _ref2.detail;

		if (detail) {
			$target.classList.remove('hidden');
		} else {
			$target.classList.add('hidden');
			return;
		}
		if (detail.noBrand) {
			$target.classList.add("-no-brand");
		}
		$replaceAll.apply(undefined, [$content].concat(toConsumableArray(detail.map(function (menu, uuid) {
			return $assign('div', {
				class: prefix$4 + '-menu'
			}, $assign.apply(undefined, ['ul', {
				class: prefix$4 + '-list',
				aria: { labelledby: 'esri-header-brand' }
			}].concat(toConsumableArray(menu.map(function (item, suuid) {
				/* Global Navigation: Menus: Link
    /* ====================================================== */
				var $linkIcon = item.icon ? $renderSvgOrImg({ imgDef: item.icon.path, imgClass: prefix$4 + '-link-icon', imgWidth: item.icon.width || '16px', imgHeight: item.icon.height || '16px' }) : null;

				var $subcontrol = createNavLink({
					class: 'link ' + (item.hideLabelInDesktop ? '-hide-label' : '') + ' ' + (item.active ? '-is-active' : ''),
					id: 'link-' + variant + '-' + uuid + '-' + suuid,
					props: item,
					icon: $linkIcon,
					label: $assign('span', { class: prefix$4 + '-link-label' }, item.label)
				});

				var $li = $assign('li', { class: prefix$4 + '-item' }, $subcontrol);

				var hasMenuItems = item.menus && item.menus.length > 0;
				var hasCols = item.cols && item.cols.length;

				var hasFlyout = item.flyout && item.flyout.length > 0;
				var hasFeaturedItems = item.tiles && item.tiles.length > 0;

				if (hasMenuItems || hasCols || hasFeaturedItems || hasFlyout) {
					/* Global Navigation: Submenu
     /* ====================================== */
					var $subtoggle = $assign('button', { class: prefix$4 + '-submenu-toggle' }, item.label);

					var hasStructured = hasCols && item.cols.filter(function (col) {
						return col.type === 'structured';
					}).length > 0;
					var hasMultiCols = false;
					var columns = 0;

					if (hasMenuItems) {
						var total = item.menus.length;
						if (total >= 10) {
							hasMultiCols = total % 3 === 0;
							columns = Math.min(Math.ceil(total / 9), 3);
						}
					}

					var $subcontent = $assign('div', {
						class: prefix$4 + '-submenu',
						id: prefix$4 + '-' + variant + '-submenu-' + uuid + '-' + suuid,
						'data-has-structured': hasFlyout ? 'false' : hasStructured,
						'data-has-flyout': hasFlyout ? 'true' : 'false',
						aria: { hidden: true, expanded: false },
						data: {
							filled: hasMenuItems && Math.min(item.menus.length, 30) || '',
							structuredCols: hasCols || '',
							hasMultiCols: hasMultiCols,
							columns: columns
						}
					}, $subtoggle);

					if (hasFlyout) {
						renderFlyout({ $subcontent: $subcontent, item: item, uuid: uuid, suuid: suuid });
					} else if (hasCols) {
						renderMulti({ $subcontent: $subcontent, item: item, uuid: uuid, suuid: suuid });
					} else if (hasMenuItems) {
						renderSingle({ hasMenuItems: hasMenuItems, $subcontent: $subcontent, item: item, uuid: uuid, suuid: suuid });
					}

					if (!hasFlyout && hasFeaturedItems) {
						$assign($subcontent,
						/* Global Navigation: Menus: Sublink
      /* ============================== */
						createMenuTiles(item.tiles, uuid, suuid));
					}

					$assign($li, $subcontent);

					$subcontrol.addEventListener('click', function (e) {
						$dispatch($subcontrol, 'header:menu:toggle', {
							control: $subcontrol,
							content: $subcontent,
							submenu: true,
							state: 'menu',
							type: 'menu-toggle'
						});
						resetFlyoutDimensions('init');
						resetFlyoutState();
					});

					$subtoggle.addEventListener('click', function () {
						$dispatch($subtoggle, 'header:menu:close', {
							control: $subcontrol,
							submenu: true,
							content: $subcontent,
							type: 'menu-close'
						});
						resetFlyoutMenu();
					});
				}

				return $li;
			})))));
		}))));
	});

	function resetFlyoutDimensions(parent) {
		var subMenus = [].slice.call(document.querySelectorAll('.esri-header-menus-submenu'));
		var parentState = parent !== 'disabled' && parent !== 'init' && parent.getAttribute('data-parent');
		var parentElement = document.querySelector('#' + parentState);

		if (parent === 'init') {
			var listItems = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout'));

			if (listItems.length) {
				listItems.forEach(function (fly) {
					var catItem = [].slice.call(fly.querySelectorAll('.esri-header-menus-flyout--categories-item'));
					var catItemParent = document.querySelector('#' + catItem[0].getAttribute('data-parent'));

					var listItems = [].slice.call(fly.querySelectorAll('.esri-header-menus-flyout--list-items'));
					var listColType = listItems[0].getAttribute('data-coltype');

					if (listColType === '1') {
						catItemParent.setAttribute('data-single', '');
					}
				});
			}
		} else if (parent === 'disabled') {
			subMenus.forEach(function (menu) {
				menu.removeAttribute('data-single');
			});
		} else {
			parentElement.setAttribute('data-single', '');
		}
	}

	function resetFlyoutState() {
		var flyoutCategories = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-item'));
		var flyoutList = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--list-items'));

		if (flyoutList.length) {
			flyoutList.forEach(function (list, index) {
				flyoutCategories[index].setAttribute('aria-current', 'false');
				list.setAttribute('aria-current', 'false');
				if (list.hasAttribute('data-id') && list.getAttribute('data-id') === '0' && flyoutCategories[index].hasAttribute('data-id') && flyoutCategories[index].getAttribute('data-id') === '0') {
					flyoutCategories[index].setAttribute('aria-current', 'true');
					list.setAttribute('aria-current', 'true');
				}
			});
		}
	}

	function resetFlyoutMenu() {
		var flyoutMenuHeaders = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-item_header'));
		var flyoutMenuDetails = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-details'));

		flyoutMenuHeaders.forEach(function (header) {
			header.setAttribute("aria-current", "false");
		});

		flyoutMenuDetails.forEach(function (detail) {
			detail.setAttribute("aria-expanded", "false");
			detail.style.height = '0';
		});
	}

	function renderSingle(_ref3) {
		var hasMenuItems = _ref3.hasMenuItems,
		    $subcontent = _ref3.$subcontent,
		    item = _ref3.item,
		    uuid = _ref3.uuid,
		    suuid = _ref3.suuid;

		var columns = '';

		if (item.menus.length >= 10 && item.menus.length <= 18) {
			var multi = Math.ceil(item.menus.length / 2);
			columns = $assign('div', { class: prefix$4 + '-sublist--col-wrapper ' + prefix$4 + '-columns-2' }, createMenuColumns(item.menus.slice(0, multi)), createMenuColumns(item.menus.slice(multi, item.menus.length)));
		} else if (item.menus.length > 18 && item.menus.length <= 27) {
			var _multi = Math.ceil(item.menus.length / 3);
			columns = $assign('div', { class: prefix$4 + '-sublist--col-wrapper ' + prefix$4 + '-columns-3' }, createMenuColumns(item.menus.slice(0, _multi)), createMenuColumns(item.menus.slice(_multi, _multi * 2)), createMenuColumns(item.menus.slice(_multi * 2, item.menus.length)));
		} else {
			if (hasMenuItems) {
				columns = $assign('div', { class: prefix$4 + '-sublist--col-wrapper' }, createMenuColumns(item.menus.slice(0, item.menus.length)));
			}
		}

		$assign($subcontent, $assign('ul', {
			class: prefix$4 + '-sublist',
			aria: { labelledby: prefix$4 + '-link-' + variant + '-' + uuid + '-' + suuid }
		},
		/* Global Navigation: Menus: Sublink
  /* ============================== */
		$assign(columns)));
	}

	function renderMulti(_ref4) {
		var $subcontent = _ref4.$subcontent,
		    item = _ref4.item,
		    uuid = _ref4.uuid,
		    suuid = _ref4.suuid;

		var $cols = $assign('div', { class: prefix$4 + '-sublist--col-wrapper' });

		if (item.cols) {
			item.cols.forEach(function (col) {
				var menuType = 'standard';
				var menuRenderer = renderer;
				var menuBorder = col.border || 'false';

				switch (col.type) {
					case 'structured':
						menuType = 'structured';
						menuRenderer = renderStructuredMenu;
						break;
				}

				$assign($cols, $assign('div', { class: prefix$4 + '-sublist--col', 'data-coltype': menuType, 'data-menuborder': menuBorder }, $assign.apply(undefined, ['ul', {
					class: prefix$4 + '-sublist', 'data-menutype': menuType,
					aria: { labelledby: prefix$4 + '-link-' + variant + '-' + uuid + '-' + suuid }
				}].concat(toConsumableArray(menuRenderer(col.items))))));
			});

			$assign($subcontent, $assign('div', { class: prefix$4 + '-sublist' }, $cols));
		}
	}

	function swapFlyoutContent(category) {
		var categoryList = category.target.parentNode.querySelector('.esri-header-menus-flyout--categories-details[aria-expanded]');
		var categoryHeader = category.target.parentNode.querySelector('.esri-header-menus-flyout--categories-item_header');
		var active = categoryList.getAttribute('aria-expanded') === 'false' ? 'true' : 'false';
		var categoryDetailsItems = [].slice.call(category.target.parentNode.querySelectorAll('.esri-header-menus-flyout--categories-details_item'));
		var catsComputedStyle = window.getComputedStyle(categoryDetailsItems[0]);
		var computedHeight = parseInt(catsComputedStyle.height) * categoryDetailsItems.length;
		var computedMargin = parseInt(catsComputedStyle.marginTop) * categoryDetailsItems.length + parseInt(catsComputedStyle.marginTop);
		var headers = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-item_header'));
		var items = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-item'));
		var itemsList = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--list-items'));
		var isMobile = window.innerWidth < 1024;

		if (isMobile) {
			var categoryListArr = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-details[aria-expanded]'));
			categoryListArr.forEach(function (list) {
				list.setAttribute('aria-expanded', 'false');
				list.style.height = '0';
			});

			categoryList.setAttribute('aria-expanded', '' + active);
			if (active === 'true') {
				categoryList.style.height = computedHeight + computedMargin + 'px';
				headers.forEach(function (head) {
					head.setAttribute('aria-current', 'false');
				});
				categoryHeader.setAttribute('aria-current', 'true');
			} else {
				categoryList.style.height = '0';
				categoryHeader.setAttribute('aria-current', 'false');
			}
		} else {
			items.forEach(function (item, index) {
				item.addEventListener('click', function (e) {
					var parentNode = e.target.parentNode;
					var selectedCategory = parentNode.getAttribute('data-id');
					var selectedList = itemsList[index].getAttribute('data-id');
					var selectedListCols = itemsList[index].getAttribute('data-coltype');

					itemsList.forEach(function (list, index) {
						list.setAttribute('aria-current', 'false');
						items[index].setAttribute('aria-current', 'false');
					});

					if (selectedCategory === selectedList) {
						selectedListCols === '1' ? resetFlyoutDimensions(parentNode) : resetFlyoutDimensions('disabled');
						parentNode.setAttribute('aria-current', 'true');
						itemsList[index].setAttribute('aria-current', 'true');
						itemsList[index].focus();
					}
				});
			});
		}
	}

	function renderFlyoutMenu(items, type, id, uuid, suuid) {
		var $items = [];
		var listArr = [];
		var category = "";

		switch (type) {
			case 'category':
				if (items.cols.length) {
					items.cols.forEach(function (column) {
						category = $assign('li', {
							class: prefix$4 + '-flyout--categories-item',
							'data-id': id,
							'aria-current': id === 0 ? 'true' : 'false',
							'data-parent': prefix$4 + '-' + variant + '-submenu-' + uuid + '-' + suuid,
							tabindex: -1
						}, $assign('button', {
							class: prefix$4 + '-flyout--categories-item_header',
							tabindex: 0,
							click: function click(e) {
								swapFlyoutContent(e);
							}
						}, items.category));
						column.col.forEach(function (col) {
							var target = setUrlTarget(col.href);
							var rel = target === '_blank' ? 'noopener' : null;
							listArr.push($assign('a', {
								href: col.href,
								class: prefix$4 + '-flyout--categories-details_item',
								'data-heading': col.heading ? 'true' : 'false',
								tabindex: -1,
								target: target,
								rel: rel
							}, col.heading && $assign('p', { class: prefix$4 + '-flyout--categories-details_heading' }, col.heading), col.label && $assign('p', { class: prefix$4 + '-flyout--categories-details_label' }, col.label)));
						});
					});
				}

				$items.push($assign(category, $assign.apply(undefined, ['div', {
					class: prefix$4 + '-flyout--categories-details',
					'aria-expanded': 'false',
					tabindex: -1
				}].concat(listArr))));
				break;

			case 'label':
				if (items.cols && items.cols.length) {
					items.cols.forEach(function (column) {
						var $column = $assign('ul', { class: prefix$4 + '-flyout--list-items_column' });
						column.col.forEach(function (col) {
							var target = setUrlTarget(col.href);
							var rel = target === '_blank' ? 'noopener' : null;
							$items.push($assign($column, $assign('li', { class: prefix$4 + '-flyout--list-items_name' }, $assign('a', {
								href: col.href,
								class: prefix$4 + '-flyout--list-items_anchor',
								'data-heading': col.heading ? 'true' : 'false',
								target: target,
								rel: rel
							}, col.heading && $assign('p', { class: prefix$4 + '-flyout--list-items_heading' }, col.heading), col.label && $assign('p', { class: prefix$4 + '-flyout--list-items_label' }, col.label)))));
						});
					});
				}
				break;
		}

		return $items;
	}

	function renderFlyout(_ref5) {
		var $subcontent = _ref5.$subcontent,
		    item = _ref5.item,
		    uuid = _ref5.uuid,
		    suuid = _ref5.suuid;

		var $flyoutCategories = $assign('ul', { class: prefix$4 + '-flyout--categories' });
		var $flyoutList = $assign('div', { class: prefix$4 + '-flyout--list' });

		item.flyout.forEach(function (item, id) {
			$assign.apply(undefined, [$flyoutCategories].concat(toConsumableArray(renderFlyoutMenu(item, 'category', id, uuid, suuid))));

			$assign($flyoutList, $assign.apply(undefined, ['div', {
				class: prefix$4 + '-flyout--list-items',
				'data-id': id, 'data-coltype': item.cols.length,
				'aria-current': id === 0 ? 'true' : 'false',
				tabindex: 0
			}].concat(toConsumableArray(renderFlyoutMenu(item, 'label', id, uuid, suuid)))));
		});

		$assign($subcontent, $assign('div', { class: prefix$4 + '-flyout' }, $assign('div', { class: prefix$4 + '-flyout--categories-wrapper' }, $flyoutCategories), $flyoutList));
	}

	function renderer(entries) {
		var $items = [];

		entries.map(function (entry) {
			if (entry.heading) {
				$items.push($assign('li', { class: prefix$4 + '-entry--heading' }, $assign('p', { class: prefix$4 + '-entry--heading-label' }, entry.heading)));
			}

			if (entry.href && entry.label) {
				var target = setUrlTarget(entry.href);
				var rel = target === '_blank' ? 'noopener' : null;

				$items.push($assign('li', { class: prefix$4 + '-entry--menus-subitem' }, $assign('a', {
					href: entry.href,
					class: prefix$4 + '-entry-sublink',
					target: target,
					rel: rel
				}, entry.label)));
			}
		});

		return $items;
	}

	function setUrlTarget(href) {
		if (href) {
			var regX = /^\//;
			var isRelative = href.search(regX) === 0;
			var isExternal = href.indexOf(window.location.hostname) < 0;
			var target = "";
			if (isRelative || !isExternal) {
				target = "_top";
			} else if (isRelative || isExternal) {
				target = "_blank";
			}
			return target;
		}
	}

	function renderStructuredMenu(entries) {
		var $items = [];

		entries.forEach(function (entry) {
			if (entry.heading) {
				$items.push($assign('li', { class: prefix$4 + '-entry--heading' }, $assign('p', { class: prefix$4 + '-entry--heading-label' }, entry.heading)));
			}

			if (entry.href && entry.label) {
				var target = setUrlTarget(entry.href);
				var rel = target === '_blank' ? 'noopener' : null;
				$items.push($assign('li', { class: prefix$4 + '-entry--menus-subitem' }, $assign('a', {
					href: entry.href,
					class: prefix$4 + '-entry-sublink',
					target: target,
					rel: rel
				}, $assign('p', { class: prefix$4 + '-entry-sublink--title' }, entry.label), entry.description ? $assign('p', { class: prefix$4 + '-sublink--description' }, entry.description) : null)));
			}
		});

		return $items;
	}

	$target.addEventListener('header:update:collapseMenus', function (_ref6) {
		var detail = _ref6.detail;

		if (detail && detail.indexOf(true) > -1) {
			var $brand = document.getElementById('esri-header-brand') || document.getElementById('esri-header-inline-title');
			document.querySelector('.esri-header-menus-toggle').classList.add('-visible');
			$brand.classList.add('-fit-burger');
			document.getElementById('esri-header-menus-mobile').classList.add('-always-hamburger');

			var menus = [].slice.call($target.querySelectorAll('.esri-header-menus-menu'));
			detail.forEach(function (collapse, i) {
				if (collapse) {
					menus[i].classList.add('-collapsed');
				}
			});
		}
	});

	return $target;
});

/* Search
/* ========================================================================== */

var esriSearch = (function (data) {
	/* Elements
 /* ====================================================================== */

	var $label = $assign('label', {
		class: data.prefix + '-label',
		for: data.prefix + '-query-control'
	}, data.queryLabel);

	var $control = $assign('input', {
		class: data.prefix + '-control', id: data.prefix + '-query-control',
		type: 'search', name: 'q',
		autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false'
	});

	var $measureTextNode = document.createTextNode('');

	var $measureText = $assign('div', {
		class: data.prefix + '-measure-text',
		aria: { hidden: true }
	}, $measureTextNode);

	var $measure = $assign('div', { class: data.prefix + '-measure' }, $measureText);

	var $submit = $assign('button', {
		class: data.prefix + '-submit', type: 'submit',
		aria: { label: data.submitLabel }
	});

	var $search = $assign('form', {
		class: data.prefix + '-form', action: data.action,
		role: 'search', aria: { label: data.label }
	}, $label, $control, $measure, $submit);

	/* Focus Event
 /* ====================================================================== */

	$search.addEventListener(data.prefix + ':focus', function () {
		$control.focus();
	});

	/* On Input
 /* ====================================================================== */

	var controlIsFilled = false;
	var controlValue = '';

	function oninput(event) {
		/* Conditionally Reset Control Value
  /* ================================================================== */

		if (event && 'reset' === event.type) {
			$control.value = '';
		}

		/* Update New Control Value
  /* ================================================================== */

		var newControlValue = $control.value;

		if (newControlValue !== controlValue) {
			controlValue = newControlValue;

			$dispatch($search, data.prefix + ':input', {
				value: controlValue,
				event: event
			});
		}

		/* Update Label and Submit UI
  /* ================================================================== */

		if (controlIsFilled && !newControlValue) {
			controlIsFilled = false;

			$label.removeAttribute('data-filled');
			$submit.removeAttribute('data-filled');
		} else if (!controlIsFilled && newControlValue) {
			controlIsFilled = true;

			$assign($label, { data: { filled: '' } });
			$assign($submit, { data: { filled: '' } });
		}

		/* Update Measure UI
  /* ================================================================== */

		$measureTextNode.nodeValue = newControlValue;

		var currentWidth = $measureText.scrollWidth + 'px';

		$measure.style.width = currentWidth;
	}

	/* On Submit
 /* ====================================================================== */

	function onsubmit(event) {
		$dispatch($search, data.prefix + ':submit', {
			value: $control.value,
			event: event
		});
	}

	/* On DOMNodeInserted
 /* ====================================================================== */

	$search.addEventListener('DOMNodeInserted', function onDOMNodeInserted() {
		// If Search now has a parent node
		if ($search.parentNode) {
			// Unbind the DOMNodeInserted method
			$search.removeEventListener('DOMNodeInserted', onDOMNodeInserted);

			// Update Search
			$dispatch($search, data.prefix + ':update', data);
		}
	});

	/* On Update
 /* ====================================================================== */

	$search.addEventListener(data.prefix + ':update', function () {
		/* Bind Media Event
  /* ====================================================================== */

		var media = $search.ownerDocument.defaultView.matchMedia(data.matchMedia || '(max-width: 720px)');

		media.addListener(oninput);

		/* Bind Other Events
  /* ================================================================== */

		$control.addEventListener('input', oninput);

		$search.addEventListener('reset', oninput);
		$search.addEventListener('submit', onsubmit);
		$search.addEventListener(data.prefix + ':unload', onunload);
	});

	return $search;
});

var prefix$5 = 'esri-header-search';

var createSearch = (function () {
	/* Search: Control
 /* ====================================================================== */

	var $control = $assign('button', {
		class: prefix$5 + '-control', id: prefix$5 + '-control',
		aria: { expanded: false, controls: prefix$5 + '-content' }
	});

	$control.addEventListener('click', function (event) {
		$dispatch($control, 'header:click:search', { event: event });

		$dispatch($control, 'header:menu:toggle', {
			control: $control,
			content: $content,
			state: 'search',
			target: $target,
			type: 'search-toggle',
			event: event
		});
	});

	/* Search: Content
 /* ====================================================================== */

	var $content = $assign('div', {
		class: prefix$5 + '-content', id: prefix$5 + '-content',
		aria: { expanded: false, labelledby: prefix$5 + '-control' }
	});

	/* Search: Target
 /* ====================================================================== */

	var $target = $assign('div', { class: prefix$5 }, $control, $content);

	/* Search: On Update
 /* ====================================================================== */

	$target.addEventListener('header:update:search', function (_ref) {
		var detail = _ref.detail;

		if (!detail || detail.inline) {
			return $target.classList.add("hidden");
		} else {
			$target.classList.remove("hidden");
		}
		if (!detail.hide) {
			$assign($control, { aria: { label: detail.label } });
			$renderSvgOrImg({ imgDef: $search.md, imgClass: prefix$5 + '-image', id: prefix$5 + '-image', $targetElm: $control });

			if (detail.dialog) {
				detail.dialog.prefix = 'esri-header-search-dialog';

				var $dialog = esriSearch(detail.dialog);

				var $dialogCancelButton = $assign('button', {
					class: 'esri-header-search-dialog-cancel',
					type: 'reset'
				}, $assign('span', detail.dialog.cancelLabel));

				$dialogCancelButton.addEventListener('click', function (event) {
					$dispatch($control, 'header:menu:close', {
						control: $control,
						content: $content,
						state: 'search',
						type: 'search-close',
						event: event
					});
				});

				$assign($dialog, $dialogCancelButton);

				$replaceAll($content, $dialog);

				$control.addEventListener('click', function (event) {
					if ('true' === $control.getAttribute('aria-expanded')) {
						$dispatch($dialog, detail.dialog.prefix + ':focus', { event: event });
					}
				});
			}
		} else {
			$control.setAttribute("tabindex", "-1");
		}
	});

	return $target;
});

var prefix$6 = 'esri-header-inlineSearch';
var searchState = {};

var createInlineSearch = (function () {
	/* Search: Control
 /* ====================================================================== */

	var $control = $assign('button', {
		class: prefix$6 + '-control', id: prefix$6 + '-control',
		aria: { expanded: false, controls: prefix$6 + '-content' }
	});

	$control.addEventListener('header:menu:open', function (event) {
		$dispatch($control, 'header:inlineSearch:activated', { event: event });
	});

	$control.addEventListener('click', function (event) {
		$dispatch($control, 'header:click:inlineSearch', { event: event });
		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'inlineSearch',
			control: $control,
			content: $content,
			event: event
		});
		// this must go inside an actual click handler for iOS Safari to bring up the keyboard
		$input && $input.focus();
	});

	/* Search: Close Button
 /* ====================================================================== */

	var $closeBtn = $assign('button', {
		class: prefix$6 + '-close-button', id: prefix$6 + '-close-button',
		aria: { labelledby: prefix$6 + '-close-button' }
	}, $renderSvgOrImg({ imgDef: $close.md, imgClass: prefix$6 + '-dismiss-icon' }));

	$closeBtn.addEventListener('click', function (event) {
		$dispatch($control, 'header:inlineSearch:deactivated', { event: event });

		setTimeout(function () {
			$control.focus();
		}, 0);

		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'inlineSearch',
			control: $control,
			content: $content,
			event: event
		});
	});

	/* Search: Input
 /* ====================================================================== */

	var $input = $assign('input', {
		class: prefix$6 + '-input', id: prefix$6 + '-input'
	});

	$input.addEventListener("keyup", function (e) {
		searchState.value = e.target.value;
		if (!searchState.value || searchState.value === " ") {
			searchState.isDisabled = false;
			return $suggestions.innerHTML = "";
		} else if (e.keyCode === 13 && searchState.value && !searchState.isDisabled) {
			return window.location.href = searchState.action + '?q=' + encodeURIComponent(searchState.value);
		}

		$dispatch($control, 'header:search:typing', {
			search: searchState.value
		});
	});

	/* Search: Suggestions
 /* ====================================================================== */

	var $suggestions = $assign('div', {
		class: prefix$6 + '-suggestions', id: prefix$6 + '-suggestions',
		aria: { expanded: false, labelledby: prefix$6 + '-suggestions' }
	});

	var boldKeywords = function boldKeywords(input, keywords) {
		try {
			return input.replace(new RegExp('(\\b)(' + keywords.join('|').replace(/\+|\*|\(|\)\[/g, '') + ')(\\b)', 'ig'), '$1<strong>$2</strong>$3');
		} catch (e) {
			return input;
		}
	};

	/* Search: Content
 /* ====================================================================== */

	var $lineBreak = $assign('div', { class: 'esri-header-lineBreak ' + prefix$6 + '-lineBreak' });
	var $lineBreakRight = $assign('div', { class: 'esri-header-lineBreak ' + prefix$6 + '-lineBreak lineBreak-right' });

	var $content = $assign('div', {
		class: prefix$6 + '-content', id: prefix$6 + '-content',
		aria: { expanded: false, labelledby: prefix$6 + '-control' }
	}, $lineBreak, $input, $closeBtn, $suggestions, $lineBreakRight);

	/* Search: Target
 /* ====================================================================== */

	var $target = $assign('div', {
		class: prefix$6,
		aria: { expanded: false }
	}, $control, $content);

	/* Search: On Activation
 /* ====================================================================== */

	$target.addEventListener('header:inlineSearch:activated', function (_ref) {
		$target.setAttribute('aria-expanded', "true");
	});

	/* Search: On Deactivation
 /* ====================================================================== */

	$target.addEventListener('header:inlineSearch:deactivated', function (_ref2) {
		$target.setAttribute('aria-expanded', "false");
		$suggestions.innerHTML = '';
		$input.value = '';
	});

	/* Search: On Populate Suggestions
 /* ====================================================================== */

	$target.addEventListener('header:search:populateSuggestions', function (_ref3) {
		var detail = _ref3.detail;

		$suggestions.innerHTML = '';
		searchState.isDisabled = detail.disabled;

		if (Array.isArray(detail)) {
			createSuggestionsList(detail, searchState.value.split(" "));
		} else if (!detail.suggestions || !detail.suggestions.length) {
			// No Results State
			return;
		} else {
			createSuggestionsSections(detail, searchState.value.split(" "));
		}
	});

	var createSuggestionsList = function createSuggestionsList(detail, searchValueArray) {
		var $ul = $assign('ul', { class: prefix$6 + '-simple-suggestion-list' });
		detail.forEach(function (l) {
			var $icon = l.icon ? $assign('img', { src: l.icon, class: prefix$6 + '-suggestion-icon', alt: "" }) : "";
			var $span = $assign('span');
			$span.innerHTML = boldKeywords(l.text, searchValueArray);

			var $li = $assign('li', {
				class: prefix$6 + '-suggestion'
			}, l.href ? $assign('a', { href: l.href }, $icon, $span) : $assign('span', { class: "inactive" }, $icon, $span));

			$ul.appendChild($li);

			var $section = $assign('div', {
				class: prefix$6 + '-simple-suggestion-section'
			}, $ul);

			$suggestions.appendChild($section);
		});
	};

	var createSuggestionsSections = function createSuggestionsSections(detail, searchValueArray) {
		var minIconWidth = (detail.minIconWidth || "0") + 'px';
		detail.suggestions.forEach(function (s, ind) {
			var $header = s.header ? $assign('p', { class: prefix$6 + '-suggestion-header' }, s.header) : $assign('p');
			var $hr = (s.header || ind > 0) && !s.hideHR ? $assign('hr') : $assign('span');
			var $ul = $assign('ul', { class: prefix$6 + '-suggestion-list' });
			var $footer = !s.footer ? $assign('span') : $assign('a', {
				href: s.footer.href,
				class: prefix$6 + '-suggestion-footer'
			}, s.footer.text);

			s.links.forEach(function (l) {
				var $span = $assign('span', { class: prefix$6 + '-suggestion-text' });
				$span.innerHTML = boldKeywords(l.text, searchValueArray);
				$span.appendChild(l.secondary ? $assign('div', { class: prefix$6 + '-suggestion-secondary-text' }, l.secondary) : $assign('span'));
				var $icon = !l.icon ? $assign('span', { class: prefix$6 + '-suggestion-icon-wrapper', style: 'min-width: ' + minIconWidth + ';' }) : $renderSvgOrImg({
					inlineImg: true,
					alt: "",
					imgDef: l.icon === 'searchIcon' ? $search.sm : l.icon,
					imgWidth: l.iconSize || "22",
					imgHeight: l.icon === 'searchIcon' ? "15px" : l.iconSize,
					imgClass: prefix$6 + '-suggestion-icon',
					wrapperClass: prefix$6 + '-suggestion-icon-wrapper'
				});
				$icon.style.minWidth = minIconWidth;

				if (l.htmlIcon) $icon.innerHTML = l.htmlIcon;

				var $li = $assign('li', {
					class: prefix$6 + '-suggestion'
				}, l.href ? $assign('a', { href: l.href }, $icon, $span) : $assign('span', { class: "inactive" }, $icon, $span));

				$ul.appendChild($li);
			});

			var $section = $assign('div', {
				class: prefix$6 + '-suggestion-section'
			}, $header, $hr, $ul, $footer);

			$suggestions.appendChild($section);
		});

		$suggestions.appendChild($assign('div', { class: prefix$6 + '-suggestions-bottom-padding' }));
	};

	/* Search: On Update
 /* ====================================================================== */

	$target.addEventListener('header:update:inlineSearch', function (_ref4) {
		var detail = _ref4.detail;

		if (detail && detail.inline) {
			$target.classList.remove('hidden');
		} else {
			$target.classList.add('hidden');
			return;
		}
		if (!detail.hide) {
			$assign($control, { aria: { label: detail.label } });
			$renderSvgOrImg({ imgDef: $search.md, imgClass: prefix$6 + '-image', id: prefix$6 + '-image', alt: "", $targetElm: $control });

			searchState.image = $search.md;
			searchState.action = detail.dialog && detail.dialog.action;
			var queryLabel = detail.dialog && detail.dialog.queryLabel || "Search";
			$input.setAttribute('placeholder', queryLabel);
			$input.setAttribute('aria-label', queryLabel);
			$closeBtn.setAttribute('aria-label', detail.dialog && detail.dialog.cancelLabel || "");

			if (detail.dialog) {
				detail.dialog.prefix = 'esri-header-search-dialog';
			}
		} else {
			$control.setAttribute("tabindex", "-1");
		}
	});

	return $target;
});

var prefix$7 = 'esri-header-shopping-cart';

var createShoppingCart = (function () {
	var $target = $assign('div', { class: prefix$7, 'data-cart-empty': 'true' });

	$target.addEventListener('click', function (event) {
		$dispatch($target, 'header:click:shoppingCart', { event: event });
	});

	var $control = $assign('a', {
		href: '#',
		class: prefix$7 + '--icon',
		id: prefix$7 + '--icon'
	}, $renderSvgOrImg({
		imgDef: $cart.md,
		imgClass: prefix$7 + '--image',
		id: prefix$7 + '--image'
	}));

	var $cartItems = $assign('div', { class: prefix$7 + '--items', id: prefix$7 + '--items' });

	$assign($target, $control, $cartItems);

	$target.addEventListener('header:update:cart', function (_ref) {
		var detail = _ref.detail;

		if (detail) {
			$control.setAttribute('href', '' + detail.url);
			changeCartCount(detail.items);
			$target.classList.remove("hidden");
		} else {
			$target.classList.add("hidden");
			return;
		}
	});

	$target.addEventListener('header:shoppingcart:add', function (_ref2) {
		var detail = _ref2.detail;

		changeCartCount(detail, true);
	});

	$target.addEventListener('header:shoppingcart:remove', function (_ref3) {
		var detail = _ref3.detail;

		changeCartCount(-detail, true);
	});

	var changeCartCount = function changeCartCount(inc, animate) {
		var currCount = parseInt($cartItems.innerHTML);
		currCount = isNaN(currCount) || currCount < 0 ? 0 : currCount;
		var cartCount = currCount + parseInt(inc);
		cartCount >= 999 ? $cartItems.innerHTML = '999' : $cartItems.innerHTML = cartCount;

		if (cartCount > 0) {
			$target.setAttribute('data-cart-empty', 'false');
			if (animate) {
				$cartItems.setAttribute('data-cart-updated', 'true');
				setTimeout(function () {
					$cartItems.setAttribute('data-cart-updated', 'false');
				}, 1000);
			}
		} else {
			$cartItems.setAttribute('data-cart-updated', 'true');
			setTimeout(function () {
				$target.setAttribute('data-cart-empty', 'true');
			}, 1000);
		}
	};

	return $target;
});

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var Sortable = createCommonjsModule(function (module) {
	/**!
  * Sortable
  * @author	RubaXa   <trash@rubaxa.org>
  * @license MIT
  */

	(function sortableModule(factory) {
		"use strict";

		if (typeof undefined === "function" && undefined.amd) {
			undefined(factory);
		} else {
			module.exports = factory();
		}
	})(function sortableFactory() {
		"use strict";

		if (typeof window === "undefined" || !window.document) {
			return function sortableError() {
				throw new Error("Sortable.js requires a window with a document");
			};
		}

		var dragEl,
		    parentEl,
		    ghostEl,
		    cloneEl,
		    rootEl,
		    nextEl,
		    lastDownEl,
		    scrollEl,
		    scrollParentEl,
		    scrollCustomFn,
		    lastEl,
		    lastCSS,
		    lastParentCSS,
		    oldIndex,
		    newIndex,
		    activeGroup,
		    putSortable,
		    autoScroll = {},
		    tapEvt,
		    touchEvt,
		    moved,


		/** @const */
		R_SPACE = /\s+/g,
		    R_FLOAT = /left|right|inline/,
		    expando = 'Sortable' + new Date().getTime(),
		    win = window,
		    document = win.document,
		    parseInt = win.parseInt,
		    setTimeout = win.setTimeout,
		    $ = win.jQuery || win.Zepto,
		    Polymer = win.Polymer,
		    captureMode = false,
		    passiveMode = false,
		    supportDraggable = 'draggable' in document.createElement('div'),
		    supportCssPointerEvents = function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		}(),
		    _silent = false,
		    abs = Math.abs,
		    min = Math.min,
		    savedInputChecked = [],
		    touchDragOverListeners = [],
		    _autoScroll = _throttle(function ( /**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
				    el,
				    rect,
				    sens = options.scrollSensitivity,
				    speed = options.scrollSpeed,
				    x = evt.clientX,
				    y = evt.clientY,
				    winWidth = window.innerWidth,
				    winHeight = window.innerHeight,
				    vx,
				    vy,
				    scrollOffsetX,
				    scrollOffsetY;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if (scrollEl.offsetWidth < scrollEl.scrollWidth || scrollEl.offsetHeight < scrollEl.scrollHeight) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}

				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}

				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof scrollCustomFn) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),
		    _prepareGroup = function _prepareGroup(options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull ? value : value && (value.join ? value.indexOf(fromGroup) > -1 : fromGroup == value);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || (typeof originalGroup === "undefined" ? "undefined" : _typeof(originalGroup)) != 'object') {
				originalGroup = { name: originalGroup };
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		};

		// Detect support a passive mode
		try {
			window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
				get: function get$$1() {
					// `false`, because everything starts to work incorrectly and instead of d'n'd,
					// begins the page has scrolled.
					passiveMode = false;
					captureMode = {
						capture: false,
						passive: passiveMode
					};
				}
			}));
		} catch (err) {}

		/**
   * @class  Sortable
   * @param  {HTMLElement}  el
   * @param  {Object}       [options]
   */
		function Sortable(el, options) {
			if (!(el && el.nodeType && el.nodeType === 1)) {
				throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
			}

			this.el = el; // root element
			this.options = options = _extend({}, options);

			// Export instance
			el[expando] = this;

			// Default options
			var defaults$$1 = {
				group: Math.random(),
				sort: true,
				disabled: false,
				store: null,
				handle: null,
				scroll: true,
				scrollSensitivity: 30,
				scrollSpeed: 10,
				draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
				ghostClass: 'sortable-ghost',
				chosenClass: 'sortable-chosen',
				dragClass: 'sortable-drag',
				ignore: 'a, img',
				filter: null,
				preventOnFilter: true,
				animation: 0,
				setData: function setData(dataTransfer, dragEl) {
					dataTransfer.setData('Text', dragEl.textContent);
				},
				dropBubble: false,
				dragoverBubble: false,
				dataIdAttr: 'data-id',
				delay: 0,
				forceFallback: false,
				fallbackClass: 'sortable-fallback',
				fallbackOnBody: false,
				fallbackTolerance: 0,
				fallbackOffset: { x: 0, y: 0 },
				supportPointer: Sortable.supportPointer !== false
			};

			// Set default options
			for (var name in defaults$$1) {
				!(name in options) && (options[name] = defaults$$1[name]);
			}

			_prepareGroup(options);

			// Bind all private methods
			for (var fn in this) {
				if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
					this[fn] = this[fn].bind(this);
				}
			}

			// Setup drag mode
			this.nativeDraggable = options.forceFallback ? false : supportDraggable;

			// Bind events
			_on(el, 'mousedown', this._onTapStart);
			_on(el, 'touchstart', this._onTapStart);
			options.supportPointer && _on(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_on(el, 'dragover', this);
				_on(el, 'dragenter', this);
			}

			touchDragOverListeners.push(this._onDragOver);

			// Restore sorting
			options.store && this.sort(options.store.get(this));
		}

		Sortable.prototype = /** @lends Sortable.prototype */{
			constructor: Sortable,

			_onTapStart: function _onTapStart( /** Event|TouchEvent */evt) {
				var _this = this,
				    el = this.el,
				    options = this.options,
				    preventOnFilter = options.preventOnFilter,
				    type = evt.type,
				    touch = evt.touches && evt.touches[0],
				    target = (touch || evt).target,
				    originalTarget = evt.target.shadowRoot && evt.path && evt.path[0] || target,
				    filter = options.filter,
				    startIndex;

				_saveInputCheckedState(el);

				// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
				if (dragEl) {
					return;
				}

				if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
					return; // only left button or enabled
				}

				// cancel dnd if original target is content editable
				if (originalTarget.isContentEditable) {
					return;
				}

				target = _closest(target, options.draggable, el);

				if (!target) {
					return;
				}

				if (lastDownEl === target) {
					// Ignoring duplicate `down`
					return;
				}

				// Get the index of the dragged element within its parent
				startIndex = _index(target, options.draggable);

				// Check filter
				if (typeof filter === 'function') {
					if (filter.call(this, evt, target, this)) {
						_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
						preventOnFilter && evt.preventDefault();
						return; // cancel dnd
					}
				} else if (filter) {
					filter = filter.split(',').some(function (criteria) {
						criteria = _closest(originalTarget, criteria.trim(), el);

						if (criteria) {
							_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
							return true;
						}
					});

					if (filter) {
						preventOnFilter && evt.preventDefault();
						return; // cancel dnd
					}
				}

				if (options.handle && !_closest(originalTarget, options.handle, el)) {
					return;
				}

				// Prepare `dragstart`
				this._prepareDragStart(evt, touch, target, startIndex);
			},

			_prepareDragStart: function _prepareDragStart( /** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
				var _this = this,
				    el = _this.el,
				    options = _this.options,
				    ownerDocument = el.ownerDocument,
				    dragStartFn;

				if (target && !dragEl && target.parentNode === el) {
					tapEvt = evt;

					rootEl = el;
					dragEl = target;
					parentEl = dragEl.parentNode;
					nextEl = dragEl.nextSibling;
					lastDownEl = target;
					activeGroup = options.group;
					oldIndex = startIndex;

					this._lastX = (touch || evt).clientX;
					this._lastY = (touch || evt).clientY;

					dragEl.style['will-change'] = 'all';

					dragStartFn = function dragStartFn() {
						// Delayed drag has been triggered
						// we can re-enable the events: touchmove/mousemove
						_this._disableDelayedDrag();

						// Make the element draggable
						dragEl.draggable = _this.nativeDraggable;

						// Chosen item
						_toggleClass(dragEl, options.chosenClass, true);

						// Bind the events: dragstart/dragend
						_this._triggerDragStart(evt, touch);

						// Drag start event
						_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
					};

					// Disable "draggable"
					options.ignore.split(',').forEach(function (criteria) {
						_find(dragEl, criteria.trim(), _disableDraggable);
					});

					_on(ownerDocument, 'mouseup', _this._onDrop);
					_on(ownerDocument, 'touchend', _this._onDrop);
					_on(ownerDocument, 'touchcancel', _this._onDrop);
					_on(ownerDocument, 'selectstart', _this);
					options.supportPointer && _on(ownerDocument, 'pointercancel', _this._onDrop);

					if (options.delay) {
						// If the user moves the pointer or let go the click or touch
						// before the delay has been reached:
						// disable the delayed drag
						_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
						_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
						_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
						_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
						_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
						options.supportPointer && _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

						_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
					} else {
						dragStartFn();
					}
				}
			},

			_disableDelayedDrag: function _disableDelayedDrag() {
				var ownerDocument = this.el.ownerDocument;

				clearTimeout(this._dragStartTimer);
				_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
				_off(ownerDocument, 'touchend', this._disableDelayedDrag);
				_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
				_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
				_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
				_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
			},

			_triggerDragStart: function _triggerDragStart( /** Event */evt, /** Touch */touch) {
				touch = touch || (evt.pointerType == 'touch' ? evt : null);

				if (touch) {
					// Touch device support
					tapEvt = {
						target: dragEl,
						clientX: touch.clientX,
						clientY: touch.clientY
					};

					this._onDragStart(tapEvt, 'touch');
				} else if (!this.nativeDraggable) {
					this._onDragStart(tapEvt, true);
				} else {
					_on(dragEl, 'dragend', this);
					_on(rootEl, 'dragstart', this._onDragStart);
				}

				try {
					if (document.selection) {
						// Timeout neccessary for IE9
						_nextTick(function () {
							document.selection.empty();
						});
					} else {
						window.getSelection().removeAllRanges();
					}
				} catch (err) {}
			},

			_dragStarted: function _dragStarted() {
				if (rootEl && dragEl) {
					var options = this.options;

					// Apply effect
					_toggleClass(dragEl, options.ghostClass, true);
					_toggleClass(dragEl, options.dragClass, false);

					Sortable.active = this;

					// Drag start event
					_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex);
				} else {
					this._nulling();
				}
			},

			_emulateDragOver: function _emulateDragOver() {
				if (touchEvt) {
					if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
						return;
					}

					this._lastX = touchEvt.clientX;
					this._lastY = touchEvt.clientY;

					if (!supportCssPointerEvents) {
						_css(ghostEl, 'display', 'none');
					}

					var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					var parent = target;
					var i = touchDragOverListeners.length;

					if (target && target.shadowRoot) {
						target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
						parent = target;
					}

					if (parent) {
						do {
							if (parent[expando]) {
								while (i--) {
									touchDragOverListeners[i]({
										clientX: touchEvt.clientX,
										clientY: touchEvt.clientY,
										target: target,
										rootEl: parent
									});
								}

								break;
							}

							target = parent; // store last element
						}
						/* jshint boss:true */
						while (parent = parent.parentNode);
					}

					if (!supportCssPointerEvents) {
						_css(ghostEl, 'display', '');
					}
				}
			},

			_onTouchMove: function _onTouchMove( /**TouchEvent*/evt) {
				if (tapEvt) {
					var options = this.options,
					    fallbackTolerance = options.fallbackTolerance,
					    fallbackOffset = options.fallbackOffset,
					    touch = evt.touches ? evt.touches[0] : evt,
					    dx = touch.clientX - tapEvt.clientX + fallbackOffset.x,
					    dy = touch.clientY - tapEvt.clientY + fallbackOffset.y,
					    translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

					// only set the status to dragging, when we are actually dragging
					if (!Sortable.active) {
						if (fallbackTolerance && min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance) {
							return;
						}

						this._dragStarted();
					}

					// as well as creating the ghost element on the document body
					this._appendGhost();

					moved = true;
					touchEvt = touch;

					_css(ghostEl, 'webkitTransform', translate3d);
					_css(ghostEl, 'mozTransform', translate3d);
					_css(ghostEl, 'msTransform', translate3d);
					_css(ghostEl, 'transform', translate3d);

					evt.preventDefault();
				}
			},

			_appendGhost: function _appendGhost() {
				if (!ghostEl) {
					var rect = dragEl.getBoundingClientRect(),
					    css = _css(dragEl),
					    options = this.options,
					    ghostRect;

					ghostEl = dragEl.cloneNode(true);

					_toggleClass(ghostEl, options.ghostClass, false);
					_toggleClass(ghostEl, options.fallbackClass, true);
					_toggleClass(ghostEl, options.dragClass, true);

					_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
					_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
					_css(ghostEl, 'width', rect.width);
					_css(ghostEl, 'height', rect.height);
					_css(ghostEl, 'opacity', '0.8');
					_css(ghostEl, 'position', 'fixed');
					_css(ghostEl, 'zIndex', '100000');
					_css(ghostEl, 'pointerEvents', 'none');

					options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

					// Fixing dimensions.
					ghostRect = ghostEl.getBoundingClientRect();
					_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
					_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
				}
			},

			_onDragStart: function _onDragStart( /**Event*/evt, /**boolean*/useFallback) {
				var _this = this;
				var dataTransfer = evt.dataTransfer;
				var options = _this.options;

				_this._offUpEvents();

				if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
					cloneEl = _clone(dragEl);

					cloneEl.draggable = false;
					cloneEl.style['will-change'] = '';

					_css(cloneEl, 'display', 'none');
					_toggleClass(cloneEl, _this.options.chosenClass, false);

					// #1143: IFrame support workaround
					_this._cloneId = _nextTick(function () {
						rootEl.insertBefore(cloneEl, dragEl);
						_dispatchEvent(_this, rootEl, 'clone', dragEl);
					});
				}

				_toggleClass(dragEl, options.dragClass, true);

				if (useFallback) {
					if (useFallback === 'touch') {
						// Bind touch events
						_on(document, 'touchmove', _this._onTouchMove);
						_on(document, 'touchend', _this._onDrop);
						_on(document, 'touchcancel', _this._onDrop);

						if (options.supportPointer) {
							_on(document, 'pointermove', _this._onTouchMove);
							_on(document, 'pointerup', _this._onDrop);
						}
					} else {
						// Old brwoser
						_on(document, 'mousemove', _this._onTouchMove);
						_on(document, 'mouseup', _this._onDrop);
					}

					_this._loopId = setInterval(_this._emulateDragOver, 50);
				} else {
					if (dataTransfer) {
						dataTransfer.effectAllowed = 'move';
						options.setData && options.setData.call(_this, dataTransfer, dragEl);
					}

					_on(document, 'drop', _this);

					// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
					// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
					// Breaking Chrome 62+
					// _on(document, 'mouseover', _this);

					_this._dragStartId = _nextTick(_this._dragStarted);
				}
			},

			_onDragOver: function _onDragOver( /**Event*/evt) {
				var el = this.el,
				    target,
				    dragRect,
				    targetRect,
				    revert,
				    options = this.options,
				    group = options.group,
				    activeSortable = Sortable.active,
				    isOwner = activeGroup === group,
				    isMovingBetweenSortable = false,
				    canSort = options.sort;

				if (evt.preventDefault !== void 0) {
					evt.preventDefault();
					!options.dragoverBubble && evt.stopPropagation();
				}

				if (dragEl.animated) {
					return;
				}

				moved = true;

				if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
				: putSortable === this || (activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt)) && (evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
				) {
						// Smart auto-scrolling
						_autoScroll(evt, options, this.el);

						if (_silent) {
							return;
						}

						target = _closest(evt.target, options.draggable, el);
						dragRect = dragEl.getBoundingClientRect();

						if (putSortable !== this) {
							putSortable = this;
							isMovingBetweenSortable = true;
						}

						if (revert) {
							_cloneHide(activeSortable, true);
							parentEl = rootEl; // actualization

							if (cloneEl || nextEl) {
								rootEl.insertBefore(dragEl, cloneEl || nextEl);
							} else if (!canSort) {
								rootEl.appendChild(dragEl);
							}

							return;
						}

						if (el.children.length === 0 || el.children[0] === ghostEl || el === evt.target && _ghostIsLast(el, evt)) {
							//assign target only if condition is true
							if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
								target = el.lastElementChild;
							}

							if (target) {
								if (target.animated) {
									return;
								}

								targetRect = target.getBoundingClientRect();
							}

							_cloneHide(activeSortable, isOwner);

							if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
								if (!dragEl.contains(el)) {
									el.appendChild(dragEl);
									parentEl = el; // actualization
								}

								this._animate(dragRect, dragEl);
								target && this._animate(targetRect, target);
							}
						} else if (target && !target.animated && target !== dragEl && target.parentNode[expando] !== void 0) {
							if (lastEl !== target) {
								lastEl = target;
								lastCSS = _css(target);
								lastParentCSS = _css(target.parentNode);
							}

							targetRect = target.getBoundingClientRect();

							var width = targetRect.right - targetRect.left,
							    height = targetRect.bottom - targetRect.top,
							    floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display) || lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0,
							    isWide = target.offsetWidth > dragEl.offsetWidth,
							    isLong = target.offsetHeight > dragEl.offsetHeight,
							    halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
							    nextSibling = target.nextElementSibling,
							    after = false;

							if (floating) {
								var elTop = dragEl.offsetTop,
								    tgTop = target.offsetTop;

								if (elTop === tgTop) {
									after = target.previousElementSibling === dragEl && !isWide || halfway && isWide;
								} else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
									after = (evt.clientY - targetRect.top) / height > 0.5;
								} else {
									after = tgTop > elTop;
								}
							} else if (!isMovingBetweenSortable) {
								after = nextSibling !== dragEl && !isLong || halfway && isLong;
							}

							var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

							if (moveVector !== false) {
								if (moveVector === 1 || moveVector === -1) {
									after = moveVector === 1;
								}

								_silent = true;
								setTimeout(_unsilent, 30);

								_cloneHide(activeSortable, isOwner);

								if (!dragEl.contains(el)) {
									if (after && !nextSibling) {
										el.appendChild(dragEl);
									} else {
										target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
									}
								}

								parentEl = dragEl.parentNode; // actualization

								this._animate(dragRect, dragEl);
								this._animate(targetRect, target);
							}
						}
					}
			},

			_animate: function _animate(prevRect, target) {
				var ms = this.options.animation;

				if (ms) {
					var currentRect = target.getBoundingClientRect();

					if (prevRect.nodeType === 1) {
						prevRect = prevRect.getBoundingClientRect();
					}

					_css(target, 'transition', 'none');
					_css(target, 'transform', 'translate3d(' + (prevRect.left - currentRect.left) + 'px,' + (prevRect.top - currentRect.top) + 'px,0)');

					target.offsetWidth; // repaint

					_css(target, 'transition', 'all ' + ms + 'ms');
					_css(target, 'transform', 'translate3d(0,0,0)');

					clearTimeout(target.animated);
					target.animated = setTimeout(function () {
						_css(target, 'transition', '');
						_css(target, 'transform', '');
						target.animated = false;
					}, ms);
				}
			},

			_offUpEvents: function _offUpEvents() {
				var ownerDocument = this.el.ownerDocument;

				_off(document, 'touchmove', this._onTouchMove);
				_off(document, 'pointermove', this._onTouchMove);
				_off(ownerDocument, 'mouseup', this._onDrop);
				_off(ownerDocument, 'touchend', this._onDrop);
				_off(ownerDocument, 'pointerup', this._onDrop);
				_off(ownerDocument, 'touchcancel', this._onDrop);
				_off(ownerDocument, 'pointercancel', this._onDrop);
				_off(ownerDocument, 'selectstart', this);
			},

			_onDrop: function _onDrop( /**Event*/evt) {
				var el = this.el,
				    options = this.options;

				clearInterval(this._loopId);
				clearInterval(autoScroll.pid);
				clearTimeout(this._dragStartTimer);

				_cancelNextTick(this._cloneId);
				_cancelNextTick(this._dragStartId);

				// Unbind events
				_off(document, 'mouseover', this);
				_off(document, 'mousemove', this._onTouchMove);

				if (this.nativeDraggable) {
					_off(document, 'drop', this);
					_off(el, 'dragstart', this._onDragStart);
				}

				this._offUpEvents();

				if (evt) {
					if (moved) {
						evt.preventDefault();
						!options.dropBubble && evt.stopPropagation();
					}

					ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

					if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
						// Remove clone
						cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
					}

					if (dragEl) {
						if (this.nativeDraggable) {
							_off(dragEl, 'dragend', this);
						}

						_disableDraggable(dragEl);
						dragEl.style['will-change'] = '';

						// Remove class's
						_toggleClass(dragEl, this.options.ghostClass, false);
						_toggleClass(dragEl, this.options.chosenClass, false);

						// Drag stop event
						_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex);

						if (rootEl !== parentEl) {
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// Add event
								_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex);

								// Remove event
								_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex);

								// drag from one list and drop into another
								_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							}
						} else {
							if (dragEl.nextSibling !== nextEl) {
								// Get the index of the dragged element within its parent
								newIndex = _index(dragEl, options.draggable);

								if (newIndex >= 0) {
									// drag & drop within the same list
									_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex);
									_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
								}
							}
						}

						if (Sortable.active) {
							/* jshint eqnull:true */
							if (newIndex == null || newIndex === -1) {
								newIndex = oldIndex;
							}

							_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// Save sorting
							this.save();
						}
					}
				}

				this._nulling();
			},

			_nulling: function _nulling() {
				rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = scrollEl = scrollParentEl = tapEvt = touchEvt = moved = newIndex = lastEl = lastCSS = putSortable = activeGroup = Sortable.active = null;

				savedInputChecked.forEach(function (el) {
					el.checked = true;
				});
				savedInputChecked.length = 0;
			},

			handleEvent: function handleEvent( /**Event*/evt) {
				switch (evt.type) {
					case 'drop':
					case 'dragend':
						this._onDrop(evt);
						break;

					case 'dragover':
					case 'dragenter':
						if (dragEl) {
							this._onDragOver(evt);
							_globalDragOver(evt);
						}
						break;

					case 'mouseover':
						this._onDrop(evt);
						break;

					case 'selectstart':
						evt.preventDefault();
						break;
				}
			},

			/**
    * Serializes the item into an array of string.
    * @returns {String[]}
    */
			toArray: function toArray$$1() {
				var order = [],
				    el,
				    children = this.el.children,
				    i = 0,
				    n = children.length,
				    options = this.options;

				for (; i < n; i++) {
					el = children[i];
					if (_closest(el, options.draggable, this.el)) {
						order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
					}
				}

				return order;
			},

			/**
    * Sorts the elements according to the array.
    * @param  {String[]}  order  order of the items
    */
			sort: function sort(order) {
				var items = {},
				    rootEl = this.el;

				this.toArray().forEach(function (id, i) {
					var el = rootEl.children[i];

					if (_closest(el, this.options.draggable, rootEl)) {
						items[id] = el;
					}
				}, this);

				order.forEach(function (id) {
					if (items[id]) {
						rootEl.removeChild(items[id]);
						rootEl.appendChild(items[id]);
					}
				});
			},

			/**
    * Save the current sorting
    */
			save: function save() {
				var store = this.options.store;
				store && store.set(this);
			},

			/**
    * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
    * @param   {HTMLElement}  el
    * @param   {String}       [selector]  default: `options.draggable`
    * @returns {HTMLElement|null}
    */
			closest: function closest(el, selector) {
				return _closest(el, selector || this.options.draggable, this.el);
			},

			/**
    * Set/get option
    * @param   {string} name
    * @param   {*}      [value]
    * @returns {*}
    */
			option: function option(name, value) {
				var options = this.options;

				if (value === void 0) {
					return options[name];
				} else {
					options[name] = value;

					if (name === 'group') {
						_prepareGroup(options);
					}
				}
			},

			/**
    * Destroy
    */
			destroy: function destroy() {
				var el = this.el;

				el[expando] = null;

				_off(el, 'mousedown', this._onTapStart);
				_off(el, 'touchstart', this._onTapStart);
				_off(el, 'pointerdown', this._onTapStart);

				if (this.nativeDraggable) {
					_off(el, 'dragover', this);
					_off(el, 'dragenter', this);
				}

				// Remove draggable attributes
				Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
					el.removeAttribute('draggable');
				});

				touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

				this._onDrop();

				this.el = el = null;
			}
		};

		function _cloneHide(sortable, state) {
			if (sortable.lastPullMode !== 'clone') {
				state = true;
			}

			if (cloneEl && cloneEl.state !== state) {
				_css(cloneEl, 'display', state ? 'none' : '');

				if (!state) {
					if (cloneEl.state) {
						if (sortable.options.group.revertClone) {
							rootEl.insertBefore(cloneEl, nextEl);
							sortable._animate(dragEl, cloneEl);
						} else {
							rootEl.insertBefore(cloneEl, dragEl);
						}
					}
				}

				cloneEl.state = state;
			}
		}

		function _closest( /**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
			if (el) {
				ctx = ctx || document;

				do {
					if (selector === '>*' && el.parentNode === ctx || _matches(el, selector)) {
						return el;
					}
					/* jshint boss:true */
				} while (el = _getParentOrHost(el));
			}

			return null;
		}

		function _getParentOrHost(el) {
			var parent = el.host;

			return parent && parent.nodeType ? parent : el.parentNode;
		}

		function _globalDragOver( /**Event*/evt) {
			if (evt.dataTransfer) {
				evt.dataTransfer.dropEffect = 'move';
			}
			evt.preventDefault();
		}

		function _on(el, event, fn) {
			el.addEventListener(event, fn, captureMode);
		}

		function _off(el, event, fn) {
			el.removeEventListener(event, fn, captureMode);
		}

		function _toggleClass(el, name, state) {
			if (el) {
				if (el.classList) {
					el.classList[state ? 'add' : 'remove'](name);
				} else {
					var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
					el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
				}
			}
		}

		function _css(el, prop, val) {
			var style = el && el.style;

			if (style) {
				if (val === void 0) {
					if (document.defaultView && document.defaultView.getComputedStyle) {
						val = document.defaultView.getComputedStyle(el, '');
					} else if (el.currentStyle) {
						val = el.currentStyle;
					}

					return prop === void 0 ? val : val[prop];
				} else {
					if (!(prop in style)) {
						prop = '-webkit-' + prop;
					}

					style[prop] = val + (typeof val === 'string' ? '' : 'px');
				}
			}
		}

		function _find(ctx, tagName, iterator) {
			if (ctx) {
				var list = ctx.getElementsByTagName(tagName),
				    i = 0,
				    n = list.length;

				if (iterator) {
					for (; i < n; i++) {
						iterator(list[i], i);
					}
				}

				return list;
			}

			return [];
		}

		function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex) {
			sortable = sortable || rootEl[expando];

			var evt = document.createEvent('Event'),
			    options = sortable.options,
			    onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

			evt.initEvent(name, true, true);

			evt.to = toEl || rootEl;
			evt.from = fromEl || rootEl;
			evt.item = targetEl || rootEl;
			evt.clone = cloneEl;

			evt.oldIndex = startIndex;
			evt.newIndex = newIndex;

			rootEl.dispatchEvent(evt);

			if (options[onName]) {
				options[onName].call(sortable, evt);
			}
		}

		function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
			var evt,
			    sortable = fromEl[expando],
			    onMoveFn = sortable.options.onMove,
			    retVal;

			evt = document.createEvent('Event');
			evt.initEvent('move', true, true);

			evt.to = toEl;
			evt.from = fromEl;
			evt.dragged = dragEl;
			evt.draggedRect = dragRect;
			evt.related = targetEl || toEl;
			evt.relatedRect = targetRect || toEl.getBoundingClientRect();
			evt.willInsertAfter = willInsertAfter;

			fromEl.dispatchEvent(evt);

			if (onMoveFn) {
				retVal = onMoveFn.call(sortable, evt, originalEvt);
			}

			return retVal;
		}

		function _disableDraggable(el) {
			el.draggable = false;
		}

		function _unsilent() {
			_silent = false;
		}

		/** @returns {HTMLElement|false} */
		function _ghostIsLast(el, evt) {
			var lastEl = el.lastElementChild,
			    rect = lastEl.getBoundingClientRect();

			// 5 — min delta
			// abs — нельзя добавлять, а то глюки при наведении сверху
			return evt.clientY - (rect.top + rect.height) > 5 || evt.clientX - (rect.left + rect.width) > 5;
		}

		/**
   * Generate id
   * @param   {HTMLElement} el
   * @returns {String}
   * @private
   */
		function _generateId(el) {
			var str = el.tagName + el.className + el.src + el.href + el.textContent,
			    i = str.length,
			    sum = 0;

			while (i--) {
				sum += str.charCodeAt(i);
			}

			return sum.toString(36);
		}

		/**
   * Returns the index of an element within its parent for a selected set of
   * elements
   * @param  {HTMLElement} el
   * @param  {selector} selector
   * @return {number}
   */
		function _index(el, selector) {
			var index = 0;

			if (!el || !el.parentNode) {
				return -1;
			}

			while (el && (el = el.previousElementSibling)) {
				if (el.nodeName.toUpperCase() !== 'TEMPLATE' && (selector === '>*' || _matches(el, selector))) {
					index++;
				}
			}

			return index;
		}

		function _matches( /**HTMLElement*/el, /**String*/selector) {
			if (el) {
				selector = selector.split('.');

				var tag = selector.shift().toUpperCase(),
				    re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

				return (tag === '' || el.nodeName.toUpperCase() == tag) && (!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length);
			}

			return false;
		}

		function _throttle(callback, ms) {
			var args, _this;

			return function () {
				if (args === void 0) {
					args = arguments;
					_this = this;

					setTimeout(function () {
						if (args.length === 1) {
							callback.call(_this, args[0]);
						} else {
							callback.apply(_this, args);
						}

						args = void 0;
					}, ms);
				}
			};
		}

		function _extend(dst, src) {
			if (dst && src) {
				for (var key in src) {
					if (src.hasOwnProperty(key)) {
						dst[key] = src[key];
					}
				}
			}

			return dst;
		}

		function _clone(el) {
			if (Polymer && Polymer.dom) {
				return Polymer.dom(el).cloneNode(true);
			} else if ($) {
				return $(el).clone(true)[0];
			} else {
				return el.cloneNode(true);
			}
		}

		function _saveInputCheckedState(root) {
			var inputs = root.getElementsByTagName('input');
			var idx = inputs.length;

			while (idx--) {
				var el = inputs[idx];
				el.checked && savedInputChecked.push(el);
			}
		}

		function _nextTick(fn) {
			return setTimeout(fn, 0);
		}

		function _cancelNextTick(id) {
			return clearTimeout(id);
		}

		// Fixed #973:
		_on(document, 'touchmove', function (evt) {
			if (Sortable.active) {
				evt.preventDefault();
			}
		});

		// Export utils
		Sortable.utils = {
			on: _on,
			off: _off,
			css: _css,
			find: _find,
			is: function is(el, selector) {
				return !!_closest(el, selector, el);
			},
			extend: _extend,
			throttle: _throttle,
			closest: _closest,
			toggleClass: _toggleClass,
			clone: _clone,
			index: _index,
			nextTick: _nextTick,
			cancelNextTick: _cancelNextTick
		};

		/**
   * Create sortable instance
   * @param {HTMLElement}  el
   * @param {Object}      [options]
   */
		Sortable.create = function (el, options) {
			return new Sortable(el, options);
		};

		// Export
		Sortable.version = '1.7.0';
		return Sortable;
	});
});

/* Apps
/* ========================================================================== */

var prefix$8 = 'esri-header-apps';
var isRightToLeft = document.dir === "rtl";
var isDesktop = function (global) {
	return !/iPhone|iPad|iPod|Android/i.test(global.navigator.userAgent);
}(window);

var createApps = (function () {
	/* Apps: Content
 /* ====================================================================== */

	var $content = $assign('div', {
		class: prefix$8 + '-content',
		id: prefix$8 + '-content',
		aria: { expanded: false, labelledby: prefix$8 + '-control' }
	});

	/* Apps: Control
 /* ====================================================================== */

	var $appSwitcherIcon = $assign('span');

	var $controlContainer = $assign('button', {
		class: prefix$8 + '-control', id: prefix$8 + '-control',
		style: "display: none;",
		tabindex: "-1"
	}, $appSwitcherIcon);

	var resetStateOfBottomContainer = function resetStateOfBottomContainer() {
		if (ddState.showMoreButton) {
			ddState.showMoreButton.classList.remove("hide");
		}
		$secondaryDropdownMenu.setAttribute('aria-expanded', "false");
	};

	var $closeAppLauncher = function $closeAppLauncher(event) {
		if (!ddState || ddState.loading) return;
		removeMouseUpListener();
		removeMouseOverListener();

		resetStateOfBottomContainer();

		$dispatchCloseAppLauncher(event);
	};

	var $dispatchCloseAppLauncher = function $dispatchCloseAppLauncher(event) {
		setTimeout(function () {
			$dispatch($control, 'header:menu:toggle', {
				state: 'menu',
				target: $target,
				type: 'root-toggle',
				control: $control,
				content: $content,
				event: event
			});
		}, 1);
	};

	var $control = $controlContainer;

	$controlContainer.addEventListener('click', $closeAppLauncher);

	/* Apps: Target
 /* ====================================================================== */

	var $target = $assign('div', { class: prefix$8 }, $control);

	/* Apps: Secondary Set of Apps
 /* ====================================================================== */

	var $secondaryDropdownMenu = $assign('div', {
		class: prefix$8 + ' secondary-dropdown-menu',
		aria: { expanded: false }
	}, $assign('hr'));

	var $bottomContainer = $assign('div', {
		class: prefix$8 + ' bottom-container'
	});

	/* Apps: Parameters that Control the State of Drag & Drop
 /* ====================================================================== */

	var ddState = {
		maxDragErrorTollerance: 1
	};

	/* Apps: Key Codes used for Accessibility
 /* ====================================================================== */

	var keys = {
		DOWN_ARROW: 40,
		UP_ARROW: 38,
		RIGHT_ARROW: 39,
		LEFT_ARROW: 37,
		SPACE: 32
	};

	/* Apps: Helper Functions for Update
 /* ====================================================================== */

	var createDefaultAppLayout = function createDefaultAppLayout($topAppContainer, currentApp) {
		var abbreviationSizes = ["0px", "32px", "24px", "20px", "18px", "16px", "14px", "12px", "10px", "8px"];
		var selectNoneClass = ddState.browserIsEdge ? "user-select-none" : "";
		var canAccessClass = !currentApp.canAccess ? "no-hover" : "with-hover";

		var $listItem = $assign("li", {
			alt: "",
			"class": 'block link-off-black appLinkContainer grabbable ' + canAccessClass,
			mousedown: isDesktop ? interactWithAppLi.bind(null, currentApp) : $dispatchCloseAppLauncher,
			keyup: !ddState.disabled && isDesktop ? activateAccessibilityMode.bind(null, currentApp) : function () {},
			keydown: isDesktop ? preventBrowserKeyboardDefaults : function () {},
			"role": "menuitem",
			"data-id": currentApp.itemId || currentApp.uid || currentApp.title
		});

		if (!currentApp.canAccess) {
			createMissingAppIcon(currentApp, $listItem, selectNoneClass);
		} else {
			var $appLink = $assign("a", {
				href: currentApp.url,
				target: "_blank",
				blur: isDesktop ? deactivateAccessibilityMode.bind(null, currentApp) : function () {},
				class: "appLink"
			});
			// Check if App has Icon
			if (currentApp.image) {
				var $appImageContainer = $assign("div", { "class": 'appIconImage ' + selectNoneClass });
				$appImageContainer.appendChild(getAccessibleAppArrowContainer());
				$appImageContainer.appendChild($assign("img", { "class": "appIconPng", "alt": "", src: currentApp.image }));
				$appLink.appendChild($appImageContainer);
			} else {
				var stringWidth = Math.ceil(getTextWidth(currentApp.abbr || "", "avenir") / 5);
				var abbreviationSize = abbreviationSizes[stringWidth];
				if (stringWidth > 9) {
					// Prevent user from exceeding icon width
					currentApp.abbr = currentApp.abbr.substr(0, 4);
					stringWidth = 9;
					abbreviationSize = abbreviationSizes[9];
				}
				var surfaceDiv = $assign("div", { "class": "appIconImage" });
				surfaceDiv.appendChild(getAccessibleAppArrowContainer());
				var style = 'font-size: ' + abbreviationSize + ';';
				if (stringWidth > 6) {
					style += ' font-weight: 500;';
				}
				var surfaceSpan = $assign("span", {
					style: style,
					class: 'avenir appIconSvgText ' + selectNoneClass
				}, currentApp.abbr);
				surfaceDiv.appendChild(surfaceSpan);
				surfaceDiv.appendChild($assign("img", { "src": currentApp.placeHolderIcon, "alt": "", "class": selectNoneClass }));
				$appLink.appendChild(surfaceDiv);
			}
			$listItem.appendChild($appLink);
			var p = $assign("p", { style: "margin:0 auto; text-align:center", class: selectNoneClass }, currentApp.label);
			if (currentApp.isNew) {
				// New app -> green circle indicator
				$appLink.appendChild($assign("div", { "class": "app-indicator app-indicator-new" }));
			}
			$appLink.appendChild(p);
		}

		$topAppContainer.appendChild($listItem);
	};

	var createMissingAppIcon = function createMissingAppIcon(currentApp, $listItem, selectNoneClass) {
		var $appLink = $assign("div", {
			"class": "app-indicator app-indicator-removed",
			"tabindex": 0,
			click: removeAppFromDropdown.bind(null, currentApp.uid, $listItem),
			keyup: removeAppFromDropdown.bind(null, currentApp.uid, $listItem),
			keydown: preventBrowserKeyboardDefaults
		});
		$appLink.innerHTML = getRemoveAppX();

		// Displaying Warnings in association with removed apps
		// - Requires access to orgUrlKey and isAdmin like functionality
		// - To be implemented after discussion
		var $missingIcon = $assign("div", {
			"class": "missing-app-icon appIconImage",
			"tabindex": 0,
			"blur": deactivateAccessibilityMode.bind(null, currentApp),
			title: ddState.i18n.removed
			// keyup: isDesktop ? showRemovedAppWarning.bind(null, currentApp.uid, $listItem) : () => {},
			// onclick: isDesktop ? showRemovedAppWarning.bind(null, currentApp.uid, $listItem) : () => {}
		});
		$missingIcon.appendChild(getAccessibleAppArrowContainer());
		$listItem.appendChild($appLink);
		$listItem.appendChild($missingIcon);
		$listItem.appendChild($assign("p", { style: "margin:0 auto; text-align:center", class: selectNoneClass }, currentApp.label));
	};

	var saveAppOrderToUserProperties = function saveAppOrderToUserProperties(primaryApps, secondaryApps, appRevisions) {
		$dispatch($control, 'header:apps:reorder', {
			icons: {
				primaryApps: primaryApps,
				secondaryApps: secondaryApps,
				revisions: appRevisions || {}
			}
		});
	};

	var expandSecondaryDropdown = function expandSecondaryDropdown() {
		$secondaryDropdownMenu.setAttribute('aria-expanded', "true");
		ddState.showMoreButton.classList.add("hide");
	};

	var hideOrShowDropAppsHereMessage = function hideOrShowDropAppsHereMessage(containerAppWasDroppedIn) {
		if (containerAppWasDroppedIn === ddState.bottomAppContainer && ddState.secondarySortable.toArray().length === 1) {
			showDragAppsHereBox(false);
		} else if (!ddState.secondarySortable.toArray().length) {
			showDragAppsHereBox(true);
		}
	};

	var getTextWidth = function getTextWidth(text, font) {
		// Adds support for app abbreviations in all languages
		var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
		var context = canvas.getContext("2d");
		context.font = font;
		var metrics = context.measureText(text);
		return metrics.width;
	};

	var getRemoveAppX = function getRemoveAppX() {
		return '<svg xmlns="https://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 32 32"  class="default-svg-fill"><path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z"/></svg>';
	};

	var getDownChevron = function getDownChevron() {
		return ' <svg xmlns="https://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 32 32" class="down-carrot-svg default-svg-fill"><path d="M28 9v5L16 26 4 14V9l12 12L28 9z"></path></svg>';
	};

	var interactWithAppLi = function interactWithAppLi(app, e) {
		if (e.button === 0) {
			ddState.startClientX = e.clientX;
			ddState.startClientY = e.clientY;
			ddState.startApp = app;
			ddState.dragEventWasCanceled = false;
			ddState.startElement = e.currentTarget;

			if (ddState.disabled) {
				if (app.canAccess) {
					ddState.dropdownNav.addEventListener("mouseup", closeAppLauncherOnClick);
				}
				return;
			}

			setTimeout(function (e) {
				ddState.startElement.classList.remove("sortable-drag-class");
			}, 1);

			if (app.isNew) {
				var primaryApps = ddState.primarySortable.toArray();
				// -- Bug occurs where duplicate value gets added to array when clicked
				if (ddState.duplicateValueIndex) {
					primaryApps.splice(ddState.duplicateValueIndex, 1);
				}

				saveAppOrderToUserProperties(primaryApps, ddState.secondarySortable.toArray(), { targetUid: e.currentTarget.getAttribute("data-id"), isNew: true, targetValue: null });
			}

			if (e.currentTarget) {
				e.currentTarget.classList.remove("sortable-drag-class");
			}

			ddState.listenForMouseOverElement = e.currentTarget.parentNode;
			ddState.listenForMouseOverElement.addEventListener("mousemove", simulateDragEvent);

			if (app.canAccess) {
				ddState.dropdownNav.addEventListener("mouseup", $closeAppLauncher);
			} else {
				ddState.dropdownNav.addEventListener("mouseup", deactivateDraggingStyles);
				var removedAppClass = "app-indicator app-indicator-removed";
				if (e.target.classList.className === removedAppClass || e.target.parentNode.className === removedAppClass || e.target.parentNode.parentNode.className === removedAppClass) {
					ddState.removeStartApp = true;
				}
			}
		}
	};

	var closeAppLauncherOnClick = function closeAppLauncherOnClick(e) {
		ddState.dropdownNav.removeEventListener("mouseup", closeAppLauncherOnClick, false);
		if (!dragEventWasSimulated(e.clientX, e.clientY)) {
			$closeAppLauncher();
		}
	};

	var generateCustomLinkClick = function generateCustomLinkClick(app, el, removeApp) {
		if (ddState.disabled || !app) return;
		if (app.canAccess) {
			$closeAppLauncher();
			window.open(app.url, "_blank");
		} else if (removeApp) {
			ddState.removeStartApp = false;
			removeAppFromDropdown(app.itemId || app.title, el);
		} else {
			showRemovedAppWarning(app.itemId || app.title, el);
		}
	};

	var removeAppFromDropdown = function removeAppFromDropdown(uid, el, e) {
		if (!e || verifyKeyPress(e.keyCode)) {
			$remove(el);
			setTimeout(function () {
				saveAppOrderToUserProperties(ddState.primarySortable.toArray(), ddState.secondarySortable.toArray());
				hideOrShowDropAppsHereMessage(ddState.bottomAppContainer);
			}, 0);
		}
	};

	var showRemovedAppWarning = function showRemovedAppWarning(uid, el, e) {
		ddState.dropdownWrapper.classList.remove("dragging");
		if (!ddState.removedAppWithFoucs && (!e || verifyKeyPress(e.keyCode))) {
			ddState.removedAppWithFoucs = { uid: uid, el: el };
		} else {
			ddState.removedAppWithFoucs = null;
		}
	};

	var deactivateDraggingStyles = function deactivateDraggingStyles(e) {
		ddState.dragEventWasCanceled = true;
	};

	var showDragAppsHereBox = function showDragAppsHereBox(show) {
		ddState.bottomAppContainer.classList[show ? "add" : "remove"]("drag-apps-here-box");
		ddState.dragAppsHereText.classList[show ? "remove" : "add"]("hide");
	};

	var disableLinkHref = function disableLinkHref(e, disable) {
		var link = e.item.children[1] && e.item.children[1].nodeName === "A" ? e.item.children[1] : e.item.children[0];
		if (disable) {
			ddState.recentlyRemovedHref = link.href;
			link.removeAttribute("href");
		} else {
			setTimeout(function () {
				link.href = ddState.recentlyRemovedHref;
			}, 1);
		}
	};

	var dismissIntro = function dismissIntro(e) {
		ddState.dragAndDropIntro.classList.add("hide");
		saveAppOrderToUserProperties(ddState.primarySortable.toArray(), ddState.secondarySortable.toArray());
	};

	var removeMouseUpListener = function removeMouseUpListener() {
		if (ddState.dropdownNav && ddState.dropdownNav.removeEventListener) {
			ddState.dropdownNav.removeEventListener('mouseup', $closeAppLauncher, false);
		}
	};

	var removeMouseOverListener = function removeMouseOverListener() {
		if (ddState.listenForMouseOverElement) {
			ddState.listenForMouseOverElement.removeEventListener('mousemove', simulateDragEvent, false);
		}
	};

	var simulateDragEvent = function simulateDragEvent(e) {
		if (dragEventWasSimulated(e.clientX, e.clientY)) {
			ddState.simulatedDragEvent = true;
			ddState.dropdownWrapper.classList.add("dragging");
			removeMouseOverListener();
		}
	};

	var applyDragAndDropAdjustmentsForIE = function applyDragAndDropAdjustmentsForIE(ieVersion) {
		if (ieVersion === "edge") {
			ddState.browserIsEdge = true;
		} else if (ieVersion === "ie11") {
			primarySortableOptions.ghostClass = "sortable-ghost-class-with-pointer-events";
			secondarySortableOptions.ghostClass = "sortable-ghost-class-with-pointer-events";
		}
	};

	var dragEventWasSimulated = function dragEventWasSimulated(clientX, clientY) {
		return !ddState.dragEventWasCanceled && !ddState.disabled && (Math.abs(clientX - ddState.startClientX) > ddState.maxDragErrorTollerance || Math.abs(clientY - ddState.startClientY) > ddState.maxDragErrorTollerance);
	};

	var verifyKeyPress = function verifyKeyPress(keyCode) {
		return !keyCode || keyCode === 13;
	};

	/* Apps: Helper functions for Arrow Key Accessibility
 /* ====================================================================== */

	var activateAccessibilityMode = function activateAccessibilityMode(app, e) {
		if (e.target.className !== "app-indicator app-indicator-removed") {
			if (e.keyCode === keys.SPACE) {
				if (ddState.activeAccessibleListElement) {
					return deactivateAccessibilityMode(app, e);
				}
				var arrowSpan = app.canAccess ? e.target.firstChild.firstChild : e.target.firstChild;
				var li = e.target.parentNode;
				var ul = li.parentNode;
				var liIndex = getIndexOfListItem(li);
				var numOfPrimaryApps = ddState.primarySortable.toArray().length;

				expandSecondaryDropdown();

				var combinedIndex = getCombinedIndexOfApp(liIndex, ul, numOfPrimaryApps);
				ddState.activeAccessibleListElement = li;
				ddState.activeAccessibleListElementEvent = moveAppWithArrowKeys.bind(null, app, getArrayOfDirections(combinedIndex, ul), li, ul, liIndex);
				li.addEventListener("keydown", ddState.activeAccessibleListElementEvent);

				populateAccessibleArrows(arrowSpan, liIndex, ul, numOfPrimaryApps);
			}
		}
		return false;
	};

	var deactivateAccessibilityMode = function deactivateAccessibilityMode(app, e) {
		var target = e.target || e;
		var arrowSpan = app.canAccess ? target.firstChild.firstChild : target.firstChild;
		if (arrowSpan) {
			arrowSpan.classList.remove("arrow-keys-enabled");
			arrowSpan.classList.add("arrow-keys-disabled");
		}
		if (ddState.activeAccessibleListElement) {
			ddState.activeAccessibleListElement.removeEventListener("keydown", ddState.activeAccessibleListElementEvent, false);
			ddState.activeAccessibleListElement = null;
		}
	};

	var getArrowKeyDirection = function getArrowKeyDirection(e) {
		if (e.keyCode === keys.DOWN_ARROW) return "bottom";
		if (e.keyCode === keys.UP_ARROW) return "top";
		if (e.keyCode === keys.RIGHT_ARROW) return isRightToLeft ? "left" : "right";
		if (e.keyCode === keys.LEFT_ARROW) return isRightToLeft ? "right" : "left";
	};

	var preventBrowserKeyboardDefaults = function preventBrowserKeyboardDefaults(e) {
		if (e.keyCode === keys.SPACE || e.keyCode === keys.DOWN_ARROW || e.keyCode === keys.UP_ARROW) {
			e.preventDefault();
		}
	};

	var moveAppWithArrowKeys = function moveAppWithArrowKeys(app, directions, li, ul, liIndex, e) {
		var direction = getArrowKeyDirection(e);

		if (direction === "bottom" && directions.indexOf("bottom") > -1) {
			moveAppByNumberOfSpaces(li, liIndex, ul, 3, app, e);
		}
		if (direction === "top" && directions.indexOf("top") > -1) {
			moveAppByNumberOfSpaces(li, liIndex, ul, -3, app, e);
		}
		if (direction === "right" && directions.indexOf("right") > -1) {
			moveAppByNumberOfSpaces(li, liIndex, ul, 1, app, e);
		}
		if (direction === "left" && directions.indexOf("left") > -1) {
			moveAppByNumberOfSpaces(li, liIndex, ul, -1, app, e);
		}
	};

	var moveAppByNumberOfSpaces = function moveAppByNumberOfSpaces(li, liIndex, ul, spaces, app, e) {
		var newPosition = liIndex + spaces;
		var ulLength = ul === ddState.bottomAppContainer ? ul.children.length - 1 : ul.children.length;
		var ulIsPrimaryApps = ul === ddState.topAppContainer;

		if (ulIsPrimaryApps && newPosition < ulLength || !ulIsPrimaryApps && newPosition <= ulLength && newPosition > 0) {
			var node = spaces < 0 ? ul.children[newPosition] : ul.children[newPosition].nextSibling;
			ul.insertBefore(li, node);
		} else if (ulIsPrimaryApps) {
			moveAppToSecondaryList(li, liIndex, spaces);
			hideOrShowDropAppsHereMessage(ddState.bottomAppContainer);
		} else {
			moveAppToPrimaryList(li, liIndex, spaces);
			hideOrShowDropAppsHereMessage(ddState.topAppContainer);
		}

		deactivateAccessibilityMode(app, e);
		if (app.canAccess && !app.isNew) {
			li.children[0].focus();
		} else {
			li.children[1].focus();
		}

		setTimeout(function () {
			if (app.isNew) {
				saveAppOrderToUserProperties(ddState.primarySortable.toArray(), ddState.secondarySortable.toArray(), { targetUid: app.itemId || app.title, isNew: true, targetValue: null });
			} else {
				saveAppOrderToUserProperties(ddState.primarySortable.toArray(), ddState.secondarySortable.toArray());
			}
		}, 0);
	};

	var moveAppToPrimaryList = function moveAppToPrimaryList(li, liIndex, spaces) {
		var list = ddState.topAppContainer;
		var appPositionInRow = liIndex % 3 || 3;
		var numOfAppsInLastRow = numOfPrimaryApps % 3 || 3;
		var numOfPrimaryApps = ddState.topAppContainer.children.length;

		if (Math.abs(spaces) === 1 || numOfAppsInLastRow === 3) return list.appendChild(li);
		if (appPositionInRow === 2 && numOfAppsInLastRow > 1) {
			return list.insertBefore(li, list.children[numOfPrimaryApps - (numOfAppsInLastRow - 1)]);
		}
		if (appPositionInRow === 1 && numOfPrimaryApps) {
			return list.insertBefore(li, list.children[numOfPrimaryApps - numOfAppsInLastRow]);
		}
		list.appendChild(li);
	};

	var moveAppToSecondaryList = function moveAppToSecondaryList(li, liIndex, spaces) {
		var list = ddState.bottomAppContainer;
		var numOfSecondaryApps = ddState.bottomAppContainer.children.length - 1;
		var appPositionInRow = (liIndex + 1) % 3 || 3;

		if (!numOfSecondaryApps) return list.appendChild(li);

		if (Math.abs(spaces) === 1) return list.insertBefore(li, list.children[1]);
		if (appPositionInRow === 2 && numOfSecondaryApps > 1) return list.insertBefore(li, list.children[2]);
		if (appPositionInRow === 3 && numOfSecondaryApps === 2) return list.insertBefore(li, list.children[3]);
		list.insertBefore(li, list.children[1]);
	};

	var getCombinedIndexOfApp = function getCombinedIndexOfApp(ind, ul, numOfPrimaryApps) {
		return ind + (ul === ddState.bottomAppContainer ? numOfPrimaryApps + 1 : 1);
	};

	var getIndexOfListItem = function getIndexOfListItem(li) {
		var ul = li.parentNode;
		return Array.prototype.indexOf.call(ul.children, li);
	};

	var getAccessibleAppArrowContainer = function getAccessibleAppArrowContainer() {
		return $assign("span", { "class": "arrow-keys-disabled" });
	};

	var populateAccessibleArrows = function populateAccessibleArrows(arrowSpan, liIndex, ul, numOfPrimaryApps) {
		if (arrowSpan) {
			arrowSpan.classList.add("arrow-keys-enabled");
			arrowSpan.classList.remove("arrow-keys-disabled");
		}

		var combinedIndex = getCombinedIndexOfApp(liIndex, ul, numOfPrimaryApps);
		arrowSpan.innerHTML = getAccessibleArrows(getArrayOfDirections(combinedIndex, ul), ul);
	};

	var getAccessibleArrows = function getAccessibleArrows(arrayOfDirections) {
		return arrayOfDirections.reduce(function (prev, direction) {
			return prev + getAccessibleArrow(direction);
		}, "");
	};

	var getAccessibleArrow = function getAccessibleArrow(direction) {
		return '<div class="app-arrow app-arrow-' + direction + '"></div>';
	};

	var getArrayOfDirections = function getArrayOfDirections(n, ul) {
		var dirs = [];
		var numOfPrimaryApps = ddState.topAppContainer.children.length;
		var numOfSecondaryApps = ddState.bottomAppContainer.children.length;
		var total = numOfPrimaryApps + numOfSecondaryApps;

		if (n - 1 > 0) dirs.push("left");
		if ((n + 1 <= total || !numOfSecondaryApps) && n !== numOfPrimaryApps) dirs.push("right");
		if (n - 3 > 0) dirs.push("top");
		if (n - numOfPrimaryApps + 2 < numOfSecondaryApps || ul === ddState.topAppContainer) dirs.push("bottom");
		return dirs;
	};

	/* Apps: Primary Sortable Options
 /* ====================================================================== */

	var primarySortableOptions = {
		group: "Apps", // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
		sort: true, // sorting inside list
		disabled: !isDesktop, // Disables the sortable if set to true.
		animation: 150, // ms, animation speed moving items when sorting, `0` — without animation
		forceFallback: true,
		delay: 0,
		fallbackTolerance: 0,
		ghostClass: "sortable-ghost-class",
		dragClass: "sortable-drag-class",
		onStart: function onStart(e) {
			ddState.dragAppsHereText.classList.add("hide");
			removeMouseUpListener();
			disableLinkHref(e, true);
		},
		onEnd: function onEnd(e) {
			e.preventDefault();
			removeMouseOverListener();
			disableLinkHref(e, false);
			ddState.dropdownWrapper.classList.remove("dragging");
			ddState.bottomAppContainer.classList.remove("on-drag-over");
			if (ddState.secondarySortable.toArray().length) {
				showDragAppsHereBox(false);
			}
			return false;
		},
		onMove: function onMove(e, oe) {
			if (e.to === ddState.bottomAppContainer) {
				ddState.bottomAppContainer.classList.add("on-drag-over");
			} else {
				ddState.bottomAppContainer.classList.remove("on-drag-over");
			}
		},
		store: {
			get: function get(sortable) {
				return sortable.options.group.name && sortable.options.group.name.split("!") || [];
			},
			set: function set(sortable) {
				if (!ddState.simulatedDragEvent) {
					generateCustomLinkClick(ddState.startApp, ddState.startElement, ddState.removeStartApp);
				} else {
					saveAppOrderToUserProperties(sortable.toArray(), ddState.secondarySortable.toArray());
				}
				if (ddState.startElement) ddState.startElement.classList.remove("sortable-drag-class");
				ddState.simulatedDragEvent = false;
			}
		}
	};

	/* Apps: Secondary Sortable Options
 /* ====================================================================== */

	var secondarySortableOptions = {
		group: "Apps",
		sort: true,
		disabled: !isDesktop,
		animation: 150,
		forceFallback: true,
		delay: 0,
		fallbackTolerance: 0,
		ghostClass: "sortable-ghost-class",
		dragClass: "sortable-drag-class",
		onStart: function onStart(e) {
			removeMouseUpListener();
			disableLinkHref(e, true);
		},
		onEnd: function onEnd(e) {
			e.preventDefault();
			removeMouseOverListener();
			disableLinkHref(e, false);
			ddState.dropdownWrapper.classList.remove("dragging");
			if (!ddState.secondarySortable.toArray().length) {
				showDragAppsHereBox(true);
			}
		},
		store: {
			get: function get(sortable) {
				return sortable.options.group.name && sortable.options.group.name.split('!') || [];
			},
			set: function set(sortable) {
				if (!ddState.simulatedDragEvent) {
					generateCustomLinkClick(ddState.startApp, ddState.startElement, ddState.removeStartApp);
				} else {
					saveAppOrderToUserProperties(ddState.primarySortable.toArray(), sortable.toArray());
				}
				if (ddState.startElement) ddState.startElement.classList.remove("sortable-drag-class");
				ddState.simulatedDragEvent = false;
			}
		}
	};

	/* Apps: On Update
 /* ====================================================================== */

	$target.addEventListener('header:update:apps', function (_ref) {
		var detail = _ref.detail;

		if (detail) {
			$target.classList.remove('hidden');
		} else {
			$target.classList.add('hidden');
			return;
		}

		var $gridIcon = $renderSvgOrImg({ imgDef: $grid.md, imgClass: prefix$8 + '-image', $targetElm: $appSwitcherIcon });
		// -- Remove display:none from style to show icon
		$control.removeAttribute('style');

		if (!detail.primary) return;
		if (detail.ieVersion) applyDragAndDropAdjustmentsForIE(detail.ieVersion);
		if (detail.disableDragAndDrop || !isDesktop) ddState.disabled = true;
		if (detail.text) {
			ddState.i18n = detail.text || {};
		}

		if (!detail.isLoading) {
			$target.appendChild($content);
			$control.className = prefix$8 + '-control';
			$control.setAttribute("tabindex", "0");
			$assign($control, { aria: { label: detail.label } });

			var numberOfApps = detail.primary.length;
			var dropdownWidth = ' dropdown-width-' + (numberOfApps < 3 ? numberOfApps : 3);

			// App Icons

			ddState.topAppContainer = $assign("ul", {
				class: prefix$8 + ' appContainer primary',
				role: "menu"
			});

			ddState.bottomAppContainer = $assign("ul", {
				class: prefix$8 + ' appContainer secondary',
				role: "menu"
			});

			if (ddState.dropdownWrapper) {
				// Destroy dropdown content to start from clean slate
				$content.innerHTML = "";
				if ($bottomContainer.lastChild) $bottomContainer.removeChild($bottomContainer.lastChild);
			}

			ddState.dragAppsHereText = $assign("p", { "class": "hide" }, ddState.i18n.dragAppsHere);
			ddState.bottomAppContainer.appendChild(ddState.dragAppsHereText);

			if (!detail.secondary.length) showDragAppsHereBox(true);

			ddState.primarySortable = Sortable.create(ddState.topAppContainer, primarySortableOptions);
			ddState.secondarySortable = Sortable.create(ddState.bottomAppContainer, secondarySortableOptions);

			detail.primary.forEach(function (a, i) {
				createDefaultAppLayout(ddState.topAppContainer, a, i);
			});
			detail.secondary.forEach(function (a, i) {
				createDefaultAppLayout(ddState.bottomAppContainer, a, i);
			});

			$bottomContainer.appendChild(ddState.bottomAppContainer);
			$secondaryDropdownMenu.appendChild($bottomContainer);

			var $dropdown = $assign('div', {
				class: ''
			});

			var $dragAndDropIntroText = $assign('p', {
				class: prefix$8 + ' drag-and-drop-intro'
			}, ddState.i18n.intro);
			var $dismissIntroButton = $assign('button', {
				class: prefix$8 + ' dismiss-intro-button',
				click: dismissIntro
			}, ddState.i18n.confirm);
			ddState.dragAndDropIntro = detail.displayIntro && !ddState.disabled ? $assign('div', { class: prefix$8 + ' intro-container' }, $dragAndDropIntroText, $dismissIntroButton) : "";

			var $showMoreChevron = $assign('span');
			$showMoreChevron.innerHTML = getDownChevron();
			ddState.showMoreButton = $assign('button', {
				class: prefix$8 + ' show-more-button',
				click: expandSecondaryDropdown
			}, ddState.i18n.showMore, $showMoreChevron);

			ddState.dropdownWrapper = $assign('div', {}, ddState.dragAndDropIntro, ddState.topAppContainer, ddState.showMoreButton, $secondaryDropdownMenu);

			ddState.dropdownNav = $assign('nav', {
				class: prefix$8 + ' dropdown-menu dropdown-right app-switcher-dropdown-menu ' + dropdownWidth,
				role: "menu"
			}, ddState.dropdownWrapper);

			$dropdown.appendChild(ddState.dropdownNav);
			$content.appendChild($dropdown);
			$replaceAll($target, $control, $content);
			ddState.loading = false;
			resetStateOfBottomContainer();
		} else {
			ddState.loading = true;
			$control.className = prefix$8 + '-control disabled-grid-icon';
			$control.setAttribute("tabindex", "-1");
			$replaceAll($target, $control);
		}
	});

	return $target;
});

var prefix$9 = 'esri-header-notifications';
var messages = [];

var createNotifications = (function () {
	var $target = $assign('div', { class: prefix$9 });

	// /* Notifications: Control
	// /* ====================================================================== */
	var $control = $assign('button', {
		class: prefix$9 + '-control', id: prefix$9 + '-control',
		aria: { controls: prefix$9 + '-menu', expanded: false, haspopup: true }
	});

	$control.addEventListener('click', function (event) {
		$dispatch($control, 'header:click:notifications', { event: event });
		$dispatch($control, 'header:menu:toggle', {
			notifications: true,
			control: $control,
			content: $content,
			state: 'menu',
			target: $target,
			type: 'notifications-toggle'
		});
	});

	// /* Notifications: Control
	// /* ====================================================================== */
	var $dismiss = $assign('button', { class: prefix$9 + '-dismiss-all' });
	$dismiss.addEventListener('click', function (event) {
		$dispatch($control, 'header:click:notifications:dismiss', messages);
	});

	/* Notifications: Content
 /* ====================================================================== */
	var $contentMessages = $assign('ul', {
		class: prefix$9 + '-messages'
	});
	var $content = $assign('div', {
		class: prefix$9 + '-menu', id: prefix$9 + '-menu',
		aria: { expanded: false, hidden: true }
	}, $contentMessages);

	/* Notifications: On Update
 /* ====================================================================== */
	$target.addEventListener('header:update:notifications', function (_ref) {
		var detail = _ref.detail;

		if (detail) {
			$target.classList.remove('hidden');
		} else {
			$target.classList.add('hidden');
			return;
		}
		messages = (detail.messages || []).map(function (item) {
			return item.id;
		});

		var $icon = $renderSvgOrImg({ imgDef: $bell.md, imgClass: prefix$9 + '-image', id: prefix$9 + '-image' });

		if (detail.messages && detail.messages.length > 0) {
			$replaceAll($dismiss, detail.dismissAllLabel);
			var $badge = $assign('span', { class: prefix$9 + '-badge' }, '' + detail.messages.length);
			$control.setAttribute('aria-label', detail.label || "Notifications");
			$replaceAll($control, $icon, $badge);
			// Update the notifications
			$replaceAll.apply(undefined, [$contentMessages].concat(toConsumableArray(detail.messages.map(function (item) {
				var $dismissBtn = $assign('button', {
					class: prefix$9 + '-message-dismiss',
					aria: { label: detail.dismissLabel }
				}, $renderSvgOrImg({ imgDef: $close.sm, imgClass: prefix$9 + '-dismiss-icon' }));
				$dismissBtn.addEventListener('click', function (event) {
					$dispatch($control, 'header:click:notifications:dismiss', [item.id]);
				});
				return $assign('li', { class: prefix$9 + '-message' }, $assign('span', { class: prefix$9 + '-message-text' }, item.text, $assign('span', { class: prefix$9 + '-message-date' }, item.date)), $dismissBtn);
			}))));
			$replaceAll($content, $contentMessages, $dismiss);
		} else {
			$replaceAll($control, $icon);
			var $emptyImage = $renderSvgOrImg({ imgDef: detail.emptyMessage.image.path, imgClass: prefix$9 + '-empty-image', viewBox: detail.emptyMessage.image.viewBox });
			var $emptyText = $assign('p', { class: prefix$9 + '-empty-text' }, detail.emptyMessage.text);
			var $empty = $assign('div', { class: prefix$9 + '-empty' }, $emptyImage, $emptyText);
			$replaceAll($content, $empty);
		}

		$replaceAll($target, $control, $content);
	});

	return $target;
});

/* Header
/* ====================================================================== */

var createHeader = (function (data) {
	var viewportIsSmall = void 0;
	var viewportIsSmallMedium = void 0;

	/* Canvas
 /* ====================================================================== */

	var $headerCanvas = $assign('div', {
		class: 'esri-header-canvas',
		tabindex: '-1',
		data: { open: false }
	});

	$headerCanvas.addEventListener('click', function () {
		$dispatch($headerCanvas, 'header:menu:close');
	});

	/* Elements
 /* ====================================================================== */

	var $brandStripe = createBrandStripe();
	var $brand = createBrand();
	var $inlineTitle = createInlineTitle();
	var $account = createAccount();
	var $mobileMenus = createMenus({ variant: 'mobile' });
	var $desktopMenus = createMenus({ variant: 'desktop' });
	var $search = createSearch();
	var $shoppingCart = createShoppingCart();
	var $inlineSearch = createInlineSearch();
	var $notifications = createNotifications();
	var $apps = createApps();

	var $client = $assign('div', { class: 'esri-header-client' }, $account);

	var $lineBreak = $assign('div', { class: 'esri-header-lineBreak' });
	var $headerContent = $assign('div', { class: 'esri-header -' + (data.theme || 'web') + ' ' + (data.collapseMenus ? '-always-hamburger' : '') }, $brandStripe, $brand, $mobileMenus, $inlineTitle, $desktopMenus, $search, $inlineSearch, $lineBreak, $shoppingCart, $notifications, $apps, $client);
	var $header = $assign('div', { class: 'esri-header-canvas' }, $headerCanvas, { class: 'esri-header-wrap' }, $headerContent);

	$enableFocusRing($header);

	/* On Header Update
 /* ====================================================================== */

	$header.addEventListener('header:update', function (_ref) {
		var detail = _ref.detail;

		if (detail.brand) {
			detail.brand.root = true;
		}

		$dispatch($brandStripe, 'header:update:brand', detail.brand);
		$dispatch($brand, 'header:update:brand', detail.brand);
		$dispatch($inlineTitle, 'header:update:inlineTitle', detail.brand);
		$dispatch($search, 'header:update:search', detail.search);
		$dispatch($inlineSearch, 'header:update:inlineSearch', detail.search);
		$dispatch($client.lastChild, 'header:update:account', detail.account);
		$dispatch($apps, 'header:update:apps', detail.apps);
		$dispatch($notifications, 'header:update:notifications', detail.notifications);
		$dispatch($shoppingCart, 'header:update:cart', detail.cart);

		if (detail.menus) {
			detail.menus.noBrand = !detail.brand;
			$dispatch($desktopMenus, 'header:update:menus', detail.menus);
			$dispatch($mobileMenus, 'header:update:menus', detail.menus);
		}

		if (detail.collapseMenus) {
			$dispatch($desktopMenus, 'header:update:collapseMenus', detail.collapseMenus);
			$dispatch($mobileMenus, 'header:update:collapseMenus', detail.collapseMenus);
		}

		if (detail.brand && detail.brand.topStripe) {
			$header.style.marginTop = '3px';
		}

		if (!detail.notifications && !detail.apps && !detail.account) {
			$lineBreak.classList.add('esri-header-lineBreak-hidden');
		}

		$header.ownerDocument.defaultView.addEventListener('keydown', function (_ref2) {
			var keyCode = _ref2.keyCode;

			if (27 === keyCode) {
				$dispatch($header, 'header:menu:close');
			}
		});
	});

	/* On Inline Search
 /* ====================================================================== */

	$header.addEventListener('header:search:typing', function (_ref3) {
		var detail = _ref3.detail;

		$dispatch($inlineSearch, 'header::search:typing', detail.search);
	});

	$header.addEventListener('header:search:update:suggestions', function (_ref4) {
		var detail = _ref4.detail;

		$dispatch($inlineSearch, 'header:search:populateSuggestions', detail);
	});

	/* On Save Title
 /* ====================================================================== */

	$header.addEventListener('header:title:submit', function (_ref5) {
		var detail = _ref5.detail;

		$dispatch($inlineSearch, 'header::title:save', detail.title);
	});

	/* On Drag & Drop Apps
 /* ====================================================================== */

	$header.addEventListener('header:apps:reorder', function (_ref6) {
		var detail = _ref6.detail;

		$dispatch($apps, 'header::apps:reorder', detail.icons);
	});

	/* On Header Menu Toggle
 /* ====================================================================== */

	$header.addEventListener('header:menu:toggle', function (_ref7) {
		var detail = _ref7.detail;

		var submenuShouldOpen = 'true' !== detail.control.getAttribute('aria-expanded');
		var eventType = submenuShouldOpen ? 'header:menu:open' : 'header:menu:close';

		$dispatch(detail.control, eventType, detail);
	});

	/* On Header Menu Open
 /* ====================================================================== */

	var accountDetail = null;
	var searchDetail = null;
	var menusDetail = null;
	var menuDetail = null;
	var appsDetail = null;
	var inlineTitleDetail = null;
	var notificationsDetail = null;

	$header.addEventListener('header:menu:open', function (_ref8) {
		var detail = _ref8.detail;

		var menuWrapper = detail.control.closest('.esri-header-menus');
		var hasMobileClass = menuWrapper && menuWrapper.classList.contains('-mobile');
		var isMenuMobile = 'menu-toggle' === detail.type && viewportIsSmallMedium.matches || hasMobileClass;
		var isAccountMobile = $account === detail.target && viewportIsSmall.matches;

		// Update Control, Content
		$assign(detail.control, { aria: { expanded: true } });
		$assign(detail.content, { aria: { expanded: true, hidden: false } });

		if (menuDetail && menuDetail.control !== detail.control) {
			$dispatch(menuDetail.control, 'header:menu:close', menuDetail);
		}

		if ('menu-toggle' === detail.type) {
			menuDetail = detail;
		}

		if ($search === detail.target || $inlineSearch === detail.target) {
			searchDetail = detail;
		} else if (searchDetail) {
			$dispatch($search, 'header:menu:close', searchDetail);
			searchDetail = null;
		}

		if ($desktopMenus === detail.target || $mobileMenus === detail.target) {
			menusDetail = detail;
		} else if (menusDetail && !isAccountMobile && !isMenuMobile) {
			$dispatch($desktopMenus, 'header:menu:close', menusDetail);
			$dispatch($mobileMenus, 'header:menu:close', menusDetail);
			menusDetail = null;
		}

		if ($inlineTitle === detail.target) {
			inlineTitleDetail = detail;
		} else if (inlineTitleDetail) {
			$dispatch($inlineTitle, 'header:menu:close', inlineTitleDetail);
			inlineTitleDetail = null;
		}

		if ($account === detail.target) {
			accountDetail = detail;
		} else if (accountDetail) {
			$dispatch($account, 'header:menu:close', accountDetail);
			accountDetail = null;
		}

		if ($apps === detail.target) {
			appsDetail = detail;
		} else if (appsDetail) {
			$dispatch($apps, 'header:menu:close', appsDetail);
			appsDetail = null;
		}

		if ($notifications === detail.target) {
			notificationsDetail = detail;
		} else if (notificationsDetail) {
			$dispatch($notifications, 'header:menu:close', notificationsDetail);
			notificationsDetail = null;
		}

		// Update Canvas
		$assign($headerCanvas, { data: { open: true, state: detail.state } });

		// Update Document Root
		$assign($header.ownerDocument.documentElement, { data: { 'header-is-open': true } });
	});

	/* On Header Menu Close
 /* ====================================================================== */

	$header.addEventListener('header:menu:close', function (_ref9) {
		var detail = _ref9.detail;

		var currentDetail = detail || searchDetail || inlineTitleDetail || accountDetail || appsDetail || notificationsDetail || menusDetail || menuDetail;

		if (currentDetail) {
			// Close the Detail
			$assign(currentDetail.control, { aria: { expanded: false } });
			$assign(currentDetail.content, { aria: { expanded: false, hidden: true } });

			var isBurger = currentDetail.control.closest('.-always-hamburger') !== null;
			var canvasShouldClose = !viewportIsSmallMedium.matches && !isBurger || 'menu-close' !== currentDetail.type && 'account-close' !== currentDetail.type;

			if (inlineTitleDetail && inlineTitleDetail.control === currentDetail.control) {
				$dispatch(inlineTitleDetail.content, 'header:inlineTitle:deactivated', currentDetail);
			}

			if (searchDetail && searchDetail.control === currentDetail.control) {
				$dispatch(searchDetail.content.lastChild, 'reset');
			}

			if (searchDetail && searchDetail.target === $inlineSearch && (currentDetail.type === "inlineSearch" || viewportIsSmall.matches)) {
				if (!menusDetail) {
					$dispatch(searchDetail.content, 'header:inlineSearch:deactivated', currentDetail);
				}
			}

			if (canvasShouldClose) {
				// Close the Canvas
				$assign($headerCanvas, { data: { open: false } });

				// Update Document Root
				$header.ownerDocument.documentElement.removeAttribute('data-header-is-open');
			}
		}
	});

	/* on Inline Search Activated
 /* ====================================================================== */

	$header.addEventListener('header:inlineSearch:activated', function (_ref10) {
		$desktopMenus.querySelector('.esri-header-menus-menu').classList.add('hidden');
		$lineBreak.classList.add('hidden');
		$mobileMenus.querySelector('.esri-header-menus-toggle').classList.add('hidden');
		if (viewportIsSmall) $brand.classList.add('hidden');
	});

	/* on Inline Search Deactivated
 /* ====================================================================== */

	$header.addEventListener('header:inlineSearch:deactivated', function (_ref11) {
		$desktopMenus.querySelector('.esri-header-menus-menu').classList.remove('hidden');
		$lineBreak.classList.remove('hidden');
		$mobileMenus.querySelector('.esri-header-menus-toggle').classList.remove('hidden');
		$brand.classList.remove('hidden');
	});

	/* on Inline Title Activated
 /* ====================================================================== */

	$header.addEventListener('header:inlineTitle:activated', function (_ref12) {
		if (!viewportIsSmall.matches) {
			$desktopMenus.querySelector('.esri-header-menus-content').classList.add('hidden');
			$mobileMenus.querySelector('.esri-header-menus-toggle').classList.add('hidden');
		}
	});

	/* on Inline Title Deactivated
 /* ====================================================================== */

	$header.addEventListener('header:inlineTitle:deactivated', function (_ref13) {
		if (!viewportIsSmallMedium.matches) {
			$desktopMenus.querySelector('.esri-header-menus-content').classList.remove('hidden');
		}
	});

	/* on domnodeinserted
 /* ====================================================================== */

	$header.addEventListener('DOMNodeInserted', function onload() {
		// Get Document and Window
		var $headerDocument = $header.ownerDocument;
		var $headerWindow = $headerDocument.defaultView;

		var $style = $assign('style');

		var overflowY = void 0;

		if ($header.parentNode) {
			// Unbind Node Inserted
			$header.removeEventListener('DOMNodeInserted', onload);

			// Update Header
			$dispatch($header, 'header:update', data);

			/* On Resize
   /* ============================================================== */

			$assign($headerDocument.head, $style);

			$headerWindow.addEventListener('orientationchange', onresize);
			$headerWindow.addEventListener('resize', onresize);

			/* On Match Media Change
   /* ============================================================== */

			viewportIsSmall = $headerWindow.matchMedia('(max-width: 767px)');
			viewportIsSmallMedium = $headerWindow.matchMedia('(max-width: 1023px)');

			viewportIsSmall.addListener(onViewportIsSmallChange);
			viewportIsSmallMedium.addListener(onViewportIsSmallMediumChange);

			onViewportIsSmallChange();
			onViewportIsSmallMediumChange();

			onresize();
		}

		function onresize() {
			var width = $headerDocument.documentElement.clientWidth;
			var height = $headerDocument.documentElement.clientHeight;
			var scrollHeight = $headerDocument.documentElement.scrollHeight;

			overflowY = getComputedStyle($headerDocument.documentElement).overflowY.replace('visible', scrollHeight > height ? 'scroll' : 'visible');

			$replaceAll($style, ':root{--esri-vw:' + width + 'px;--esri-vh:' + height + 'px}[data-header-is-open]{width:' + width + 'px;height:' + height + 'px;overflow-y:' + overflowY + '}');

			viewportIsSmallMedium = $headerWindow.matchMedia('(max-width: 1023px)');
			if (viewportIsSmallMedium.matches) {
				$desktopMenus.querySelector('.esri-header-menus-content').classList.add('hidden');
				$mobileMenus.querySelector('.esri-header-menus-content').classList.remove('hidden');
			} else {
				$desktopMenus.querySelector('.esri-header-menus-content').classList.remove('hidden');
				$mobileMenus.querySelector('.esri-header-menus-content').classList.add('hidden');
			}
		}

		function onViewportIsSmallChange() {
			if (viewportIsSmall.matches) {
				$dispatch($header, 'header:breakpoint:s');
				$mobileMenus.lastChild.appendChild($account);
				$notifications.classList.add('hidden');
				$apps.classList.add('hidden');
			} else {
				$dispatch($header, 'header:breakpoint:not:s');
				$client.appendChild($account);
				$notifications.classList.remove('hidden');
				$apps.classList.remove('hidden');
			}
		}

		function onViewportIsSmallMediumChange() {
			if (viewportIsSmallMedium.matches) {
				$dispatch($header, 'header:breakpoint:sm');
			} else {
				$dispatch($header, 'header:breakpoint:not:sm');
				$dispatch($header, 'header:menu:close');
			}
		}
	});

	return $header;
});

// Create branding and social sections
var brand = (function (data, prefix) {
	if (!data) {
		return;
	}
	return $assign('div', { class: prefix + '-brand' }, $assign('a', {
		class: prefix + '-brand-link',
		href: data.href,
		aria: { label: data.label }
	}, $renderSvgOrImg({ imgDef: data.path, imgClass: prefix + '-brand-image' })));
});

/* Language
/* ========================================================================== */

var languageDialog = (function (data) {
	var $choice = $assign.apply(undefined, ['select', {
		class: data.prefix + '-choice',
		autofocus: '',
		aria: { label: data.optionsLabel }
	}].concat(toConsumableArray(data.options.map(function (option) {
		var opt = document.createElement('option');
		opt.value = option.value;
		opt.innerHTML = option.label;
		return opt;
	}))));

	var $language = $assign('form', {
		class: data.prefix,
		aria: {
			labelledby: data.prefix + '-message',
			describedby: 'dialog-description'
		},
		role: 'dialog',
		tabindex: '-1'
	}, $assign('p', { class: data.prefix + '-message', id: data.prefix + '-message' }, $assign('strong', data.greetingLabel), ' ', data.messageLabel), $choice, $assign('button', {
		class: data.prefix + '-submit',
		type: 'submit',
		aria: { label: data.submitLabel + ' ' + data.optionsLabel }
	}, data.submitLabel));

	$language.addEventListener('submit', function (event) {
		event.preventDefault();

		window.location.href = $choice.value;
	});

	return $language;
});

/* Global Footer: Tooling
/* ========================================================================== */

/* Global Footer
/* ========================================================================== */

var language = (function (data, prefix) {
	// Language Selection Button
	var $control = $assign('button', {
		class: prefix + '-language-control',
		title: 'Current language, ' + data.buttonLabel
	}, '' + data.buttonLabel);

	var $barrier = $assign('div', { class: prefix + '-language' }, $control);

	$control.addEventListener('click', openDialog);

	// Language Dialog
	data.prefix = prefix + '-language-dialog';

	var $languageDialog = languageDialog(data);

	// Language Dialog Close Button
	var $languageDialogClose = $assign('button', {
		class: prefix + '-language-dialog-close', id: 'dialog-description',
		'aria-label': data.closeLabel
	}, $renderSvgOrImg({ imgDef: $close.md, imgClass: prefix + '-language-dialog-close-image' }));

	$languageDialogClose.addEventListener('click', closeDialog);

	$assign($languageDialog, $languageDialogClose);

	function openDialog(event) {
		event.preventDefault();

		$assign($canvas, {
			aria: { expanded: true }
		});
	}

	function closeDialog(event) {
		event.preventDefault();

		$assign($canvas, {
			aria: { expanded: false }
		});
	}

	var $canvas = $assign('div', {
		class: prefix + '-language-dialog-barrier',
		aria: { expanded: false }
	}, $languageDialog);

	$control.addEventListener('click', function () {
		$dispatch($control, 'footer:click:language', data);
	});

	$barrier.addEventListener('footer:update:language', function (_ref) {
		$control.innerHTML = '' + data.buttonLabel;

		$barrier.ownerDocument.body.appendChild($canvas);

		$barrier.ownerDocument.defaultView.addEventListener('keydown', function () {
			var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : event,
			    keyCode = _ref2.keyCode;

			if (27 === keyCode) {
				closeDialog(event);
			}
		});
	});

	return $barrier;
});

/* Global Footer
/* ========================================================================== */

// Create navigation
var menu = (function (data, prefix) {
	// ...
	var media = matchMedia('(max-width: 719px)');

	var mediaMatches = false;

	media.addListener(onchange);

	// Menu Items
	var links = data.menu.map(function (item, index) {
		return $assign('li', { class: prefix + '-menu-item', id: prefix + '-menu-link--' + index }, $assign('span', {
			class: prefix + '-menu-link',
			id: prefix + '-heading-' + index
		}, item.label),
		// Submenu
		$assign('div', {
			class: prefix + '-menu--sub', id: prefix + '-menu--sub--' + index,
			aria: { labelledby: prefix + '-menu-link--' + index }
		}, $assign.apply(undefined, ['ul', {
			class: prefix + '-menu-list--sub'
		}].concat(toConsumableArray(item.menu.map(function (subitem) {
			return $assign('li', { class: prefix + '-menu-item--sub' }, $assign('a', { class: prefix + '-menu-link--sub', href: subitem.href, 'aria-labelledby': prefix + '-menu--sub--' + index }, subitem.label));
		}))))));
	});

	// Menu
	var $target = $assign('nav', {
		class: prefix + '-menu',
		aria: { label: data.label }
	}, $assign.apply(undefined, ['ul', {
		class: prefix + '-menu-list'
	}].concat(toConsumableArray(links))));

	onchange();

	return $target;

	// ...
	function onchange() {
		if (mediaMatches !== media.matches) {
			mediaMatches = media.matches;

			links.forEach(function (link) {
				if (mediaMatches) {
					transformAsTouch(link.firstChild);
				} else {
					detransformAsTouch(link.firstChild);
				}
			});
		}
	}

	// ...
	function transformAsTouch(link) {
		var isVisible = 'true' !== link.nextElementSibling.getAttribute('aria-hidden');

		$assign(link, {
			tabindex: 0,
			role: 'button', aria: { expanded: !isVisible, haspopup: !isVisible }
		});

		link.addEventListener('click', onclick);
		link.addEventListener('keypress', onkeypress);

		$assign(link.nextElementSibling, { aria: { hidden: true } });
	}

	// ...
	function detransformAsTouch(link) {
		link.removeAttribute('aria-controls');
		link.removeAttribute('aria-expanded');
		link.removeAttribute('aria-haspopup');
		link.removeAttribute('role');
		link.removeAttribute('tabindex');

		link.addEventListener('click', onclick);
		link.addEventListener('keypress', onkeypress);

		link.nextElementSibling.removeAttribute('aria-hidden');
	}

	// ...
	function onclick(event) {
		var currentTarget = event.currentTarget;
		var nextTarget = currentTarget.nextElementSibling;
		var isVisible = 'true' !== nextTarget.getAttribute('aria-hidden');

		$assign(currentTarget, { aria: { expanded: !isVisible, haspopup: !isVisible } });

		$assign(nextTarget, { aria: { hidden: isVisible } });

		if (isVisible) {
			$assign(currentTarget, { aria: { controls: 0 } });
		} else {
			$assign(currentTarget, { aria: { controls: nextTarget.id } });
		}
	}

	// ...
	function onkeypress(event) {
		if (event.keyCode === 13 || event.keyCode === 32) {
			event.preventDefault();

			$dispatch(event.currentTarget, 'click');
		}
	}
});

/* Global Footer: Tooling
/* ========================================================================== */

/* Global Footer
/* ========================================================================== */

var info = (function (data, prefix) {
	return $assign('div', { class: prefix + '-info', aria: { label: data.label } }, $assign.apply(undefined, ['ul', { class: prefix + '-info-list' }].concat(toConsumableArray(data.menu.map(function (item, index) {
		return $assign('li', { class: prefix + '-info-item', id: prefix + '-info-link--' + index }, $assign('a', { class: prefix + '-info-link', href: item.href }, item.label));
	})))));
});

var social = (function (data, prefix) {
	var $socialIcons = document.createDocumentFragment();

	data.menu.forEach(function (item) {
		var platform = item.platform || item.label.toLowerCase().replace(' ', '-');
		$assign($socialIcons, $assign('a', {
			class: prefix + '-social-item ' + prefix + '-social-link -' + platform,
			href: item.href,
			aria: { label: item.label },
			target: '_blank',
			rel: 'noopener'
		}, $renderSvgOrImg({ imgDef: item.image.path, imgClass: prefix + '-social-image', alt: '', imgWidth: 30, imgHeight: 30, viewBox: item.image.viewBox })));
	});

	return $assign('div', { class: prefix + '-social' }, $assign('nav', { class: prefix + '-social-nav', aria: { label: data.label || 'Social Media' } }, $socialIcons));
});

var breadcrumbs = (function (data) {
  var showBreadCrumbs = data.showBreadcrumb;
  var breadcrumbHomeURL = data.breadcrumbHomeURL;
  var breadcrumbHomeLabel = data.breadcrumbHomeLabel;

  if (showBreadCrumbs) {
    var prefix = 'esri-footer-breadcrumb';
    var $breadCrumbs = document.createDocumentFragment();
    var breadCrumbItems = data.breadcrumbs || [];

    breadCrumbItems.forEach(function (crumb, index) {
      var isLastBreadCrumbItem = index === breadCrumbItems.length - 1;

      if (isLastBreadCrumbItem) {
        $assign($breadCrumbs, $assign('li', { class: prefix + '--items' }, '/', $assign('p', { href: crumb.href, class: prefix + '--items-current' }, '' + crumb.label)));
      } else {
        $assign($breadCrumbs, $assign('li', { class: prefix + '--items' }, '/', $assign('a', { href: crumb.href, class: prefix + '--items-link' }, '' + crumb.label)));
      }
    });

    return $assign('div', { class: '' + prefix }, $assign('a', { href: '' + breadcrumbHomeURL, class: prefix + '--pin' }, breadcrumbHomeLabel), $assign('ul', { class: prefix + '--list' }, $breadCrumbs));
  }
});

/* Global Footer
/* ========================================================================== */

var createFooter = (function (data) {
	var prefix = data.prefix || 'esri-footer';

	/* Footer Components
 /* ====================================================================== */

	var $footerBrand = brand(data.brand, prefix);
	var $footerInfo = info(data.info, prefix);
	var $footerLanguage = data.language ? language(data.language, prefix) : $assign('div', { class: 'esri-footer-language' });
	var $footerMenu = menu(data.menu, prefix);
	var $footerSocial = social(data.social, prefix);
	var $footerBreadcrumb = breadcrumbs(data);

	var $footer = $assign('footer', {
		class: prefix + ' ' + (data.hideMenus ? 'skinny-footer' : '')
	},

	/* Append Footer Components
 /* ================================================================== */
	$assign('div', { class: prefix + '-section--0' }, $footerBreadcrumb), $assign('div', { class: prefix + '--wrapper' }, $assign('div', { class: prefix + '-section--1 ' + (data.hideMenus ? 'hidden' : '') }, $footerBrand, $footerSocial), $assign('div', { class: prefix + '-section--2 ' + (data.hideMenus ? 'hidden' : '') }, $footerMenu), $assign('div', { class: prefix + '-section--3' }, $footerLanguage, $footerInfo)));

	/* On DOMNodeInserted
 /* ====================================================================== */

	$footer.addEventListener('DOMNodeInserted', function onDOMNodeInserted() {
		// Unbind Node Inserted
		$footer.removeEventListener('DOMNodeInserted', onDOMNodeInserted);

		// Scroll to Footer on focus
		$footer.addEventListener('focusin', function () {
			var scrollY = $footer.ownerDocument.documentElement.scrollHeight - $footer.scrollHeight;

			if (scrollY > $footer.ownerDocument.defaultView.pageYOffset) {
				$footer.ownerDocument.defaultView.scrollTo(0, scrollY);
			}
		});

		if (data.hideMenus) {
			document.querySelector('.esri-footer').setAttribute('data-minimal', true);
			document.querySelector('.esri-footer-barrier').classList.add('skinny-footer');
		}

		// Update Header
		$dispatch($footer, 'footer:update', data);
	});

	$enableFocusRing($footer);

	/* On Footer Update
 /* ====================================================================== */

	$footer.addEventListener('footer:update', function (_ref) {
		var detail = _ref.detail;

		if (detail.brand) {
			$dispatch($footerBrand, 'footer:update:brand', detail.brand);
		}

		if (detail.info) {
			$dispatch($footerInfo, 'footer:update:info', detail.info);
		}

		if (detail.language) {
			$dispatch($footerLanguage, 'footer:update:language', detail.language);
		}

		if (detail.menu) {
			$dispatch($footerMenu, 'footer:update:menu', detail.menu);
		}

		if (detail.social) {
			$dispatch($footerSocial, 'footer:update:social', detail.social);
		}

		$footer.ownerDocument.defaultView.addEventListener('scroll', onscroll);

		onscroll();

		function onscroll() {
			var hidden = 0 > window.pageYOffset;

			$assign($footer, { data: { hidden: hidden } });
		}
	});

	return $footer;
});

window.esriHeader = { create: createHeader };
window.esriFooter = { create: createFooter };

function buildHeader(_ref) {
	var targetElm = _ref.targetElm,
	    menuData = _ref.menuData;

	document.querySelector(targetElm).classList.add('esri-header-barrier');
	var $esriHeader = createHeader(menuData.header);
	var $headerBarrier = document.querySelector(targetElm);
	$headerBarrier.appendChild($esriHeader);

	window.esriHeader.node = $esriHeader;
}

function buildFooter(_ref2) {
	var targetElm = _ref2.targetElm,
	    menuData = _ref2.menuData;

	document.querySelector(targetElm).classList.add('esri-footer-barrier');
	var $esriFooter = createFooter(menuData.footer);
	var $footerBarrier = document.querySelector(targetElm);
	$footerBarrier.appendChild($esriFooter);

	window.esriFooter.node = $esriFooter;
}

var esriGlobalNav = {
	createHeader: buildHeader,
	createFooter: buildFooter,
	create: function create(_ref3) {
		var headerElm = _ref3.headerElm,
		    footerElm = _ref3.footerElm,
		    menuData = _ref3.menuData;

		buildHeader({ menuData: menuData, targetElm: headerElm });
		buildFooter({ menuData: menuData, targetElm: footerElm });
	}
};

return esriGlobalNav;

})));
//# sourceMappingURL=esri-global-nav.js.map
