/* Global Footer
/* ========================================================================== */

import { $assign as $, $replaceAll } from 'esri-global-shared';

// Create branding and social sections
export default (data, prefix) => {

	const $target = $('a', { class: `${prefix}-brand-link`, href: data.href, aria: { label: data.label } });
	if (typeof data.path === 'string') {
		const $img = $('img', {src: data.path, class: `${prefix}-brand-image`});
		$target.appendChild($img);
	} else {
		const $targetImage = $(
			document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			{class: `${prefix}-image`, viewBox: `0 0 114 114`, width: 114, height: 114, role: 'presentation' }
		);
		$replaceAll($targetImage,
			...data.path.map(
				(d) => $(
					document.createElementNS('http://www.w3.org/2000/svg', 'path'),
					{ d }
				)
			)
		);
		$target.appendChild($targetImage);
	}
	return $target;
}


