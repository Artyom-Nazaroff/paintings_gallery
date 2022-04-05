import React from 'react';
import SelectList from "./SelectList";
import {connect} from "react-redux";
import {getPaintingsBySearchQuery, setAuthor, setLocation} from "../../store/gallery/actions";
import * as PropTypes from "prop-types";


const SelectListContainer = ({inputText, items, pageSize, searchQuery, authorId, locationId, createdFrom, createdBefore,
                                 setAuthor, setLocation, getPaintingsBySearchQuery}) => {

    const chooseAuthor = (id, page) => {
        setAuthor(id);
        getPaintingsBySearchQuery(searchQuery, id, locationId, createdFrom, createdBefore, page, pageSize);
    };
    const chooseLocation = (id, page) => {
        setLocation(id);
        getPaintingsBySearchQuery(searchQuery, authorId, id, createdFrom, createdBefore, page, pageSize);
    };

    return (
        <div>
            <SelectList
                inputText={inputText}
                items={items}
                chooseAuthor={chooseAuthor}
                chooseLocation={chooseLocation}
            />
        </div>
    );
};

SelectListContainer.propTypes = {
    inputText: PropTypes.string,
    items: PropTypes.array,
    pageSize: PropTypes.number,
    searchQuery: PropTypes.string,
    authorId: PropTypes.number,
    locationId: PropTypes.number,
    createdFrom: PropTypes.string || PropTypes.object,
    createdBefore: PropTypes.string || PropTypes.object,
    setAuthor: PropTypes.func,
    setLocation: PropTypes.func,
    getPaintingsBySearchQuery: PropTypes.func,
};

const mapStateToProps = state => ({
    pageSize: state.gallery.pageSize,
    searchQuery: state.gallery.filter.searchQuery,
    authorId: state.gallery.filter.authorId,
    locationId: state.gallery.filter.locationId,
    createdFrom: state.gallery.filter.createdFrom,
    createdBefore: state.gallery.filter.createdBefore,
});

export default connect(mapStateToProps,
    {setAuthor, setLocation, getPaintingsBySearchQuery})(SelectListContainer);