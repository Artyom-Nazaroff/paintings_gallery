import React from 'react';
import {connect} from "react-redux";
import {getPaintingsBySearchQuery, setCreatedBefore, setCreatedFrom} from "../../store/gallery/actions";
import SelectRange from "./SelectRange";
import * as PropTypes from "prop-types";


const SelectRangeContainer = ({inputText, pageSize, searchQuery, authorId, locationId,
                                  getPaintingsBySearchQuery, setCreatedFrom, setCreatedBefore}) => {

    const chooseDatesRange = (from = null, before = null, page) => {
        setCreatedFrom(from);
        setCreatedBefore(before);
        getPaintingsBySearchQuery(searchQuery, authorId, locationId, from, before, page, pageSize);
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
    searchQuery: PropTypes.string,
    authorId: PropTypes.number,
    locationId: PropTypes.number,
    setCreatedFrom: PropTypes.func,
    setCreatedBefore: PropTypes.func,
    getPaintingsBySearchQuery: PropTypes.func,
};

const mapStateToProps = state => ({
    pageSize: state.gallery.pageSize,
    searchQuery: state.gallery.filter.searchQuery,
    authorId: state.gallery.filter.authorId,
    locationId: state.gallery.filter.locationId,
});

export default connect(mapStateToProps,
    {getPaintingsBySearchQuery, setCreatedFrom, setCreatedBefore})(SelectRangeContainer);