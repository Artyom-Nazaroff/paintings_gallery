import React from 'react';
import SelectList from "./SelectList";
import {connect} from "react-redux";
import {
    getPaintingsBySearchQuery,
    setAuthor,
    setAuthorQuery,
    setLocation,
    setLocationQuery
} from "../../store/gallery/galleryReducer";


const SelectListContainer = ({inputText, items, pageSize, searchQuery, authorId, locationId, createdFrom, createdBefore,
                                 setAuthor, setLocation, setAuthorQuery, setLocationQuery, getPaintingsBySearchQuery}) => {

    const chooseAuthor = (id, page) => {
        setAuthorQuery(id);
        getPaintingsBySearchQuery(searchQuery, id, locationId, createdFrom, createdBefore, page, pageSize);
    };
    const chooseLocation = (id, page) => {
        setLocationQuery(id);
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

const mapStateToProps = state => ({
    pageSize: state.gallery.pageSize,
    searchQuery: state.gallery.filter.searchQuery,
    authorId: state.gallery.filter.authorId,
    locationId: state.gallery.filter.locationId,
    createdFrom: state.gallery.filter.createdFrom,
    createdBefore: state.gallery.filter.createdBefore,
});

export default connect(mapStateToProps,
    {setAuthor, setLocation, setAuthorQuery, setLocationQuery, getPaintingsBySearchQuery})
(SelectListContainer);