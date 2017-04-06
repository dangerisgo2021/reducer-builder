interface iAction {
    type: any
}

export default class ReduxReducerBuilder<Action extends iAction, ActionType, State> {
    initialState: State;
    actionTypeToReducerMap: Map<ActionType,(state:State,action: Action)=>State> = new Map();

    setInitialState(initialState: State) : ReduxReducerBuilder<Action, ActionType, State> {
        this.initialState = initialState;
        return this;
    }

    addReducer(actionType: ActionType, reducer: (state: State, action: Action) => State)
               : ReduxReducerBuilder<Action, ActionType, State> {
        this.actionTypeToReducerMap.set(actionType, reducer);
        return this;
    };

    build(): (state: State, action: Action) => State {
        const self = this;
        return function(state = self.initialState, action: Action) {
            const reducer = self.actionTypeToReducerMap.get(action.type);
            return reducer ? reducer(state, action) : state;
        };
    }
}
