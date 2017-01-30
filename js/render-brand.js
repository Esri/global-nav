import $ from './lib/create-element';

export default function (brand) {
	return $('a', { class: 'esri-gnav-brand', href: brand.href }, [
		$('svg', { class: 'esri-gnav-brand-svg', ariaLabel: brand.label }, [
			$('use', { href: brand.image })
		])
	]);
}
