/* Global Footer: Tooling
/* ========================================================================== */

import { $ } from 'esri-global-shared';

/* Global Footer: Dialog
/* ========================================================================== */

export default function (data) {
	const fragment = document.createDocumentFragment();

	let isOpen = false;

	const $close = $('button', { class: 'glang-close', id: 'dialog-description', ariaLabel: data.close });
	const $canvas = $('button', { class: 'glang-canvas', type: 'button', tabindex: -1 });

	const $choice = $('select', { class: 'glang-choice', autofocus: '', ariaLabel: data.optionsLabel }, data.options.map(
		(option) => $('option', { value: option.value }, [
			document.createTextNode(option.label)
		])
	));

	const $glang = $('form', { class: 'glang', role: 'dialog', ariaLabelledby: 'glang-message', ariaDescribedby: 'dialog-description', ariaHidden: !isOpen }, [
		$('p', { class: 'glang-message', id: 'glang-message' }, [
			$('strong', {}, [
				document.createTextNode(data.greeting)
			]),
			document.createTextNode(' '),
			document.createTextNode(data.message)
		]),
		$choice,
		$('button', { class: 'glang-submit', type: 'submit', ariaLabel: `${ data.submit } ${ data.optionsLabel }` }, [
			document.createTextNode(data.submit)
		]),
		$close
	]);

	$glang.addEventListener('focusout', () => {
		setTimeout(
			() => {
				if (!$glang.contains(document.activeElement)) {
					$choice.focus();
				}
			}
		);
	});

	$glang.addEventListener('keydown', (event) => {
		if (event.keyCode === 27) {
			close(event);
		}
	});

	$close.addEventListener('click', close);
	$canvas.addEventListener('click', close);

	$glang.addEventListener('submit', (event) => {
		event.preventDefault();

		window.location.href = $choice.value;
	});

	fragment.appendChild($glang);
	fragment.appendChild($canvas);

	return {
		fragment,
		open,
		close,
		toggle
	};

	function open(event) {
		if (event) {
			event.preventDefault();
		}

		$glang.setAttribute('aria-hidden', false);
		$choice.focus();

		isOpen = true;
	}

	function close(event) {
		if (event) {
			event.preventDefault();
		}

		$glang.setAttribute('aria-hidden', true);

		isOpen = false;
	}

	function toggle(event) {
		if (isOpen) {
			close(event);
		} else {
			open(event);
		}
	}
}
