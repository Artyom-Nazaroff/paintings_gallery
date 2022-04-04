import React, {useMemo, useState} from 'react';
import styles from './Pagination.module.scss';
import cn from 'classnames';
import singleArrow from '../../assets/images/singleArrow.svg';
import doubleArrow from '../../assets/images/doubleArrow.svg';
import singleArrowDisabled from '../../assets/images/singleArrowDisabled.svg';
import doubleArrowDisabled from '../../assets/images/doubleArrowDisabled.svg';

const Pagination = ({currentPage, pageSize, totalItemsCount, onPageChanged}) => {
    const [isLeftDisabled, setIsLeftDisabled] = useState(true);
    const [isRightDisabled, setIsRightDisabled] = useState(false);
    const [page, setPage] = useState(currentPage);
    const [pagesArray, setPagesArray] = useState([]);
    const [portionsAmount, setPortionsAmount] = useState(0);
    const [portionNumber, setPortionNumber] = useState(1);
    const [leftPortionPageNumber, setLeftPortionPageNumber] = useState(1);
    const [rightPortionPageNumber, setRightPortionPageNumber] = useState(3);

    const leftArrowsClasses = cn(styles.paginationButton, {[styles.disabled]: isLeftDisabled});
    const rightArrowsClasses = cn(styles.paginationButton, {[styles.disabled]: isRightDisabled});

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
                <img src={isLeftDisabled ? doubleArrowDisabled : doubleArrow} alt=""/>
            </div>
            <div
                className={leftArrowsClasses}
                onClick={() => decreasePageNumber()}
            >
                <img src={isLeftDisabled ? singleArrowDisabled : singleArrow} alt=""/>
            </div>

            {pagesArray.filter(el => el >= leftPortionPageNumber && el <= rightPortionPageNumber).map(el =>
                <div
                    key={el}
                    className={cn(styles.paginationButton, {[styles.active]: page === el})}
                    onClick={() => changeCurrentPage(el)}
                >
                    {el}
                </div>
            )}

            <div
                className={rightArrowsClasses}
                onClick={() => increasePageNumber()}
            >
                <img src={isRightDisabled ? singleArrowDisabled : singleArrow} alt=""/>
            </div>
            <div
                className={rightArrowsClasses}
                onClick={() => scrollToEnd()}
            >
                <img src={isRightDisabled ? doubleArrowDisabled : doubleArrow} alt=""/>
            </div>
        </div>
    );
};

export default Pagination;