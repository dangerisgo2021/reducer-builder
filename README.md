```
import { ReducerBuilder } from '../reducer-builder'

const userReducer = new ReducerBuilder()
	.setInitialState({
		username: "",
		jwt: {}
	})
	.addReducer('USER_ACTION', (state, {username}) => ({...state, username}))
	.build();

const childReducer = new ReducerBuilder()
	.addReducer('set_parent', (state, action) => { return {...state, parent: action.payload } })
	.build();

const aboutReducer = new ReducerBuilder()
	.setInitialState({count: 0})
  .combine('child', childReducer)
	.addReducer('add_count', (state) => { return {...state, count: state.count + 1} })
	.build();

export const rootReducer = initialState => {

  return new ReducerBuilder()
    .setInitialState(initialState)
    .addReducer('change_name', (state, action) => { return {...state, name: action.payload}})
    .combine('user', userReducer)
    .combine('about', aboutReducer)
    .build();

};

```
