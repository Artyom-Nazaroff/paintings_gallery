import React from "react";
import styles from './Gallery.module.scss';
import cn from 'classnames';
import logo from '../../assets/images/logo.svg';
import switcher from '../../assets/images/switcher.svg';
import SelectList from "../SelectList/SelectList";
import Pictures from "../Pictures/Pictures";
import SelectRange from "../SelectRange/SelectRange";
import PaginationContainer from "../Pagination/PaginationContainer";

const Gallery = (
    {authors, locations, paintings, currentPage, pageSize, totalItemsCount}
) => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.headerLogo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={styles.themeSwitcher}>
                    <img src={switcher} alt="switch-theme"/>
                </div>
            </header>
            <main className={styles.content}>
                <div className={styles.filters}>
                    <input
                        type="text"
                        className={styles.inputName}
                        placeholder={'Name'}
                    />
                    <SelectList
                        inputText={'Author'}
                        items={authors}
                    />
                    <SelectList
                        inputText={'Location'}
                        items={locations}
                    />
                    <SelectRange inputText={'Created'}/>
                </div>
                <Pictures
                    paintings={paintings}
                    authors={authors}
                    locations={locations}
                />
                <PaginationContainer/>
            </main>
        </div>
    );
}

export default Gallery;
