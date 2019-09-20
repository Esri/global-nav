
/**
 * Global Nav - A centralized component for Esri's global navigation
 * @version v1.2.1
 * @link https://github.com/Esri/global-nav
 * @copyright 2019 Esri
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
    // $assign(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));

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

	var activeElements = [];

	target.addEventListener('blur', function () {
		activeElements.forEach(function (activeElement) {
			activeElement.removeAttribute('js-focus');
			activeElement.removeAttribute('js-focus-ring');
		});
	}, true);

	target.addEventListener('focus', function () {
		var activeElement = document.activeElement;

		if (activeElement instanceof Element) {
			activeElement.setAttribute('js-focus', '');

			if (keyboardThrottleTimeoutID) {
				activeElement.setAttribute('js-focus-ring', '');
			}

			activeElements.push(activeElement);
		}
	}, true);

	target.addEventListener('keydown', function () {
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
		return imgProps({ class: '' + imgClass, role: 'presentation', style: 'transform: rotate(360deg);' }, { id: id, alt: alt, viewBox: viewBox, width: imgWidth, height: imgHeight });
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
		role: 'navigation', aria: { labelledby: prefix + '-control' }
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

	// Signin Menu
	var $contentSigninMenu = $assign('ul', {
		class: prefix + '-signin-menu',
		role: 'group'
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
			var $brandText = $assign('span', { class: textClass }, detail.brandText);
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
  sm: ["M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z"]
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

		if (detail.brandText) {
			resetState();

			var maxTitleWidth = detail.maxViewWidth || 30;
			titleState.text = detail.brandText;
			titleState.pencilIcon = $renderSvgOrImg({ imgDef: $pencil.sm, imgClass: prefix$2 + '-edit-icon' });
			titleState.brandText = $assign('span', { class: prefix$2 + '-text', style: 'max-width: ' + maxTitleWidth + 'vw;' }, detail.brandText);
			if (detail.titleFontSize) titleState.brandText.style.fontSize = detail.titleFontSize + 'px';

			$assign($control, titleState.brandText, titleState.pencilIcon);
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

		$target.style.backgroundColor = detail.topStripe;
		$target.classList.add('-visible');
	});

	return $target;
});

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var hammer = createCommonjsModule(function (module) {
    /*! Hammer.JS - v2.0.7 - 2016-04-22
     * http://hammerjs.github.io/
     *
     * Copyright (c) 2016 Jorik Tangelder;
     * Licensed under the MIT license */
    (function (window, document, exportName, undefined) {
        'use strict';

        var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
        var TEST_ELEMENT = document.createElement('div');

        var TYPE_FUNCTION = 'function';

        var round = Math.round;
        var abs = Math.abs;
        var now = Date.now;

        /**
         * set a timeout with a given scope
         * @param {Function} fn
         * @param {Number} timeout
         * @param {Object} context
         * @returns {number}
         */
        function setTimeoutContext(fn, timeout, context) {
            return setTimeout(bindFn(fn, context), timeout);
        }

        /**
         * if the argument is an array, we want to execute the fn on each entry
         * if it aint an array we don't want to do a thing.
         * this is used by all the methods that accept a single and array argument.
         * @param {*|Array} arg
         * @param {String} fn
         * @param {Object} [context]
         * @returns {Boolean}
         */
        function invokeArrayArg(arg, fn, context) {
            if (Array.isArray(arg)) {
                each(arg, context[fn], context);
                return true;
            }
            return false;
        }

        /**
         * walk objects and arrays
         * @param {Object} obj
         * @param {Function} iterator
         * @param {Object} context
         */
        function each(obj, iterator, context) {
            var i;

            if (!obj) {
                return;
            }

            if (obj.forEach) {
                obj.forEach(iterator, context);
            } else if (obj.length !== undefined) {
                i = 0;
                while (i < obj.length) {
                    iterator.call(context, obj[i], i, obj);
                    i++;
                }
            } else {
                for (i in obj) {
                    obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
                }
            }
        }

        /**
         * wrap a method with a deprecation warning and stack trace
         * @param {Function} method
         * @param {String} name
         * @param {String} message
         * @returns {Function} A new function wrapping the supplied method.
         */
        function deprecate(method, name, message) {
            var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
            return function () {
                var e = new Error('get-stack-trace');
                var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

                var log = window.console && (window.console.warn || window.console.log);
                if (log) {
                    log.call(window.console, deprecationMessage, stack);
                }
                return method.apply(this, arguments);
            };
        }

        /**
         * extend object.
         * means that properties in dest will be overwritten by the ones in src.
         * @param {Object} target
         * @param {...Object} objects_to_assign
         * @returns {Object} target
         */
        var assign;
        if (typeof Object.assign !== 'function') {
            assign = function assign(target) {
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        } else {
            assign = Object.assign;
        }

        /**
         * extend object.
         * means that properties in dest will be overwritten by the ones in src.
         * @param {Object} dest
         * @param {Object} src
         * @param {Boolean} [merge=false]
         * @returns {Object} dest
         */
        var extend = deprecate(function extend(dest, src, merge) {
            var keys = Object.keys(src);
            var i = 0;
            while (i < keys.length) {
                if (!merge || merge && dest[keys[i]] === undefined) {
                    dest[keys[i]] = src[keys[i]];
                }
                i++;
            }
            return dest;
        }, 'extend', 'Use `assign`.');

        /**
         * merge the values from src in the dest.
         * means that properties that exist in dest will not be overwritten by src
         * @param {Object} dest
         * @param {Object} src
         * @returns {Object} dest
         */
        var merge = deprecate(function merge(dest, src) {
            return extend(dest, src, true);
        }, 'merge', 'Use `assign`.');

        /**
         * simple class inheritance
         * @param {Function} child
         * @param {Function} base
         * @param {Object} [properties]
         */
        function inherit(child, base, properties) {
            var baseP = base.prototype,
                childP;

            childP = child.prototype = Object.create(baseP);
            childP.constructor = child;
            childP._super = baseP;

            if (properties) {
                assign(childP, properties);
            }
        }

        /**
         * simple function bind
         * @param {Function} fn
         * @param {Object} context
         * @returns {Function}
         */
        function bindFn(fn, context) {
            return function boundFn() {
                return fn.apply(context, arguments);
            };
        }

        /**
         * let a boolean value also be a function that must return a boolean
         * this first item in args will be used as the context
         * @param {Boolean|Function} val
         * @param {Array} [args]
         * @returns {Boolean}
         */
        function boolOrFn(val, args) {
            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) == TYPE_FUNCTION) {
                return val.apply(args ? args[0] || undefined : undefined, args);
            }
            return val;
        }

        /**
         * use the val2 when val1 is undefined
         * @param {*} val1
         * @param {*} val2
         * @returns {*}
         */
        function ifUndefined(val1, val2) {
            return val1 === undefined ? val2 : val1;
        }

        /**
         * addEventListener with multiple events at once
         * @param {EventTarget} target
         * @param {String} types
         * @param {Function} handler
         */
        function addEventListeners(target, types, handler) {
            each(splitStr(types), function (type) {
                target.addEventListener(type, handler, false);
            });
        }

        /**
         * removeEventListener with multiple events at once
         * @param {EventTarget} target
         * @param {String} types
         * @param {Function} handler
         */
        function removeEventListeners(target, types, handler) {
            each(splitStr(types), function (type) {
                target.removeEventListener(type, handler, false);
            });
        }

        /**
         * find if a node is in the given parent
         * @method hasParent
         * @param {HTMLElement} node
         * @param {HTMLElement} parent
         * @return {Boolean} found
         */
        function hasParent(node, parent) {
            while (node) {
                if (node == parent) {
                    return true;
                }
                node = node.parentNode;
            }
            return false;
        }

        /**
         * small indexOf wrapper
         * @param {String} str
         * @param {String} find
         * @returns {Boolean} found
         */
        function inStr(str, find) {
            return str.indexOf(find) > -1;
        }

        /**
         * split string on whitespace
         * @param {String} str
         * @returns {Array} words
         */
        function splitStr(str) {
            return str.trim().split(/\s+/g);
        }

        /**
         * find if a array contains the object using indexOf or a simple polyFill
         * @param {Array} src
         * @param {String} find
         * @param {String} [findByKey]
         * @return {Boolean|Number} false when not found, or the index
         */
        function inArray(src, find, findByKey) {
            if (src.indexOf && !findByKey) {
                return src.indexOf(find);
            } else {
                var i = 0;
                while (i < src.length) {
                    if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
                        return i;
                    }
                    i++;
                }
                return -1;
            }
        }

        /**
         * convert array-like objects to real arrays
         * @param {Object} obj
         * @returns {Array}
         */
        function toArray$$1(obj) {
            return Array.prototype.slice.call(obj, 0);
        }

        /**
         * unique array with objects based on a key (like 'id') or just by the array's value
         * @param {Array} src [{id:1},{id:2},{id:1}]
         * @param {String} [key]
         * @param {Boolean} [sort=False]
         * @returns {Array} [{id:1},{id:2}]
         */
        function uniqueArray(src, key, sort) {
            var results = [];
            var values = [];
            var i = 0;

            while (i < src.length) {
                var val = key ? src[i][key] : src[i];
                if (inArray(values, val) < 0) {
                    results.push(src[i]);
                }
                values[i] = val;
                i++;
            }

            if (sort) {
                if (!key) {
                    results = results.sort();
                } else {
                    results = results.sort(function sortUniqueArray(a, b) {
                        return a[key] > b[key];
                    });
                }
            }

            return results;
        }

        /**
         * get the prefixed property
         * @param {Object} obj
         * @param {String} property
         * @returns {String|Undefined} prefixed
         */
        function prefixed(obj, property) {
            var prefix, prop;
            var camelProp = property[0].toUpperCase() + property.slice(1);

            var i = 0;
            while (i < VENDOR_PREFIXES.length) {
                prefix = VENDOR_PREFIXES[i];
                prop = prefix ? prefix + camelProp : property;

                if (prop in obj) {
                    return prop;
                }
                i++;
            }
            return undefined;
        }

        /**
         * get a unique id
         * @returns {number} uniqueId
         */
        var _uniqueId = 1;
        function uniqueId() {
            return _uniqueId++;
        }

        /**
         * get the window object of an element
         * @param {HTMLElement} element
         * @returns {DocumentView|Window}
         */
        function getWindowForElement(element) {
            var doc = element.ownerDocument || element;
            return doc.defaultView || doc.parentWindow || window;
        }

        var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

        var SUPPORT_TOUCH = 'ontouchstart' in window;
        var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
        var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

        var INPUT_TYPE_TOUCH = 'touch';
        var INPUT_TYPE_PEN = 'pen';
        var INPUT_TYPE_MOUSE = 'mouse';
        var INPUT_TYPE_KINECT = 'kinect';

        var COMPUTE_INTERVAL = 25;

        var INPUT_START = 1;
        var INPUT_MOVE = 2;
        var INPUT_END = 4;
        var INPUT_CANCEL = 8;

        var DIRECTION_NONE = 1;
        var DIRECTION_LEFT = 2;
        var DIRECTION_RIGHT = 4;
        var DIRECTION_UP = 8;
        var DIRECTION_DOWN = 16;

        var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
        var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
        var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

        var PROPS_XY = ['x', 'y'];
        var PROPS_CLIENT_XY = ['clientX', 'clientY'];

        /**
         * create new input type manager
         * @param {Manager} manager
         * @param {Function} callback
         * @returns {Input}
         * @constructor
         */
        function Input(manager, callback) {
            var self = this;
            this.manager = manager;
            this.callback = callback;
            this.element = manager.element;
            this.target = manager.options.inputTarget;

            // smaller wrapper around the handler, for the scope and the enabled state of the manager,
            // so when disabled the input events are completely bypassed.
            this.domHandler = function (ev) {
                if (boolOrFn(manager.options.enable, [manager])) {
                    self.handler(ev);
                }
            };

            this.init();
        }

        Input.prototype = {
            /**
             * should handle the inputEvent data and trigger the callback
             * @virtual
             */
            handler: function handler() {},

            /**
             * bind the events
             */
            init: function init() {
                this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
                this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
                this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
            },

            /**
             * unbind the events
             */
            destroy: function destroy() {
                this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
                this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
                this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
            }
        };

        /**
         * create new input type manager
         * called by the Manager constructor
         * @param {Hammer} manager
         * @returns {Input}
         */
        function createInputInstance(manager) {
            var Type;
            var inputClass = manager.options.inputClass;

            if (inputClass) {
                Type = inputClass;
            } else if (SUPPORT_POINTER_EVENTS) {
                Type = PointerEventInput;
            } else if (SUPPORT_ONLY_TOUCH) {
                Type = TouchInput;
            } else if (!SUPPORT_TOUCH) {
                Type = MouseInput;
            } else {
                Type = TouchMouseInput;
            }
            return new Type(manager, inputHandler);
        }

        /**
         * handle input events
         * @param {Manager} manager
         * @param {String} eventType
         * @param {Object} input
         */
        function inputHandler(manager, eventType, input) {
            var pointersLen = input.pointers.length;
            var changedPointersLen = input.changedPointers.length;
            var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
            var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;

            input.isFirst = !!isFirst;
            input.isFinal = !!isFinal;

            if (isFirst) {
                manager.session = {};
            }

            // source event is the normalized value of the domEvents
            // like 'touchstart, mouseup, pointerdown'
            input.eventType = eventType;

            // compute scale, rotation etc
            computeInputData(manager, input);

            // emit secret event
            manager.emit('hammer.input', input);

            manager.recognize(input);
            manager.session.prevInput = input;
        }

        /**
         * extend the data with some usable properties like scale, rotate, velocity etc
         * @param {Object} manager
         * @param {Object} input
         */
        function computeInputData(manager, input) {
            var session = manager.session;
            var pointers = input.pointers;
            var pointersLength = pointers.length;

            // store the first input to calculate the distance and direction
            if (!session.firstInput) {
                session.firstInput = simpleCloneInputData(input);
            }

            // to compute scale and rotation we need to store the multiple touches
            if (pointersLength > 1 && !session.firstMultiple) {
                session.firstMultiple = simpleCloneInputData(input);
            } else if (pointersLength === 1) {
                session.firstMultiple = false;
            }

            var firstInput = session.firstInput;
            var firstMultiple = session.firstMultiple;
            var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

            var center = input.center = getCenter(pointers);
            input.timeStamp = now();
            input.deltaTime = input.timeStamp - firstInput.timeStamp;

            input.angle = getAngle(offsetCenter, center);
            input.distance = getDistance(offsetCenter, center);

            computeDeltaXY(session, input);
            input.offsetDirection = getDirection(input.deltaX, input.deltaY);

            var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
            input.overallVelocityX = overallVelocity.x;
            input.overallVelocityY = overallVelocity.y;
            input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;

            input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
            input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

            input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;

            computeIntervalInputData(session, input);

            // find the correct target
            var target = manager.element;
            if (hasParent(input.srcEvent.target, target)) {
                target = input.srcEvent.target;
            }
            input.target = target;
        }

        function computeDeltaXY(session, input) {
            var center = input.center;
            var offset = session.offsetDelta || {};
            var prevDelta = session.prevDelta || {};
            var prevInput = session.prevInput || {};

            if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
                prevDelta = session.prevDelta = {
                    x: prevInput.deltaX || 0,
                    y: prevInput.deltaY || 0
                };

                offset = session.offsetDelta = {
                    x: center.x,
                    y: center.y
                };
            }

            input.deltaX = prevDelta.x + (center.x - offset.x);
            input.deltaY = prevDelta.y + (center.y - offset.y);
        }

        /**
         * velocity is calculated every x ms
         * @param {Object} session
         * @param {Object} input
         */
        function computeIntervalInputData(session, input) {
            var last = session.lastInterval || input,
                deltaTime = input.timeStamp - last.timeStamp,
                velocity,
                velocityX,
                velocityY,
                direction;

            if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
                var deltaX = input.deltaX - last.deltaX;
                var deltaY = input.deltaY - last.deltaY;

                var v = getVelocity(deltaTime, deltaX, deltaY);
                velocityX = v.x;
                velocityY = v.y;
                velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
                direction = getDirection(deltaX, deltaY);

                session.lastInterval = input;
            } else {
                // use latest velocity info if it doesn't overtake a minimum period
                velocity = last.velocity;
                velocityX = last.velocityX;
                velocityY = last.velocityY;
                direction = last.direction;
            }

            input.velocity = velocity;
            input.velocityX = velocityX;
            input.velocityY = velocityY;
            input.direction = direction;
        }

        /**
         * create a simple clone from the input used for storage of firstInput and firstMultiple
         * @param {Object} input
         * @returns {Object} clonedInputData
         */
        function simpleCloneInputData(input) {
            // make a simple copy of the pointers because we will get a reference if we don't
            // we only need clientXY for the calculations
            var pointers = [];
            var i = 0;
            while (i < input.pointers.length) {
                pointers[i] = {
                    clientX: round(input.pointers[i].clientX),
                    clientY: round(input.pointers[i].clientY)
                };
                i++;
            }

            return {
                timeStamp: now(),
                pointers: pointers,
                center: getCenter(pointers),
                deltaX: input.deltaX,
                deltaY: input.deltaY
            };
        }

        /**
         * get the center of all the pointers
         * @param {Array} pointers
         * @return {Object} center contains `x` and `y` properties
         */
        function getCenter(pointers) {
            var pointersLength = pointers.length;

            // no need to loop when only one touch
            if (pointersLength === 1) {
                return {
                    x: round(pointers[0].clientX),
                    y: round(pointers[0].clientY)
                };
            }

            var x = 0,
                y = 0,
                i = 0;
            while (i < pointersLength) {
                x += pointers[i].clientX;
                y += pointers[i].clientY;
                i++;
            }

            return {
                x: round(x / pointersLength),
                y: round(y / pointersLength)
            };
        }

        /**
         * calculate the velocity between two points. unit is in px per ms.
         * @param {Number} deltaTime
         * @param {Number} x
         * @param {Number} y
         * @return {Object} velocity `x` and `y`
         */
        function getVelocity(deltaTime, x, y) {
            return {
                x: x / deltaTime || 0,
                y: y / deltaTime || 0
            };
        }

        /**
         * get the direction between two points
         * @param {Number} x
         * @param {Number} y
         * @return {Number} direction
         */
        function getDirection(x, y) {
            if (x === y) {
                return DIRECTION_NONE;
            }

            if (abs(x) >= abs(y)) {
                return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
            }
            return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
        }

        /**
         * calculate the absolute distance between two points
         * @param {Object} p1 {x, y}
         * @param {Object} p2 {x, y}
         * @param {Array} [props] containing x and y keys
         * @return {Number} distance
         */
        function getDistance(p1, p2, props) {
            if (!props) {
                props = PROPS_XY;
            }
            var x = p2[props[0]] - p1[props[0]],
                y = p2[props[1]] - p1[props[1]];

            return Math.sqrt(x * x + y * y);
        }

        /**
         * calculate the angle between two coordinates
         * @param {Object} p1
         * @param {Object} p2
         * @param {Array} [props] containing x and y keys
         * @return {Number} angle
         */
        function getAngle(p1, p2, props) {
            if (!props) {
                props = PROPS_XY;
            }
            var x = p2[props[0]] - p1[props[0]],
                y = p2[props[1]] - p1[props[1]];
            return Math.atan2(y, x) * 180 / Math.PI;
        }

        /**
         * calculate the rotation degrees between two pointersets
         * @param {Array} start array of pointers
         * @param {Array} end array of pointers
         * @return {Number} rotation
         */
        function getRotation(start, end) {
            return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
        }

        /**
         * calculate the scale factor between two pointersets
         * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
         * @param {Array} start array of pointers
         * @param {Array} end array of pointers
         * @return {Number} scale
         */
        function getScale(start, end) {
            return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
        }

        var MOUSE_INPUT_MAP = {
            mousedown: INPUT_START,
            mousemove: INPUT_MOVE,
            mouseup: INPUT_END
        };

        var MOUSE_ELEMENT_EVENTS = 'mousedown';
        var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

        /**
         * Mouse events input
         * @constructor
         * @extends Input
         */
        function MouseInput() {
            this.evEl = MOUSE_ELEMENT_EVENTS;
            this.evWin = MOUSE_WINDOW_EVENTS;

            this.pressed = false; // mousedown state

            Input.apply(this, arguments);
        }

        inherit(MouseInput, Input, {
            /**
             * handle mouse events
             * @param {Object} ev
             */
            handler: function MEhandler(ev) {
                var eventType = MOUSE_INPUT_MAP[ev.type];

                // on start we want to have the left mouse button down
                if (eventType & INPUT_START && ev.button === 0) {
                    this.pressed = true;
                }

                if (eventType & INPUT_MOVE && ev.which !== 1) {
                    eventType = INPUT_END;
                }

                // mouse must be down
                if (!this.pressed) {
                    return;
                }

                if (eventType & INPUT_END) {
                    this.pressed = false;
                }

                this.callback(this.manager, eventType, {
                    pointers: [ev],
                    changedPointers: [ev],
                    pointerType: INPUT_TYPE_MOUSE,
                    srcEvent: ev
                });
            }
        });

        var POINTER_INPUT_MAP = {
            pointerdown: INPUT_START,
            pointermove: INPUT_MOVE,
            pointerup: INPUT_END,
            pointercancel: INPUT_CANCEL,
            pointerout: INPUT_CANCEL
        };

        // in IE10 the pointer types is defined as an enum
        var IE10_POINTER_TYPE_ENUM = {
            2: INPUT_TYPE_TOUCH,
            3: INPUT_TYPE_PEN,
            4: INPUT_TYPE_MOUSE,
            5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
        };

        var POINTER_ELEMENT_EVENTS = 'pointerdown';
        var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

        // IE10 has prefixed support, and case-sensitive
        if (window.MSPointerEvent && !window.PointerEvent) {
            POINTER_ELEMENT_EVENTS = 'MSPointerDown';
            POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
        }

        /**
         * Pointer events input
         * @constructor
         * @extends Input
         */
        function PointerEventInput() {
            this.evEl = POINTER_ELEMENT_EVENTS;
            this.evWin = POINTER_WINDOW_EVENTS;

            Input.apply(this, arguments);

            this.store = this.manager.session.pointerEvents = [];
        }

        inherit(PointerEventInput, Input, {
            /**
             * handle mouse events
             * @param {Object} ev
             */
            handler: function PEhandler(ev) {
                var store = this.store;
                var removePointer = false;

                var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
                var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
                var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

                var isTouch = pointerType == INPUT_TYPE_TOUCH;

                // get index of the event in the store
                var storeIndex = inArray(store, ev.pointerId, 'pointerId');

                // start and mouse must be down
                if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
                    if (storeIndex < 0) {
                        store.push(ev);
                        storeIndex = store.length - 1;
                    }
                } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                    removePointer = true;
                }

                // it not found, so the pointer hasn't been down (so it's probably a hover)
                if (storeIndex < 0) {
                    return;
                }

                // update the event in the store
                store[storeIndex] = ev;

                this.callback(this.manager, eventType, {
                    pointers: store,
                    changedPointers: [ev],
                    pointerType: pointerType,
                    srcEvent: ev
                });

                if (removePointer) {
                    // remove from the store
                    store.splice(storeIndex, 1);
                }
            }
        });

        var SINGLE_TOUCH_INPUT_MAP = {
            touchstart: INPUT_START,
            touchmove: INPUT_MOVE,
            touchend: INPUT_END,
            touchcancel: INPUT_CANCEL
        };

        var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
        var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

        /**
         * Touch events input
         * @constructor
         * @extends Input
         */
        function SingleTouchInput() {
            this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
            this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
            this.started = false;

            Input.apply(this, arguments);
        }

        inherit(SingleTouchInput, Input, {
            handler: function TEhandler(ev) {
                var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

                // should we handle the touch events?
                if (type === INPUT_START) {
                    this.started = true;
                }

                if (!this.started) {
                    return;
                }

                var touches = normalizeSingleTouches.call(this, ev, type);

                // when done, reset the started state
                if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
                    this.started = false;
                }

                this.callback(this.manager, type, {
                    pointers: touches[0],
                    changedPointers: touches[1],
                    pointerType: INPUT_TYPE_TOUCH,
                    srcEvent: ev
                });
            }
        });

        /**
         * @this {TouchInput}
         * @param {Object} ev
         * @param {Number} type flag
         * @returns {undefined|Array} [all, changed]
         */
        function normalizeSingleTouches(ev, type) {
            var all = toArray$$1(ev.touches);
            var changed = toArray$$1(ev.changedTouches);

            if (type & (INPUT_END | INPUT_CANCEL)) {
                all = uniqueArray(all.concat(changed), 'identifier', true);
            }

            return [all, changed];
        }

        var TOUCH_INPUT_MAP = {
            touchstart: INPUT_START,
            touchmove: INPUT_MOVE,
            touchend: INPUT_END,
            touchcancel: INPUT_CANCEL
        };

        var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

        /**
         * Multi-user touch events input
         * @constructor
         * @extends Input
         */
        function TouchInput() {
            this.evTarget = TOUCH_TARGET_EVENTS;
            this.targetIds = {};

            Input.apply(this, arguments);
        }

        inherit(TouchInput, Input, {
            handler: function MTEhandler(ev) {
                var type = TOUCH_INPUT_MAP[ev.type];
                var touches = getTouches.call(this, ev, type);
                if (!touches) {
                    return;
                }

                this.callback(this.manager, type, {
                    pointers: touches[0],
                    changedPointers: touches[1],
                    pointerType: INPUT_TYPE_TOUCH,
                    srcEvent: ev
                });
            }
        });

        /**
         * @this {TouchInput}
         * @param {Object} ev
         * @param {Number} type flag
         * @returns {undefined|Array} [all, changed]
         */
        function getTouches(ev, type) {
            var allTouches = toArray$$1(ev.touches);
            var targetIds = this.targetIds;

            // when there is only one touch, the process can be simplified
            if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
                targetIds[allTouches[0].identifier] = true;
                return [allTouches, allTouches];
            }

            var i,
                targetTouches,
                changedTouches = toArray$$1(ev.changedTouches),
                changedTargetTouches = [],
                target = this.target;

            // get target touches from touches
            targetTouches = allTouches.filter(function (touch) {
                return hasParent(touch.target, target);
            });

            // collect touches
            if (type === INPUT_START) {
                i = 0;
                while (i < targetTouches.length) {
                    targetIds[targetTouches[i].identifier] = true;
                    i++;
                }
            }

            // filter changed touches to only contain touches that exist in the collected target ids
            i = 0;
            while (i < changedTouches.length) {
                if (targetIds[changedTouches[i].identifier]) {
                    changedTargetTouches.push(changedTouches[i]);
                }

                // cleanup removed touches
                if (type & (INPUT_END | INPUT_CANCEL)) {
                    delete targetIds[changedTouches[i].identifier];
                }
                i++;
            }

            if (!changedTargetTouches.length) {
                return;
            }

            return [
            // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
            uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
        }

        /**
         * Combined touch and mouse input
         *
         * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
         * This because touch devices also emit mouse events while doing a touch.
         *
         * @constructor
         * @extends Input
         */

        var DEDUP_TIMEOUT = 2500;
        var DEDUP_DISTANCE = 25;

        function TouchMouseInput() {
            Input.apply(this, arguments);

            var handler = bindFn(this.handler, this);
            this.touch = new TouchInput(this.manager, handler);
            this.mouse = new MouseInput(this.manager, handler);

            this.primaryTouch = null;
            this.lastTouches = [];
        }

        inherit(TouchMouseInput, Input, {
            /**
             * handle mouse and touch events
             * @param {Hammer} manager
             * @param {String} inputEvent
             * @param {Object} inputData
             */
            handler: function TMEhandler(manager, inputEvent, inputData) {
                var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
                    isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

                if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
                    return;
                }

                // when we're in a touch event, record touches to  de-dupe synthetic mouse event
                if (isTouch) {
                    recordTouches.call(this, inputEvent, inputData);
                } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
                    return;
                }

                this.callback(manager, inputEvent, inputData);
            },

            /**
             * remove the event listeners
             */
            destroy: function destroy() {
                this.touch.destroy();
                this.mouse.destroy();
            }
        });

        function recordTouches(eventType, eventData) {
            if (eventType & INPUT_START) {
                this.primaryTouch = eventData.changedPointers[0].identifier;
                setLastTouch.call(this, eventData);
            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
                setLastTouch.call(this, eventData);
            }
        }

        function setLastTouch(eventData) {
            var touch = eventData.changedPointers[0];

            if (touch.identifier === this.primaryTouch) {
                var lastTouch = { x: touch.clientX, y: touch.clientY };
                this.lastTouches.push(lastTouch);
                var lts = this.lastTouches;
                var removeLastTouch = function removeLastTouch() {
                    var i = lts.indexOf(lastTouch);
                    if (i > -1) {
                        lts.splice(i, 1);
                    }
                };
                setTimeout(removeLastTouch, DEDUP_TIMEOUT);
            }
        }

        function isSyntheticEvent(eventData) {
            var x = eventData.srcEvent.clientX,
                y = eventData.srcEvent.clientY;
            for (var i = 0; i < this.lastTouches.length; i++) {
                var t = this.lastTouches[i];
                var dx = Math.abs(x - t.x),
                    dy = Math.abs(y - t.y);
                if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
                    return true;
                }
            }
            return false;
        }

        var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
        var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

        // magical touchAction value
        var TOUCH_ACTION_COMPUTE = 'compute';
        var TOUCH_ACTION_AUTO = 'auto';
        var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
        var TOUCH_ACTION_NONE = 'none';
        var TOUCH_ACTION_PAN_X = 'pan-x';
        var TOUCH_ACTION_PAN_Y = 'pan-y';
        var TOUCH_ACTION_MAP = getTouchActionProps();

        /**
         * Touch Action
         * sets the touchAction property or uses the js alternative
         * @param {Manager} manager
         * @param {String} value
         * @constructor
         */
        function TouchAction(manager, value) {
            this.manager = manager;
            this.set(value);
        }

        TouchAction.prototype = {
            /**
             * set the touchAction value on the element or enable the polyfill
             * @param {String} value
             */
            set: function set$$1(value) {
                // find out the touch-action by the event handlers
                if (value == TOUCH_ACTION_COMPUTE) {
                    value = this.compute();
                }

                if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
                    this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
                }
                this.actions = value.toLowerCase().trim();
            },

            /**
             * just re-set the touchAction value
             */
            update: function update() {
                this.set(this.manager.options.touchAction);
            },

            /**
             * compute the value for the touchAction property based on the recognizer's settings
             * @returns {String} value
             */
            compute: function compute() {
                var actions = [];
                each(this.manager.recognizers, function (recognizer) {
                    if (boolOrFn(recognizer.options.enable, [recognizer])) {
                        actions = actions.concat(recognizer.getTouchAction());
                    }
                });
                return cleanTouchActions(actions.join(' '));
            },

            /**
             * this method is called on each input cycle and provides the preventing of the browser behavior
             * @param {Object} input
             */
            preventDefaults: function preventDefaults(input) {
                var srcEvent = input.srcEvent;
                var direction = input.offsetDirection;

                // if the touch action did prevented once this session
                if (this.manager.session.prevented) {
                    srcEvent.preventDefault();
                    return;
                }

                var actions = this.actions;
                var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
                var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
                var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

                if (hasNone) {
                    //do not prevent defaults if this is a tap gesture

                    var isTapPointer = input.pointers.length === 1;
                    var isTapMovement = input.distance < 2;
                    var isTapTouchTime = input.deltaTime < 250;

                    if (isTapPointer && isTapMovement && isTapTouchTime) {
                        return;
                    }
                }

                if (hasPanX && hasPanY) {
                    // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
                    return;
                }

                if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
                    return this.preventSrc(srcEvent);
                }
            },

            /**
             * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
             * @param {Object} srcEvent
             */
            preventSrc: function preventSrc(srcEvent) {
                this.manager.session.prevented = true;
                srcEvent.preventDefault();
            }
        };

        /**
         * when the touchActions are collected they are not a valid value, so we need to clean things up. *
         * @param {String} actions
         * @returns {*}
         */
        function cleanTouchActions(actions) {
            // none
            if (inStr(actions, TOUCH_ACTION_NONE)) {
                return TOUCH_ACTION_NONE;
            }

            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

            // if both pan-x and pan-y are set (different recognizers
            // for different directions, e.g. horizontal pan but vertical swipe?)
            // we need none (as otherwise with pan-x pan-y combined none of these
            // recognizers will work, since the browser would handle all panning
            if (hasPanX && hasPanY) {
                return TOUCH_ACTION_NONE;
            }

            // pan-x OR pan-y
            if (hasPanX || hasPanY) {
                return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
            }

            // manipulation
            if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
                return TOUCH_ACTION_MANIPULATION;
            }

            return TOUCH_ACTION_AUTO;
        }

        function getTouchActionProps() {
            if (!NATIVE_TOUCH_ACTION) {
                return false;
            }
            var touchMap = {};
            var cssSupports = window.CSS && window.CSS.supports;
            ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {

                // If css.supports is not supported but there is native touch-action assume it supports
                // all values. This is the case for IE 10 and 11.
                touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
            });
            return touchMap;
        }

        /**
         * Recognizer flow explained; *
         * All recognizers have the initial state of POSSIBLE when a input session starts.
         * The definition of a input session is from the first input until the last input, with all it's movement in it. *
         * Example session for mouse-input: mousedown -> mousemove -> mouseup
         *
         * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
         * which determines with state it should be.
         *
         * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
         * POSSIBLE to give it another change on the next cycle.
         *
         *               Possible
         *                  |
         *            +-----+---------------+
         *            |                     |
         *      +-----+-----+               |
         *      |           |               |
         *   Failed      Cancelled          |
         *                          +-------+------+
         *                          |              |
         *                      Recognized       Began
         *                                         |
         *                                      Changed
         *                                         |
         *                                  Ended/Recognized
         */
        var STATE_POSSIBLE = 1;
        var STATE_BEGAN = 2;
        var STATE_CHANGED = 4;
        var STATE_ENDED = 8;
        var STATE_RECOGNIZED = STATE_ENDED;
        var STATE_CANCELLED = 16;
        var STATE_FAILED = 32;

        /**
         * Recognizer
         * Every recognizer needs to extend from this class.
         * @constructor
         * @param {Object} options
         */
        function Recognizer(options) {
            this.options = assign({}, this.defaults, options || {});

            this.id = uniqueId();

            this.manager = null;

            // default is enable true
            this.options.enable = ifUndefined(this.options.enable, true);

            this.state = STATE_POSSIBLE;

            this.simultaneous = {};
            this.requireFail = [];
        }

        Recognizer.prototype = {
            /**
             * @virtual
             * @type {Object}
             */
            defaults: {},

            /**
             * set options
             * @param {Object} options
             * @return {Recognizer}
             */
            set: function set$$1(options) {
                assign(this.options, options);

                // also update the touchAction, in case something changed about the directions/enabled state
                this.manager && this.manager.touchAction.update();
                return this;
            },

            /**
             * recognize simultaneous with an other recognizer.
             * @param {Recognizer} otherRecognizer
             * @returns {Recognizer} this
             */
            recognizeWith: function recognizeWith(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
                    return this;
                }

                var simultaneous = this.simultaneous;
                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                if (!simultaneous[otherRecognizer.id]) {
                    simultaneous[otherRecognizer.id] = otherRecognizer;
                    otherRecognizer.recognizeWith(this);
                }
                return this;
            },

            /**
             * drop the simultaneous link. it doesnt remove the link on the other recognizer.
             * @param {Recognizer} otherRecognizer
             * @returns {Recognizer} this
             */
            dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
                    return this;
                }

                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                delete this.simultaneous[otherRecognizer.id];
                return this;
            },

            /**
             * recognizer can only run when an other is failing
             * @param {Recognizer} otherRecognizer
             * @returns {Recognizer} this
             */
            requireFailure: function requireFailure(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
                    return this;
                }

                var requireFail = this.requireFail;
                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                if (inArray(requireFail, otherRecognizer) === -1) {
                    requireFail.push(otherRecognizer);
                    otherRecognizer.requireFailure(this);
                }
                return this;
            },

            /**
             * drop the requireFailure link. it does not remove the link on the other recognizer.
             * @param {Recognizer} otherRecognizer
             * @returns {Recognizer} this
             */
            dropRequireFailure: function dropRequireFailure(otherRecognizer) {
                if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
                    return this;
                }

                otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
                var index = inArray(this.requireFail, otherRecognizer);
                if (index > -1) {
                    this.requireFail.splice(index, 1);
                }
                return this;
            },

            /**
             * has require failures boolean
             * @returns {boolean}
             */
            hasRequireFailures: function hasRequireFailures() {
                return this.requireFail.length > 0;
            },

            /**
             * if the recognizer can recognize simultaneous with an other recognizer
             * @param {Recognizer} otherRecognizer
             * @returns {Boolean}
             */
            canRecognizeWith: function canRecognizeWith(otherRecognizer) {
                return !!this.simultaneous[otherRecognizer.id];
            },

            /**
             * You should use `tryEmit` instead of `emit` directly to check
             * that all the needed recognizers has failed before emitting.
             * @param {Object} input
             */
            emit: function emit(input) {
                var self = this;
                var state = this.state;

                function emit(event) {
                    self.manager.emit(event, input);
                }

                // 'panstart' and 'panmove'
                if (state < STATE_ENDED) {
                    emit(self.options.event + stateStr(state));
                }

                emit(self.options.event); // simple 'eventName' events

                if (input.additionalEvent) {
                    // additional event(panleft, panright, pinchin, pinchout...)
                    emit(input.additionalEvent);
                }

                // panend and pancancel
                if (state >= STATE_ENDED) {
                    emit(self.options.event + stateStr(state));
                }
            },

            /**
             * Check that all the require failure recognizers has failed,
             * if true, it emits a gesture event,
             * otherwise, setup the state to FAILED.
             * @param {Object} input
             */
            tryEmit: function tryEmit(input) {
                if (this.canEmit()) {
                    return this.emit(input);
                }
                // it's failing anyway
                this.state = STATE_FAILED;
            },

            /**
             * can we emit?
             * @returns {boolean}
             */
            canEmit: function canEmit() {
                var i = 0;
                while (i < this.requireFail.length) {
                    if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                        return false;
                    }
                    i++;
                }
                return true;
            },

            /**
             * update the recognizer
             * @param {Object} inputData
             */
            recognize: function recognize(inputData) {
                // make a new copy of the inputData
                // so we can change the inputData without messing up the other recognizers
                var inputDataClone = assign({}, inputData);

                // is is enabled and allow recognizing?
                if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
                    this.reset();
                    this.state = STATE_FAILED;
                    return;
                }

                // reset when we've reached the end
                if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
                    this.state = STATE_POSSIBLE;
                }

                this.state = this.process(inputDataClone);

                // the recognizer has recognized a gesture
                // so trigger an event
                if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
                    this.tryEmit(inputDataClone);
                }
            },

            /**
             * return the state of the recognizer
             * the actual recognizing happens in this method
             * @virtual
             * @param {Object} inputData
             * @returns {Const} STATE
             */
            process: function process(inputData) {}, // jshint ignore:line

            /**
             * return the preferred touch-action
             * @virtual
             * @returns {Array}
             */
            getTouchAction: function getTouchAction() {},

            /**
             * called when the gesture isn't allowed to recognize
             * like when another is being recognized or it is disabled
             * @virtual
             */
            reset: function reset() {}
        };

        /**
         * get a usable string, used as event postfix
         * @param {Const} state
         * @returns {String} state
         */
        function stateStr(state) {
            if (state & STATE_CANCELLED) {
                return 'cancel';
            } else if (state & STATE_ENDED) {
                return 'end';
            } else if (state & STATE_CHANGED) {
                return 'move';
            } else if (state & STATE_BEGAN) {
                return 'start';
            }
            return '';
        }

        /**
         * direction cons to string
         * @param {Const} direction
         * @returns {String}
         */
        function directionStr(direction) {
            if (direction == DIRECTION_DOWN) {
                return 'down';
            } else if (direction == DIRECTION_UP) {
                return 'up';
            } else if (direction == DIRECTION_LEFT) {
                return 'left';
            } else if (direction == DIRECTION_RIGHT) {
                return 'right';
            }
            return '';
        }

        /**
         * get a recognizer by name if it is bound to a manager
         * @param {Recognizer|String} otherRecognizer
         * @param {Recognizer} recognizer
         * @returns {Recognizer}
         */
        function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
            var manager = recognizer.manager;
            if (manager) {
                return manager.get(otherRecognizer);
            }
            return otherRecognizer;
        }

        /**
         * This recognizer is just used as a base for the simple attribute recognizers.
         * @constructor
         * @extends Recognizer
         */
        function AttrRecognizer() {
            Recognizer.apply(this, arguments);
        }

        inherit(AttrRecognizer, Recognizer, {
            /**
             * @namespace
             * @memberof AttrRecognizer
             */
            defaults: {
                /**
                 * @type {Number}
                 * @default 1
                 */
                pointers: 1
            },

            /**
             * Used to check if it the recognizer receives valid input, like input.distance > 10.
             * @memberof AttrRecognizer
             * @param {Object} input
             * @returns {Boolean} recognized
             */
            attrTest: function attrTest(input) {
                var optionPointers = this.options.pointers;
                return optionPointers === 0 || input.pointers.length === optionPointers;
            },

            /**
             * Process the input and return the state for the recognizer
             * @memberof AttrRecognizer
             * @param {Object} input
             * @returns {*} State
             */
            process: function process(input) {
                var state = this.state;
                var eventType = input.eventType;

                var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
                var isValid = this.attrTest(input);

                // on cancel input and we've recognized before, return STATE_CANCELLED
                if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
                    return state | STATE_CANCELLED;
                } else if (isRecognized || isValid) {
                    if (eventType & INPUT_END) {
                        return state | STATE_ENDED;
                    } else if (!(state & STATE_BEGAN)) {
                        return STATE_BEGAN;
                    }
                    return state | STATE_CHANGED;
                }
                return STATE_FAILED;
            }
        });

        /**
         * Pan
         * Recognized when the pointer is down and moved in the allowed direction.
         * @constructor
         * @extends AttrRecognizer
         */
        function PanRecognizer() {
            AttrRecognizer.apply(this, arguments);

            this.pX = null;
            this.pY = null;
        }

        inherit(PanRecognizer, AttrRecognizer, {
            /**
             * @namespace
             * @memberof PanRecognizer
             */
            defaults: {
                event: 'pan',
                threshold: 10,
                pointers: 1,
                direction: DIRECTION_ALL
            },

            getTouchAction: function getTouchAction() {
                var direction = this.options.direction;
                var actions = [];
                if (direction & DIRECTION_HORIZONTAL) {
                    actions.push(TOUCH_ACTION_PAN_Y);
                }
                if (direction & DIRECTION_VERTICAL) {
                    actions.push(TOUCH_ACTION_PAN_X);
                }
                return actions;
            },

            directionTest: function directionTest(input) {
                var options = this.options;
                var hasMoved = true;
                var distance = input.distance;
                var direction = input.direction;
                var x = input.deltaX;
                var y = input.deltaY;

                // lock to axis?
                if (!(direction & options.direction)) {
                    if (options.direction & DIRECTION_HORIZONTAL) {
                        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
                        hasMoved = x != this.pX;
                        distance = Math.abs(input.deltaX);
                    } else {
                        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
                        hasMoved = y != this.pY;
                        distance = Math.abs(input.deltaY);
                    }
                }
                input.direction = direction;
                return hasMoved && distance > options.threshold && direction & options.direction;
            },

            attrTest: function attrTest(input) {
                return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
            },

            emit: function emit(input) {

                this.pX = input.deltaX;
                this.pY = input.deltaY;

                var direction = directionStr(input.direction);

                if (direction) {
                    input.additionalEvent = this.options.event + direction;
                }
                this._super.emit.call(this, input);
            }
        });

        /**
         * Pinch
         * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
         * @constructor
         * @extends AttrRecognizer
         */
        function PinchRecognizer() {
            AttrRecognizer.apply(this, arguments);
        }

        inherit(PinchRecognizer, AttrRecognizer, {
            /**
             * @namespace
             * @memberof PinchRecognizer
             */
            defaults: {
                event: 'pinch',
                threshold: 0,
                pointers: 2
            },

            getTouchAction: function getTouchAction() {
                return [TOUCH_ACTION_NONE];
            },

            attrTest: function attrTest(input) {
                return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
            },

            emit: function emit(input) {
                if (input.scale !== 1) {
                    var inOut = input.scale < 1 ? 'in' : 'out';
                    input.additionalEvent = this.options.event + inOut;
                }
                this._super.emit.call(this, input);
            }
        });

        /**
         * Press
         * Recognized when the pointer is down for x ms without any movement.
         * @constructor
         * @extends Recognizer
         */
        function PressRecognizer() {
            Recognizer.apply(this, arguments);

            this._timer = null;
            this._input = null;
        }

        inherit(PressRecognizer, Recognizer, {
            /**
             * @namespace
             * @memberof PressRecognizer
             */
            defaults: {
                event: 'press',
                pointers: 1,
                time: 251, // minimal time of the pointer to be pressed
                threshold: 9 // a minimal movement is ok, but keep it low
            },

            getTouchAction: function getTouchAction() {
                return [TOUCH_ACTION_AUTO];
            },

            process: function process(input) {
                var options = this.options;
                var validPointers = input.pointers.length === options.pointers;
                var validMovement = input.distance < options.threshold;
                var validTime = input.deltaTime > options.time;

                this._input = input;

                // we only allow little movement
                // and we've reached an end event, so a tap is possible
                if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
                    this.reset();
                } else if (input.eventType & INPUT_START) {
                    this.reset();
                    this._timer = setTimeoutContext(function () {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.time, this);
                } else if (input.eventType & INPUT_END) {
                    return STATE_RECOGNIZED;
                }
                return STATE_FAILED;
            },

            reset: function reset() {
                clearTimeout(this._timer);
            },

            emit: function emit(input) {
                if (this.state !== STATE_RECOGNIZED) {
                    return;
                }

                if (input && input.eventType & INPUT_END) {
                    this.manager.emit(this.options.event + 'up', input);
                } else {
                    this._input.timeStamp = now();
                    this.manager.emit(this.options.event, this._input);
                }
            }
        });

        /**
         * Rotate
         * Recognized when two or more pointer are moving in a circular motion.
         * @constructor
         * @extends AttrRecognizer
         */
        function RotateRecognizer() {
            AttrRecognizer.apply(this, arguments);
        }

        inherit(RotateRecognizer, AttrRecognizer, {
            /**
             * @namespace
             * @memberof RotateRecognizer
             */
            defaults: {
                event: 'rotate',
                threshold: 0,
                pointers: 2
            },

            getTouchAction: function getTouchAction() {
                return [TOUCH_ACTION_NONE];
            },

            attrTest: function attrTest(input) {
                return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
            }
        });

        /**
         * Swipe
         * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
         * @constructor
         * @extends AttrRecognizer
         */
        function SwipeRecognizer() {
            AttrRecognizer.apply(this, arguments);
        }

        inherit(SwipeRecognizer, AttrRecognizer, {
            /**
             * @namespace
             * @memberof SwipeRecognizer
             */
            defaults: {
                event: 'swipe',
                threshold: 10,
                velocity: 0.3,
                direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
                pointers: 1
            },

            getTouchAction: function getTouchAction() {
                return PanRecognizer.prototype.getTouchAction.call(this);
            },

            attrTest: function attrTest(input) {
                var direction = this.options.direction;
                var velocity;

                if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
                    velocity = input.overallVelocity;
                } else if (direction & DIRECTION_HORIZONTAL) {
                    velocity = input.overallVelocityX;
                } else if (direction & DIRECTION_VERTICAL) {
                    velocity = input.overallVelocityY;
                }

                return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
            },

            emit: function emit(input) {
                var direction = directionStr(input.offsetDirection);
                if (direction) {
                    this.manager.emit(this.options.event + direction, input);
                }

                this.manager.emit(this.options.event, input);
            }
        });

        /**
         * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
         * between the given interval and position. The delay option can be used to recognize multi-taps without firing
         * a single tap.
         *
         * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
         * multi-taps being recognized.
         * @constructor
         * @extends Recognizer
         */
        function TapRecognizer() {
            Recognizer.apply(this, arguments);

            // previous time and center,
            // used for tap counting
            this.pTime = false;
            this.pCenter = false;

            this._timer = null;
            this._input = null;
            this.count = 0;
        }

        inherit(TapRecognizer, Recognizer, {
            /**
             * @namespace
             * @memberof PinchRecognizer
             */
            defaults: {
                event: 'tap',
                pointers: 1,
                taps: 1,
                interval: 300, // max time between the multi-tap taps
                time: 250, // max time of the pointer to be down (like finger on the screen)
                threshold: 9, // a minimal movement is ok, but keep it low
                posThreshold: 10 // a multi-tap can be a bit off the initial position
            },

            getTouchAction: function getTouchAction() {
                return [TOUCH_ACTION_MANIPULATION];
            },

            process: function process(input) {
                var options = this.options;

                var validPointers = input.pointers.length === options.pointers;
                var validMovement = input.distance < options.threshold;
                var validTouchTime = input.deltaTime < options.time;

                this.reset();

                if (input.eventType & INPUT_START && this.count === 0) {
                    return this.failTimeout();
                }

                // we only allow little movement
                // and we've reached an end event, so a tap is possible
                if (validMovement && validTouchTime && validPointers) {
                    if (input.eventType != INPUT_END) {
                        return this.failTimeout();
                    }

                    var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
                    var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

                    this.pTime = input.timeStamp;
                    this.pCenter = input.center;

                    if (!validMultiTap || !validInterval) {
                        this.count = 1;
                    } else {
                        this.count += 1;
                    }

                    this._input = input;

                    // if tap count matches we have recognized it,
                    // else it has began recognizing...
                    var tapCount = this.count % options.taps;
                    if (tapCount === 0) {
                        // no failing requirements, immediately trigger the tap event
                        // or wait as long as the multitap interval to trigger
                        if (!this.hasRequireFailures()) {
                            return STATE_RECOGNIZED;
                        } else {
                            this._timer = setTimeoutContext(function () {
                                this.state = STATE_RECOGNIZED;
                                this.tryEmit();
                            }, options.interval, this);
                            return STATE_BEGAN;
                        }
                    }
                }
                return STATE_FAILED;
            },

            failTimeout: function failTimeout() {
                this._timer = setTimeoutContext(function () {
                    this.state = STATE_FAILED;
                }, this.options.interval, this);
                return STATE_FAILED;
            },

            reset: function reset() {
                clearTimeout(this._timer);
            },

            emit: function emit() {
                if (this.state == STATE_RECOGNIZED) {
                    this._input.tapCount = this.count;
                    this.manager.emit(this.options.event, this._input);
                }
            }
        });

        /**
         * Simple way to create a manager with a default set of recognizers.
         * @param {HTMLElement} element
         * @param {Object} [options]
         * @constructor
         */
        function Hammer(element, options) {
            options = options || {};
            options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
            return new Manager(element, options);
        }

        /**
         * @const {string}
         */
        Hammer.VERSION = '2.0.7';

        /**
         * default settings
         * @namespace
         */
        Hammer.defaults = {
            /**
             * set if DOM events are being triggered.
             * But this is slower and unused by simple implementations, so disabled by default.
             * @type {Boolean}
             * @default false
             */
            domEvents: false,

            /**
             * The value for the touchAction property/fallback.
             * When set to `compute` it will magically set the correct value based on the added recognizers.
             * @type {String}
             * @default compute
             */
            touchAction: TOUCH_ACTION_COMPUTE,

            /**
             * @type {Boolean}
             * @default true
             */
            enable: true,

            /**
             * EXPERIMENTAL FEATURE -- can be removed/changed
             * Change the parent input target element.
             * If Null, then it is being set the to main element.
             * @type {Null|EventTarget}
             * @default null
             */
            inputTarget: null,

            /**
             * force an input class
             * @type {Null|Function}
             * @default null
             */
            inputClass: null,

            /**
             * Default recognizer setup when calling `Hammer()`
             * When creating a new Manager these will be skipped.
             * @type {Array}
             */
            preset: [
            // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
            [RotateRecognizer, { enable: false }], [PinchRecognizer, { enable: false }, ['rotate']], [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }], [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']], [TapRecognizer], [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']], [PressRecognizer]],

            /**
             * Some CSS properties can be used to improve the working of Hammer.
             * Add them to this method and they will be set when creating a new Manager.
             * @namespace
             */
            cssProps: {
                /**
                 * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
                 * @type {String}
                 * @default 'none'
                 */
                userSelect: 'none',

                /**
                 * Disable the Windows Phone grippers when pressing an element.
                 * @type {String}
                 * @default 'none'
                 */
                touchSelect: 'none',

                /**
                 * Disables the default callout shown when you touch and hold a touch target.
                 * On iOS, when you touch and hold a touch target such as a link, Safari displays
                 * a callout containing information about the link. This property allows you to disable that callout.
                 * @type {String}
                 * @default 'none'
                 */
                touchCallout: 'none',

                /**
                 * Specifies whether zooming is enabled. Used by IE10>
                 * @type {String}
                 * @default 'none'
                 */
                contentZooming: 'none',

                /**
                 * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
                 * @type {String}
                 * @default 'none'
                 */
                userDrag: 'none',

                /**
                 * Overrides the highlight color shown when the user taps a link or a JavaScript
                 * clickable element in iOS. This property obeys the alpha value, if specified.
                 * @type {String}
                 * @default 'rgba(0,0,0,0)'
                 */
                tapHighlightColor: 'rgba(0,0,0,0)'
            }
        };

        var STOP = 1;
        var FORCED_STOP = 2;

        /**
         * Manager
         * @param {HTMLElement} element
         * @param {Object} [options]
         * @constructor
         */
        function Manager(element, options) {
            this.options = assign({}, Hammer.defaults, options || {});

            this.options.inputTarget = this.options.inputTarget || element;

            this.handlers = {};
            this.session = {};
            this.recognizers = [];
            this.oldCssProps = {};

            this.element = element;
            this.input = createInputInstance(this);
            this.touchAction = new TouchAction(this, this.options.touchAction);

            toggleCssProps(this, true);

            each(this.options.recognizers, function (item) {
                var recognizer = this.add(new item[0](item[1]));
                item[2] && recognizer.recognizeWith(item[2]);
                item[3] && recognizer.requireFailure(item[3]);
            }, this);
        }

        Manager.prototype = {
            /**
             * set options
             * @param {Object} options
             * @returns {Manager}
             */
            set: function set$$1(options) {
                assign(this.options, options);

                // Options that need a little more setup
                if (options.touchAction) {
                    this.touchAction.update();
                }
                if (options.inputTarget) {
                    // Clean up existing event listeners and reinitialize
                    this.input.destroy();
                    this.input.target = options.inputTarget;
                    this.input.init();
                }
                return this;
            },

            /**
             * stop recognizing for this session.
             * This session will be discarded, when a new [input]start event is fired.
             * When forced, the recognizer cycle is stopped immediately.
             * @param {Boolean} [force]
             */
            stop: function stop(force) {
                this.session.stopped = force ? FORCED_STOP : STOP;
            },

            /**
             * run the recognizers!
             * called by the inputHandler function on every movement of the pointers (touches)
             * it walks through all the recognizers and tries to detect the gesture that is being made
             * @param {Object} inputData
             */
            recognize: function recognize(inputData) {
                var session = this.session;
                if (session.stopped) {
                    return;
                }

                // run the touch-action polyfill
                this.touchAction.preventDefaults(inputData);

                var recognizer;
                var recognizers = this.recognizers;

                // this holds the recognizer that is being recognized.
                // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
                // if no recognizer is detecting a thing, it is set to `null`
                var curRecognizer = session.curRecognizer;

                // reset when the last recognizer is recognized
                // or when we're in a new session
                if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
                    curRecognizer = session.curRecognizer = null;
                }

                var i = 0;
                while (i < recognizers.length) {
                    recognizer = recognizers[i];

                    // find out if we are allowed try to recognize the input for this one.
                    // 1.   allow if the session is NOT forced stopped (see the .stop() method)
                    // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
                    //      that is being recognized.
                    // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
                    //      this can be setup with the `recognizeWith()` method on the recognizer.
                    if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) {
                        // 3
                        recognizer.recognize(inputData);
                    } else {
                        recognizer.reset();
                    }

                    // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
                    // current active recognizer. but only if we don't already have an active recognizer
                    if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                        curRecognizer = session.curRecognizer = recognizer;
                    }
                    i++;
                }
            },

            /**
             * get a recognizer by its event name.
             * @param {Recognizer|String} recognizer
             * @returns {Recognizer|Null}
             */
            get: function get$$1(recognizer) {
                if (recognizer instanceof Recognizer) {
                    return recognizer;
                }

                var recognizers = this.recognizers;
                for (var i = 0; i < recognizers.length; i++) {
                    if (recognizers[i].options.event == recognizer) {
                        return recognizers[i];
                    }
                }
                return null;
            },

            /**
             * add a recognizer to the manager
             * existing recognizers with the same event name will be removed
             * @param {Recognizer} recognizer
             * @returns {Recognizer|Manager}
             */
            add: function add(recognizer) {
                if (invokeArrayArg(recognizer, 'add', this)) {
                    return this;
                }

                // remove existing
                var existing = this.get(recognizer.options.event);
                if (existing) {
                    this.remove(existing);
                }

                this.recognizers.push(recognizer);
                recognizer.manager = this;

                this.touchAction.update();
                return recognizer;
            },

            /**
             * remove a recognizer by name or instance
             * @param {Recognizer|String} recognizer
             * @returns {Manager}
             */
            remove: function remove(recognizer) {
                if (invokeArrayArg(recognizer, 'remove', this)) {
                    return this;
                }

                recognizer = this.get(recognizer);

                // let's make sure this recognizer exists
                if (recognizer) {
                    var recognizers = this.recognizers;
                    var index = inArray(recognizers, recognizer);

                    if (index !== -1) {
                        recognizers.splice(index, 1);
                        this.touchAction.update();
                    }
                }

                return this;
            },

            /**
             * bind event
             * @param {String} events
             * @param {Function} handler
             * @returns {EventEmitter} this
             */
            on: function on(events, handler) {
                if (events === undefined) {
                    return;
                }
                if (handler === undefined) {
                    return;
                }

                var handlers = this.handlers;
                each(splitStr(events), function (event) {
                    handlers[event] = handlers[event] || [];
                    handlers[event].push(handler);
                });
                return this;
            },

            /**
             * unbind event, leave emit blank to remove all handlers
             * @param {String} events
             * @param {Function} [handler]
             * @returns {EventEmitter} this
             */
            off: function off(events, handler) {
                if (events === undefined) {
                    return;
                }

                var handlers = this.handlers;
                each(splitStr(events), function (event) {
                    if (!handler) {
                        delete handlers[event];
                    } else {
                        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
                    }
                });
                return this;
            },

            /**
             * emit event to the listeners
             * @param {String} event
             * @param {Object} data
             */
            emit: function emit(event, data) {
                // we also want to trigger dom events
                if (this.options.domEvents) {
                    triggerDomEvent(event, data);
                }

                // no handlers, so skip it all
                var handlers = this.handlers[event] && this.handlers[event].slice();
                if (!handlers || !handlers.length) {
                    return;
                }

                data.type = event;
                data.preventDefault = function () {
                    data.srcEvent.preventDefault();
                };

                var i = 0;
                while (i < handlers.length) {
                    handlers[i](data);
                    i++;
                }
            },

            /**
             * destroy the manager and unbinds all events
             * it doesn't unbind dom events, that is the user own responsibility
             */
            destroy: function destroy() {
                this.element && toggleCssProps(this, false);

                this.handlers = {};
                this.session = {};
                this.input.destroy();
                this.element = null;
            }
        };

        /**
         * add/remove the css properties as defined in manager.options.cssProps
         * @param {Manager} manager
         * @param {Boolean} add
         */
        function toggleCssProps(manager, add) {
            var element = manager.element;
            if (!element.style) {
                return;
            }
            var prop;
            each(manager.options.cssProps, function (value, name) {
                prop = prefixed(element.style, name);
                if (add) {
                    manager.oldCssProps[prop] = element.style[prop];
                    element.style[prop] = value;
                } else {
                    element.style[prop] = manager.oldCssProps[prop] || '';
                }
            });
            if (!add) {
                manager.oldCssProps = {};
            }
        }

        /**
         * trigger dom event
         * @param {String} event
         * @param {Object} data
         */
        function triggerDomEvent(event, data) {
            var gestureEvent = document.createEvent('Event');
            gestureEvent.initEvent(event, true, true);
            gestureEvent.gesture = data;
            data.target.dispatchEvent(gestureEvent);
        }

        assign(Hammer, {
            INPUT_START: INPUT_START,
            INPUT_MOVE: INPUT_MOVE,
            INPUT_END: INPUT_END,
            INPUT_CANCEL: INPUT_CANCEL,

            STATE_POSSIBLE: STATE_POSSIBLE,
            STATE_BEGAN: STATE_BEGAN,
            STATE_CHANGED: STATE_CHANGED,
            STATE_ENDED: STATE_ENDED,
            STATE_RECOGNIZED: STATE_RECOGNIZED,
            STATE_CANCELLED: STATE_CANCELLED,
            STATE_FAILED: STATE_FAILED,

            DIRECTION_NONE: DIRECTION_NONE,
            DIRECTION_LEFT: DIRECTION_LEFT,
            DIRECTION_RIGHT: DIRECTION_RIGHT,
            DIRECTION_UP: DIRECTION_UP,
            DIRECTION_DOWN: DIRECTION_DOWN,
            DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
            DIRECTION_VERTICAL: DIRECTION_VERTICAL,
            DIRECTION_ALL: DIRECTION_ALL,

            Manager: Manager,
            Input: Input,
            TouchAction: TouchAction,

            TouchInput: TouchInput,
            MouseInput: MouseInput,
            PointerEventInput: PointerEventInput,
            TouchMouseInput: TouchMouseInput,
            SingleTouchInput: SingleTouchInput,

            Recognizer: Recognizer,
            AttrRecognizer: AttrRecognizer,
            Tap: TapRecognizer,
            Pan: PanRecognizer,
            Swipe: SwipeRecognizer,
            Pinch: PinchRecognizer,
            Rotate: RotateRecognizer,
            Press: PressRecognizer,

            on: addEventListeners,
            off: removeEventListeners,
            each: each,
            merge: merge,
            extend: extend,
            assign: assign,
            inherit: inherit,
            bindFn: bindFn,
            prefixed: prefixed
        });

        // this prevents errors when Hammer is loaded in the presence of an AMD
        //  style loader but by script tag, not by the loader.
        var freeGlobal = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}; // jshint ignore:line
        freeGlobal.Hammer = Hammer;

        if (typeof undefined === 'function' && undefined.amd) {
            undefined(function () {
                return Hammer;
            });
        } else if ('object' != 'undefined' && module.exports) {
            module.exports = Hammer;
        } else {
            window[exportName] = Hammer;
        }
    })(window, document, 'Hammer');
});

