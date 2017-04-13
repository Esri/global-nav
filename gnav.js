// tooling
import 'custom-event-polyfill';
import 'element-closest';
import './dependent-js/lib/object-assign';
import render from './dependent-js/render';
import defaults from './dependent-js/defaults';
import * as importFrom from './dependent-js/importFrom';

// class
export default Object.assign(class GlobNav {}, {
	defaults,
	importFrom,
	render
});
