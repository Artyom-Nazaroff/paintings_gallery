import {
    SET_ALL_INFORMATION,
    SET_AUTHOR, SET_CREATED_BEFORE, SET_CREATED_FROM,
    SET_CURRENT_PAGE, SET_LOCATION,
    SET_PAINTINGS,
    SET_SEARCH_QUERY,
    SET_TOTAL_ITEMS_COUNT
} from "./types";


const initialState = {
    paintings: [],
    authors: [],
    locations: [],
    currentPage: 1,
    pageSize: 6,
    totalItemsCount: 0,
    filter: {
        searchQuery: '',
        authorId: null,
        locationId: null,
        createdFrom: null,
        createdBefore: null,
    },
};

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
            return {...state, filter: {...state.filter, searchQuery: action.str}};
        case SET_AUTHOR:
            return {...state, filter: {...state.filter, authorId: action.id}};
        case SET_LOCATION:
            return {...state, filter: {...state.filter, locationId: action.id}};
        case SET_CREATED_FROM:
            return {...state, filter: {...state.filter, createdFrom: action.year}};
        case SET_CREATED_BEFORE:
            return {...state, filter: {...state.filter, createdBefore: action.year}};
        default:
            return state;
    }
};

export default galleryReducer;