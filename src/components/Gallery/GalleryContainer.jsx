import React, {useContext, useEffect} from 'react';
import Gallery from "./Gallery";
import {connect} from "react-redux";
import {getAllInformation, getPaintingsBySearchQuery, setSearchQuery} from "../../store/gallery/actions";
import * as PropTypes from "prop-types";
import {ThemeContext} from "../../context/themeContext";

const GalleryContainer =
    ({paintings, authors, locations, currentPage, pageSize, authorId, locationId,
         createdFrom, createdBefore, getAllInformation, setSearchQuery, getPaintingsBySearchQuery}) => {

        const {lightTheme, setLightTheme} = useContext(ThemeContext);

        useEffect(() => {
            getAllInformation(pageSize, currentPage);
        }, []);

        const searchPaintings = (str, page) => {
            setSearchQuery(str);
            getPaintingsBySearchQuery(str, authorId, locationId, createdFrom, createdBefore, page, pageSize);
        };

        const setTheme = () => {
            if (!lightTheme) {
                setLightTheme(true);
                localStorage.setItem('lightTheme', 'true');
            } else if (lightTheme) {
                setLightTheme(false);
                localStorage.removeItem('lightTheme');
            }
        };

        return (
            <div>
                <Gallery
                    authors={authors}
                    locations={locations}
                    paintings={paintings}
                    searchPaintings={searchPaintings}
                    setTheme={setTheme}
                />
            </div>
        );
    }

GalleryContainer.propTypes = {
    paintings: PropTypes.array,
    authors: PropTypes.array,
    locations: PropTypes.array,
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    authorId: PropTypes.number,
    locationId: PropTypes.number,
    createdFrom: PropTypes.string || PropTypes.object,
    createdBefore: PropTypes.string || PropTypes.object,
    getAllInformation: PropTypes.func,
    setSearchQuery: PropTypes.func,
    getPaintingsBySearchQuery: PropTypes.func,
};

const mapStateToProps = state => ({
    authors: state.gallery.authors,
    locations: state.gallery.locations,
    paintings: state.gallery.paintings,
    currentPage: state.gallery.currentPage,
    pageSize: state.gallery.pageSize,
    authorId: state.gallery.filter.authorId,
    locationId: state.gallery.filter.locationId,
    createdFrom: state.gallery.filter.createdFrom,
    createdBefore: state.gallery.filter.createdBefore,
});

export default connect(mapStateToProps,
    {getAllInformation, setSearchQuery, getPaintingsBySearchQuery})(GalleryContainer);