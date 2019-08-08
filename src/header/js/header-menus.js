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

	/* Menus: Link 
	/* ====================================================================== */

	const createNavLink = (link) => {
		const $link = $('a',
			{class: `${prefix}-${link.class}`, href: link.props.href || 'javascript:;'},
			link.icon || "",
			link.label
		);

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
			role: 'navigation', aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`},
			data: {filled: `${tiles.slice(0, 4).length}`}
		}, ...tiles.slice(0, 4).map(createTile));
	};

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

							const $subcontrol = createNavLink({
								class: `link ${item.hideLabelInDesktop ? '-hide-label' : ''} ${item.active ? '-is-active' : ''}`,
								id: `link-${variant}-${uuid}-${suuid}`,
								props: item,
								icon: $linkIcon,
								label: $('span', {class: `${prefix}-link-label`}, item.label)
							});

							const $li = $('li', {class: `${prefix}-item`}, $subcontrol);

							const hasMenuItems = item.menus && item.menus.length;
							const hasCols = item.cols && item.cols.length;
							const hasFeaturedItems = item.tiles && item.tiles.length;

							if (hasMenuItems || hasCols || hasFeaturedItems) {
								/* Global Navigation: Submenu
								/* ====================================== */
								const $subtoggle = $('button', {class: `${prefix}-submenu-toggle`},
									item.label
								);

								const hasStructured = hasCols && item.cols.filter((col) => (col.type === 'structured')).length > 0;
								let multiCols = false;

								if (item.menus && item.menus.length > 10) {
									((item.menus.length % 3) === 0) ? multiCols = true : multiCols = false;
								}

								const $subcontent = $('div',
									{
										class: `${prefix}-submenu`,
										id: `${prefix}-${variant}-submenu-${uuid}-${suuid}`,
										'data-has-structured': hasStructured,
										role: 'group', aria: {hidden: true, expanded: false},
										data: {
											filled: (item.menus && item.menus.length > 10) ? item.menus.slice(0, 30).length : '', 
											structuredCols: hasCols ? item.cols.length : '', 
											hasMultiCols: multiCols
										}
									},
									$subtoggle
								);

								if (hasCols) {
									renderMulti({$subcontent, item, uuid, suuid});
								} else {
									renderSingle({hasMenuItems, $subcontent, item, uuid, suuid});
								}

								if (hasFeaturedItems) {
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

	function renderSingle({hasMenuItems, $subcontent, item, uuid, suuid}) {
		let columns = '';

		if (item.menus.length >= 10) {
			if (item.menus.length % 2 === 0) {
				const multi = item.menus.length / 2;
				
				columns = $('div', {class: `${prefix}-sublist--col-wrapper`},
					createMenuColumns(item.menus.slice(0, multi)),
					createMenuColumns(item.menus.slice(parseInt(multi), item.menus.length - 1))
				);
			} else if (item.menus.length % 3 === 0) {
				const multi = item.menus.length / 3;

				columns = $('div', {class: `${prefix}-sublist--col-wrapper`},
					createMenuColumns(item.menus.slice(0, multi)),
					createMenuColumns(item.menus.slice(parseInt(multi), parseInt(multi * 2))),
					createMenuColumns(item.menus.slice(parseInt(multi * 2), item.menus.length - 1))
				);
			}
		} else {
			if (hasMenuItems) {
				columns = $('div', {class: `${prefix}-sublist--col-wrapper`},
					createMenuColumns(item.menus.slice(0, item.menus.length - 1))
				);
			}
		}

		$($subcontent,
			$('ul',
				{
					class: `${prefix}-sublist`,
					role: 'navigation', aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`}
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
							role: 'navigation', aria: {labelledby: `${prefix}-link-${variant}-${uuid}-${suuid}`}
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
				$items.push(
					$('li', {class: `${prefix}-entry--menus-subitem`},
						$('a', {href: entry.href, class: `${prefix}-entry-sublink`}, entry.label),
					)
				);
			}
		});

		return $items;
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
				$items.push(
					$('li', {class: `${prefix}-entry--menus-subitem`},
						$('a', {href: entry.href, class: `${prefix}-entry-sublink`},
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
