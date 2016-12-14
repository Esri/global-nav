// tooling
import defaults from './lib/defaults';
import constructMenu from './lib/constructMenu';
import * as importFrom from './lib/importFrom';

// class
export default class GlobNav {
	// Globnav defaults
	static defaults = defaults;

	// Globnav import methods
	static importFrom = importFrom;

	// Globnav constructors
	static constructMenu = constructMenu;
}
