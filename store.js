import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/index.ts';

export const initStore = initialState => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
