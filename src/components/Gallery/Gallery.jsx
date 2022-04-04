import React from "react";
import styles from './Gallery.module.scss';
import cn from 'classnames';
import logo from '../../assets/images/logo.svg';
import switcher from '../../assets/images/switcher.svg';
import Pictures from "../Pictures/Pictures";
import PaginationContainer from "../Pagination/PaginationContainer";
import SelectListContainer from "../SelectList/SelectListContainer";
import SearchInput from "../SearchInput/SearchInput";
import SelectRangeContainer from "../SelectRange/SelectRangeContainer";

const Gallery = ({authors, locations, paintings, searchPaintings}) => {
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
                    <SearchInput
                        searchPaintings={searchPaintings}
                    />
                    <SelectListContainer
                        inputText={'Author'}
                        items={authors}
                    />
                    <SelectListContainer
                        inputText={'Location'}
                        items={locations}
                    />
                    <SelectRangeContainer inputText={'Created'}/>
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
