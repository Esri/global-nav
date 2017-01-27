import $ from '../create-element';

export default function (search) {
	return $('button', { class: 'esri-gnav-link esri-gnav-search' }, [
		$('svg', { class: 'esri-gnav-icon' }, [
			$('use', { href: 'assets/gnav.svg#search' })
		])
	]);
}
