import React from 'react';
import SelectList from "./SelectList";
import {connect} from "react-redux";
import {setAuthor, setLocation} from "../../store/gallery/galleryReducer";


const SelectListContainer = ({inputText, items, setAuthor, setLocation}) => {

    const chooseAuthor = (id) => {
        setAuthor(id);
    };
    const chooseLocation = (id) => {
        setLocation(id);
    };

    return (
        <div>
            <SelectList
                inputText={inputText}
                items={items}
                chooseAuthor={chooseAuthor}
                chooseLocation={chooseLocation}
            />
        </div>
    );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {setAuthor, setLocation})(SelectListContainer);