var prefix$4 = 'esri-header-menus';

var createMenus = (function (_ref) {
	var _ref$variant = _ref.variant,
	    variant = _ref$variant === undefined ? 'desktop' : _ref$variant;

	var $target = $assign('div', { class: prefix$4, id: prefix$4 + '-' + variant });
	$target.classList.add('-' + variant);

	if (variant === 'mobile') {
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

	var $content = $assign('div', {
		class: prefix$4 + '-content',
		id: prefix$4 + '-content-' + variant,
		aria: { hidden: true, expanded: false }
	});

	$assign($target, $content);

	/* Menus: Link 
 /* ====================================================================== */

	var createNavLink = function createNavLink(link) {
		var $link = $assign('a', { class: prefix$4 + '-' + link.class, href: link.props.href || 'javascript:;' }, link.icon || "", link.label);

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
			role: 'navigation', aria: { labelledby: prefix$4 + '-link-' + variant + '-' + uuid + '-' + suuid },
			data: { filled: '' + tiles.slice(0, 4).length }
		}].concat(toConsumableArray(tiles.slice(0, 4).map(createTile))));
	};

	/* Menus: On Update
 /* ====================================================================== */

	$target.addEventListener('header:update:menus', function (_ref2) {
		var detail = _ref2.detail;

		if (detail.noBrand) {
			$target.classList.add("-no-brand");
		}
		$replaceAll.apply(undefined, [$content].concat(toConsumableArray(detail.map(function (menu, uuid) {
			return $assign('div', {
				class: prefix$4 + '-menu',
				role: 'group'
			}, $assign.apply(undefined, ['ul', {
				class: prefix$4 + '-list',
				role: 'navigation', aria: { labelledby: 'esri-header-brand' }
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

				var hasMenuItems = item.menus && item.menus.length;
				var hasCols = item.cols && item.cols.length;
				var hasFlyout = item.flyout && item.flyout.length;
				var hasFeaturedItems = item.tiles && item.tiles.length;

				if (hasMenuItems || hasCols || hasFeaturedItems || hasFlyout) {
					/* Global Navigation: Submenu
     /* ====================================== */
					var $subtoggle = $assign('button', { class: prefix$4 + '-submenu-toggle' }, item.label);

					var hasStructured = hasCols && item.cols.filter(function (col) {
						return col.type === 'structured';
					}).length > 0;
					var multiCols = false;
					var colsNum = 0;

					if (item.menus && item.menus.length > 10) {
						item.menus.length % 3 === 0 ? multiCols = true : multiCols = false;
					}

					if (hasMenuItems) {
						if (item.menus.length >= 10 && item.menus.length <= 18) {
							colsNum = 2;
						} else if (item.menus.length > 18 && item.menus.length <= 27) {
							colsNum = 3;
						}
					}

					var $subcontent = $assign('div', {
						class: prefix$4 + '-submenu',
						id: prefix$4 + '-' + variant + '-submenu-' + uuid + '-' + suuid,
						'data-has-structured': hasFlyout ? 'false' : hasStructured,
						'data-has-flyout': hasFlyout ? 'true' : 'false',
						role: 'group', aria: { hidden: true, expanded: false },
						data: {
							filled: item.menus && item.menus.length > 10 ? item.menus.slice(0, 30).length : '',
							structuredCols: hasCols ? item.cols.length : '',
							hasMultiCols: multiCols,
							columns: colsNum
						}
					}, $subtoggle);

					if (hasFlyout) {
						renderFlyout({ $subcontent: $subcontent, item: item, uuid: uuid, suuid: suuid });
					} else if (hasCols) {
						renderMulti({ $subcontent: $subcontent, item: item, uuid: uuid, suuid: suuid });
					} else {
						renderSingle({ hasMenuItems: hasMenuItems, $subcontent: $subcontent, item: item, uuid: uuid, suuid: suuid });
					}

					if (hasFeaturedItems) {
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
					});

					$subtoggle.addEventListener('click', function () {
						$dispatch($subtoggle, 'header:menu:close', {
							control: $subcontrol,
							submenu: true,
							content: $subcontent,
							type: 'menu-close'
						});
					});
				}

				return $li;
			})))));
		}))));
	});

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
			role: 'navigation', aria: { labelledby: prefix$4 + '-link-' + variant + '-' + uuid + '-' + suuid }
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
					role: 'navigation', aria: { labelledby: prefix$4 + '-link-' + variant + '-' + uuid + '-' + suuid }
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
		var winWidth = window.innerWidth;

		if (winWidth < 1024) {
			console.log('clickkkk');
			var categoryListArr = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-details[aria-expanded]'));
			categoryListArr.forEach(function (list) {
				list.setAttribute('aria-expanded', 'false');
				list.style.height = '0px';
			});

			categoryList.setAttribute('aria-expanded', '' + active);
			if (active === 'true') {
				categoryList.style.height = computedHeight + computedMargin + 'px';
				headers.forEach(function (head) {
					head.setAttribute('aria-current', 'false');
				});
				categoryHeader.setAttribute('aria-current', 'true');
			} else {
				categoryList.style.height = '0px';
				categoryHeader.setAttribute('aria-current', 'false');
			}
		} else {
			var items = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-item'));
			var itemsList = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--list-items'));

			items.forEach(function (item, index) {
				item.addEventListener('click', function (e) {
					var selectedCategory = e.target.parentNode.getAttribute('data-id');
					itemsList.forEach(function (list) {
						list.setAttribute('aria-current', 'false');
					});
					itemsList[index].getAttribute('data-id') === selectedCategory && itemsList[index].setAttribute('aria-current', 'true');
				});
			});
		}
	}

	function renderFlyoutMenu(items, type, id) {
		var $items = [];
		var category = "";
		var listArr = [];
		if (type === 'category') {
			if (items.cols && items.cols.length) {
				items.cols.forEach(function (column) {
					category = $assign('li', {
						class: prefix$4 + '-flyout--categories-item', 'data-id': id, 'aria-current': id === 0 ? 'true' : 'false'
					}, $assign('p', { class: prefix$4 + '-flyout--categories-item_header', click: function click(e) {
							swapFlyoutContent(e);
						} }, items.category));
					column.col.forEach(function (col) {
						listArr.push($assign('div', { class: prefix$4 + '-flyout--categories-details_item' }, col.label));
					});
				});
			}

			$items.push($assign(category, $assign.apply(undefined, ['div', { class: prefix$4 + '-flyout--categories-details', 'aria-expanded': 'false' }].concat(listArr))));
		} else if (type === 'label') {
			if (items.cols && items.cols.length) {
				items.cols.forEach(function (column) {
					var $column = $assign('div', { class: prefix$4 + '-flyout--list-items_column' });
					column.col.forEach(function (col) {
						$items.push($assign($column, $assign('li', { class: prefix$4 + '-flyout--list-items_name' }, $assign('a', { href: '#', class: prefix$4 + '-flyout--list-items_anchor' }, col.heading && $assign('p', { class: prefix$4 + '-flyout--list-items_heading' }, col.heading), col.label && $assign('p', { class: prefix$4 + '-flyout--list-items_label' }, col.label)))));
					});
				});
			}
		}

		return $items;
	}

	function renderFlyout(_ref5) {
		var $subcontent = _ref5.$subcontent,
		    item = _ref5.item;

		var $flyoutCategories = $assign('div', { class: prefix$4 + '-flyout--categories' });
		var $flyoutList = $assign('div', { class: prefix$4 + '-flyout--list' });

		item.flyout.forEach(function (item, id) {
			$assign.apply(undefined, [$flyoutCategories].concat(toConsumableArray(renderFlyoutMenu(item, 'category', id))));

			$assign($flyoutList, $assign.apply(undefined, ['div', { class: prefix$4 + '-flyout--list-items', 'data-id': id, 'aria-current': id === 0 ? 'true' : 'false' }].concat(toConsumableArray(renderFlyoutMenu(item, 'label', id)))));
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
				$items.push($assign('li', { class: prefix$4 + '-entry--menus-subitem' }, $assign('a', { href: entry.href, class: prefix$4 + '-entry-sublink' }, entry.label)));
			}
		});

		return $items;
	}

	function renderStructuredMenu(entries) {
		var $items = [];

		entries.forEach(function (entry) {
			if (entry.heading) {
				$items.push($assign('li', { class: prefix$4 + '-entry--heading' }, $assign('p', { class: prefix$4 + '-entry--heading-label' }, entry.heading)));
			}

			if (entry.href && entry.label) {
				$items.push($assign('li', { class: prefix$4 + '-entry--menus-subitem' }, $assign('a', { href: entry.href, class: prefix$4 + '-entry-sublink' }, $assign('p', { class: prefix$4 + '-entry-sublink--title' }, entry.label), entry.description ? $assign('p', { class: prefix$4 + '-sublink--description' }, entry.description) : null)));
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
		class: data.prefix + '-control', id: data.prefix + '-control',
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
		class: prefix$6 + '-input', id: prefix$6 + '-input',
		aria: { labelledby: prefix$6 + '-input' }
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
		setTimeout(function () {
			$input.focus();
		}, 0);
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

		if (!detail.hide) {
			$assign($control, { aria: { label: detail.label } });
			$renderSvgOrImg({ imgDef: $search.md, imgClass: prefix$6 + '-image', id: prefix$6 + '-image', alt: "", $targetElm: $control });

			searchState.image = $search.md;
			searchState.action = detail.dialog && detail.dialog.action;

			$input.setAttribute('placeholder', detail.dialog && detail.dialog.queryLabel || "");
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

		if (detail && detail.items > 0) {
			$control.setAttribute('href', '' + detail.url);
			changeCartCount(detail.items);
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
		$cartItems.innerHTML = cartCount;

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

	var $appSwitcherIcon = $assign('span', {
		title: "App Launcher",
		"aria-label": "App Launcher Icon"
	});

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
		var abbreviationSizes = ["0px", "32px", "24px", "20px", "18px", "16px", "14px"];
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
			if (currentApp.isNew) {
				$appLink.appendChild($assign("div", { "class": "app-indicator app-indicator-new" }));
			}
			// Check if App has Icon
			if (currentApp.image) {
				var $appImageContainer = $assign("div", { "class": 'appIconImage ' + selectNoneClass });
				$appImageContainer.appendChild(getAccessibleAppArrowContainer());
				$appImageContainer.appendChild($assign("img", { "class": "appIconPng", "alt": "", src: currentApp.image }));
				$appLink.appendChild($appImageContainer);
			} else {
				var stringWidth = Math.round(getTextWidth(currentApp.abbr || "", "avenir") / 5);
				var abbreviationSize = abbreviationSizes[stringWidth];
				if (stringWidth > 6) {
					// Prevent user from exceeding icon width
					currentApp.abbr = currentApp.abbr.substr(0, 4);
					abbreviationSize = abbreviationSizes[4];
				}
				var surfaceDiv = $assign("div", { "class": "appIconImage" });
				surfaceDiv.appendChild(getAccessibleAppArrowContainer());
				var surfaceSpan = $assign("span", {
					style: 'font-size: ' + abbreviationSize,
					class: 'avenir appIconSvgText ' + selectNoneClass
				}, currentApp.abbr);
				surfaceDiv.appendChild(surfaceSpan);
				surfaceDiv.appendChild($assign("img", { "src": currentApp.placeHolderIcon, "alt": "", "class": selectNoneClass }));
				$appLink.appendChild(surfaceDiv);
			}
			$listItem.appendChild($appLink);
			var p = $assign("p", { style: "margin:0 auto; text-align:center", class: selectNoneClass }, currentApp.label);
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
		return '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 32 32"  class="default-svg-fill"><path d="M18.404 16l9.9 9.9-2.404 2.404-9.9-9.9-9.9 9.9L3.696 25.9l9.9-9.9-9.9-9.898L6.1 3.698l9.9 9.899 9.9-9.9 2.404 2.406-9.9 9.898z"/></svg>';
	};

	var getDownChevron = function getDownChevron() {
		return ' <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 32 32" class="down-carrot-svg default-svg-fill"><path d="M28 9v5L16 26 4 14V9l12 12L28 9z"></path></svg>';
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

		var $gridIcon = $renderSvgOrImg({ imgDef: $grid.md, imgClass: prefix$8 + '-image', $targetElm: $appSwitcherIcon });
		// -- Remove display:none from style to show icon
		$control.removeAttribute('style');

		if (!detail.primary) return;
		if (detail.ieVersion) applyDragAndDropAdjustmentsForIE(detail.ieVersion);
		if (detail.disableDragAndDrop || !isDesktop) ddState.disabled = true;
		if (detail.text) {
			ddState.i18n = detail.text || {};
			if (ddState.i18n.title) {
				$appSwitcherIcon.setAttribute("title", ddState.i18n.title);
				$appSwitcherIcon.setAttribute("aria-label", ddState.i18n.title);
			}
		}

		if (!detail.isLoading) {
			$target.appendChild($content);
			$control.className = prefix$8 + '-control';
			$control.setAttribute("tabindex", "0");

			$assign($control, { aria: { label: detail.label } });

			var numberOfApps = detail.primary.length;
			var dropdownWidth = ' dropdown-width-' + (numberOfApps < 3 ? numberOfApps : 3);
			// Variables to Assist with Moving Apps Between Primary and Secondary Groups
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
		role: 'group', aria: { expanded: false, hidden: true }
	}, $contentMessages);

	/* Notifications: On Update
 /* ====================================================================== */
	$target.addEventListener('header:update:notifications', function (_ref) {
		var detail = _ref.detail;

		messages = (detail.messages || []).map(function (item) {
			return item.id;
		});

		var $icon = $renderSvgOrImg({ imgDef: $bell.md, imgClass: prefix$9 + '-image', id: prefix$9 + '-image' });

		if (detail.messages && detail.messages.length > 0) {
			$replaceAll($dismiss, detail.dismissAllLabel);
			var $badge = $assign('span', { class: prefix$9 + '-badge' }, '' + detail.messages.length);
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

	var $headerCanvas = $assign('button', {
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
			if (detail.brand.topStripe) {
				$dispatch($brandStripe, 'header:update:brand', detail.brand);
				$header.style.marginTop = '3px';
			}
			if (detail.brand.editTitle) {
				$dispatch($inlineTitle, 'header:update:inlineTitle', detail.brand);
			} else {
				$dispatch($brand, 'header:update:brand', detail.brand);
			}
		}

		if (detail.menus) {
			detail.menus.noBrand = !detail.brand;
			$dispatch($desktopMenus, 'header:update:menus', detail.menus);
			$dispatch($mobileMenus, 'header:update:menus', detail.menus);
		}

		if (detail.collapseMenus) {
			$dispatch($desktopMenus, 'header:update:collapseMenus', detail.collapseMenus);
			$dispatch($mobileMenus, 'header:update:collapseMenus', detail.collapseMenus);
		}

		if (detail.search) {
			if (detail.search.inline) {
				$search.querySelector(".esri-header-search-control").classList.add("esri-header-search-control-hidden");
				$dispatch($inlineSearch, 'header:update:inlineSearch', detail.search);
			} else {
				$inlineSearch.querySelector(".esri-header-inlineSearch-control").classList.add("esri-header-search-control-hidden");
				$dispatch($search, 'header:update:search', detail.search);
			}
		}

		if (detail.account) {
			$dispatch($client.lastChild, 'header:update:account', detail.account);
		}

		if (detail.account) {
			$dispatch($client.lastChild, 'header:update:account', detail.account);
		}

		if (detail.apps) {
			$dispatch($apps, 'header:update:apps', detail.apps);
		}

		if (detail.notifications) {
			$dispatch($notifications, 'header:update:notifications', detail.notifications);
		}

		if (!detail.notifications && !detail.apps && !detail.account) {
			$lineBreak.classList.add('esri-header-lineBreak-hidden');
		}

		if (detail.cart) {
			$dispatch($shoppingCart, 'header:update:cart', detail.cart);
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
		if (!viewportIsSmall.matches) {
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
				$assign($desktopMenus.lastChild, { aria: { hidden: 'false' === $desktopMenus.lastChild.getAttribute('aria-expanded') } });
			} else {
				$dispatch($header, 'header:breakpoint:not:sm');
				$dispatch($header, 'header:menu:close');
				$assign($desktopMenus.lastChild, { aria: { hidden: false } });
			}
		}

		// $header.addItemsToCart = (count) => {
		// 	$dispatch($shoppingCart, 'header:shoppingcart:add', count);
		// };

		// $header.removeItemsFromCart = (count) => {
		// 	$dispatch($shoppingCart, 'header:shoppingcart:remove', count);
		// };
	});

	return $header;
});

// Create branding and social sections
var brand = (function (data, prefix) {
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
		aria: { labelledby: data.prefix + '-message', describedby: 'dialog-description' }
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
	var $labelText = document.createTextNode(data.buttonLabel);
	var $control = document.createElement('button');
	$control.classList.add(prefix + '-language-control');
	$control.setAttribute('ariaDescribedby', prefix + '-language');
	$control.innerHTML = data.buttonLabel;

	var $barrier = $assign('div', { class: prefix + '-language' }, $control);

	$control.addEventListener('click', openDialog);

	// Language Dialog
	data.prefix = prefix + '-language-dialog';

	var $languageDialog = languageDialog(data);

	// Language Dialog Close Button
	var $languageDialogClose = $assign('button', {
		class: prefix + '-language-dialog-close', id: 'dialog-description',
		ariaLabel: data.closeLabel
	}, $renderSvgOrImg({ imgDef: $close.md, imgClass: prefix + '-language-dialog-close-image' }));

	$languageDialogClose.addEventListener('click', closeDialog);

	$assign($languageDialog, $languageDialogClose);

	// Language Dialog Canvas
	var $cancelCanvas = $assign('button', {
		class: prefix + '-language-dialog-cancel-canvas',
		type: 'button',
		tabindex: -1
	});

	$cancelCanvas.addEventListener('click', closeDialog);

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
	}, $languageDialog, $cancelCanvas);

	$control.addEventListener('click', function () {
		$dispatch($control, 'footer:click:language', data);
	});

	$barrier.addEventListener('footer:update:language', function (_ref) {
		var detail = _ref.detail;

		$control.innerHTML = detail.buttonLabel;

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
			role: 'heading'
		}, item.label),
		// Submenu
		$assign('div', {
			class: prefix + '-menu--sub', id: prefix + '-menu--sub--' + index,
			aria: { labelledby: prefix + '-menu-link--' + index }
		}, $assign.apply(undefined, ['ul', {
			class: prefix + '-menu-list--sub',
			role: 'presentation'
		}].concat(toConsumableArray(item.menu.map(function (subitem) {
			return $assign('li', { class: prefix + '-menu-item--sub' }, $assign('a', { class: prefix + '-menu-link--sub', href: subitem.href }, subitem.label));
		}))))));
	});

	// Menu
	var $target = $assign('div', {
		class: prefix + '-menu',
		aria: { label: data.label }
	}, $assign.apply(undefined, ['ul', {
		class: prefix + '-menu-list',
		role: 'presentation'
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
	return $assign('div', { class: prefix + '-info', aria: { label: data.label } }, $assign.apply(undefined, ['ul', { class: prefix + '-info-list', role: 'presentation' }].concat(toConsumableArray(data.menu.map(function (item, index) {
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

	return $assign('div', { class: prefix + '-social' }, $assign('nav', { class: prefix + '-social-nav', aria: { label: data.label } }, $socialIcons));
});

var breadcrumbs = (function (data) {
  var showBreadCrumbs = data.showBreadcrumb;

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

    return $assign('div', { class: '' + prefix }, $assign('a', { href: 'https://www.esri.com', class: prefix + '--pin' }), $assign('ul', { class: prefix + '--list' }, $breadCrumbs));
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
		class: prefix + ' ' + (data.hideMenus ? 'skinny-footer' : ''),
		role: 'navigation',
		aria: { label: data.label }
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
