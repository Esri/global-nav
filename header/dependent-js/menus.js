/* Tooling
/* ========================================================================== */

import { $, $append, $empty, $attrs, $bind, $dispatch } from 'esri-global-shared';

/* Menus
/* ========================================================================== */

const prefix = 'esri-header-menus';

export default () => {
	/* Menus: Control
	/* ====================================================================== */

	const $control = $('button', {
		class: `${prefix}-toggle`, id: `${prefix}-toggle`,
		ariaControls: `${prefix}-content`, ariaExpanded: false, ariaHaspopup: true, ariaLabelledby: 'esri-header-brand'
	});

	$bind('click', $control, (event) => {
		$dispatch('header:menu:toggle', $control, {
			control: $control,
			content: $content,
			state:   'menu',
			root:    true,
			event
		});
	});

	/* Menus: Content
	/* ====================================================================== */

	const $content = $('div', { class: `${prefix}-content`,
		ariaHidden: true, ariaExpanded: false
	});

	/* Menus
	/* ====================================================================== */

	const $target = $('div', { class: prefix, id: prefix }, [ $control, $content ]);

	/* Menus: On Update
	/* ====================================================================== */

	$bind('header:update:menus', $target, ({ detail }) => {
		$empty(
			$content,
			detail.map(
				(menu, uuid) => $('div', {
					class: `${prefix}-menu`,
					role: 'group'
				}, [
					$('ul', {
						class: `${prefix}-list`,
						role: 'navigation', ariaLabelledby: 'esri-header-brand'
					}, menu.map(
						(item, suuid) => $('li', { class: `${prefix}-item` }, [], ($li) => {
							/* Global Navigation: Menus: Link
							/* ====================================================== */

							const $subcontrol = $('a', {
								class: `${prefix}-link`, id: `${prefix}-link-${uuid}-${suuid}`,
								href: item.href || 'javascript:;' // eslint-disable-line no-script-url
							}, [ document.createTextNode(item.label) ]);

							$append($li, [ $subcontrol ]);

							const hasMenuItems = item.menus && item.menus.length;
							const hasFeaturedItems = item.tiles && item.tiles.length;

							if (hasMenuItems || hasFeaturedItems) {
								/* Global Navigation: Submenu
								/* ====================================== */

								const $subtoggle = $('button', { class: `${prefix}-submenu-toggle` }, [ document.createTextNode(item.label) ]);

								const $subcontent = $('div', {
									class: `${prefix}-submenu`, id: `${prefix}-submenu-${uuid}-${suuid}`,
									role: 'group', ariaHidden: true, ariaExpanded: false,
									dataFilled: `${item.menus.length > 8 ? item.menus.slice(0, 16).length : ''}`
								}, [ $subtoggle ]);

								if (hasMenuItems) {
									$append($subcontent, [
										$('ul', {
											class: `${prefix}-sublist`,
											role: 'navigation', ariaLabelledby: `${prefix}-link-${uuid}-${suuid}`
										}, item.menus.slice(0, 16).map(
											(childitem) => $('li', { class: `${prefix}-subitem` }, [
												$('a', { class: `${prefix}-sublink`, href: childitem.href }, [ document.createTextNode(childitem.label) ])
											])
										))
									]);
								}

								if (hasFeaturedItems) {
									$append($subcontent, [
										$('ul', {
											class: `${prefix}-sublist--featured`,
											role: 'navigation', ariaLabelledby: `${prefix}-link-${uuid}-${suuid}`,
											dataFilled: `${ item.tiles.slice(0, 4).length }`
										}, item.tiles.slice(0, 4).map(
											(childitem) => $('li', { class: `${prefix}-subitem--featured` }, [
												/* Global Navigation: Menus: Sublink
												/* ====================================== */

												$('a', { class: `${prefix}-sublink--featured`, href: childitem.href }, [
													$('svg', { class: `${prefix}-sublink-image` }, [], ($svg) => {
														if ('string' === typeof childitem.icon) {
															$svg.appendChild(
																$('use', { 'href': childitem.icon })
															);
														} else {
															if (childitem.width && childitem.height) {
																$attrs($svg, { viewBox: `0 0 ${childitem.width} ${childitem.height}` });
															}

															if (childitem.icon && childitem.icon.length) {
																$append($svg, childitem.icon.map(
																	(d) => $('path', { d })
																));
															}
														}
													}),
													$('span', { class: `${prefix}-sublink-text` }, [ document.createTextNode(childitem.label) ])
												])
											])
										))
									]);
								}

								$append($li, [ $subcontent ]);

								$bind('click', $subcontrol, () => {
									$dispatch('header:menu:toggle', $subcontrol, {
										control: $subcontrol,
										content: $subcontent,
										submenu: true,
										state:   'menu'
									});
								});

								$bind('click', $subtoggle, () => {
									$dispatch('header:menu:close', $subtoggle, {
										control: $subcontrol,
										submenu: true,
										content: $subcontent
									});
								});
							}
						})
					))
				])
			)
		);
	});

	return $target;
};
