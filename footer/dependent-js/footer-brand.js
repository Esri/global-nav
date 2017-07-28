/* Global Footer
/* ========================================================================== */

import { $assign as $ } from 'esri-global-shared';

// Create branding and social sections
export default (data, prefix) => $('div', { class: `${prefix}-brand` },
	$('a',
		{
			class: `${prefix}-brand-link`,
			href: data.href,
			aria: { label: data.label }
		},
		$(
			document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			{
				class: `${prefix}-brand-image`,
				width: '114', height: '114', viewBox: data.viewBox,
				role: 'presentation'
			},
			$(
				document.createElementNS('http://www.w3.org/2000/svg', 'path'),
				{ d: data.path }
			)
		)
	)
);
