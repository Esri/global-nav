import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';
import {$hamburger} from '../../shared/js/iconPaths';

const prefix = 'esri-header-menus';

export default ({variant = 'desktop'}) => {
	const $target = $('div', {class: prefix, id: `${prefix}-${variant}`});
	$target.classList.add(`-${variant}`);

	if (variant === 'mobile') {
		const $toggle = $('button', {
			class: `${prefix}-toggle`, id: `${prefix}-${variant}-toggle`,
			aria: {controls: `${prefix}-content-${variant}`, expanded: false, haspopup: true, labelledby: 'esri-header-brand'}
		});
		$renderSvgOrImg({imgDef: $hamburger.md, imgClass: `${prefix}-image`, id: `${prefix}-image`, $targetElm: $toggle});

		$toggle.addEventListener('click', (event) => {
			$dispatch($toggle, 'header:menu:toggle', {
				control: $toggle,
				content: $content,
				root: true,
				state: 'menu',
				target: $target,
				type: 'root-toggle',
				event
			});
		});

		$($target, $toggle);
	}

	/* Menus: Content
	/* ====================================================================== */

	const $content = $('div', {
		class: `${prefix}-content`,
		id: `${prefix}-content-${variant}`,
		aria: {hidden: true, expanded: false}
	});

	$($target, $content);

	/* Menus
	/* ====================================================================== */


	/* Menus: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:menus', ({detail}) => {
		if (detail.noBrand) {
			$target.classList.add("-no-brand");
		}
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
							role: 'navigation', aria: {labelledby: 'esri-header-brand'}
						},
						...menu.map((item, suuid) => {
							/* Global Navigation: Menus: Link
							/* ====================================================== */

							const $linkIcon = item.icon
								? $renderSvgOrImg({imgDef: item.icon.path, imgClass: `${prefix}-link-icon`, imgWidth: item.icon.width || '16px', imgHeight: item.icon.height || '16px'})
								: null;

							const $subcontrol = $('a',
								{
									class: `${prefix}-link ${item.hideLabelInDesktop ? '-hide-label' : ''} ${item.active ? '-is-active' : ''}`, id: `${prefix}-link-${variant}-${uuid}-${suuid}`,
									href: item.href || 'javascript:;' // eslint-disable-line no-script-url
								},
								$linkIcon,
								$('span', {class : `${prefix}-link-label`}, item.label)
							);

							if (item.data) {
								for (const key in item.data) {
									$subcontrol.setAttribute(`data-${key}`, item.data[key]);
								}
							}

							const $li = $('li', {class: `${prefix}-item`}, $subcontrol);

							const hasStructuredMenu = item.useStructuredMenu || false;
							const hasMenuItems = item.menus && item.menus.length;
							const hasFeaturedItems = item.tiles && item.tiles.length;

							if (hasMenuItems || hasFeaturedItems) {
								/* Global Navigation: Submenu
								/* ====================================== */
								const $subtoggle = $('button', {class: `${prefix}-submenu-toggle`},
									item.label
								);

								const $structuredLeftCol = $('div',
									{
										class: `${prefix}-submenu--left-col`
									}
								);
								
								const $structuredRightCol = $('div',
									{
										class: `${prefix}-submenu--right-col`
									}
								);
								
								const $subcontent = $('div',
									{
										class: `${prefix}-submenu`, id: `${prefix}-${variant}-submenu-${uuid}-${suuid}`, 'data-has-structured': hasStructuredMenu,
										role: 'group', aria: {hidden: true, expanded: false},
										data: {filled: (item.menus && item.menus.length > 10) ? item.menus.slice(0,27).length : ''}
									},
									$subtoggle
								);

								if (hasStructuredMenu) {
									const structuredMenu = item.structuredMenu;
									if (structuredMenu) {
										structuredMenu.capabilities.forEach((entries) => {
											$($subcontent,
												$('div', {class: `${prefix}-structured-menu--wrapper`}, 
													$($structuredLeftCol,
														$('ul', 
															{
																class: `${prefix}-sublist`, 'data-menutype': 'structured',
																role: 'navigation', aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`}
															},
															$('li', 
																{
																	class: `${prefix}-entry--heading`
																},
																$('p', 
																	{
																		class: `${prefix}-entry--heading-label`
																	}, 
																	entries.heading
																)
															),
															...entries.entryData.map((entry) => {
																const menuItem = $('li', {class: `${prefix}-subitem`},
																	$('a', 
																		{
																			href: entry.href, 
																			class: `${prefix}-sublink`
																		},
																		$('p', 
																			{
																				class: `${prefix}-sublink--title`
																			},
																			entry.label
																		),
																		$('p', 
																			{
																				class: `${prefix}-sublink--description`
																			}, 
																			entry.description
																		)
																	)
																);
																return menuItem;
															}),
														)
													),
													$($structuredRightCol,
														$('ul', 
															{
																class: `${prefix}-sublist`, 'data-menutype': 'standard',
																role: 'navigation', aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`}
															},
															...item.menus.map(
																(childitem) => {
																	const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

																	if ($heading) {
																		return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
																	} else {
																		return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
																	}
																}
															)
														)
													)
												),
												$('ul',
														{
															class: `${prefix}-sublist--featured`,
															role: 'navigation', aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`},
															data: {filled: `${item.tiles.slice(0, 4).length}`}
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
																	$renderSvgOrImg({imgDef: childitem.icon, imgClass: `${prefix}-sublink-image`, imgWidth: childitem.width, imgHeight: childitem.height}),
																	$('span', {class: `${prefix}-sublink-text`},
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
			
																return $('li', {class: `${prefix}-subitem--featured`},
																	$sublink
																);
															}
														)
													)
												
											);
										});
									}
								} else {
									if (hasMenuItems) {
										let col1 = undefined;
										let col2 = undefined;
										let col3 = undefined;
										let col4 = undefined;

										if (item.menus.length <= 9) {
											col1 = $('div', {class: `${prefix}-sublist--col`},									
												...item.menus.slice(0,9).map(
													(childitem) => {
														const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

														if ($heading) {
															return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
														} else {
															return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
														}
													}
												)
											);
										} else if (item.menus.length > 9 && item.menus.length <= 18) {
											col1 = $('div', {class: `${prefix}-sublist--col`},									
												...item.menus.slice(0,9).map(
													(childitem) => {
														const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

														if ($heading) {
															return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
														} else {
															return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
														}
													}
												)
											);

											col2 = $('div', {class: `${prefix}-sublist--col`},									
												...item.menus.slice(9,18).map(
													(childitem) => {
														const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

														if ($heading) {
															return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
														} else {
															return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
														}
													}
												)
											);
										} else if (item.menus.length > 18 && item.menus.length <= 27) {
											col1 = $('div', {class: `${prefix}-sublist--col`},									
												...item.menus.slice(0,9).map(
													(childitem) => {
														const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

														if ($heading) {
															return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
														} else {
															return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
														}
													}
												)
											);

											col2 = $('div', {class: `${prefix}-sublist--col`},									
												...item.menus.slice(9, 18).map(
													(childitem) => {
														const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

														if ($heading) {
															return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
														} else {
															return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
														}
													}
												)
											);

											col3 = $('div', {class: `${prefix}-sublist--col`},
												...item.menus.slice(18,27).map(
													(childitem) => {
														const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

														if ($heading) {
															return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
														} else {
															return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
														}
													}
												)
											);
										} else if (item.menus.length > 27 && item.menus.length <= 36) {
											col1 = $('div', {class: `${prefix}-sublist--col`},									
												...item.menus.slice(0,9).map(
													(childitem) => {
														const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

														if ($heading) {
															return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
														} else {
															return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
														}
													}
												)
											);

											col2 = $('div', {class: `${prefix}-sublist--col`},									
												...item.menus.slice(9, 18).map(
													(childitem) => {
														const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

														if ($heading) {
															return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
														} else {
															return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
														}
													}
												)
											);

											col3 = $('div', {class: `${prefix}-sublist--col`},									
												...item.menus.slice(18,27).map(
													(childitem) => {
														const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

														if ($heading) {
															return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
														} else {
															return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
														}
													}
												)
											);

											col4 = $('div', {class: `${prefix}-sublist--col`},									
												...item.menus.slice(27,36).map(
													(childitem) => {
														const $heading = (childitem.heading) ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '';
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

														if ($heading) {
															return $('li', {class: `${prefix}-subitem heading`}, $heading, $($sublink));
														} else {
															return $('li', {class: `${prefix}-subitem`}, $heading, $($sublink));
														}
													}
												)
											);
										}

										$($subcontent,
											$('ul',
												{
													class: `${prefix}-sublist`,
													role: 'navigation', aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`}
												},
												/* Global Navigation: Menus: Sublink
												/* ============================== */
												$('div', {class: `${prefix}-sublist--col-wrapper`},
													col1,
													col2,
													col3,
													col4
												)
											)
										);
									}
	
									if (hasFeaturedItems) {
										$($subcontent,
											$('ul',
												{
													class: `${prefix}-sublist--featured`,
													role: 'navigation', aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`},
													data: {filled: `${item.tiles.slice(0, 4).length}`}
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
															$renderSvgOrImg({imgDef: childitem.icon, imgClass: `${prefix}-sublink-image`, imgWidth: childitem.width, imgHeight: childitem.height}),
															$('span', {class: `${prefix}-sublink-text`},
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
	
														return $('li', {class: `${prefix}-subitem--featured`},
															$sublink
														);
													}
												)
											)
										);
									}
								}

								$($li,
									$subcontent
								);

								$subcontrol.addEventListener('click', (e) => {
									$dispatch($subcontrol, 'header:menu:toggle', {
										control: $subcontrol,
										content: $subcontent,
										submenu: true,
										state: 'menu',
										type: 'menu-toggle'
									});
								});

								$subtoggle.addEventListener('click', () => {
									$dispatch($subtoggle, 'header:menu:close', {
										control: $subcontrol,
										submenu: true,
										content: $subcontent,
										type: 'menu-close'
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

	$target.addEventListener('header:update:collapseMenus', ({detail}) => {
		if (detail && detail.indexOf(true) > -1) {
			document.querySelector('.esri-header-menus-toggle').classList.add('-visible');
			document.getElementById('esri-header-brand').classList.add('-fit-burger');
			document.getElementById('esri-header-menus-mobile').classList.add('-always-hamburger');

			const menus = [].slice.call($target.querySelectorAll('.esri-header-menus-menu'));
			detail.forEach((collapse, i) => {
				if (collapse) {
					menus[i].classList.add('-collapsed');
				}
			});
		}
	});

	return $target;
};
