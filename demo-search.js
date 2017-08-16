// initialize object
var $esriSearch = 'function' === typeof esriSearch ? esriSearch({
	prefix: 'esri-search',
	action: 'https://pages.codehub.esri.com/marketing/esri-search-page/',
	label: 'Esri',
	submitLabel: 'Search',
	cancelLabel: 'Cancel',
	queryLabel: 'Search Esri.com'
}) : null;

// when the document content has loaded
document.addEventListener('DOMContentLoaded', function () {
	const $barrier = document.querySelector('.esri-search-barrier');

	if ($esriSearch && $barrier) {
		$barrier.appendChild($esriSearch);
	}
});
