import React, {useState} from 'react';
import styles from './SelectRange.module.scss';
import cn from 'classnames';
import arrow from '../../assets/images/select-arrow.svg';

const SelectRange = ({inputText, chooseDatesRange}) => {
    const [isOpened, setIsOpened] = useState(false);
    const [createdFrom, setCreatedFrom] = useState();
    const [createdBefore, setCreatedBefore] = useState();

    const setDatesRange = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setIsOpened(false);
            chooseDatesRange(createdFrom, createdBefore, 1);
        }
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
                    {inputText}
                </div>
                <div
                    className={styles.selectArrow}
                >
                    <img src={arrow} alt=""/>
                </div>
            </div>
            <div className={styles.selectDropdown}>
                <div className={styles.dropdownInner}>
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

export default SelectRange;