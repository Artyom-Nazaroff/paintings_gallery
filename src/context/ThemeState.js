import React, {useState} from 'react';
import {ThemeContext} from "./themeContext";

const ThemeState = ({children}) => {
    const [lightTheme, setLightTheme] = useState(false);


    return (
        <>
            <ThemeContext.Provider value={{lightTheme, setLightTheme}}>
                {children}
            </ThemeContext.Provider>
        </>
    );
};

export default ThemeState;