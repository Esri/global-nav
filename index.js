// tooling
import render from './js/render';
import defaults from './js/defaults';
import * as importFrom from './js/importFrom';

// class
export default Object.assign(class GlobNav {}, {
	defaults,
	importFrom,
	render
});
