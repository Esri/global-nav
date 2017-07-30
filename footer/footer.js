/* Global Footer, Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations
under the License. */

import { $fetch } from 'esri-global-shared';
import create from './dependent-js/footer';

function createFromDefault(callback) {
	createFromURL('/esri-footer.json', callback);
}

function createFromURL(url, callback) {
	$fetch(url, (responseText) => {
		callback(
			create(
				JSON.parse(responseText)
			)
		);
	});
}

export default {
	create,
	createFromURL,
	createFromDefault
};
