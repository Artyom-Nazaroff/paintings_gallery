import {api} from "../../utils/api";
import {setCurrentPage, setPaintings} from "../gallery/galleryReducer";

const SET_AUTHORS = 'SET_AUTHORS';
const SET_LOCATIONS = 'SET_LOCATIONS';


const initialState = {
    authors: [],
    locations: [],
};

const selectListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHORS:
            return {...state, authors: action.authors};
        case SET_LOCATIONS:
            return {...state, locations: action.locations};
        default:
            return state;
    }
};

export default selectListReducer;


export const setAuthors = (authors) => ({type: SET_AUTHORS, authors});
export const setLocations = (locations) => ({type: SET_LOCATIONS, locations});



