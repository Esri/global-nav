import {$assign as $, $renderSvgOrImg} from '../../shared/js/shared';

export default (data, prefix) => {
	const $socialIcons = document.createDocumentFragment();


	data.menu.forEach((item) => {
		$($socialIcons,
			$('a',
				{
					class: `${prefix}-social-item ${prefix}-social-link -${item.label.toLowerCase().replace(' ','-')}`,
					href: item.href,
					aria: {label: item.label},
					target: '_blank'
				},
				$renderSvgOrImg({imgDef: item.image.path, imgClass: `${prefix}-social-image`, alt: '', imgWidth: 30, imgHeight:30, viewBox : item.image.viewBox})
			));
	});

	return $('div', {class: `${prefix}-social`},
		$('nav', {class: `${prefix}-social-nav`, aria: {label: data.label}},
			$socialIcons));
};
