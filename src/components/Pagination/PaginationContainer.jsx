import React from 'react';
import Pagination from "./Pagination";
import {connect} from "react-redux";
import {getPaintingsBySearchQuery, setCurrentPage} from "../../store/gallery/actions";
import * as PropTypes from "prop-types";

const PaginationContainer = ({currentPage, pageSize, totalItemsCount, filter, setCurrentPage, getPaintingsBySearchQuery}) => {

    const onPageChanged = (page) => {
        setCurrentPage(page);
        getPaintingsBySearchQuery(filter, pageSize, page);
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
    filter: PropTypes.shape({
        searchQuery: PropTypes.string,
        authorId: PropTypes.number || PropTypes.object,
        locationId: PropTypes.number || PropTypes.object,
        createdFrom: PropTypes.string || PropTypes.object,
        createdBefore: PropTypes.string || PropTypes.object,
    }),
    setCurrentPage: PropTypes.func,
    getPaintingsBySearchQuery: PropTypes.func,
};

const mapStateToProps = state => ({
    currentPage: state.gallery.currentPage,
    pageSize: state.gallery.pageSize,
    totalItemsCount: state.gallery.totalItemsCount,
    filter: state.gallery.filter,
});

export default connect(mapStateToProps, {setCurrentPage, getPaintingsBySearchQuery})(PaginationContainer);