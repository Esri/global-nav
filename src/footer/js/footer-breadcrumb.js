/* Global Footer: Tooling
/* ========================================================================== */

import {$assign as $, $renderSvgOrImg} from '../../shared/js/shared';

import {$pin} from '../../shared/js/iconPaths';
/* Global Footer Breadcrumb
/* ========================================================================== */

export default (data, prefix) => {
  if (data.showBreadcrumb) {
    const listWrapper = $('ul', {class: `esri-footer-breadcrumb--list`});
    const breadcrumb = window.location.pathname;
    if (breadcrumb.length) {
      const path = breadcrumb.split('/');
      path.forEach((element, index) => {
        if (element) {
          if (listWrapper) {
            if (index === path.length - 1) {
              $(listWrapper,
                $('li', {class: `esri-footer-breadcrumb--items`}, '/',
                  $('p', {class: `esri-footer-breadcrumb--items-current`}, `${element}`),
                ),
              );
            } else {
              $(listWrapper,
                $('li', {class: `esri-footer-breadcrumb--items`}, '/',
                  $('a', {href: '#', class: `esri-footer-breadcrumb--items-link`}, `${element}`)
                ),
              );
            }
          }
        }
      });
    }

    return $('div', {class: `${prefix}-breadcrumb`},
      $('a', {class: `${prefix}-breadcrumb--pin`}, $renderSvgOrImg({imgDef: $pin.sm, imgClass: `svg-icon`, imgWidth:"17", imgHeight:"17", viewBox:"0 0 32 32"})),
      listWrapper
    );
  }
};
