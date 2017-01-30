// tooling
import $ from './lib/create-element';

// prefix
const prefix = 'esri-gnav-user';

// render user element
export default (user) => $('div', { class: prefix },
	user.name ? [
		// logged in experience
		$('button', {
			class: `${ prefix }-link--loggedin`,
			id: `${ prefix }-link`,
			ariaControls: `${ prefix }-menu`,
			ariaExpanded: false,
			ariaHaspopup: true,
			ariaLabel: user.label
		}, [
			$('img', { class: `${ prefix }-image`, src: user.image }),
			$('span', { class: `${ prefix }-name` }, [
				document.createTextNode(user.name)
			]),
			$('span', { class: `${ prefix }-id` }, [
				document.createTextNode(user.id)
			])
		]),
		$('div', {
			class: `${ prefix }-menu`,
			id: `${ prefix }-menu`,
			role: 'group',
			ariaExpanded: false,
			ariaHidden: true,
			ariaLabelledby: `${ prefix }-link`
		}, [
			$('img', {
				class: `${ prefix }-menu-image`,
				src: '//placehold.it/260x260'
			})
		])
	] : [
		// logged out experience
		$('button', { class: `${ prefix }-link--loggedout` }, [
			document.createTextNode(user.label)
		])
	]
);
