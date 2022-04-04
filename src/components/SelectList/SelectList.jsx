import React, {useState} from 'react';
import styles from './SelectList.module.scss';
import cn from 'classnames';
import arrow from '../../assets/images/select-arrow.svg';

const SelectList = ({inputText, items, chooseAuthor, chooseLocation}) => {
    const [isOpened, setIsOpened] = useState(false);
    const [inputItem, setInputItem] = useState(inputText);

    const chooseItem = (item, id) => {
        setInputItem(item);
        setIsOpened(false);
        if (inputText === 'Author') {
            chooseAuthor(id);
        } else if (inputText === 'Location') {
            chooseLocation(id);
        }
    };
    // window.addEventListener('click', () => {
    //     if (isOpened) setIsOpened(false);
    // })

    return (
        <div className={cn(styles.select, {[styles.open]: isOpened})}>
            <div className={styles.testContainer}>
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
            </div>
            <div
                className={styles.selectDropdown}
                onClick={e => e.stopPropagation()}
            >
                <ul className={styles.selectList}>
                    {/*-----------Рефактор!--------------*/}
                    {items
                        ?
                        items.map(item =>
                            <li
                                key={item.id}
                                onClick={() => chooseItem((item.name || item.location), item.id)}
                            >
                                {item.name || item.location}
                            </li>)
                        :
                        null}
                </ul>
            </div>
        </div>
    );
};

export default SelectList;