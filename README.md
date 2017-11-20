import { ReduxReducerBuilder } from '../redux-reducer-builder'

const userReducer = new ReduxReducerBuilder()
	.setInitialState({
		username: "",
		jwt: {}
	})
	.addReducer('USER_ACTION', (state, {username}) => ({...state, username}))
	.build();

const childReducer = new ReduxReducerBuilder()
	.addReducer('set_parent', (state, action) => { return {...state, parent: action.payload } })
	.build();

const aboutReducer = new ReduxReducerBuilder()
	.setInitialState({count: 0})
	.addReducer('add_count', (state) => { return {...state, count: state.count + 1} })
	.build();

export const rootReducer = initialState => {

	return new ReduxReducerBuilder()
		.setInitialState(initialState)
		.addReducer('change_name', (state, action) => { return {...state, name: action.payload}})
		.combine('child', childReducer)
		.combine('user', userReducer)
		.combine('about', aboutReducer)
		.build();

};



