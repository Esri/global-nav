
jQuery(document).ready(function($) {
  init();
});

var appWrapper;

function init() {
  // console.log('init');
  appWrapper = jQuery('.app-wrapper');
  jQuery('.in-item-toggle').on('click', function(event){
    event.preventDefault();
    appWrapper.toggleClass('in-item');
  });
}