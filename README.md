# redux-reducer-builder


example 

//userReducers
```
const loginReducer = (state, action) => { return {...state, action.user} };
const logoutReducer = (state,action) => { return {...state, user: {} };
```
//userReducer
```
let userReducerBuilder = new ReduxReducerBuilder<ReduxAction, ReduxActionType, UserState>();
  .setInitialState({ user:{} })
  .addReducer('USER_LOGIN', loginReducer)
  .addReducer('USER_LOGOUT', logoutReducer);
```
//Root Reducer
```
const rootReducer = combineReducers({ user: userReducerBuilder.build() });
```
