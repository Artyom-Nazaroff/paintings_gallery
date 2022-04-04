import React from 'react';
import Pagination from "./Pagination";
import {connect} from "react-redux";
import {getPictures} from "../../store/gallery/galleryReducer";

const PaginationContainer = ({currentPage, pageSize, totalItemsCount, searchQuery, getPictures}) => {

    const onPageChanged = (page) => {
        getPictures(searchQuery, pageSize, page);
    };

    return (
        <div>
            <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalItemsCount={totalItemsCount}
                onPageChanged={onPageChanged}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    currentPage: state.gallery.currentPage,
    pageSize: state.gallery.pageSize,
    totalItemsCount: state.gallery.totalItemsCount,
    searchQuery: state.gallery.searchQuery,
});

export default connect(mapStateToProps, {getPictures})(PaginationContainer);