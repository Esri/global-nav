// tooling
import $ from './lib/create-element';
// import $apps from './render-apps';
import $user from './render-user';

// prefix
const prefix = 'esri-gnav-client';

// render client container
// export default (apps, user) => $('div', { class: prefix }, [].concat(
// 	apps ? $apps(apps) : [],
// 	user ? $user(user) : []
// ));

export default (user) => $('div', { class: prefix, id: prefix }, [
	$user(user)
]);
