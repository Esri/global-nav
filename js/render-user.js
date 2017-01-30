// tooling
import $ from './lib/create-element';

// render user element
export default (user) => $('div', { class: 'esri-gnav-user' },
	user.name ? [
		// logged in experience
		$('button', {
			class: 'esri-gnav-link esri-gnav-button esri-gnav-user-link esri-gnav-user-link--loggedin',
			id: 'esri-gnav-user-control',
			ariaControls: 'esri-gnav-user-menu',
			ariaExpanded: false,
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
			ariaExpanded: false,
			ariaHidden: true,
			ariaLabelledby: 'esri-gnav-user-control'
		}, [
			$('img', {
				class: 'esri-gnav-user-menu-image',
				src: '//placehold.it/260x260'
			})
		])
	] : [
		// logged out experience
		$('button', { class: 'esri-gnav-link esri-gnav-button esri-gnav-user-link esri-gnav-user-link--loggedout' }, [
			document.createTextNode(user.label)
		])
	]
);
