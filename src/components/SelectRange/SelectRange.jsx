import React, {useState} from 'react';
import styles from './SelectRange.module.scss';
import cn from 'classnames';
import arrow from '../../assets/images/select-arrow.svg';

const SelectRange = ({inputText, items}) => {
    const [isOpened, setIsOpened] = useState(false);
    const [inputItem, setInputItem] = useState(inputText);

    const chooseItem = (name, location) => {
        setInputItem(name || location);
        setIsOpened(false);
    };

    // window.addEventListener('click', () => {
    //     if (isOpened) setIsOpened(false);
    // })

    return (
        <div className={cn(styles.select, {[styles.open]: isOpened})}>
            <div
                className={styles.selectInput}
                onClick={() => setIsOpened(!isOpened)}
            >
                <div className={styles.selectText}>
                    {inputItem}
                </div>
                <div
                    className={styles.selectArrow}
                >
                    <img src={arrow} alt=""/>
                </div>
            </div>
            <div className={styles.selectDropdown}>
                <div className={styles.dropdownInner}>
                    <input type="text" placeholder={'from'}/>
                    <span>&#8212;</span>
                    <input type="text" placeholder={'before'}/>
                </div>
            </div>
        </div>
    );
};

export default SelectRange;