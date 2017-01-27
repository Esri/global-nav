import $ from '../create-element';

export default function (apps, user) {
	return $('div', { class: 'esri-gnav-user' }, [].concat(
		apps ? $('button', { class: 'esri-gnav-link esri-gnav-user-apps', ariaLabel: apps.label }, [
			$('svg', { class: 'esri-gnav-icon' }, [
				$('use', { href: 'assets/gnav.svg#apps' })
			])
		]) : [],
		user ? user.name
		? $('div', { class: 'esri-gnav-user-loggedin' }, [
			$('button', { class: 'esri-gnav-link esri-gnav-user-link', ariaLabel: user.label }, [
				$('img', { class: 'esri-gnav-user-image', src: user.image }),
				$('span', { class: 'esri-gnav-user-name' }, [
					document.createTextNode(user.name)
				]),
				$('span', { class: 'esri-gnav-user-id' }, [
					document.createTextNode(user.id)
				])
			])
		])
		: $('button', { class: 'esri-gnav-link esri-gnav-user-login' }, [
			document.createTextNode(user.label)
		]) : []
	));
}
