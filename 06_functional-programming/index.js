/* eslint-disable import/extensions */
// 이 파일에서만 no-global-assign ESLint 옵션 비활성화
/* eslint-disable no-global-assign */

require = require('esm')(module /* , options */);
module.exports = require('./main.js');
