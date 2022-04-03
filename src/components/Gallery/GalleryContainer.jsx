import React, {useEffect} from 'react';
import Gallery from "./Gallery";
import {connect} from "react-redux";
import {getAllInformation} from "../../store/gallery/galleryReducer";
import * as PropTypes from "prop-types";

const GalleryContainer = (
    {paintings, authors, locations, currentPage, pageSize, totalItemsCount,
        getAllInformation}
) => {

    useEffect(() => {
        getAllInformation(pageSize, currentPage);
    }, []);



    return (
        <div>
            <Gallery
                authors={authors}
                locations={locations}
                paintings={paintings}
                currentPage={currentPage}
                pageSize={pageSize}
                totalItemsCount={totalItemsCount}
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

const mapStateToProps = state => {
    return {
        authors: state.gallery.authors,
        locations: state.gallery.locations,
        paintings: state.gallery.paintings,
        currentPage: state.gallery.currentPage,
        pageSize: state.gallery.pageSize,
        totalItemsCount: state.gallery.totalItemsCount,
    }
};

export default connect(mapStateToProps,
    {getAllInformation})
(GalleryContainer);