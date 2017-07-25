/* Tooling
/* ========================================================================== */

import { $, $attrs, $empty, $bind, $dispatch } from 'esri-global-shared';

/* Account
/* ========================================================================== */

const prefix = 'esri-header-account';

export default () => {
	const $target = $('div', { class: prefix });

	/* Account: Control: Signin
	/* ====================================================================== */

	const $controlSigninText = document.createTextNode('');
	const $controlSignin = $('button', { class: `${prefix}-control ${prefix}-control--signin` }, [ $controlSigninText ]);

	// On Click
	$bind('click', $controlSignin, (event) => {
		$dispatch('header:click:signin', $controlSignin, { event });
	});

	/* Account: Control
	/* ====================================================================== */

	const $controlImage = $('img', { class: `${prefix}-image` });

	const $controlNameText = document.createTextNode('');
	const $controlName = $('span', { class: `${prefix}-name` }, [ $controlNameText ]);

	const $controlIdText = document.createTextNode('');
	const $controlId = $('span', { class: `${prefix}-id` }, [ $controlIdText ]);

	const $control = $('button', {
		class: `${prefix}-control ${prefix}-control--signedin`, id: `${prefix}-control`,
		ariaControls: `${prefix}-menu`, ariaExpanded: false, ariaHaspopup: true
	}, [ $controlImage, $controlName, $controlId ]);

	// On Click
	$bind('click', $control, () => {
		$dispatch('header:menu:toggle', $control, {
			account: true,
			control: $control,
			content: $content,
			state:   'menu'
		});
	});

	/* Account: Content
	/* ====================================================================== */

	// Toggle
	const $contentToggleText = document.createTextNode('');
	const $contentToggle = $('button', { class: `${prefix}-content-toggle` }, [ $contentToggleText ]);

	$bind('click', $contentToggle, () => {
		$dispatch('header:menu:close', $contentToggle, {
			control: $control,
			content: $content
		});
	});

	// Image
	const $contentImage = $('img', { class: `${prefix}-content-image`, role: 'presentation' });

	// Info
	const $contentInfoNameText  = document.createTextNode('');
	const $contentInfoIdText    = document.createTextNode('');
	const $contentInfoGroupText = document.createTextNode('');
	const $contentInfo = $('div', { class: `${prefix}-content-info` }, [
		$contentImage,
		$('span', { class: `${prefix}-content-name`  }, [ $contentInfoNameText  ]),
		$('span', { class: `${prefix}-content-id`    }, [ $contentInfoIdText    ]),
		$('span', { class: `${prefix}-content-group` }, [ $contentInfoGroupText ])
	]);

	// Menu
	const $contentMenu = $('ul', {
		class: `${prefix}-content-menu`,
		role: 'navigation', ariaLabelledby: `${prefix}-control`
	});

	// Switch Control
	const $contentSigninSwitchText = document.createTextNode('');
	const $contentSigninSwitch = $('button', { class: `${prefix}-signin-control -switch` }, [ $contentSigninSwitchText ]);

	// Switch Control: On Click
	$bind('click', $contentSigninSwitch, (event) => {
		$dispatch('header:click:switch', $contentSigninSwitch, { event });
	});

	// Signout Control
	const $contentSigninSignoutText = document.createTextNode('');
	const $contentSigninSignout = $('button', { class: `${prefix}-signin-control -logout` }, [ $contentSigninSignoutText ]);

	// Signout Control: On Click
	$bind('click', $contentSigninSignout, (event) => {
		$dispatch('header:click:signout', $contentSigninSignout, { event });
	});

	// Signin Menu
	const $contentSigninMenu = $('ul', {
		class: `${prefix}-signin-menu`,
		role: 'group'
	}, [
		$('li', { class: `${prefix}-signin-item` }, [ $contentSigninSwitch ]),
		$('li', { class: `${prefix}-signin-item` }, [ $contentSigninSignout ])
	]);

	// Content
	const $content = $('div', {
		class: `${prefix}-menu`, id: `${prefix}-menu`,
		role: 'group', ariaExpanded: false, ariaHidden: true
	}, [ $contentToggle, $contentInfo, $contentMenu, $contentSigninMenu ]);

	/* Account: On Update
	/* ====================================================================== */

	$bind('header:update:account', $target, ({ detail }) => {
		$attrs($control, { ariaLabel: detail.label });

		// Update the control text
		$contentToggleText.nodeValue        = detail.label;
		$controlSigninText.nodeValue        = detail.controls.signin;
		$contentSigninSwitchText.nodeValue  = detail.controls.switch;
		$contentSigninSignoutText.nodeValue = detail.controls.signout;

		// If there is a user object
		if (detail.user) {
			// Update the account text + image
			$controlNameText.nodeValue = $contentInfoNameText.nodeValue = detail.user.name;
			$controlIdText.nodeValue   = $contentInfoIdText.nodeValue   = detail.user.id;
			$controlImage.src          = $contentImage.src              = detail.user.image;

			// Update the content menu
			$empty($contentMenu, detail.menus.map(
				(item) => $('li', { class: `${prefix}-content-item` }, [
					$('a', { class: `${prefix}-content-link`, href: item.href }, [ document.createTextNode(item.label) ])
				])
			));

			// Use the control and content
			$empty($target, [ $control, $content ]);
		} else {
			// Otherwise, use the signin control
			$empty($target, [ $controlSignin ]);
		}
	});

	return $target;
}
