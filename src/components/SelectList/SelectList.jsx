import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './SelectList.module.scss';
import cn from 'classnames';
import {ThemeContext} from "../../context/themeContext";

const SelectList = ({inputText, items, chooseAuthor, chooseLocation}) => {
    const [isOpened, setIsOpened] = useState(false);
    const [inputItem, setInputItem] = useState(inputText);

    const {lightTheme} = useContext(ThemeContext);
    const select = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (!select.current.contains(e.target)) setIsOpened(false);
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const chooseItem = (item, id) => {
        setInputItem(item);
        setIsOpened(false);
        if (inputText === 'Author') {
            chooseAuthor(id, 1);
        } else if (inputText === 'Location') {
            chooseLocation(id, 1);
        }
    };

    return (
        <div
            ref={select}
            className={cn(styles.select, {[styles.open]: isOpened})}
        >
            <div
                className={cn(styles.selectInput, {[styles.selectInputLight]: lightTheme})}
                onClick={() => setIsOpened(!isOpened)}
            >
                <div className={styles.selectText}>
                    {inputItem}
                </div>
                <div
                    className={styles.selectArrow}
                >
                    {arrow(lightTheme ? 'black' : 'white')}
                </div>
            </div>
            <div className={cn(styles.selectDropdown, {[styles.dropdownLight]: lightTheme})}>
                <ul className={cn(styles.selectList, {[styles.selectListLight]: lightTheme})}>
                    {items.map(item =>
                        <li
                            key={item.id}
                            onClick={() => chooseItem((item.name || item.location), item.id)}
                        >
                            {item.name || item.location}
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default SelectList;

function arrow(color) {
    return (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.36609e-08 1.09203 0L8.90797 6.7345e-07C9.87892 7.57111e-07 10.3652 1.15702 9.67861 1.8337Z" fill={color} fill-opacity="0.3"/>
        </svg>
    );
}