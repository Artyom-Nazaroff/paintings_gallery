import React, {useContext, useEffect} from 'react';
import Gallery from "./Gallery";
import {connect} from "react-redux";
import {getAllInformation, getPaintingsBySearchQuery, setSearchQuery} from "../../store/gallery/actions";
import * as PropTypes from "prop-types";
import {ThemeContext} from "../../context/themeContext";
import { createBrowserHistory } from "history";
import queryString from "query-string";

const GalleryContainer =
    ({paintings, authors, locations, currentPage, pageSize, filter, getAllInformation, setSearchQuery, getPaintingsBySearchQuery}) => {

        useEffect(() => {
            const queryString = require('query-string');
            const parsed = queryString.parse(createBrowserHistory().location.search);

            let actualFilter = filter;
            if (parsed.searchQuery) actualFilter = {...actualFilter, searchQuery: parsed.searchQuery};
            if (parsed.authorId !== 'null') actualFilter = {...actualFilter, authorId: parsed.authorId};
            if (parsed.locationId !== 'null') actualFilter = {...actualFilter, locationId: parsed.locationId};
            if (parsed.createdFrom !== 'null') actualFilter = {...actualFilter, createdFrom: parsed.createdFrom};
            if (parsed.createdBefore !== 'null') actualFilter = {...actualFilter, createdBefore: parsed.createdBefore};

            getAllInformation(actualFilter, pageSize, currentPage);
        }, []);

        useEffect(() => {
            const query = {};
            if (filter.searchQuery) query.q = filter.searchQuery;
            if (filter.authorId !== null) query.authorId = filter.authorId;
            if (filter.locationId !== null) query.locationId = filter.locationId;
            if (filter.createdFrom !== null) query.created_gte = filter.createdFrom;
            if (filter.createdBefore !== null) query.created_lte = filter.createdBefore;

            createBrowserHistory().push({
                pathname: '/',
                search: queryString.stringify(query),
            })
        }, [filter]);


        const searchPaintings = (str, page) => {
            setSearchQuery(str);
            const newFilter = {...filter, searchQuery: str};
            getPaintingsBySearchQuery(newFilter, pageSize, page);
        };

        const {lightTheme, setLightTheme} = useContext(ThemeContext);
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
    filter: PropTypes.shape({
        searchQuery: PropTypes.string,
        authorId: PropTypes.number || PropTypes.object,
        locationId: PropTypes.number || PropTypes.object,
        createdFrom: PropTypes.string || PropTypes.object,
        createdBefore: PropTypes.string || PropTypes.object,
    }),
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
    filter: state.gallery.filter,
});

export default connect(mapStateToProps,
    {getAllInformation, setSearchQuery, getPaintingsBySearchQuery})(GalleryContainer);