import React, {useContext, useState} from 'react';
import styles from "./SearchInput.module.scss";
import cn from 'classnames';
import {ThemeContext} from "../../context/themeContext";

const SearchInput = ({searchPaintings}) => {
    const [text, setText] = useState('');

    const {lightTheme} = useContext(ThemeContext);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchPaintings(text, 1);
        }
    };

    return (
        <>
            <input
                type="text"
                className={cn(styles.inputName, {[styles.inputNameLight]: lightTheme})}
                placeholder={'Name'}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={e => handleKeyDown(e)}
            />
        </>
    );
};

export default SearchInput;