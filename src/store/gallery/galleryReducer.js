import {api} from "../../utils/api";

const SET_ALL_INFORMATION = 'SET_ALL_INFORMATION';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_ITEMS_COUNT = 'SET_TOTAL_ITEMS_COUNT';
const SET_PAINTINGS = 'SET_PAINTINGS';
const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

const initialState = {
    paintings: [],
    authors: [],
    locations: [],
    currentPage: 1,
    pageSize: 6,
    totalItemsCount: 0,
    searchQuery: '',
}

const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_INFORMATION:
            return {
                ...state,
                paintings: action.paintings,
                authors: action.authors,
                locations: action.locations,
            };
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.page};
        case SET_TOTAL_ITEMS_COUNT:
            return {...state, totalItemsCount: action.amount};
        case SET_PAINTINGS:
            return {...state, paintings: action.items};
        case SET_SEARCH_QUERY:
            return {...state, searchQuery: action.str};
        default:
            return state;
    }
};

export default galleryReducer;


export const setAllInformation = (paintings, authors, locations) => (
    {type: SET_ALL_INFORMATION, paintings, authors, locations}
);
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page});
export const setTotalItemsCount = (amount) => ({type: SET_TOTAL_ITEMS_COUNT, amount});
export const setPaintings = (items) => ({type: SET_PAINTINGS, items});
export const setSearchQuery = (str) => ({type: SET_SEARCH_QUERY, str});


export const getAllInformation = (str, pageSize, currentPage) => async dispatch => {
    const paintings = await api.getPaintings(str, pageSize, currentPage);
    dispatch(setTotalItemsCount(paintings.headers['x-total-count']));
    const authors = await api.getAuthors();
    const locations = await api.getLocations();
    dispatch(setAllInformation(paintings.data, authors.data, locations.data));
};
export const getPictures = (str, pageSize, currentPage) => async dispatch => {
    dispatch(setCurrentPage(currentPage));
    const paintings = await api.getPaintings(str, pageSize, currentPage);
    dispatch(setPaintings(paintings.data));
};
export const setAuthor = (id) => async dispatch => {
    const authorPaintings = await api.getAuthorPaintings(id);
    dispatch(setTotalItemsCount(authorPaintings.data.length));
    dispatch(setCurrentPage(1));
    dispatch(setPaintings(authorPaintings.data));
};
export const setLocation = (id) => async dispatch => {
    const locations = await api.getLocationPaintings(id);
    dispatch(setTotalItemsCount(locations.data.length));
    dispatch(setCurrentPage(1));
    dispatch(setPaintings(locations.data));
};
export const searchPaintingsByString = (str, page, pageSize) => async dispatch => {
    dispatch(setSearchQuery(str));
    const paintings = await api.searchPainting(str, page, pageSize);
    dispatch(setTotalItemsCount(paintings.headers['x-total-count']));
    dispatch(setCurrentPage(1));
    dispatch(setPaintings(paintings.data));
};
