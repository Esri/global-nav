import createHeader from './header/js/header';
import createFooter from './footer/js/footer';

window.esriHeader = {create : createHeader};
window.esriFooter = {create : createFooter};

export default {
	createHeader,
	createFooter
};
