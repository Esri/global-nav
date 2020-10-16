import {$assign as $} from '../../shared/js/shared';

export default (data) => {
  const showBreadCrumbs = data.showBreadcrumb;
  const breadcrumbHomeURL = data.breadcrumbHomeURL;
  const breadcrumbHomeLabel = data.breadcrumbHomeLabel;
  
  if (showBreadCrumbs) {
    const prefix =  'esri-footer-breadcrumb';
    const $breadCrumbs = document.createDocumentFragment();
    const breadCrumbItems = data.breadcrumbs || [];

    breadCrumbItems.forEach((crumb, index) => {
      const isLastBreadCrumbItem = (index === breadCrumbItems.length - 1);

      if (isLastBreadCrumbItem) {
        $($breadCrumbs, 
          $('li', {class: `${prefix}--items`}, '/',
            $('p', {href: crumb.href, class: `${prefix}--items-current`}, `${crumb.label}`)
          )
        );
      } else {
        $($breadCrumbs, 
          $('li', {class: `${prefix}--items`}, '/',
            $('a', {href: crumb.href, class: `${prefix}--items-link`}, `${crumb.label}`)
          )
        );
      }
    });

    return $('div', {class: `${prefix}`},
      $('a', {href: `${breadcrumbHomeURL}`, class: `${prefix}--pin`}, breadcrumbHomeLabel),
      $('ul', {class: `${prefix}--list`}, $breadCrumbs)
    );
  }
};
