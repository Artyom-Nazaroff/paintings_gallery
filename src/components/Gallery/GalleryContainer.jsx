import React, {useEffect} from 'react';
import Gallery from "./Gallery";
import {connect} from "react-redux";
import {
    getAllInformation,
    getPaintingsBySearchQuery,
    searchPaintingsByString,
    setSearchQuery
} from "../../store/gallery/galleryReducer";
import * as PropTypes from "prop-types";

const GalleryContainer = ({paintings, authors, locations, currentPage, pageSize, searchQuery, authorId, locationId, createdFrom, createdBefore,
                              getAllInformation, searchPaintingsByString, setSearchQuery, getPaintingsBySearchQuery}) => {

    useEffect(() => {
        getAllInformation(searchQuery, pageSize, currentPage);
    }, []);

    const searchPaintings = (str, page) => {
        setSearchQuery(str);
        getPaintingsBySearchQuery(str, authorId, locationId, createdFrom, createdBefore, page, pageSize);
    };

    return (
        <div>
            <Gallery
                authors={authors}
                locations={locations}
                paintings={paintings}
                searchPaintings={searchPaintings}
            />
        </div>
    );
}

GalleryContainer.propTypes = {
    authors: PropTypes.any,
    locations: PropTypes.any,
    paintings: PropTypes.any,
    getAllInformation: PropTypes.any
}

const mapStateToProps = state => ({
    authors: state.gallery.authors,
    locations: state.gallery.locations,
    paintings: state.gallery.paintings,
    currentPage: state.gallery.currentPage,
    pageSize: state.gallery.pageSize,
    searchQuery: state.gallery.filter.searchQuery,
    authorId: state.gallery.filter.authorId,
    locationId: state.gallery.filter.locationId,
    createdFrom: state.gallery.filter.createdFrom,
    createdBefore: state.gallery.filter.createdBefore,
});

export default connect(mapStateToProps,
    {getAllInformation, searchPaintingsByString, setSearchQuery, getPaintingsBySearchQuery})
(GalleryContainer);