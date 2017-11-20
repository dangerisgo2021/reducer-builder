import { combineReducers } from 'redux';
import { isEmpty, keys } from 'lodash'

export class ReduxReducerBuilder {

	constructor() {
		this.initialState = {};
		this.actionTypeToReducer = {};
		this.nameToChild = {};
	}

	setInitialState(initialState) {
		this.initialState = initialState;
		return this;
	}

	addReducer(actionType, reducer) {
		this.actionTypeToReducer[actionType] = reducer;
		return this;
	};

	combine(name, child) {
		this.nameToChild[name] = child;
		return this;
	}

	build() {

		const self = this;


		if(isEmpty(self.nameToChild)) {

			return (state = self.initialState, action) => {
				const reducer = self.actionTypeToReducer[action.type];
				return reducer ? reducer(state, action) : state
			}

		} else {

			return (state = self.initialState, action) => {

				const parentReducer = self.actionTypeToReducer[action.type];

				const applyChildren = (nextState, name) => {
					const reducer = self.nameToChild[name];
					nextState[name] = reducer(state[name], action);
					return nextState;
				};

				const children = _.keys(self.nameToChild)
					.reduce(applyChildren, {});

				return {
					...(parentReducer ? parentReducer(state, action) : state),
					...children
				};

			}
		}

	}

}
