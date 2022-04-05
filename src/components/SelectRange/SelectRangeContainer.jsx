import React from 'react';
import {connect} from "react-redux";
import {getPaintingsBySearchQuery, setCreatedBefore, setCreatedFrom} from "../../store/gallery/actions";
import SelectRange from "./SelectRange";
import * as PropTypes from "prop-types";


const SelectRangeContainer = ({inputText, pageSize, filter, getPaintingsBySearchQuery, setCreatedFrom, setCreatedBefore}) => {

    const chooseDatesRange = (from = null, before = null, page) => {
        setCreatedFrom(from);
        setCreatedBefore(before);
        const newFilter = {...filter, createdFrom: from, createdBefore: before};
        getPaintingsBySearchQuery(newFilter, pageSize, page);
    };

    return (
        <div>
            <SelectRange
                inputText={inputText}
                chooseDatesRange={chooseDatesRange}
            />
        </div>
    );
};

SelectRangeContainer.propTypes = {
    inputText: PropTypes.string,
    pageSize: PropTypes.number,
    filter: PropTypes.shape({
        searchQuery: PropTypes.string,
        authorId: PropTypes.number || PropTypes.object,
        locationId: PropTypes.number || PropTypes.object,
        createdFrom: PropTypes.string || PropTypes.object,
        createdBefore: PropTypes.string || PropTypes.object,
    }),
    getPaintingsBySearchQuery: PropTypes.func,
};

const mapStateToProps = state => ({
    pageSize: state.gallery.pageSize,
    searchQuery: state.gallery.filter.searchQuery,
    filter: state.gallery.filter,
});

export default connect(mapStateToProps,
    {getPaintingsBySearchQuery, setCreatedFrom, setCreatedBefore})(SelectRangeContainer);