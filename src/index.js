import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from "./store/store";
import GalleryContainer from "./components/Gallery/GalleryContainer";

ReactDOM.render(
    <Provider store={store}>
        <GalleryContainer/>
    </Provider>,
    document.getElementById('root')
);