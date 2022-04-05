import React, {useEffect, useState} from 'react';
import {ThemeContext} from "./themeContext";
import * as PropTypes from "prop-types";

const ThemeState = ({children}) => {
    const [lightTheme, setLightTheme] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('lightTheme')) {
            setLightTheme(true);
        }
    }, []);

    return (
        <>
            <ThemeContext.Provider value={{lightTheme, setLightTheme}}>
                {children}
            </ThemeContext.Provider>
        </>
    );
};

ThemeState.propTypes = {
    children: PropTypes.element.isRequired
};

export default ThemeState;