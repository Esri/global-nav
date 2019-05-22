import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';
import {$close, $check, $pencil} from '../../shared/js/iconPaths.js';

const prefix = 'esri-header-inline-title';
const titleState = {};

export default () => {
	/* Title: Control
	/* ====================================================================== */

	const $control = $('button',
		{
			class: `${prefix}-control`, id: `${prefix}-control`,
			tabindex: "-1",
			aria: {expanded: false, controls: `${prefix}-content`}
		}
	);

	$control.addEventListener('header:menu:open', (event) => {
		$dispatch($control, 'header:inlineTitle:activated', {event});
	});

	$control.addEventListener('click', (event) => {
		$dispatch($control, 'header:click:inlineTitle', {event});
		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'inlineTitle',
			control: $control,
			content: $content,
			event
		});
	});

	/* Title: Deactivates and Closes input
	/* ====================================================================== */

	const deactivateInput = () => {
		$dispatch($control, 'header:inlineTitle:deactivated', {event});

		setTimeout(() => {
			$control.focus();
		}, 0);

		$dispatch($control, 'header:menu:toggle', {
			state: 'menu',
			target: $target,
			type: 'inlineTitle',
			control: $control,
			content: $content,
			event
		});
	};

	/* Title: Save New Title and Emit Submit Event
	/* ====================================================================== */

	const saveNewTitle = (e) => {
		titleState.newValue = $input.value;

		if (!e.keyCode || e.keyCode === 13) {
			if (titleState.newValue && titleState.newValue !== " " && titleState.newValue !== titleState.text) {
				$dispatch($control, 'header:title:submit', {
					title: titleState.newValue
				});
			}
			deactivateInput();
		}
	};

	/* Title: Input
	/* ====================================================================== */

	const $input = $('input', {
		class: `${prefix}-input`, id: `${prefix}-input`,
		aria: {labelledby: `${prefix}-input`}
	});

	$input.addEventListener("keyup", saveNewTitle);

	/* Title: Close Button
	/* ====================================================================== */

	const $closeBtn = $('button', {
		class: `${prefix}-action-button ${prefix}-dismiss-button`,
		aria: {labelledby: `${prefix}-action-button`}
	}, $renderSvgOrImg({imgDef: $close.md, imgClass: `${prefix}-dismiss-icon`}));

	$closeBtn.addEventListener('click', deactivateInput);

	/* Title: Submit Button
	/* ====================================================================== */

	const $submitBtn = $('button', {
		class: `${prefix}-action-button ${prefix}-submit-button`,
		aria: {labelledby: `${prefix}-action-button`}
	}, $renderSvgOrImg({imgDef: $check.lg, imgClass: `${prefix}-submit-icon`}));

	$submitBtn.addEventListener('click', saveNewTitle); 

	/* Title: Content
	/* ====================================================================== */

	const $lineBreak = $('div', {class: `esri-header-lineBreak ${prefix}-lineBreak`});
	const $lineBreakRight = $('div', {class: `esri-header-lineBreak ${prefix}-lineBreak lineBreak-right`});
	const $actionButtons = $("span", {class: `${prefix}-actionButton-container`}, $closeBtn, $submitBtn);

	const $content = $('div', {
		class: `${prefix}-content`, id: `${prefix}-content`,
		aria: {expanded: false, labelledby: `${prefix}-control`}
	}, $lineBreak, $input, $actionButtons, $lineBreakRight);

	/* Title: Target
	/* ====================================================================== */

	const $target = $('span', {
		class: prefix,
		id: prefix,
		aria: {expanded: false}
	}, $control, $content);

	/* Title: On Active Edit
	/* ====================================================================== */

	$target.addEventListener('header:inlineTitle:activated', ({detail}) => {
		$input.value = titleState.text;
		$target.setAttribute('aria-expanded', "true");
		setTimeout(() => {
			$input.selectionStart = titleState.text.length;
			$input.focus();
		}, 100);
	});

	/* Title: On Deactive Edit
	/* ====================================================================== */

	$target.addEventListener('header:inlineTitle:deactivated', ({detail}) => {
		$target.setAttribute('aria-expanded', "false");
		$input.value = '';
	});

	/* Title: Reset Title State
	/* ====================================================================== */
	const resetState = () => {
		if (titleState.brandText && titleState.pencilIcon) {
			titleState.brandText.parentNode.removeChild(titleState.brandText);
			titleState.pencilIcon.parentNode.removeChild(titleState.pencilIcon);
		} else {
			$control.setAttribute("tabindex", "0"); 
		}
	};

	/* Title: On Update
	/* ====================================================================== */
	$target.addEventListener('header:update:inlineTitle', ({detail}) => {
		if (detail.brandText) {
			resetState();

			const maxTitleWidth = detail.maxViewWidth || 30;
			titleState.text = detail.brandText;
			titleState.pencilIcon = $renderSvgOrImg({imgDef: $pencil.sm, imgClass: `${prefix}-edit-icon`});
			titleState.brandText = $('span', {class: `${prefix}-text`, style: `max-width: ${maxTitleWidth}vw;`}, detail.brandText);
			if (detail.titleFontSize) titleState.brandText.style.fontSize = `${detail.titleFontSize}px`;

			$($control, titleState.brandText, titleState.pencilIcon);
		}
	});

	return $target;
};
