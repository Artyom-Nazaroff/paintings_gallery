import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './SelectRange.module.scss';
import cn from 'classnames';
import {ThemeContext} from "../../context/themeContext";
import * as PropTypes from "prop-types";

const SelectRange = ({inputText, chooseDatesRange}) => {
    const [isOpened, setIsOpened] = useState(false);
    const [createdFrom, setCreatedFrom] = useState();
    const [createdBefore, setCreatedBefore] = useState();

    const {lightTheme} = useContext(ThemeContext);
    const select = useRef(null);

    useEffect(() => {
        const onClick = (e) => {
            if (!select.current.contains(e.target)) setIsOpened(false);
        }
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const setDatesRange = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsOpened(false);
            chooseDatesRange(createdFrom, createdBefore, 1);
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
                    {inputText}
                </div>
                <div
                    className={styles.selectArrow}
                >
                    {arrow(lightTheme ? 'black' : 'white')}
                </div>
            </div>
            <div className={cn(styles.selectDropdown, {[styles.dropdownLight]: lightTheme})}>
                <div className={cn(styles.dropdownInner, {[styles.innerLight]: lightTheme})}>
                    <input
                        type="text"
                        placeholder={'from'}
                        value={createdFrom}
                        onChange={(e) =>
                            setCreatedFrom(prev => /\d+/.test(Number(e.target.value)) ? e.target.value : prev)}
                        onKeyPress={e => setDatesRange(e)}
                    />
                    <span>&#8212;</span>
                    <input
                        type="text"
                        placeholder={'before'}
                        value={createdBefore}
                        onChange={(e) =>
                            setCreatedBefore(prev => /\d+/.test(Number(e.target.value)) ? e.target.value : prev)}
                        onKeyPress={e => setDatesRange(e)}
                    />
                </div>
            </div>
        </div>
    );
};

SelectRange.propTypes = {
    inputText: PropTypes.string,
    chooseDatesRange: PropTypes.func,
};

export default SelectRange;

function arrow(color) {
    return (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.36609e-08 1.09203 0L8.90797 6.7345e-07C9.87892 7.57111e-07 10.3652 1.15702 9.67861 1.8337Z"
                fill={color} fill-opacity="0.3"/>
        </svg>
    );
}