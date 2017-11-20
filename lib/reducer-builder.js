'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReduxReducerBuilder = function () {
	function ReduxReducerBuilder() {
		_classCallCheck(this, ReduxReducerBuilder);

		this.initialState = {};
		this.actionTypeToReducer = {};
		this.nameToChild = {};
	}

	_createClass(ReduxReducerBuilder, [{
		key: 'setInitialState',
		value: function setInitialState(initialState) {
			this.initialState = initialState;
			return this;
		}
	}, {
		key: 'addReducer',
		value: function addReducer(actionType, reducer) {
			this.actionTypeToReducer[actionType] = reducer;
			return this;
		}
	}, {
		key: 'combine',
		value: function combine(name, child) {
			this.nameToChild[name] = child;
			return this;
		}
	}, {
		key: 'build',
		value: function build() {

			var self = this;

			if ((0, _lodash.isEmpty)(self.nameToChild)) {

				return function () {
					var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.initialState;
					var action = arguments[1];

					var reducer = self.actionTypeToReducer[action.type];
					return reducer ? reducer(state, action) : state;
				};
			} else {

				return function () {
					var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : self.initialState;
					var action = arguments[1];


					var parentReducer = self.actionTypeToReducer[action.type];

					var applyChildren = function applyChildren(nextState, name) {
						var reducer = self.nameToChild[name];
						nextState[name] = reducer(state[name], action);
						return nextState;
					};

					var children = Object.keys(self.nameToChild).reduce(applyChildren, {});

					return _extends({}, parentReducer ? parentReducer(state, action) : state, children);
				};
			}
		}
	}]);

	return ReduxReducerBuilder;
}();

exports.default = ReduxReducerBuilder;