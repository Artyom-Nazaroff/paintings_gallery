import React, {useEffect} from 'react';
import Gallery from "./Gallery";
import {connect} from "react-redux";
import {getAllInformation, searchPaintingsByString} from "../../store/gallery/galleryReducer";
import * as PropTypes from "prop-types";

const GalleryContainer = ({paintings, authors, locations, currentPage, pageSize, searchQuery,
                              getAllInformation, searchPaintingsByString}) => {

    useEffect(() => {
        getAllInformation(searchQuery, pageSize, currentPage);
    }, []);

    const searchPaintings = (str, page) => {
        searchPaintingsByString(str, page, pageSize);
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
    searchQuery: state.gallery.searchQuery,
});

export default connect(mapStateToProps, {getAllInformation, searchPaintingsByString})(GalleryContainer);