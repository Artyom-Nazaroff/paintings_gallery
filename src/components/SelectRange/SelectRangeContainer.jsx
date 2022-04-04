import React from 'react';
import {connect} from "react-redux";
import {getPaintingsBySearchQuery, setCreatedBefore, setCreatedFrom} from "../../store/gallery/galleryReducer";
import SelectRange from "./SelectRange";


const SelectRangeContainer = ({inputText, items, pageSize, searchQuery, authorId, locationId, createdFrom, createdBefore,
                                 setAuthor, setLocation, setAuthorQuery, setLocationQuery, getPaintingsBySearchQuery, setCreatedFrom, setCreatedBefore}) => {

    const chooseDatesRange = (from = null, before = null, page) => {
        setCreatedFrom(from);
        setCreatedBefore(before);
        getPaintingsBySearchQuery(searchQuery, authorId, locationId, from, before, page, pageSize);
    };

    return (
        <div>
            <SelectRange
                inputText={inputText}
                items={items}
                chooseDatesRange={chooseDatesRange}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        pageSize: state.gallery.pageSize,
        searchQuery: state.gallery.filter.searchQuery,
        authorId: state.gallery.filter.authorId,
        locationId: state.gallery.filter.locationId,
        createdFrom: state.gallery.filter.createdFrom,
        createdBefore: state.gallery.filter.createdBefore,
    }
};

export default connect(mapStateToProps,
    {getPaintingsBySearchQuery, setCreatedFrom, setCreatedBefore})
(SelectRangeContainer);