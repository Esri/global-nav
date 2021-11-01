import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';
import {$hamburger} from '../../shared/js/iconPaths';

const prefix = 'esri-header-menus';

export default ({variant = 'desktop'}) => {
	const $target = $('div', {class: prefix, id: `${prefix}-${variant}`});
	$target.classList.add(`-${variant}`);
	const isMobile = variant === 'mobile';

	if (isMobile) {
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
	const aria = isMobile ? {hidden: true, expanded: false} : {};
	const $content = $('div', {
		class: `${prefix}-content`,
		id: `${prefix}-content-${variant}`,
		aria
	});

	$($target, $content);

	/* Menus: Link
	/* ====================================================================== */

	const createNavLink = (link) => {
		let $link;
		const target = setUrlTarget(link.props.href);
		const rel = (target === "_blank") ? 'noopener' : null;
		if (link.props.href) {
			$link = $('a',
				{
					class: `${prefix}-${link.class}`,
					href: link.props.href,
					target,
					rel
				},
				link.icon || "",
				link.label
			);
		} else {
			$link = $('button',
				{class: `${prefix}-${link.class}`},
				link.icon || "",
				link.label
			);
		}

		if (link.id) {
			$link.setAttribute("id", `${prefix}-${link.id}`);
		}

		if (link.props.data) {
			for (const key in link.props.data) {
				$link.setAttribute(`data-${key}`, link.props.data[key]);
			}
		}

		if (link.props.newContext) {
			$($link, {
				target: '_blank',
				rel: 'noopener'
			});
		}

		return $link;
	};

	/* Menus: Column
	/* ====================================================================== */

	const createColumn = (childitem) => {
		const headingClass = childitem.heading ? `${prefix}-subitem--heading` : "";

		return $('li',
			{class: `${prefix}-subitem ${headingClass}`},
			childitem.heading ? $('p', {class: `${prefix}-heading--label`}, childitem.heading) : '',
			createNavLink({class: "sublink", props: childitem, label: childitem.label})
		);
	};

	const createMenuColumns = (items) => {
		if (!items.length) return null;
		return $('div', {class: `${prefix}-sublist--col`}, ...items.map(createColumn));
	};

	/* Menus: Tile
	/* ====================================================================== */

	const createTile = (tile) => {
		const icon = $renderSvgOrImg({imgDef: tile.icon, imgClass: `${prefix}-sublink-image`, imgWidth: tile.width, imgHeight: tile.height});
		return $('li', {class: `${prefix}-subitem--featured`},
			createNavLink({
				class: "sublink--featured",
				props: tile,
				icon,
				label: $('span', {class: `${prefix}-sublink-text`}, tile.label)
			})
		);
	};

	const createMenuTiles = (tiles, uuid, suuid) => {
		if (!tiles.length) return null;
		return $('ul', {
			class: `${prefix}-sublist--featured`,
			aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`},
			data: {filled: `${tiles.slice(0, 4).length}`}
		}, ...tiles.slice(0, 4).map(createTile));
	};

	/* Menus: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:menus', ({detail}) => {
		if (detail) {
			$target.classList.remove('hidden');
		} else {
			$target.classList.add('hidden');
			return;
		}
		if (detail.noBrand) {
			$target.classList.add("-no-brand");
		}
		$replaceAll(
			$content,
			...detail.map(
				(menu, uuid) => $('div',
					{
						class: `${prefix}-menu`
					},
					$('ul',
						{
							class: `${prefix}-list`,
							aria: {labelledby: 'esri-header-brand'}
						},
						...menu.map((item, suuid) => {
							/* Global Navigation: Menus: Link
							/* ====================================================== */
							const $linkIcon = item.icon
								? $renderSvgOrImg({imgDef: item.icon.path, imgClass: `${prefix}-link-icon`, imgWidth: item.icon.width || '16px', imgHeight: item.icon.height || '16px'})
								: null;

							const $subcontrol = createNavLink({
								class: `link ${item.hideLabelInDesktop ? '-hide-label' : ''} ${item.active ? '-is-active' : ''}`,
								id: `link-${variant}-${uuid}-${suuid}`,
								props: item,
								icon: $linkIcon,
								label: $('span', {class: `${prefix}-link-label`}, item.label)
							});

							const $li = $('li', {class: `${prefix}-item`}, $subcontrol);

							const hasMenuItems = item.menus && item.menus.length > 0;
							const hasCols = item.cols && item.cols.length;

							const hasFlyout = item.flyout && item.flyout.length > 0;
							const hasFeaturedItems = item.tiles && item.tiles.length > 0;

							if (hasMenuItems || hasCols || hasFeaturedItems || hasFlyout) {
								/* Global Navigation: Submenu
								/* ====================================== */
								const $subtoggle = $('button', {class: `${prefix}-submenu-toggle`},
									item.label
								);

								const hasStructured = hasCols && item.cols.filter((col) => (col.type === 'structured')).length > 0;
								let hasMultiCols = false;
								let columns = 0;

								if (hasMenuItems) {
									const total = item.menus.length;
									if (total >= 10) {
										hasMultiCols = total % 3 === 0;
										columns = Math.min(Math.ceil(total / 9), 3);
									}
								}

								const $subcontent = $('div',
									{
										class: `${prefix}-submenu`,
										id: `${prefix}-${variant}-submenu-${uuid}-${suuid}`,
										'data-has-structured': hasFlyout ? 'false' : hasStructured,
										'data-has-flyout': hasFlyout ? 'true' : 'false',
										aria: {hidden: true, expanded: false},
										data: {
											filled: (hasMenuItems && Math.min(item.menus.length, 30)) || '',
											structuredCols: hasCols || '',
											hasMultiCols,
											columns
										}
									},
									$subtoggle
								);

								if (hasFlyout) {
									renderFlyout({$subcontent, item, uuid, suuid});
								} else if (hasCols) {
									renderMulti({$subcontent, item, uuid, suuid});
								} else if (hasMenuItems) {
									renderSingle({hasMenuItems, $subcontent, item, uuid, suuid});
								}

								if (!hasFlyout && hasFeaturedItems) {
									$($subcontent,
										/* Global Navigation: Menus: Sublink
										/* ============================== */
										createMenuTiles(item.tiles, uuid, suuid)
									);
								}

								$($li, $subcontent);

								$subcontrol.addEventListener('click', (e) => {
									$dispatch($subcontrol, 'header:menu:toggle', {
										control: $subcontrol,
										content: $subcontent,
										submenu: true,
										state: 'menu',
										type: 'menu-toggle'
									});
									resetFlyoutDimensions('init');
									resetFlyoutState();
								});

								$subtoggle.addEventListener('click', () => {
									$dispatch($subtoggle, 'header:menu:close', {
										control: $subcontrol,
										submenu: true,
										content: $subcontent,
										type: 'menu-close'
									});
									resetFlyoutMenu();
								});
							}

							return $li;
						})
					)
				)
			)
		);
	});

	function resetFlyoutDimensions(parent) {
		const subMenus = [].slice.call(document.querySelectorAll('.esri-header-menus-submenu'));
		const parentState = (parent !== 'disabled' && parent !== 'init') && parent.getAttribute('data-parent');
		const parentElement = document.querySelector(`#${parentState}`);

		if (parent === 'init') {
			const listItems = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout'));

			if (listItems.length) {
				listItems.forEach((fly) => {
					const catItem = [].slice.call(fly.querySelectorAll('.esri-header-menus-flyout--categories-item'));
					const catItemParent = document.querySelector(`#${catItem[0].getAttribute('data-parent')}`);

					const listItems = [].slice.call(fly.querySelectorAll('.esri-header-menus-flyout--list-items'));
					const listColType = listItems[0].getAttribute('data-coltype');

					if (listColType === '1') {
						catItemParent.setAttribute('data-single', '');
					}
				});
			}
		} else if (parent === 'disabled') {
			subMenus.forEach((menu) => {
				menu.removeAttribute('data-single');
			});
		} else {
			parentElement.setAttribute('data-single', '');
		}
	}

	function resetFlyoutState() {
		const flyoutCategories = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-item'));
		const flyoutList = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--list-items'));

		if (flyoutList.length) {
			flyoutList.forEach((list, index) => {
				flyoutCategories[index].setAttribute('aria-current', 'false');
				list.setAttribute('aria-current', 'false');
				if ((list.hasAttribute('data-id') && list.getAttribute('data-id') === '0') &&
					(flyoutCategories[index].hasAttribute('data-id') && flyoutCategories[index].getAttribute('data-id') === '0')
				) {
					flyoutCategories[index].setAttribute('aria-current', 'true');
					list.setAttribute('aria-current', 'true');
				}
			});
		}
	}

	function resetFlyoutMenu() {
		const flyoutMenuHeaders = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-item_header'));
		const flyoutMenuDetails = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-details'));

		flyoutMenuHeaders.forEach((header) => {
			header.setAttribute("aria-current", "false");
		});

		flyoutMenuDetails.forEach((detail) => {
			detail.setAttribute("aria-expanded", "false");
			detail.style.height = '0';
		});
	}

	function renderSingle({hasMenuItems, $subcontent, item, uuid, suuid}) {
		let columns = '';

		if (item.menus.length >= 10 && item.menus.length <= 18) {
			const multi = Math.ceil(item.menus.length / 2);
			columns = $('div', {class: `${prefix}-sublist--col-wrapper ${prefix}-columns-2`},
				createMenuColumns(item.menus.slice(0, multi)),
				createMenuColumns(item.menus.slice(multi, item.menus.length))
			);
		} else if (item.menus.length > 18 && item.menus.length <= 27) {
			const multi = Math.ceil(item.menus.length / 3);
			columns = $('div', {class: `${prefix}-sublist--col-wrapper ${prefix}-columns-3`},
				createMenuColumns(item.menus.slice(0, multi)),
				createMenuColumns(item.menus.slice(multi, (multi * 2))),
				createMenuColumns(item.menus.slice((multi * 2), item.menus.length))
			);
		} else {
			if (hasMenuItems) {
				columns = $('div', {class: `${prefix}-sublist--col-wrapper`},
					createMenuColumns(item.menus.slice(0, item.menus.length))
				);
			}
		}

		$($subcontent,
			$('ul',
				{
					class: `${prefix}-sublist`,
					aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`}
				},
				/* Global Navigation: Menus: Sublink
				/* ============================== */
				$(columns)
			)
		);
	}

	function renderMulti({$subcontent, item, uuid, suuid}) {
		const $cols = $('div', {class: `${prefix}-sublist--col-wrapper`});

		if (item.cols) {
			item.cols.forEach((col) => {
				let menuType = 'standard';
				let menuRenderer = renderer;
				const menuBorder = col.border || 'false';

				switch (col.type) {
					case 'structured':
						menuType = 'structured';
						menuRenderer = renderStructuredMenu;
						break;
				}

				$($cols,
					$('div', {class: `${prefix}-sublist--col`, 'data-coltype': menuType, 'data-menuborder': menuBorder},
						$('ul', {
							class: `${prefix}-sublist`, 'data-menutype': menuType,
							aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`}
						}, ...menuRenderer(col.items))
					)
				);
			});

			$($subcontent,
				$('div', {class: `${prefix}-sublist`},
					$cols,
				)
			);
		}
	}

	function swapFlyoutContent(category) {
		const categoryList = category.target.parentNode.querySelector('.esri-header-menus-flyout--categories-details[aria-expanded]');
		const categoryHeader = category.target.parentNode.querySelector('.esri-header-menus-flyout--categories-item_header');
		const active = categoryList.getAttribute('aria-expanded') === 'false' ? 'true' : 'false';
		const categoryDetailsItems = [].slice.call(category.target.parentNode.querySelectorAll('.esri-header-menus-flyout--categories-details_item'));
		const catsComputedStyle = window.getComputedStyle(categoryDetailsItems[0]);
		const computedHeight = (parseInt(catsComputedStyle.height) * categoryDetailsItems.length);
		const computedMargin = (parseInt(catsComputedStyle.marginTop) * categoryDetailsItems.length) + parseInt(catsComputedStyle.marginTop);
		const headers = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-item_header'));
		const items = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-item'));
		const itemsList = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--list-items'));
		const isMobile = (window.innerWidth < 1024);

		if (isMobile) {
			const categoryListArr = [].slice.call(document.querySelectorAll('.esri-header-menus-flyout--categories-details[aria-expanded]'));
			categoryListArr.forEach((list) => {
				list.setAttribute('aria-expanded', 'false');
				list.style.height = '0';
			});

			categoryList.setAttribute('aria-expanded', `${active}`);
			if (active === 'true') {
				categoryList.style.height = `${(computedHeight) + (computedMargin)}px`;
				headers.forEach((head) => {
					head.setAttribute('aria-current', 'false');
				});
				categoryHeader.setAttribute('aria-current', 'true');
			} else {
				categoryList.style.height = '0';
				categoryHeader.setAttribute('aria-current', 'false');
			}
		} else {
			items.forEach((item, index) => {
				item.addEventListener('click', (e) => {
					const parentNode = e.target.parentNode;
					const selectedCategory = parentNode.getAttribute('data-id');
					const selectedList = itemsList[index].getAttribute('data-id');
					const selectedListCols = itemsList[index].getAttribute('data-coltype');

					itemsList.forEach((list, index) => {
						list.setAttribute('aria-current', 'false');
						items[index].setAttribute('aria-current', 'false');
					});

					if (selectedCategory === selectedList) {
						(selectedListCols) === '1' ? resetFlyoutDimensions(parentNode) : resetFlyoutDimensions('disabled');
						parentNode.setAttribute('aria-current', 'true');
						itemsList[index].setAttribute('aria-current', 'true');
						itemsList[index].focus();
					}
				});
			});
		}
	}

	function renderFlyoutMenu(items, type, id, uuid, suuid) {
		const $items = [];
		const listArr = [];
		let category = "";

		switch (type) {
			case 'category':
				if (items.cols.length) {
					items.cols.forEach((column) => {
						category = $('li', {
							class: `${prefix}-flyout--categories-item`,
							'data-id': id,
							'aria-current': id === 0 ? 'true' : 'false',
							'data-parent': `${prefix}-${variant}-submenu-${uuid}-${suuid}`,
							tabindex: -1
						},
							$('button', {
								class: `${prefix}-flyout--categories-item_header`,
								tabindex: 0,
								click: (e) => {
									swapFlyoutContent(e);
								}
							}, items.category)
						);
						column.col.forEach((col) => {
							const target = setUrlTarget(col.href);
							const rel = (target === '_blank') ? 'noopener' : null;
							listArr.push(
								$('a', {
									href: col.href,
									class: `${prefix}-flyout--categories-details_item`,
									'data-heading': col.heading ? 'true' : 'false',
									tabindex: -1,
									target,
									rel
								},
									(col.heading) && $('p', {class: `${prefix}-flyout--categories-details_heading`}, col.heading),
									(col.label) && $('p', {class: `${prefix}-flyout--categories-details_label`}, col.label)
								)
							);
						});
					});
				}

				$items.push(
					$(category,
						$('div', {
							class: `${prefix}-flyout--categories-details`,
							'aria-expanded': 'false',
							tabindex: -1
						},
							...listArr)
					)
				);
				break;

			case 'label':
				if (items.cols && items.cols.length) {
					items.cols.forEach((column) => {
						const $column = $('ul', {class: `${prefix}-flyout--list-items_column`});
						column.col.forEach((col) => {
							const target = setUrlTarget(col.href);
							const rel = (target === '_blank') ? 'noopener' : null;
							$items.push(
								$($column,
									$('li', {class: `${prefix}-flyout--list-items_name`},
										$('a', {
											href: col.href,
											class: `${prefix}-flyout--list-items_anchor`,
											'data-heading': (col.heading) ? 'true' : 'false',
											target,
											rel
										},
											(col.heading) && $('p', {class: `${prefix}-flyout--list-items_heading`}, col.heading),
											(col.label) && $('p', {class: `${prefix}-flyout--list-items_label`}, col.label)
										)
									)
								)
							);
						});
					});
				}
				break;
		}

		return $items;
	}

	function renderFlyout({$subcontent, item, uuid, suuid}) {
		const $flyoutCategories = $('ul', {class: `${prefix}-flyout--categories`});
		const $flyoutList = $('div', {class: `${prefix}-flyout--list`});

		item.flyout.forEach((item, id) => {
			$($flyoutCategories,
				...renderFlyoutMenu(item, 'category', id, uuid, suuid)
			);

			$($flyoutList,
				$('div', {
					class: `${prefix}-flyout--list-items`,
					'data-id': id, 'data-coltype': item.cols.length,
					'aria-current': id === 0 ? 'true' : 'false',
					tabindex: 0
				},
					...renderFlyoutMenu(item, 'label', id, uuid, suuid)
				)
			);
		});

		$($subcontent,
			$('div', {class: `${prefix}-flyout`},
				$('div', {class: `${prefix}-flyout--categories-wrapper`},
					$flyoutCategories
				),
				$flyoutList,
			)
		);
	}

	function renderer(entries) {
		const $items = [];

		entries.map((entry) => {
			if (entry.heading) {
				$items.push(
					$('li', {class: `${prefix}-entry--heading`},
						$('p', {class: `${prefix}-entry--heading-label`}, entry.heading)
					)
				);
			}

			if (entry.href && entry.label) {
				const target = setUrlTarget(entry.href);
				const rel = (target === '_blank') ? 'noopener' : null;

				$items.push(
					$('li', {class: `${prefix}-entry--menus-subitem`},
						$('a', {
							href: entry.href,
							class: `${prefix}-entry-sublink`,
							target,
							rel
						},
							entry.label),
					)
				);
			}
		});

		return $items;
	}

	function setUrlTarget(href) {
		if (href) {
			const regX = /^\//;
			const isRelative = href.search(regX) === 0;
			const isExternal = href.indexOf(window.location.hostname) < 0;
			let target = "";
			if (isRelative || !isExternal) {
				target = "_top";
			} else	if (isRelative || isExternal) {
				target = "_blank";
			}
			return target;
		}
	}

	function renderStructuredMenu(entries) {
		const $items = [];

		entries.forEach((entry) => {
			if (entry.heading) {
				$items.push(
					$('li', {class: `${prefix}-entry--heading`},
						$('p', {class: `${prefix}-entry--heading-label`},
							entry.heading
						))
				);
			}

			if (entry.href && entry.label) {
				const target = setUrlTarget(entry.href);
				const rel = (target === '_blank') ? 'noopener' : null;
				$items.push(
					$('li', {class: `${prefix}-entry--menus-subitem`},
						$('a', {
							href: entry.href,
							class: `${prefix}-entry-sublink`,
							target,
							rel
						},
							$('p', {class: `${prefix}-entry-sublink--title`}, entry.label),
							entry.description ? $('p', {class: `${prefix}-sublink--description`}, entry.description) : null
						)
					)
				);
			}
		});

		return $items;
	}

	$target.addEventListener('header:update:collapseMenus', ({detail}) => {
		if (detail && detail.indexOf(true) > -1) {
			const $brand = document.getElementById('esri-header-brand') || document.getElementById('esri-header-inline-title');
			document.querySelector('.esri-header-menus-toggle').classList.add('-visible');
			$brand.classList.add('-fit-burger');
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
