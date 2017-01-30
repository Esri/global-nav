// tooling
import $ from './lib/create-element';

// render user element
export default (user) => $('div', { class: '-user' },
	user.name ? [
		// logged in experience
		$('button', {
			class: '-user-link--loggedin',
			id: '-user-link',
			ariaControls: '-user-menu',
			ariaExpanded: false,
			ariaHaspopup: true,
			ariaLabel: user.label
		}, [
			$('img', { class: '-user-image', src: user.image }),
			$('span', { class: '-user-name' }, [
				document.createTextNode(user.name)
			]),
			$('span', { class: '-user-id' }, [
				document.createTextNode(user.id)
			])
		]),
		$('div', {
			class: '-user-menu',
			id: '-user-menu',
			role: 'group',
			ariaExpanded: false,
			ariaHidden: true,
			ariaLabelledby: '-user-link'
		}, [
			$('img', {
				class: '-user-menu-image',
				src: '//placehold.it/260x260'
			})
		])
	] : [
		// logged out experience
		$('button', { class: '-user-link--loggedout' }, [
			document.createTextNode(user.label)
		])
	]
);
