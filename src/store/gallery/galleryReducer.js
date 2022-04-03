import {api} from "../../utils/api";

const SET_ALL_INFORMATION = 'SET_ALL_INFORMATION';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_ITEMS_COUNT = 'SET_TOTAL_ITEMS_COUNT';
const SET_PAINTINGS = 'SET_PAINTINGS';

const initialState = {
    paintings: [],
    authors: [],
    locations: [],
    currentPage: 1,
    pageSize: 6,
    totalItemsCount: 0,
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


export const getAllInformation = (pageSize, currentPage) => async dispatch => {
    const paintings = await api.getPaintings(pageSize, currentPage);
    dispatch(setTotalItemsCount(paintings.headers['x-total-count']));
    const authors = await api.getAuthors();
    const locations = await api.getLocations();
    dispatch(setAllInformation(paintings.data, authors.data, locations.data));
};
export const getPictures = (pageSize, currentPage) => async dispatch => {
    dispatch(setCurrentPage(currentPage));
    const paintings = await api.getPaintings(pageSize, currentPage);
    dispatch(setPaintings(paintings.data));
}