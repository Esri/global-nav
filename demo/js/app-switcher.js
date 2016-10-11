var colors = ["blue", "red", "green", "purple", "gray"];

var apps = [
    /*{
        name: "Marketplace",
        image: "images/product-icons/marketplace-48.png"
      },*/
    /*{
        name: "Developers",
        letters: "D"
    }, */{
        name: "Insights",
        image: "images/product-icons/Insights48.png",
        appIcon: "images/app-logos/insights-opt.svg",
        // color: "#FF9F33"
        class: "app-color-insights"
    }, /*{
        name: "GeoPlanner",
        letters: "GeoP"
    }, *//*{
        name: "Business Analyst",
        image: "images/product-icons/BAO_Android_Launch_48.png"
    }, *//*{
        name: "Community Analyst",
        letters: "CA"
    }, */{
        name: "Workforce",
        image: "images/product-icons/workforce_android_48.png",
        appIcon: "images/app-logos/workforce-opt.svg",
        // color: "#E04F1D"
        class: "app-color-workforce"
    }, {
        name: "Survey123",
        image: "images/product-icons/Survey123_Windows_48.png",
        appIcon: "images/app-logos/survey123-opt.svg",
        // color: "#50AD4E"
        class: "app-color-survey"

    },
    // {
    //   name: "AppStudio",
    //   image: "images/product-icons/"
    // },
    /*{
        name: "Open Data",
        letters: "Open"
    },*/ {
        name: "Operations Dashboard",
        image: "images/product-icons/Operations_Dashboard_48.png",
        appIcon: "images/app-logos/operations-dashboard-opt.svg",
        // color: "#FBB400",
        class: "app-color-ops"
    }/*, {
        name: "Story Maps",
        letters: "SM"
    }*/
    /*, {
        name: "Some App",
        letters: "SA"
      }*/
    /*, {
        name: "All the Things",
        letters: "AT"
      }*/
];

jQuery(document).ready(function() { // You wish you could use jQuery
    var i = 0;
    var fontSizes = [
        28, // 1 char
        20, // 2 char
        16, // 3 char
        14 // <= 4 char 
    ]
    jQuery.each(apps, function(index, app) {
        var color = colors[i];
        var node_str = '<li class="app-module" id="app-no-' + index + '" role="menuitem" tabindex="0" data-app-name="' + app.name + '" data-app-icon="' + app.appIcon + '" data-app-class="' + app.class + '">'; // open li
        node_str += '<div class="app-icon-container ' + color + '">'; // open app-icon-container
        if (app.image) {
            node_str += '<div class="app-icon"><img src="' + app.image + '" alt=""/></div>'; // app-icon
        }
        if (app.letters) {
            var fontSize = app.letters.length <= fontSizes.length ? fontSizes[app.letters.length - 1] : fontSizes[fontSizes.length - 1];
            node_str += '<div class="app-icon-svg" title="' + app.name + '"></div><div class="app-letters" style="font-size:' + fontSize + 'px;" aria-hidden="true">' + app.letters + '</div>'; // app-icon-svg
            if (i < colors.length - 1) i++;
            else i = 0;
        }
        node_str += '</div>'; // close app-icon-container
        node_str += '<span class="app-title">' + app.name + '</span>'; // app-title
        node_str += '</li>' // close li
        jQuery('.apps-container').append(node_str);

    });
    jQuery('.app-icon-svg').load('assets/app_bg.html', function(event) {});
    jQuery('.app-switcher-trigger').on('click', function(e) {
        e.preventDefault();
        jQuery('body').toggleClass('app-switcher--visible');
        // console.log(jQuery(this));
        // if (jQuery('body').hasClass('app-switcher--visible')) {
        //     jQuery('.app-switcher').css('left', (jQuery(this).position().left - jQuery('.app-switcher').width() + 75));
        // }
        var tabindex = jQuery('body').hasClass('app-switcher--visible') ? '0' : '-1';
        jQuery('.app-module').attr('tabindex', tabindex);
    });
    jQuery('.app-module').on('click', function(event){
      jQuery('body').toggleClass('app-switcher--visible');
      var icon = jQuery(this).attr('data-app-icon');
      var color = jQuery(this).attr('data-app-class');
      var app = jQuery(this).attr('data-app-name');
      // if(icon !== "undefined") {
        jQuery('.esri-global-nav__app-icon-image').attr('src', icon);
        var appHeader = jQuery('.esri-global-nav-wrapper');
        var classes = jQuery(appHeader).attr('class').split(' ');
        jQuery.each(classes, function(i, class_name){
            console.log(class_name);
            jQuery(appHeader).removeClass(class_name);
            jQuery(appHeader).addClass('esri-global-nav-wrapper');
            jQuery(appHeader).addClass(color);
        });
        // jQuery('.esri-global-nav-wrapper').css('background-color', color);
      // }
      jQuery('.esri-global-nav__app-name').html(app);
    });
});
