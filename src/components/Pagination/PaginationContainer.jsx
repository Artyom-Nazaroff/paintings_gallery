import React from 'react';
import Pagination from "./Pagination";
import {connect} from "react-redux";
import {getPaintingsBySearchQuery, setCurrentPage} from "../../store/gallery/actions";
import * as PropTypes from "prop-types";

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

PaginationContainer.propTypes = {
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    totalItemsCount: PropTypes.any,
    searchQuery: PropTypes.string,
    authorId: PropTypes.number,
    locationId: PropTypes.number,
    createdFrom: PropTypes.string || PropTypes.object,
    createdBefore: PropTypes.string || PropTypes.object,
    setCurrentPage: PropTypes.func,
    getPaintingsBySearchQuery: PropTypes.func,
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