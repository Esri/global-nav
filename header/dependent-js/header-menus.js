/* Tooling
/* ========================================================================== */

import { $assign as $, $dispatch, $replaceAll } from 'esri-global-shared';

/* Menus
/* ========================================================================== */

const prefix = 'esri-header-menus';

export default () => {
	/* Toggle Menu
	/* ====================================================================== */

	const $toggle = $('button', {
		class: `${prefix}-toggle`, id: `${prefix}-toggle`,
		aria: { controls: `${prefix}-content`, expanded: false, haspopup: true, labelledby: 'esri-header-brand' }
	});

	$toggle.addEventListener('click', (event) => {
		$dispatch($toggle, 'header:menu:toggle', {
			control: $toggle,
			content: $content,
			root:    true,
			state:   'menu',
			target:  $target,
			type:    'root-toggle',
			event
		});
	});

	/* Menus: Content
	/* ====================================================================== */

	const $content = $('div', { class: `${prefix}-content`,
		aria: { hidden: true, expanded: false }
	});

	/* Menus
	/* ====================================================================== */

	const $target = $('div', { class: prefix, id: prefix },
		$toggle, $content
	);

	/* Menus: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:menus', ({ detail }) => {
		$replaceAll(
			$content,
			...detail.map(
				(menu, uuid) => $('div',
					{
						class: `${prefix}-menu`,
						role: 'group'
					},
					$('ul',
						{
							class: `${prefix}-list`,
							role: 'navigation', aria: { labelledby: 'esri-header-brand' }
						},
						...menu.map((item, suuid) => {
							/* Global Navigation: Menus: Link
							/* ====================================================== */

							const $subcontrol = $('a',
								{
									class: `${prefix}-link`, id: `${prefix}-link-${uuid}-${suuid}`,
									href: item.href || 'javascript:;' // eslint-disable-line no-script-url
								},
								item.label
							);

							if (item.data) {
								$subcontrol({
									data: item.data
								});
							}

							const $li = $('li', { class: `${prefix}-item` }, $subcontrol);

							const hasMenuItems = item.menus && item.menus.length;
							const hasFeaturedItems = item.tiles && item.tiles.length;

							if (hasMenuItems || hasFeaturedItems) {
								/* Global Navigation: Submenu
								/* ====================================== */

								const $subtoggle = $('button', { class: `${prefix}-submenu-toggle` },
									item.label
								);

								const $subcontent = $('div',
									{
										class: `${prefix}-submenu`, id: `${prefix}-submenu-${uuid}-${suuid}`,
										role: 'group', aria: { hidden: true, expanded: false },
										data: { filled: item.menus.length > 10 ? item.menus.slice(0, 18).length : '' }
									},
									$subtoggle
								);

								if (hasMenuItems) {
									$($subcontent,
										$('ul',
											{
												class: `${prefix}-sublist`,
												role: 'navigation', aria: { labelledby: `${prefix}-link-${uuid}-${suuid}` }
											},
											/* Global Navigation: Menus: Sublink
											/* ============================== */
											...item.menus.slice(0, 18).map(
												(childitem) => {
													const $sublink = $('a',
														{
															class: `${prefix}-sublink`,
															href: childitem.href
														},
														childitem.label
													);

													if (childitem.data) {
														$($sublink, {
															data: childitem.data
														});
													}

													if (childitem.newContext) {
														$($sublink, {
															target: '_blank',
															rel: 'noopener'
														});
													}

													return $('li', { class: `${prefix}-subitem` },
														$sublink
													);
												}
											)
										)
									);
								}

								if (hasFeaturedItems) {
									// ...
									$($subcontent,
										$('ul',
											{
												class: `${prefix}-sublist--featured`,
												role: 'navigation', aria: { labelledby: `${prefix}-link-${uuid}-${suuid}` },
												data: { filled: `${ item.tiles.slice(0, 4).length }` }
											},
											/* Global Navigation: Menus: Sublink
											/* ============================== */

											...item.tiles.slice(0, 4).map(
												(childitem) => {
													const $sublink = $('a',
														{
															class: `${prefix}-sublink--featured`,
															href: childitem.href
														},
														$(
															document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
															childitem.width && childitem.height ? { viewBox: `0 0 ${childitem.width} ${childitem.height}` } : {},
															{ class: `${prefix}-sublink-image` },
															$(document.createDocumentFragment(),
																...childitem.icon.map(
																	(d) => $(
																		document.createElementNS('http://www.w3.org/2000/svg', 'path'),
																		{ d }
																	)
																)
															)
														),
														$('span', { class: `${prefix}-sublink-text` },
															childitem.label
														)
													);

													if (childitem.data) {
														$($sublink, {
															data: childitem.data
														});
													}

													if (childitem.newContext) {
														$($sublink, {
															target: '_blank',
															rel: 'noopener'
														});
													}

													return $('li', { class: `${prefix}-subitem--featured` },
														$sublink
													);
												}
											)
										)
									);
								}

								$($li,
									$subcontent
								);

								$subcontrol.addEventListener('click', () => {
									$dispatch($subcontrol, 'header:menu:toggle', {
										control: $subcontrol,
										content: $subcontent,
										submenu: true,
										state:   'menu',
										type:    'menu-toggle'
									});
								});

								$subtoggle.addEventListener('click', () => {
									$dispatch($subtoggle, 'header:menu:close', {
										control: $subcontrol,
										submenu: true,
										content: $subcontent,
										type:    'menu-close'
									});
								});
							}

							return $li;
						})
					)
				)
			)
		);
	});

	return $target;
};
