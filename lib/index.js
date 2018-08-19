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
    this.typeToReducer = {};
    this.keyToReducer = {};
  }

  _createClass(ReduxReducerBuilder, [{
    key: 'setInitialState',
    value: function setInitialState(initialState) {
      this.initialState = initialState;
      return this;
    }

    //should you be able to add multiple reducers for the same type?

  }, {
    key: 'addReducer',
    value: function addReducer(type, reducer) {
      this.typeToReducer[type] = reducer;
      return this;
    }
  }, {
    key: 'combine',
    value: function combine(key, reducer) {
      this.keyToReducer[key] = reducer;
      return this;
    }
  }, {
    key: 'build',
    value: function build() {

      var _this = this;

      if ((0, _lodash.isEmpty)(_this.keyToReducer)) {

        return function () {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.initialState;
          var action = arguments[1];

          var reducer = _this.typeToReducer[action.type];
          return reducer ? reducer(state, action) : state;
        };
      } else {

        return function () {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.initialState;
          var action = arguments[1];


          var rootReducer = _this.typeToReducer[action.type];

          var nextRootState = rootReducer ? rootReducer(state, action) : state;

          var hasChanged = state === nextRootState;

          var nextCombinedReducersState = Object.keys(_this.keyToReducer).reduce(function (nextState, key) {
            var reducer = _this.keyToReducer[key];
            var stateForKey = state[key];
            var nextStateForKey = reducer ? reducer(stateForKey, action) : stateForKey;

            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== stateForKey;

            return nextState;
          }, {});

          return hasChanged ? _extends({}, nextRootState, nextCombinedReducersState) : state;
        };
      }
    }
  }]);

  return ReduxReducerBuilder;
}();

exports.default = ReduxReducerBuilder;