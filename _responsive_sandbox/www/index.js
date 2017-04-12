'use strict';

(function () {
    'use strict';

    /* POLYFILLS */

    // element-closest | CC0-1.0 | github.com/jonathantneal/closest

    (function (ElementProto) {
        if (typeof ElementProto.matches !== 'function') {
            ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
                var element = this;
                var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
                var index = 0;

                while (elements[index] && elements[index] !== element) {
                    ++index;
                }

                return Boolean(elements[index]);
            };
        }

        if (typeof ElementProto.closest !== 'function') {
            ElementProto.closest = function closest(selector) {
                var element = this;

                while (element && element.nodeType === 1) {
                    if (element.matches(selector)) {
                        return element;
                    }

                    element = element.parentNode;
                }

                return null;
            };
        }
    })(window.Element.prototype);

    Object.assign || (Object.assign = function assign(target, source) {
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);
        var length = arguments.length;
        var index = 0;

        while (++index < length) {
            var nextSource = arguments[index];

            if (nextSource != null) {
                for (var nextKey in nextSource) {
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }

        return to;
    });

    /* DEFAULTS */
    var defaults = {
        className: {
            main: 'globnav',
            list: 'globnav-list',
            item: 'globnav-item',
            link: 'globnav-link',
            menu: 'globnav-menu',
            img: 'globnav-image'
        },
        siteCDN: '/assets/site.json',
        siteURL: '/assets/site.json',
        siteObject: {
            branding: {
                color: '#ff0000',
                href: '//esri.com',
                image: '/assets/logo.svg'
            },
            navigation: [],
            labels: {
                search: 'Search'
            }
        },
        userCDN: '/assets/site.json',
        userURL: '/assets/site.json',
        userObject: {
            account: {
                image: '//placehold.it/defaultUserImage.png'
            },
            apps: [{
                label: 'Some App',
                href: '//esri.com',
                image: '//placehold.it/32x32'
            }]
        }
    };

    /* NAVIGATION MANAGER UTILITIES */
    var navigationComponentManager = {
        classPrefixes: {
            app: 'esri-gnav-apps',
            brand: 'esri-gnav-brand',
            client: 'esri-gnav-client',
            mobile_nav: 'esri-gnav-mobile',
            menus: 'esri-gnav-menus',
            search: 'esri-gnav-search',
            user: 'esri-gnav-user'
        },
        drawerIX: 0,
        menuIX: 0,
        mobileNavigationWidth: 300,
        navigationBurgerWidth: 70,
        navigationHeight: 64,
        assignBurgerToggler: function assignBurgerToggler(node) {
            node.addEventListener('click', function (e) {
                try {
                    if (e.target.checked) {
                        navMgr.mobileNavigationOpener();
                    } else {
                        navMgr.mobileNavigationCloser();
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        },
        assignDrawerOpener: function assignDrawerOpener(node, drawer_ix) {
            node.getElementsByTagName('a')[0].addEventListener('click', function (e) {
                try {
                    e.preventDefault();
                    var drawer = document.getElementById("mobile-nav-drawer-" + drawer_ix);
                    console.log(drawer);
                } catch (e) {
                    console.log(e);
                }
            });
        },
        assignUniversalMobileCloser: function assignUniversalMobileCloser() {

            var $body = document.getElementsByTagName('body')[0];
            if ($body) {
                $body.addEventListener('click', function (e) {
                    try {
                        if (e.clientX > navMgr.mobileNavigationWidth && e.clientY > navMgr.navigationHeight || e.clientX > navMgr.navigationBurgerWidth && e.clientY <= navMgr.navigationHeight) {
                            navMgr.mobileNavigationCloser();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });
            }
        },
        mobileNavigationCloser: function mobileNavigationCloser() {
            document.getElementById('esri-gnav-mobile-toggle-label').setAttribute('data-mobilie-nav-active', 'false');
            document.getElementById('esri-gnav-mobile').setAttribute('aria-expanded', 'false');
        },
        mobileNavigationOpener: function mobileNavigationOpener() {

            //close any open item in the global navigation
            document.querySelector('#esri-gnav').querySelectorAll('[aria-expanded="true"]').forEach(function ($el) {
                $el.setAttribute('aria-expanded', 'false');
            });

            //open the mobile navigation components
            document.getElementById('esri-gnav-mobile-toggle-label').setAttribute('data-mobilie-nav-active', 'true');
            document.getElementById('esri-gnav-mobile').setAttribute('aria-expanded', 'true');
        }
    };

    var $ = function $(name, attrs, children) {
        var namespace = /^(use|svg)$/.test(name) ? '2000/svg' : '1999/xhtml';
        var target = document.createElementNS('http://www.w3.org/' + namespace, name);

        for (var key in attrs) {
            target.setAttribute(key.replace(/[A-Z]/g, '-$&').toLowerCase(), attrs[key]);
        }

        while (children && children.length) {
            target.appendChild(children.shift());
        }

        return target;
    };

    /* SUGAR */
    var clsPrefix = navigationComponentManager.classPrefixes,
        navMgr = navigationComponentManager;

    /* ELEMENT RENDERERS */

    // render brand element
    var $burger = function $burger() {
        var burger_frag = document.createDocumentFragment();
        var toggler = burger_frag.appendChild($('input', {
            type: 'checkbox',
            class: clsPrefix.mobile_nav + '-toggle',
            id: clsPrefix.mobile_nav + '-toggle'
        }, []));
        burger_frag.appendChild($('label', {
            for: clsPrefix.mobile_nav + '-toggle',
            id: clsPrefix.mobile_nav + '-toggle-label'
        }, []));

        navMgr.assignBurgerToggler(toggler);
        return burger_frag;
    };

    // render brand element
    var $brand = function $brand(brand) {
        return $('a', {
            class: clsPrefix.brand,
            href: brand.href
        }, [$('img', {
            class: clsPrefix.brand + '-image',
            ariaLabel: brand.label,
            src: brand.image
        })]);
    };

    // render menus element
    var $menus = function $menus(menus) {
        return $('div', { class: clsPrefix.menus }, menus.map(function (menu) {
            return $('div', {
                class: clsPrefix.menus + '-menu',
                role: 'group'
            }, [
            // top-level experience
            $('ul', {
                class: clsPrefix.menus + '-list',
                role: 'navigation'
            }, menu.map(function (item) {
                return $('li', { class: clsPrefix.menus + '-item' }, [$('a', Object.assign({
                    class: clsPrefix.menus + '-link',
                    id: clsPrefix.menus + '-link-' + ++navMgr.menuIX,
                    href: item.href || 'javascript:;'
                }, item.menus && item.menus.length ? {
                    ariaControls: clsPrefix.menus + '-submenu-' + navMgr.menuIX,
                    ariaExpanded: false,
                    ariaHaspopup: true
                } : {}), [document.createTextNode(item.label)])].concat(item.menus && item.menus.length ? $('div', {
                    class: clsPrefix.menus + '-submenu',
                    id: clsPrefix.menus + '-submenu-' + navMgr.menuIX,
                    role: 'group',
                    ariaHidden: true,
                    ariaExpanded: false
                }, [
                // sub-level experience
                $('ul', {
                    class: clsPrefix.menus + '-sublist',
                    role: 'navigation',
                    ariaLabelledby: clsPrefix.menus + '-' + navMgr.menuIX
                }, item.menus.map(function (childitem) {
                    return $('li', { class: clsPrefix.menus + '-subitem' }, [$('a', {
                        class: clsPrefix.menus + '-sublink',
                        id: '-' + ++navMgr.menuIX,
                        href: childitem.href
                    }, [document.createTextNode(childitem.label)])]);
                }))]) : []));
            }))]);
        }));
    };

    // render drawers element
    var $drawers = function $drawers(params) {

        //loop through the menu options
        params.menu_options.forEach(function (option) {

            //if the menu option is an array, call to
            if (Array.isArray(option)) {
                $drawers({
                    menu_options: option,
                    root_node: params.root_node,
                    parent_node: params.parent_node
                });

                //otherwise
            } else {

                //create a node for the navigation item
                var nav_node = $('li', { "class": clsPrefix.mobile_nav + '-drawer-item' }, option.href ? [$('a', { "class": clsPrefix.mobile_nav + '-drawer-link', "href": option.href }, [document.createTextNode(option.label)])] : [$('a', { "class": clsPrefix.mobile_nav + '-drawer-opener', "href": '#option' + ++navMgr.drawerIX }, [document.createTextNode(option.label)])]);

                //append the node to the parent node
                params.parent_node.appendChild(nav_node);

                //if the navigation link points to an array of sub-menu options
                if (Object.prototype.hasOwnProperty.call(option, 'menus')) {

                    //bind an event handler to the node that opens the sub-navigation drawer
                    navMgr.assignDrawerOpener(nav_node, navMgr.drawerIX);

                    //create a sub-navigation drawer referenced by this navigation item
                    var nav_drawer = $('div', {
                        "class": clsPrefix.mobile_nav + '-drawer-secondary',
                        "id": "mobile-nav-drawer-" + navMgr.drawerIX,
                        "data-nav-drawer-index": navMgr.drawerIX,
                        "aria-hidden": "true"
                    }, [$('ul', { "class": clsPrefix.mobile_nav + "-sublist" }, [])]);

                    //append the sub-navigation drawer to the root node
                    params.root_node.appendChild(nav_drawer);

                    //call the $drawers method to build the sub-navigation items, passing a reference to the sub-nav drawer
                    $drawers({
                        menu_options: option.menus,
                        root_node: params.root_node,
                        parent_node: nav_drawer.getElementsByTagName('ul')[0]
                    });
                }
            }
        });
    };

    // render search element
    var $search = function $search(search) {
        return $('button', { class: clsPrefix.search + '-link', ariaLabel: search.label }, [$('img', {
            class: clsPrefix.search + '-image',
            src: 'images/search.svg'
        })]);
    };

    // render apps element
    var $apps = function $apps(apps, user) {
        return $('div', { class: clsPrefix.app }, [$('button', {
            class: clsPrefix.app + '-link',
            id: clsPrefix.app + '-link',
            ariaControls: clsPrefix.app + '-menu',
            ariaExpanded: false,
            ariaHaspopup: true,
            ariaLabel: apps.label
        }, [$('img', { class: clsPrefix.app + '-icon', src: 'images/apps.svg' })]), $('div', {
            class: clsPrefix.app + '-menu',
            id: clsPrefix.app + '-menu',
            role: 'group',
            ariaExpanded: false,
            ariaHidden: true,
            ariaLabelledby: clsPrefix.app + '-menu-link'
        }, [$('ul', { class: clsPrefix.app + '-menu-list' }, [$('li', { class: clsPrefix.app + '-menu-item' }, [$('button', { class: clsPrefix.app + '-menu-link' }, [$('img', {
            class: clsPrefix.app + '-menu-image',
            src: '//placehold.it/256x256'
        }), document.createTextNode('App #1')])]), $('li', { class: clsPrefix.app + '-menu-item' }, [$('button', { class: clsPrefix.app + '-menu-link' }, [$('img', {
            class: clsPrefix.app + '-menu-image',
            src: '//placehold.it/256x256'
        }), document.createTextNode('App #2 with a long name')])]), $('li', { class: clsPrefix.app + '-menu-item' }, [$('button', { class: clsPrefix.app + '-menu-link' }, [$('img', {
            class: clsPrefix.app + '-menu-image',
            src: '//placehold.it/256x256'
        }), document.createTextNode('App #3 shorter')])]), $('li', { class: clsPrefix.app + '-menu-item' }, [$('button', { class: clsPrefix.app + '-menu-link' }, [$('img', {
            class: clsPrefix.app + '-menu-image',
            src: '//placehold.it/256x256'
        }), document.createTextNode('App #4')])]), $('li', { class: clsPrefix.app + '-menu-item' }, [$('button', { class: clsPrefix.app + '-menu-link' }, [$('img', {
            class: clsPrefix.app + '-menu-image',
            src: '//placehold.it/256x256'
        }), document.createTextNode('App #5')])])])])]);
    };

    // render user element
    var $user = function $user(user) {
        return $('div', { class: clsPrefix.user }, user.name ? [
        // logged in experience
        $('button', {
            class: clsPrefix.user + '-link--loggedin',
            id: clsPrefix.user + '-link',
            ariaControls: clsPrefix.user + '-menu',
            ariaExpanded: false,
            ariaHaspopup: true,
            ariaLabel: user.label
        }, [$('img', {
            class: clsPrefix.user + '-image',
            src: user.image
        }), $('span', { class: clsPrefix.user + '-name' }, [document.createTextNode(user.name)]), $('span', { class: clsPrefix.user + '-id' }, [document.createTextNode(user.id)])]), $('div', {
            class: clsPrefix.user + '-menu',
            id: clsPrefix.user + '-menu',
            role: 'group',
            ariaExpanded: false,
            ariaHidden: true
        }, [$('div', { class: clsPrefix.user + '-menu-info' }, [].concat(user.image ? $('img', {
            class: clsPrefix.user + '-menu-image',
            src: user.image
        }) : [], user.name ? $('span', { class: clsPrefix.user + '-menu-name' }, [document.createTextNode(user.name)]) : [], user.id ? $('span', { class: clsPrefix.user + '-menu-id' }, [document.createTextNode(user.id)]) : [], user.group ? $('span', { class: clsPrefix.user + '-menu-group' }, [document.createTextNode(user.group)]) : [])), $('ul', {
            class: clsPrefix.user + '-menu-list',
            ariaLabelledby: clsPrefix.user + '-link'
        }, [$('li', { class: clsPrefix.user + '-menu-item' }, [$('a', {
            class: clsPrefix.user + '-menu-link',
            href: '#user-menu-link'
        }, [document.createTextNode('Profile & Settings')])]), $('li', { class: clsPrefix.user + '-menu-item' }, [$('a', {
            class: clsPrefix.user + '-menu-link',
            href: '#user-menu-link'
        }, [document.createTextNode('My Esri')])]), $('li', { class: clsPrefix.user + '-menu-item' }, [$('a', {
            class: clsPrefix.user + '-menu-link',
            href: '#user-menu-link'
        }, [document.createTextNode('Training')])]), $('li', { class: clsPrefix.user + '-menu-item' }, [$('a', {
            class: clsPrefix.user + '-menu-link',
            href: '#user-menu-link'
        }, [document.createTextNode('Community & Forums')])])])])] : [
        // logged out experience
        $('button', { class: clsPrefix.user + '-link--loggedout' }, [document.createTextNode(user.label)])]);
    };

    // render client container
    var $client = function $client(apps, user) {
        return $('div', { class: clsPrefix.client }, [].concat(apps ? $apps(apps) : [], user ? $user(user) : []));
    };

    // render the gnav
    var render = function render(data) {
        var nav_frag = document.createDocumentFragment();

        //build the mobile global navigation components and append them to the document fragment
        if (data.menus && data.menus.length) {

            var mobile_nav = $('nav', {
                "id": "esri-gnav-mobile",
                "class": "esri-gnav-mobile",
                "aria-expanded": "false"
            }, [$('div', {
                "class": clsPrefix.mobile_nav + '-drawer-primary',
                "id": "mobile-nav-drawer-" + 0,
                "data-nav-drawer-index": 0,
                "aria-hidden": "false"
            }, [$('ul', { "class": clsPrefix.mobile_nav + "-list" }, [])])]);

            nav_frag.appendChild(mobile_nav);

            $drawers({
                menu_options: data.menus,
                root_node: nav_frag.getElementById('esri-gnav-mobile'),
                parent_node: mobile_nav.getElementsByTagName('ul')[0]
            });
        }

        //build the global navigation components and append them to the document fragment
        nav_frag.appendChild($('nav', {
            "id": "esri-gnav",
            "class": "esri-gnav"
        }, [$burger(), data.brand ? $brand(data.brand) : document.createTextNode(''), data.menus && data.menus.length ? $menus(data.menus) : document.createTextNode(''), data.search ? $search(data.search) : document.createTextNode(''), data.apps || data.user ? $client(data.apps, data.user) : document.createTextNode('')]));

        //insert the navigation elements into the DOM
        _insertNav(nav_frag);

        function _insertNav(nav) {
            //NOTE: navigation rendering looks for an existing div container, #esri-main-container
            var pageWrapper = document.getElementById('esri-main-container') || document.body;
            pageWrapper.childNodes && pageWrapper.childNodes.length ? pageWrapper.insertBefore(nav, pageWrapper.childNodes[0]) : pageWrapper.appendChild(nav);
        }

        var $global_nav = document.getElementById("esri-gnav");
        navMgr.assignUniversalMobileCloser();

        // stop-gap functionality from here on out...

        function closeAll() {
            $global_nav.querySelectorAll('[aria-expanded="true"]').forEach(function ($el) {
                $el.setAttribute('aria-expanded', 'false');
            });
        }

        $global_nav.addEventListener('keydown', function (event) {
            if (event.keyCode === 27) {
                closeAll();
            }
        });

        $global_nav.addEventListener('click', function (event) {
            var $clickable = event.target.closest('a,button');

            if ($clickable) {
                event.target.dispatchEvent(new CustomEvent('esri-gnav:click', {
                    bubbles: true,
                    detail: {
                        target: $clickable
                    }
                }));

                var controls = $clickable.getAttribute('aria-controls');

                if (controls) {
                    var toExpand = $clickable.getAttribute('aria-expanded') !== 'true';
                    var $controlled = document.getElementById(controls);

                    closeAll();

                    $clickable.setAttribute('aria-expanded', toExpand);

                    if ($controlled) {
                        $controlled.setAttribute('aria-expanded', toExpand);
                        $controlled.setAttribute('aria-hidden', !toExpand);
                    }
                }
            }
        });

        $global_nav.addEventListener('esri-gnav:click', function (event) {
            return console.log(['event', event.type], ['target', event.detail.target]);
        });
    };

    // tooling
    function siteCDN() {
        return siteURL(defaults.siteCDN);
    }

    function siteURL() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults.siteURL;

        return fetch(url).then(function (response) {
            return response.json();
        }).then(siteObject);
    }

    function siteObject(_ref) {
        var _ref$branding = _ref.branding,
            branding = _ref$branding === undefined ? defaults.siteObject.branding : _ref$branding,
            _ref$navigation = _ref.navigation,
            navigation = _ref$navigation === undefined ? defaults.siteObject.navigation : _ref$navigation,
            _ref$labels = _ref.labels,
            labels = _ref$labels === undefined ? defaults.siteObject.labels : _ref$labels;

        return {
            branding: branding,
            navigation: navigation,
            labels: labels
        };
    }

    var importFrom = Object.freeze({
        siteCDN: siteCDN,
        siteURL: siteURL,
        siteObject: siteObject
    });

    var classCallCheck = function classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    // tooling
    // class
    var gnav = Object.assign(function GlobNav() {
        classCallCheck(this, GlobNav);
    }, {
        defaults: defaults,
        importFrom: importFrom,
        render: render
    });

    var brand = { "label": "Esri", "image": "images/logo.svg", "href": "#brand" };
    var menus = [[{
        "label": "ArcGIS",
        "menus": [{
            "label": "ArcGIS Child 1",
            "href": "#1-1"
        }, {
            "label": "ArcGIS Child 2 with a really long title that causes a new line to be made",
            "href": "#1-2"
        }, { "label": "ArcGIS Child 3", "href": "#1-3" }]
    }, {
        "label": "Industries",
        "menus": [{ "label": "Industries 1", "href": "#2-1" }, {
            "label": "Industries 2",
            "href": "#2-2"
        }, { "label": "Industries 3", "href": "#3-3" }]
    }, { "label": "About", "href": "#3" }, {
        "label": "Support",
        "menus": [{ "label": "Support 1", "href": "#4-1" }, { "label": "Support 2", "href": "#4-2" }, {
            "label": "Support 3",
            "href": "#4-3"
        }]
    }], [{ "label": "Special", "href": "#5" }]];

    var search = { "label": "Search" };
    var apps = { "label": "Applications" };
    var user = {
        "label": "Sign In",
        "image": "//placehold.it/300x300",
        "name": "JSON",
        "id": "json@data",
        "group": "My San Diego"
    };
    var data = {
        brand: brand,
        menus: menus,
        search: search,
        apps: apps,
        user: user
    };

    document.addEventListener('DOMContentLoaded', function () {
        return gnav.render(data);
    });

    // document.addEventListener('DOMContentLoaded', () => {
    // 	GlobNav.importFrom.siteCDN().then(
    // 		({ navigation }) => GlobNav.constructMenu(navigation)
    // 	).then(
    // 		(div) => document.body.append(div)
    // 	);
    // });
})();