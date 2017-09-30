/* Global Footer
/* ========================================================================== */

import { $assign as $ } from '../../shared/js/shared';

// Create branding and social sections
export default (data, prefix) => $('nav',
	{ class: `${prefix}-social`, aria: { label: data.label } },
	$('ul', { class: `${prefix}-social-list`, role: 'presentation' },
		data.menu.reduce(
			($fragment, item) => $($fragment,
				$('li', { class: `${prefix}-social-item` },
					$('a',
						{
							class: `${prefix}-social-link -${item.label.toLowerCase()}`,
							href: item.href,
							aria: { label: item.label }
						},
						$(
							document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
							{
								class: `${prefix}-social-image`,
								width: 30, height: 30, viewBox: item.image.viewBox,
								role: 'presentation'
							},
							$(
								document.createElementNS('http://www.w3.org/2000/svg', 'path'),
								{ d: item.image.path }
							)
						)
					)
				)
			),
			document.createDocumentFragment()
		)
	)
);
