import {applyMiddleware, combineReducers, createStore} from "redux";
import galleryReducer from "./gallery/galleryReducer";
import thunkMiddleware from 'redux-thunk';
import selectListReducer from "./selectList/selectListReducer";

const reducers = combineReducers({
    gallery: galleryReducer,
    // selectList: selectListReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;