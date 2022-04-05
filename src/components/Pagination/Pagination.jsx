import React, {useContext, useMemo, useState} from 'react';
import styles from './Pagination.module.scss';
import cn from 'classnames';
import {ThemeContext} from "../../context/themeContext";

const Pagination = ({currentPage, pageSize, totalItemsCount, onPageChanged}) => {
    const [isLeftDisabled, setIsLeftDisabled] = useState(true);
    const [isRightDisabled, setIsRightDisabled] = useState(false);
    const [page, setPage] = useState(currentPage);
    const [pagesArray, setPagesArray] = useState([]);
    const [portionsAmount, setPortionsAmount] = useState(0);
    const [portionNumber, setPortionNumber] = useState(1);
    const [leftPortionPageNumber, setLeftPortionPageNumber] = useState(1);
    const [rightPortionPageNumber, setRightPortionPageNumber] = useState(3);

    const {lightTheme} = useContext(ThemeContext);

    const lightButton = cn({[styles.lightButton]: lightTheme});

    const leftArrowsClasses = cn(styles.paginationButton, {[styles.disabled]: isLeftDisabled}, lightButton);
    const rightArrowsClasses = cn(styles.paginationButton, {[styles.disabled]: isRightDisabled}, lightButton);

    const setLeftArrowsColor = lightTheme
        ? isLeftDisabled ? 'rgba(0, 0, 0, 0.3)' : 'black'
        : isLeftDisabled ? 'rgba(255, 255, 255, 0.3)' : 'white';

    const setRightArrowsColor = lightTheme
        ? isRightDisabled ? 'rgba(0, 0, 0, 0.3)' : 'black'
        : isRightDisabled ? 'rgba(255, 255, 255, 0.3)' : 'white';

    useMemo(() => {
        const pagesCount = Math.ceil(totalItemsCount / pageSize);
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) pages.push(i);
        setPagesArray(pages);
        setPortionsAmount(pagesCount - 2);
   }, [pageSize, totalItemsCount]);

    useMemo(() => {
        if (portionNumber >= 1 && portionNumber <= portionsAmount) {
            setLeftPortionPageNumber(portionNumber);
            setRightPortionPageNumber(portionNumber + 2);
        }
    }, [portionNumber, portionsAmount]);

    useMemo(() => {
        currentPage === pagesArray[0] ? setIsLeftDisabled(true) : setIsLeftDisabled(false);
        currentPage === pagesArray[pagesArray.length - 1] ? setIsRightDisabled(true) : setIsRightDisabled(false);
    }, [currentPage, pagesArray]);

    const changeCurrentPage = (el) => {
        setPage(el);
        if (el > 1 && el < pagesArray.length) setPortionNumber(el - 1);
        onPageChanged(el);
    };

    const increasePageNumber = () => {
        if (page >= pagesArray[1] && page < (pagesArray.length - 1)) setPortionNumber(portionNumber + 1);
        setPage(page + 1);
        onPageChanged(page + 1);
    };

   const decreasePageNumber = () => {
        if (page > pagesArray[1] && page <= (pagesArray.length - 1)) setPortionNumber(portionNumber - 1);
        setPage(page - 1);
        onPageChanged(page - 1);
    };

   const scrollToEnd = () => {
       setPage(pagesArray.length);
       setPortionNumber(portionsAmount);
       onPageChanged(pagesArray.length);
   };

    const scrollToBeginning = () => {
        setPage(1);
        setPortionNumber(1);
        onPageChanged(1);
    };

    return (
        <div className={styles.paginationWrapper}>
            <div
                className={leftArrowsClasses}
                onClick={() => scrollToBeginning()}
            >
                {doubleArrow(setLeftArrowsColor)}
            </div>
            <div
                className={leftArrowsClasses}
                onClick={() => decreasePageNumber()}
            >
                {singleArrow(setLeftArrowsColor)}
            </div>

            {pagesArray.filter(el => el >= leftPortionPageNumber && el <= rightPortionPageNumber).map(el =>
                <div
                    key={el}
                    className={cn(styles.paginationButton, {[styles.active]: page === el}, lightButton)}
                    onClick={() => changeCurrentPage(el)}
                >
                    {el}
                </div>
            )}

            <div
                className={rightArrowsClasses}
                onClick={() => increasePageNumber()}
            >
                {singleArrow(setRightArrowsColor)}
            </div>
            <div
                className={rightArrowsClasses}
                onClick={() => scrollToEnd()}
            >
                {doubleArrow(setRightArrowsColor)}
            </div>
        </div>
    );
};

export default Pagination;

function singleArrow(color) {
    return (
        <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.06716 7.13428L2.26841 12.6433C1.89954 12.9939 1.30148 12.9939 0.932791 12.6433C0.56407 12.293 0.56407 11.7248 0.932791 11.3745L6.06379 6.49991L0.93294 1.62545C0.564219 1.275 0.564219 0.706895 0.93294 0.356587C1.30166 0.00613754 1.89969 0.00613754 2.26856 0.356587L8.06731 5.86567C8.25167 6.04091 8.34375 6.27034 8.34375 6.49988C8.34375 6.72953 8.25149 6.95913 8.06716 7.13428Z" fill={color}/>
        </svg>
    );
}

function doubleArrow(color) {
    return (
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.286 6.49988L6.19769 1.62545C5.83203 1.275 5.83203 0.706895 6.19769 0.356587C6.56335 0.00613754 7.15632 0.00613754 7.52213 0.356587L13.2727 5.86567C13.4556 6.04091 13.5469 6.27034 13.5469 6.49988C13.5469 6.72951 13.4554 6.9591 13.2727 7.13426L7.52213 12.6433C7.15632 12.9939 6.56332 12.9939 6.19769 12.6433C5.83203 12.293 5.83203 11.7248 6.19769 11.3745L11.286 6.49988ZM0.367995 11.3745C0.00233503 11.7248 0.00233503 12.293 0.367995 12.6433C0.733655 12.9939 1.32645 12.9939 1.69247 12.6433L7.44307 7.13428C7.6259 6.95913 7.71707 6.72953 7.71707 6.49991C7.71707 6.27037 7.62573 6.04077 7.44307 5.8657L1.69247 0.356587C1.32648 0.00613754 0.733655 0.00613754 0.367995 0.356587C0.00233503 0.706895 0.00233503 1.27498 0.367995 1.62545L5.45642 6.49988L0.367995 11.3745Z" fill={color}/>
        </svg>
    );
}