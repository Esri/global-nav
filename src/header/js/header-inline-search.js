import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';
import {$close, $search} from '../../shared/js/iconPaths.js';

const prefix = 'esri-header-inlineSearch';
const searchState = {};

export default () => {
	/* Search: Control
	/* ====================================================================== */

	const $control = $('button',
		{
			class: `${prefix}-control`, id: `${prefix}-control`,
			aria: {expanded: false, controls: `${prefix}-content`}
		}
	);

	$control.addEventListener('header:menu:open', (event) => {
		$dispatch($control, 'header:inlineSearch:activated', {event});
	});

	$control.addEventListener('click', (event) => {
		$dispatch($control, 'header:click:inlineSearch', {event});
		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'inlineSearch',
			control: $control,
			content: $content,
			event
		});
	});

	/* Search: Close Button 
	/* ====================================================================== */

	const $closeBtn = $('button', {
		class: `${prefix}-close-button`, id: `${prefix}-close-button`,
		aria: {labelledby: `${prefix}-close-button`}
	}, $renderSvgOrImg({imgDef: $close.md, imgClass: `${prefix}-dismiss-icon`}));

	$closeBtn.addEventListener('click', (event) => {
		$dispatch($control, 'header:inlineSearch:deactivated', {event});

		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'inlineSearch',
			control: $control,
			content: $content,
			event
		});
	});

	/* Search: Input
	/* ====================================================================== */

	const $input = $('input', {
		class: `${prefix}-input`, id: `${prefix}-input`,
		aria: {labelledby: `${prefix}-input`}
	});

	$input.addEventListener("keyup", (e) => {
		searchState.value = e.target.value;
		if (!searchState.value || searchState.value === " ") {
			return $suggestions.innerHTML = ""; 
		} else if (e.keyCode === 13 && searchState.value) {
			return window.location.href = `${searchState.action}?q=${searchState.value}`;
		}

		$dispatch($control, 'header:search:typing', {
			search: searchState.value 
		});
	});

	/* Search: Suggestions 
	/* ====================================================================== */

	const $suggestions = $('div', {
		class: `${prefix}-suggestions`, id: `${prefix}-suggestions`,
		aria: {expanded: false, labelledby: `${prefix}-suggestions`}
	});

	const boldKeywords = (input, keywords) => input.replace(new RegExp(`(\\b)(${keywords.join('|')})(\\b)`,'ig'), '$1<strong>$2</strong>$3');

	/* Search: Content
	/* ====================================================================== */

	const $lineBreak = $('div', {class: `esri-header-lineBreak ${prefix}-lineBreak`});
	const $lineBreakRight = $('div', {class: `esri-header-lineBreak ${prefix}-lineBreak lineBreak-right`});

	const $content = $('div', {
		class: `${prefix}-content`, id: `${prefix}-content`,
		aria: {expanded: false, labelledby: `${prefix}-control`}
	}, $lineBreak, $input, $closeBtn, $suggestions, $lineBreakRight);

	/* Search: Target
	/* ====================================================================== */

	const $target = $('div', {
		class: prefix,
		aria: {expanded: false, labelledby: `${prefix}-target`}
	}, $control, $content);

	/* Search: On Activation
	/* ====================================================================== */

	$target.addEventListener('header:inlineSearch:activated', ({detail}) => {
		$target.setAttribute('aria-expanded', "true");
		setTimeout(() => {
			$input.focus();
		}, 0);
	});

	/* Search: On Deactivation
	/* ====================================================================== */

	$target.addEventListener('header:inlineSearch:deactivated', ({detail}) => {
		$target.setAttribute('aria-expanded', "false");
		$suggestions.innerHTML = '';
		$input.value = '';
		if (!detail.event.detail || !detail.event.detail.triggeredComponent || detail.event.detail.triggeredComponent === "inlineSearch") {
			setTimeout(() => {
				$control.focus();
			}, 0);
		}
	});

	/* Search: On Populate Suggestions
	/* ====================================================================== */

	$target.addEventListener('header:search:populateSuggestions', ({detail}) => {
    const searchValueArray = searchState.value.split(" ");
		$suggestions.innerHTML = '';
		// No Results State
		if (!detail.suggestions || !detail.suggestions.length) return;

		detail.suggestions.forEach((s) => {
			const $header = $('p', {class: `${prefix}-suggestion-header`}, s.header);
			const $footer = $('a', {
				href: s.footer.href,
				class: `${prefix}-suggestion-footer`
			}, s.footer.text);
			const $hr = $('hr');
			const $ul = $('ul', {class: `${prefix}-suggestion-list`});

			s.links.forEach((l) => {
				const $text = boldKeywords(l.text, searchValueArray);
				const $span = $('span').innerHTML = $text;

				const $li = $('li', {
					class: `${prefix}-suggestion`
				}, $('a', {href: l.href}, $span));

				$ul.appendChild($li);
			});

			const $section = $('div', {
				class: `${prefix}-suggestion-section`
			}, $header, $hr, $ul, $footer);

			$suggestions.appendChild($section);
		});

		const $keyword = $('strong', {}, searchState.value);
		const $allResults = $('a', {
			href: `${searchState.action}?q=${searchState.value}`,
			class: `${prefix}-suggestions-all-results`}, `${boldKeywords(detail.seeAllResultsString, searchValueArray)} `, $keyword 
		);
		const $allResultsSection = $('div', {
			class: `${prefix}-suggestions-all-results-section`
		}, $renderSvgOrImg({imgDef: $search.sm, imgClass: `${prefix}-all-results-icon`}), $allResults) ;
		$suggestions.appendChild($allResultsSection);
	});

	/* Search: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:inlineSearch', ({detail}) => {
		if (!detail.hide) {
			$($control, {aria: {label: detail.label}});
			$renderSvgOrImg({imgDef: detail.image || $search.md, imgClass: `${prefix}-image`, id: `${prefix}-image`, $targetElm: $control});

			searchState.image = detail.image;
			searchState.action = detail.dialog && detail.dialog.action;

      $input.setAttribute("placeholder", (detail.dialog && detail.dialog.queryLabel) || "");

			if (detail.dialog) {
				detail.dialog.prefix = 'esri-header-search-dialog';
			}
		}
	});

	return $target;
};
