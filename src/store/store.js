import {applyMiddleware, combineReducers, createStore} from "redux";
import galleryReducer from "./gallery/galleryReducer";
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
    gallery: galleryReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;