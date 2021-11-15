import * as action from './action/index.js';
import * as route from './route/index.js';
import * as selector from './selector/index.js';
import * as util from './util/index.js';

export default { ...action, ...route, ...selector, ...util };
