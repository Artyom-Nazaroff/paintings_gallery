import {
    SET_ALL_INFORMATION,
    SET_AUTHOR, SET_CREATED_BEFORE, SET_CREATED_FROM,
    SET_CURRENT_PAGE, SET_LOCATION,
    SET_PAINTINGS,
    SET_SEARCH_QUERY,
    SET_TOTAL_ITEMS_COUNT
} from "./types";
import {api} from "../../utils/api";

export const setAllInformation = (paintings, authors, locations) => (
    {type: SET_ALL_INFORMATION, paintings, authors, locations}
);
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const setTotalItemsCount = (amount) => ({type: SET_TOTAL_ITEMS_COUNT, amount});
export const setPaintings = (items) => ({type: SET_PAINTINGS, items});
export const setSearchQuery = (str) => ({type: SET_SEARCH_QUERY, str});
export const setAuthor = (id) => ({type: SET_AUTHOR, id});
export const setLocation = (id) => ({type: SET_LOCATION, id});
export const setCreatedFrom = (year) => ({type: SET_CREATED_FROM, year});
export const setCreatedBefore = (year) => ({type: SET_CREATED_BEFORE, year});


export const getAllInformation = (filter, pageSize, currentPage) => async dispatch => {
    const paintings = await api.searchQuery(filter, pageSize, currentPage);
    dispatch(setTotalItemsCount(paintings.headers['x-total-count']));
    const authors = await api.getAuthors();
    const locations = await api.getLocations();
    dispatch(setAllInformation(paintings.data, authors.data, locations.data));
};
export const getPaintingsBySearchQuery = (filter, pageSize, currentPage) => async dispatch => {
    const paintings = await api.searchQuery(filter, pageSize, currentPage);
    dispatch(setTotalItemsCount(paintings.headers['x-total-count']));
    dispatch(setPaintings(paintings.data));
};