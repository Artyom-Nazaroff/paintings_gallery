import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from "./store/store";
import GalleryContainer from "./components/Gallery/GalleryContainer";
import ThemeState from "./context/ThemeState";

ReactDOM.render(
    <Provider store={store}>
        <ThemeState>
            <GalleryContainer/>
        </ThemeState>
    </Provider>,
    document.getElementById('root')
);