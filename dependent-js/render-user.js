// tooling
import $ from './lib/create-element';

// prefix
const prefix = 'esri-gnav-user';

// render user element
export default (user) => $('div', { class: prefix, id: prefix },
	user.name ? [
		// logged in experience
		$('button', {
			class: `${ prefix }-link--loggedin`, id: `${ prefix }-link`,
			ariaControls: `${ prefix }-menu`, ariaExpanded: false, ariaHaspopup: true, ariaLabel: user.label
		}, [
			$('img', {
				class: `${ prefix }-image`,
				src: user.image
			}),
			$('span', { class: `${ prefix }-name` }, [
				document.createTextNode(user.name)
			]),
			$('span', { class: `${ prefix }-id` }, [
				document.createTextNode(user.id)
			])
		]),
		$('div', {
			class: `${ prefix }-menu`, id: `${ prefix }-menu`,
			role: 'group', ariaExpanded: false, ariaHidden: true
		}, [
			$('button', {
				class: `${ prefix }-menu-toggle`,
				dataRelated: 'esri-gnav-menus-content'
			}, [
				document.createTextNode('Account Profile')
			]),
			$('div', { class: `${ prefix }-menu-info` }, [].concat(
				user.image ? $('img', {
					class: `${ prefix }-menu-image`,
					src: user.image
				}) : [],
				user.name ? $('span', { class: `${ prefix }-menu-name` }, [
					document.createTextNode(user.name)
				]) : [],
				user.id ? $('span', { class: `${ prefix }-menu-id` }, [
					document.createTextNode(user.id)
				]) : [],
				user.group ? $('span', { class: `${ prefix }-menu-group` }, [
					document.createTextNode(user.group)
				]) : []
			)),
			$('ul', {
				class: `${ prefix }-menu-list`,
				ariaLabelledby: `${ prefix }-link`
			}, [
				$('li', { class: `${ prefix }-menu-item` }, [
					$('a', {
						class: `${ prefix }-menu-link`,
						href: '#user-menu-link'
					}, [ document.createTextNode('Profile & Settings') ])
				]),
				$('li', { class: `${ prefix }-menu-item` }, [
					$('a', {
						class: `${ prefix }-menu-link`,
						href: '#user-menu-link'
					}, [ document.createTextNode('My Esri') ])
				]),
				$('li', { class: `${ prefix }-menu-item` }, [
					$('a', {
						class: `${ prefix }-menu-link`,
						href: '#user-menu-link'
					}, [ document.createTextNode('Training') ])
				]),
				$('li', { class: `${ prefix }-menu-item` }, [
					$('a', {
						class: `${ prefix }-menu-link`,
						href: '#user-menu-link'
					}, [ document.createTextNode('Community & Forums') ])
				])
			])
		])
	] : [
		// logged out experience
		$('button', { class: `${ prefix }-link--loggedout` }, [
			document.createTextNode(user.label)
		])
	]
);
