import React from 'react';
import Pagination from "./Pagination";
import {connect} from "react-redux";
import {getPaintingsBySearchQuery, setCurrentPage} from "../../store/gallery/galleryReducer";

const PaginationContainer = ({currentPage, pageSize, totalItemsCount, searchQuery, authorId, locationId,
                                 createdFrom, createdBefore, setCurrentPage, getPaintingsBySearchQuery}) => {

    const onPageChanged = (page) => {
        setCurrentPage(page);
        getPaintingsBySearchQuery(searchQuery, authorId, locationId, createdFrom, createdBefore, page, pageSize);
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
    searchQuery: state.gallery.filter.searchQuery,
    authorId: state.gallery.filter.authorId,
    locationId: state.gallery.filter.locationId,
    createdFrom: state.gallery.filter.createdFrom,
    createdBefore: state.gallery.filter.createdBefore,
});

export default connect(mapStateToProps, {setCurrentPage, getPaintingsBySearchQuery})(PaginationContainer);