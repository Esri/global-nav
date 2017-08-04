var AgoAppSwitcher = {
  init: function (clientParameters) {
    this._currentUser = clientParameters;
    if (this._currentUser.orgUrlKey) {
      this.currentUserApps = [];
      this._setupInitialHtml();
      this._fetchAndCreateApps();
    }
  },

  imgDir: "http://www.arcgis.com/home/js/arcgisonline/sharing/dijit/css/images/app-icons/",

  _setupInitialHtml: function () {
    document.getElementById("AGO__app-switcher").innerHTML = this._getInitialHtml();
    this._dropdownWrapper = document.getElementById("appSwitcher__dropdownWrapper");
    this._dropdownAppWrapper = document.getElementById("appSwitcher__dropdownAppWrapper");
    this._dropdownPointer = document.getElementById("appSwitcher__dropdownAppPointer");
    this._dropdownAppNav = document.getElementById("appSwitcher__dropdownAppNav");
    this._dropdownLoadingText = document.getElementById("appSwitcher__loadingText");
    this._appSwitcherBtn = document.getElementById("appSwitcher__appSwitcherBtn");
  },

  _getInitialHtml: function () {
    this._dropdownClass = "appSwitcherModalContent dropdown js-dropdown padding-right-half padding-left-half";
    this._dropdownNavClass = "dropdown-menu dropdown-right app-switcher-dropdown-menu";
    return '<div id="appSwitcher__dropdownWrapper" class="' + this._dropdownClass + '"><a href="#" id="appSwitcher__appSwitcherBtn" tabIndex="0" class="js-dropdown-toggle top-nav-link half-opacity" tabindex="-1" aria-haspopup="true" aria-expanded="false" data-modal="appSwitcher" title="App Switcher" aria-label="App Switcher"><svg height="24px" width="24px" class="app-switcher-svg" shape-rendering="crispEdges"><rect x="1" y="1" width="4" height="4"/><rect x="10" y="1" width="4" height="4"/><rect x="19" y="1" width="4" height="4"/><rect x="1" y="10" width="4" height="4"/><rect x="10" y="10" width="4" height="4"/><rect x="19" y="10" width="4" height="4"/><rect x="1" y="19" width="4" height="4"/><rect x="10" y="19" width="4" height="4"/><rect x="19" y="19" width="4" height="4"/></svg></a><nav id="appSwitcher__dropdownAppNav" class="' + this._dropdownNavClass + '" role="menu"><div id="appSwitcher__loadingText">Loading Your Apps...</div><div id="appSwitcher__dropdownAppWrapper"></div><div id="appSwitcher__dropdownAppPointer"class="app-switcher__pointer"></div></nav></div>';
  },

  _fetchAndCreateApps: function () {
    this._addEvent(window, "message", this._recieveAppsFromChild.bind(this));
    this._createIframeToGetApps();
  },

  _getHomeAppOrigin: function () {
    var urlKey = this._currentUser.orgUrlKey,
      env = this._currentUser.environment.toLowerCase();
    if (env && (env === "devext" || env === "qa")) {
      if (urlKey) {
        return "https://" + (urlKey || "") + ".maps" + env + ".arcgis.com/home/";
      } else {
        return "https://" + (env === "devext" ? env : "qaext") + ".arcgis.com/home/";
      }
    } else {
      return "https://" + (urlKey ? urlKey + ".maps." : "") + "arcgis.com/home/";
    }
  },

  _createIframeToGetApps: function () {
    var url = this._getHomeAppOrigin() + "pages/Apps/get_apps.html#origin=" + this._getOriginOfUrl();
    this._create("iframe", {
      "src": url,
      "style": "display:none"
    }, this._dropdownWrapper);
  },

  _recieveAppsFromChild: function (evt) {
    if (evt && evt.data) {
      this._appSwitcherBtn.style["opacity"] = "1";
      var msgObj = JSON.parse(evt.data);
      this.currentUserApps = this.currentUserApps.concat(msgObj.apps);
      this._dropdownLoadingText.parentNode.removeChild(this._dropdownLoadingText);
      this._createDropdown();
    }
  },

  _getOriginOfUrl: function (url) {
    url = url || window.location;
    return url.protocol + "//" + url.hostname + (url.port ? ":" + url.port : "");
  },

  _createDropdown: function () {
    var create = this._create;
    // Container
    var dropdownContent = create("div", {
      style: "width:100%;"
    }, this._dropdownAppWrapper);

    // ::Based on number of apps
    var nOfApps = this.currentUserApps.length;
    // :::Adjust the size of the Dropdown
    this._adjustDropdownWidth(nOfApps);

    // App Icons
    var topAppContainer = create("ul", {
      "class": "block-group appContainer js-prevent-dropdown__app-switcher",
      id: "dropdownAppContainer",
      "role": "menu"
    }, dropdownContent);
    // Custom event listeners
    this._assignEventListeners();
    // this._moveIfRightToLeft(topAppContainer); -- need to add support for right to left

    var maxAppsPerDialog = (nOfApps >= 100) ? 100 : nOfApps;
    for (var i = 0; i < maxAppsPerDialog; i++) {
      if (this.currentUserApps[i]["webMappingApp"] && this._currentUser.appTitle !== this.currentUserApps[i]["title"].toLowerCase()) {
        this._createWebMappingAppLayout(topAppContainer, i);
      } else if (this._currentUser.appTitle !== this.currentUserApps[i]["title"].toLowerCase()) {
        this._createBasicAppLayout(topAppContainer, i);
      }
    }
  },

  _moveIfRightToLeft: function (topAppContainer) {
    // if (this.esriPortalConfig.isRightToLeft) {
    //   var ddPointerRight = domStyle.get(this._dropdownPointer, "right"),
    //     ddNavMarginRight = domStyle.get(this._dropdownAppNav, "margin-right");
    //   domStyle.set(topAppContainer, "text-align", "right");
    //   domStyle.set(this._dropdownPointer, "right", (Number(ddPointerRight.replace("px", "")) + 403) + "px");
    //   domStyle.set(this._dropdownAppNav, "margin-left", ddNavMarginRight + "%");
    //   domStyle.set(this._dropdownAppNav, "margin-right", "0");
    // }
  },

  _assignEventListeners: function () {
    this._addEvent(this._dropdownWrapper, "click", this._onClickOfAppSwitcherIcon.bind(this));
    this._addEvent(document, "click", function (evt) {
      if (this._targetIsNotAppSwitcherDropdown(evt) && this._targetIsNotAppSwitcherIcon(evt)) {
        this._dropdownWrapper.className = (this._dropdownClass);
      }
    }.bind(this));
  },

  _targetIsNotAppSwitcherDropdown: function (evt) {
    if (evt.target && !this._hasClass(evt.target, "js-prevent-dropdown__app-switcher") &&
        evt.target.parentNode && !this._hasClass(evt.target.parentNode, "js-prevent-dropdown__app-switcher") &&
        evt.target !== this._dropdownAppNav) {
      return true;
    }
    return false;
  },

  _targetIsNotAppSwitcherIcon: function (evt) {
    if (evt.target.parentNode.parentNode === document.getElementById("AGO__app-switcher") ||
        evt.target.parentNode.parentNode === this._dropdownWrapper ||
        evt.target.parentNode.parentNode === this._appSwitcherBtn ||
        evt.target === this._appSwitcherBtn) {
      return false;
    }
    return true;
  },

  _adjustDropdownWidth: function (numberOfApps) {
    var appWidth = 110;
    var minWidth = appWidth *= (numberOfApps < 5 ? (numberOfApps) : 4.6);
    this._addStyle(this._dropdownAppNav, "min-width", String(minWidth) + "px");
    if (numberOfApps > 2) {
      this._dropdownAppNav.className = this._dropdownNavClass + " greater-than-2-apps"; // for media query; 
    }
  },
  _getAppImg: function (appName) {
    return this.imgDir + appName.replace(/\s/, "-").toLowerCase() + ".png";
  },
  _getAbbreviation: function (str) { // -- Delete if not used in next release
    // Remove lowercase and spaces
    // Limit abbreviation to 3 characters
    return str.replace(/[a-z]?\s?/g, "").substring(0, 3);
  },

  _createBasicAppLayout: function (topAppContainer, i) {
    var create = this._create,
      currentApp = this.currentUserApps[i],
      abbreviationSizes = [0, 28, 20, 16, 14, 14, 12];

    var listItem = create("li", {
      "alt": "",
      "class": "block link-off-black appLinkContainer",
      "role": "menuitem"
    }, topAppContainer);

    var appLink = create("a", {
      href: currentApp.url, // + "#username=" + this._currentUser.username,
      target: "_blank",
      "class": "appLink"
    }, listItem);
    // Check if App has Icon
    if (currentApp.image) {
      var imgSrc = this.imgDir + currentApp.image;
      var appImageContainer = create("div", {"class": "appIconImage"}, appLink);
      create("img", {"class": "appIconPng", "alt": "", src: imgSrc}, appImageContainer);
    }
    else {
      var abbreviationSize = String(abbreviationSizes[currentApp.abbr.length]) + "px";
      var surfaceDiv = create("div", {"class": "appIconImage"}, appLink);
      create("span", {
        "innerHTML": currentApp.abbr,
        "style": "font-size:" + abbreviationSize,
        "class": "avenir appIconSvgText",
        "aria-hidden": "true"
      }, surfaceDiv);
      create("img", {"src": this.imgDir + "svg-app-icon.svg", "alt": ""}, surfaceDiv);
    }
    create("p", {"innerHTML": currentApp.label, style: "margin:0 auto; text-align:center" }, appLink);
  },

  _createWebMappingAppLayout: function (topAppContainer, i) {
    var create = this._create,
      currentApp = this.currentUserApps[i],
      abbreviationSizes = [0, 28, 20, 16, 14, 14, 12];
    if (!currentApp.properties || !currentApp.properties.appSwitcher) {
      currentApp.appSwitcher = {};
    } else {
      currentApp.appSwitcher = currentApp.properties.appSwitcher;
    }
    var listItem = create("li", {
      "alt": "",
      "class": "block link-off-black appLinkContainer",
      "role": "menuitem"
    }, topAppContainer);

    var appLink = create("a", {
      href: currentApp.url + "#username=" + this._portalUser.username,
      target: "_blank",
      "class": "appLink"
    }, listItem);
    // Check if App has Icon
    if (currentApp.appSwitcher.image) {
      var imgPath = "https://devext.arcgis.com/sharing/rest/content/items/" + currentApp.itemId + "/resources/"
      var imgSrc = imgPath + currentApp.appSwitcher.image + "?token=" + this._currentUser.token;
      var appImageContainer = create("div", {"class": "appIconImage"}, appLink);
      create("img", {"class": "appIconPng", "alt": "", src: imgSrc}, appImageContainer);
    }
    else {
      var appAbbr = currentApp.appSwitcher.abbr;
      var abbreviationSize = appAbbr ? String(abbreviationSizes[appAbbr.length]) + "px" : "";
      var surfaceDiv = create("div", {"class": "appIconImage"}, appLink);
      create("span", {
        "innerHTML": currentApp.appSwitcher.abbr || "",
        "style": abbreviationSize ? "font-size:" + abbreviationSize : "",
        "class": "avenir appIconSvgText",
        "aria-hidden": "true"
      }, surfaceDiv);
      create("img", {"src": this.imgDir + "svg-app-circle.svg", "alt": ""}, surfaceDiv);
    }
    create("p", {innerHTML: currentApp.title, style: "margin:0 auto; text-align:center" }, appLink);
  },

  _onClickOfAppSwitcherIcon: function (evt) {
    if (this._targetIsNotAppSwitcherDropdown(evt)) {
      this._toggleDropdown();
    }
  },
  _toggleDropdown: function () {
    if (this._dropdownWrapper.className === this._dropdownClass) {
      this._dropdownWrapper.className = (this._dropdownClass + " is-active");
    } else {
      this._dropdownWrapper.className = (this._dropdownClass);
    }
  },

  // __________________________
  //  Dojo Replacement Methods
  // TTTTTTTTTTTTTTTTTTTTTTTTTT 
  // - Element Creation
  _create: function (el, attributes, parent) {
    if (typeof el !== "string") {
      throw "Error in _create: element must be a string"
    } else {
      var newElement = document.createElement(el);
    }
    if (typeof attributes !== "object" || Array.isArray(attributes)) {
      throw "Error in _create: attributes must be defined in an object"
    } else if (attributes !== null) {
      Object.keys(attributes).forEach(function (name) {
        if (name === "innerHTML") { newElement.innerHTML = attributes[name] }
        else { newElement.setAttribute(name, attributes[name]); }
      })
    }
    if (parent !== null && parent !== undefined) {
      parent.appendChild(newElement)
    }
    return newElement;
  },
  // - Events
  _addEvent: function (el, type, handler) {
    if (el.attachEvent) el.attachEvent("on" + type, handler); else el.addEventListener(type, handler);
  },
  // - Styles
  _addStyle: function (el, property, value) {
    if (typeof property !== "string" || typeof value !== "string") {
      throw "Error in _addStyle: style property and its value must be strings";
    }
    el.style[property] = value;
  },
  // - Classes
  _hasClass: function (el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
  },
}
