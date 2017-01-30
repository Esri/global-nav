import $ from './lib/create-element';

export default (user) => $('div', { class: 'esri-gnav-user' },
	user.name ? [
		$('button', {
			class: 'esri-gnav-link esri-gnav-user-link',
			id: 'esri-gnav-control',
			ariaControls: 'esri-gnav-user-menu',
			ariaExpanded: true,
			ariaHaspopup: true,
			ariaLabel: user.label
		}, [
			$('img', { class: 'esri-gnav-user-image', src: user.image }),
			$('span', { class: 'esri-gnav-user-name' }, [
				document.createTextNode(user.name)
			]),
			$('span', { class: 'esri-gnav-user-id' }, [
				document.createTextNode(user.id)
			])
		]),
		$('div', {
			class: 'esri-gnav-user-menu',
			id: 'esri-gnav-user-menu',
			role: 'group',
			ariaExpanded: true,
			ariaHidden: false,
			ariaLabelledby: 'esri-gnav-control'
		}, [
			$('img', {
				class: 'esri-gnav-user-menu-image',
				src: '//placehold.it/260x260'
			})
		])
	] : [
		$('button', { class: 'esri-gnav-link esri-gnav-user-login' }, [
			document.createTextNode(user.label)
		])
	]
);
