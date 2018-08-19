import { isEmpty } from 'lodash'
export default class ReduxReducerBuilder {

	constructor() {
		this.initialState = {};
		this.typeToReducer = {};
		this.keyToReducer = {};
	}

	setInitialState(initialState) {
		this.initialState = initialState;
		return this;
	}

  //should you be able to add multiple reducers for the same type?
	addReducer(type, reducer) {
		this.typeToReducer[type] = reducer;
		return this
	}

	combine(key, reducer) {
		this.keyToReducer[key] = reducer;
		return this
	}

	build() {

		const self = this;

		if(isEmpty(self.nameToChild)) {

			return (state = self.initialState, action) => {
				const reducer = self.typeToReducer[action.type];
				return reducer ? reducer(state, action) : state;
			}

		} else {

			return (state = self.initialState, action) => {

        const rootReducer = self.typeToReducer[action.type];

        const nextRootState = rootReducer ? rootReducer(state, action) : state;

        let hasChanged = state === nextRootState;

				const nextCombinedReducersState = Object.keys(self.keyToReducer)
					.reduce((nextState, key) => {

            const reducer = self.keyToReducer[key];
            const stateForKey = state[key];
            const nextStateForKey = reducer ? reducer(stateForKey, action) : stateForKey;

            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== stateForKey;

            return nextState;

          }, {});

        return hasChanged ? {...nextRootState,...nextCombinedReducersState} : state;

			}
		}

	}

}
