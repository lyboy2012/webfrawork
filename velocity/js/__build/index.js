webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _config = __webpack_require__(2);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//alert(config.NUM);
	console.log($('h1').text() + '-------------- index' + _config2.default.NUM);

	var names = { "a": "a", "b": "b" };
	function a() {
		var arrNames = Array.prototype.slice(arguments, 0);

		$('h1').text(Object.prototype.toString.call(arrNames) === '[object Array]');
	}
		a(1, 2, 3);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
]);
//# sourceMappingURL=index.js.map