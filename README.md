# redux-reducer-builder


example 

//userReducers
loginReducer = (state, action) => { return {...state, action.user} };
logoutReducer = (state,action) => { return {...state, user: {} };

//userReducer

urb = new ReduxReducerBuilder<ReduxAction, ReduxActionType, UserState>();

urb
  .setInitialState({})
  .addReducer('USER_LOGIN', loginReducer)
  .addReducer('USER_LOGOUT', logoutReducer);
  
//Root Reducer

store = createStore(combineReducers({ user: urb.build() });
