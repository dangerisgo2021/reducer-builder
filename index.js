
export default class ReduxReducerBuilde {
  private actionTypeToReducerMap;
  private initialState;
  
  constructor() {
    this.actionTypeToReducerMap = new Map();
  }

  setInitialState(initialState) : ReduxReducerBuilder {
    this.initialState = initialState;
    return this;
  }

  addReducer(actionType, reducer) {
    this.actionTypeToReducerMap.set(actionType, reducer);
    return this;
  };

  build(): (state, action) {
    const self = this;
    if(!self.initialState)
    return function(state = self.initialState, action) {
      const reducer = self.actionTypeToReducerMap.get(action.type);

      return reducer ? reducer(state, action) : state;
    };
  }
}
