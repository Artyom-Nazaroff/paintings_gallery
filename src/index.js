import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import store from "./store/store";
import GalleryContainer from "./components/Gallery/GalleryContainer";
import ThemeState from "./context/ThemeState";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ThemeState>
            <GalleryContainer/>
        </ThemeState>
    </Provider>
);