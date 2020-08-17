import {$assign as $} from '../../shared/js/shared';

const prefix = 'esri-header-branding-stripe';

export default () => {
	const $target = $('div', {class: prefix, id: prefix});

	/* Brand: On Update
	/* ====================================================================== */
	$target.addEventListener('header:update:brand', ({detail}) => {
		if (detail) {
			$target.classList.remove('hidden');
		} else {
			$target.classList.add('hidden');
			return;
		}
		$target.style.backgroundColor = detail.topStripe;
		$target.classList.add('-visible');
	});

	return $target;
};

