interface iAction {
  type: any
}

export default class ReduxReducerBuilder<Action extends iAction, ActionType, iState> {
  private actionTypeToReducerMap: Map<ActionType, (state: iState, action: Action) => iState>;
  private initialState? : iState;
  constructor() {
    this.actionTypeToReducerMap = new Map<ActionType, (state: iState, action: Action) => iState>();
  }

  setInitialState(initialState: iState) : ReduxReducerBuilder<Action, ActionType, iState> {
    this.initialState = initialState;
    return this;
  }

  addReducer(actionType: ActionType,
             reducer: (state: iState, action: Action) => iState)
             : ReduxReducerBuilder<Action, ActionType, iState> {
    this.actionTypeToReducerMap.set(actionType, reducer);
    return this;
  };

  build(): (state: iState, action: Action) => iState {
    const self = this;
    return function(state = self.initialState, action: Action) {
      const reducer = self.actionTypeToReducerMap.get(action.type);

      return reducer ? reducer(state, action) : state;
    };
  }
}
