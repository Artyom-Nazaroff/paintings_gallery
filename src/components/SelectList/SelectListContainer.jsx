import React from 'react';
import SelectList from "./SelectList";
import {connect} from "react-redux";
import {getPaintingsBySearchQuery, setAuthor, setLocation} from "../../store/gallery/actions";
import * as PropTypes from "prop-types";


const SelectListContainer = ({inputText, items, pageSize, filter, setAuthor, setLocation, getPaintingsBySearchQuery}) => {

    const chooseAuthor = (id, page) => {
        setAuthor(id);
        const newFilter = {...filter, authorId: id};
        getPaintingsBySearchQuery(newFilter, pageSize, page);
    };
    const chooseLocation = (id, page) => {
        setLocation(id);
        const newFilter = {...filter, locationId: id};
        getPaintingsBySearchQuery(newFilter, pageSize, page);
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
    filter: PropTypes.shape({
        searchQuery: PropTypes.string,
        authorId: PropTypes.number || PropTypes.object,
        locationId: PropTypes.number || PropTypes.object,
        createdFrom: PropTypes.string || PropTypes.object,
        createdBefore: PropTypes.string || PropTypes.object,
    }),
    setAuthor: PropTypes.func,
    setLocation: PropTypes.func,
    getPaintingsBySearchQuery: PropTypes.func,
};

const mapStateToProps = state => ({
    pageSize: state.gallery.pageSize,
    searchQuery: state.gallery.filter.searchQuery,
    authorId: state.gallery.filter.authorId,
    locationId: state.gallery.filter.locationId,
    filter: state.gallery.filter,
});

export default connect(mapStateToProps, {setAuthor, setLocation, getPaintingsBySearchQuery})(SelectListContainer);