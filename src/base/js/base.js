const $base = {};

function loadFonts() {
	const styleTag = document.createElement('link');
	styleTag.setAttribute('rel', "stylesheet");
	styleTag.setAttribute('href', "https://fast.fonts.com/cssapi/aa7af94d-3c5b-4e2f-a219-629af36dd2b2.css");
	document.getElementsByTagName('head')[0].appendChild(styleTag);
}

$base.init = () => {
	loadFonts();
};


export default $base;
